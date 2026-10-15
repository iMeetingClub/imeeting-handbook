#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""把 deploy/ 目录发布到 GitHub，并开启 GitHub Pages。

为什么不用 git push：本机到 github.com:443 的 HTTPS 经常被掐断，而 api.github.com 稳定可达。
本脚本走 GitHub REST API（Git Data API），一次提交推送全部文件。

用法：
  GH_TOKEN=xxx python3 tools/publish_github.py --repo owner/name [--create] [--dir .] [--branch main]

  token 也可放在文件里（默认 /tmp/ghtoken），避免出现在命令行历史中。
  --create  仓库不存在时自动创建（公开仓库，需要 token 具备建仓权限）

推送后再开启 Pages；已开启则更新来源。最后打印线上地址。
"""
import argparse, base64, json, os, ssl, sys, time, urllib.error, urllib.request

API = "https://api.github.com"
SKIP_DIRS = {".git", "esbuild", "node_modules", "__pycache__"}
SKIP_FILES = {".DS_Store"}
UA = "imeeting-publish"


def token_of(args):
    t = os.environ.get("GH_TOKEN") or os.environ.get("GITHUB_TOKEN")
    if not t and os.path.exists(args.token_file):
        t = open(args.token_file, encoding="utf-8").read().strip()
    if not t:
        sys.exit("缺少 token：请设置 GH_TOKEN，或写入 %s" % args.token_file)
    return t


class GH:
    def __init__(self, token):
        self.token = token

    def call(self, method, path, payload=None, expect=(200, 201, 204)):
        url = path if path.startswith("http") else API + path
        data = json.dumps(payload).encode() if payload is not None else None
        req = urllib.request.Request(url, data=data, method=method)
        req.add_header("Authorization", "Bearer " + self.token)
        req.add_header("Accept", "application/vnd.github+json")
        req.add_header("X-GitHub-Api-Version", "2022-11-28")
        req.add_header("User-Agent", UA)
        if data:
            req.add_header("Content-Type", "application/json")
        try:
            with urllib.request.urlopen(req, timeout=60, context=ssl.create_default_context()) as r:
                body = r.read().decode()
                return r.status, (json.loads(body) if body else None)
        except urllib.error.HTTPError as e:
            body = e.read().decode()
            try:
                body = json.loads(body)
            except Exception:
                pass
            if e.code in expect:
                return e.code, body
            raise RuntimeError("%s %s → %s %s" % (method, path, e.code, json.dumps(body, ensure_ascii=False)[:400]))
        except urllib.error.URLError as e:
            raise RuntimeError("%s %s → 网络错误 %s" % (method, path, e.reason))


def collect(root):
    files = []
    for dirpath, dirnames, filenames in os.walk(root):
        dirnames[:] = [d for d in dirnames if d not in SKIP_DIRS]
        for fn in filenames:
            if fn in SKIP_FILES:
                continue
            full = os.path.join(dirpath, fn)
            rel = os.path.relpath(full, root).replace(os.sep, "/")
            files.append((rel, full))
    files.sort()
    return files


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--repo", required=True, help="owner/name")
    ap.add_argument("--dir", default=".", help="要发布的目录（默认当前目录）")
    ap.add_argument("--branch", default="main")
    ap.add_argument("--message", default="发布 iMeeting 说明书站")
    ap.add_argument("--create", action="store_true", help="仓库不存在时自动创建")
    ap.add_argument("--token-file", default="/tmp/ghtoken")
    ap.add_argument("--no-pages", action="store_true", help="不开启 Pages")
    args = ap.parse_args()

    owner, _, name = args.repo.partition("/")
    if not name:
        sys.exit("--repo 需要 owner/name 形式")
    gh = GH(token_of(args))
    root = os.path.abspath(args.dir)

    # 1. 仓库
    status, repo = gh.call("GET", "/repos/%s" % args.repo, expect=(200, 404))
    if status == 404:
        if not args.create:
            sys.exit("仓库 %s 不存在。加 --create 自动创建，或先手动建好。" % args.repo)
        print("创建仓库 %s ..." % args.repo)
        gh.call("POST", "/user/repos", {
            "name": name, "private": False, "auto_init": False,
            "description": "iMeeting 说明书站 —— 用规则，改变开会的文化",
            "has_issues": True, "has_wiki": False,
        })
        time.sleep(1.5)
    else:
        print("仓库已存在：%s" % repo.get("html_url"))

    # 1.5 空仓库必须先有一次提交打底：Git Data API 在空仓库上会返回 409
    # 空仓库的 ref 查询返回 409（不是 404）
    branch = args.branch
    st, _ref = gh.call("GET", "/repos/%s/git/ref/heads/%s" % (args.repo, branch), expect=(200, 404, 409))
    st_repo, repo_info = gh.call("GET", "/repos/%s" % args.repo)
    if st != 200:
        branch = repo_info.get("default_branch") or branch
        print("仓库为空（默认分支 %s），先创建初始提交 ..." % branch)
        gh.call("PUT", "/repos/%s/contents/.nojekyll" % args.repo, {
            "message": "初始化仓库", "content": base64.b64encode(b"\n").decode(),
        }, expect=(201, 200))
        time.sleep(2)

    # 2. 上传全部文件
    files = collect(root)
    print("准备推送 %d 个文件 ..." % len(files))
    tree = []
    for i, (rel, full) in enumerate(files, 1):
        raw = open(full, "rb").read()
        st, blob = gh.call("POST", "/repos/%s/git/blobs" % args.repo, {
            "content": base64.b64encode(raw).decode(), "encoding": "base64",
        })
        mode = "100755" if rel.endswith(".sh") else "100644"
        tree.append({"path": rel, "mode": mode, "type": "blob", "sha": blob["sha"]})
        if i % 10 == 0 or i == len(files):
            print("  %d/%d  %s" % (i, len(files), rel))

    # 3. 提交
    st, made = gh.call("POST", "/repos/%s/git/trees" % args.repo, {"tree": tree})
    parents = []
    st, ref = gh.call("GET", "/repos/%s/git/ref/heads/%s" % (args.repo, branch), expect=(200, 404, 409))
    if st == 200:
        parents = [ref["object"]["sha"]]
    payload = {"message": args.message, "tree": made["sha"]}
    if parents:
        payload["parents"] = parents
    st, commit = gh.call("POST", "/repos/%s/git/commits" % args.repo, payload)
    print("提交 %s" % commit["sha"][:10])

    # 4. 更新分支
    if parents:
        gh.call("PATCH", "/repos/%s/git/refs/heads/%s" % (args.repo, branch), {"sha": commit["sha"], "force": True})
    else:
        gh.call("POST", "/repos/%s/git/refs" % args.repo, {"ref": "refs/heads/" + branch, "sha": commit["sha"]})
    print("分支 %s 已更新" % branch)

    # 5. 开启 Pages
    url = None
    if not args.no_pages:
      try:
        src = {"source": {"branch": branch, "path": "/"}}
        st, res = gh.call("POST", "/repos/%s/pages" % args.repo, src, expect=(201, 409, 422))
        if st != 201:
            st2, res = gh.call("PUT", "/repos/%s/pages" % args.repo, src, expect=(200, 204, 422))
            print("Pages 已存在 → 更新来源（HTTP %s）" % st2)
        else:
            print("Pages 已开启")
        for _ in range(20):
            time.sleep(4)
            st, page = gh.call("GET", "/repos/%s/pages" % args.repo, expect=(200, 404))
            if st == 200:
                url = page.get("html_url")
                print("Pages 状态：%s  %s" % (page.get("status"), url))
                if page.get("status") == "built":
                    break
      except RuntimeError as e:
        print("注意：无权限修改 Pages 设置（内容已推送成功，站点会自动重建）")
        print("      %s" % str(e)[:180])
        st, page = gh.call("GET", "/repos/%s/pages" % args.repo, expect=(200, 403, 404))
        if st == 200:
            url = page.get("html_url")
            print("Pages 地址：%s" % url)
    print()
    print("仓库：https://github.com/%s" % args.repo)
    print("站点：%s" % (url or ("https://%s.github.io/%s/" % (owner, name))))
    print("（首次发布 Pages 需要 1–2 分钟生效）")


if __name__ == "__main__":
    main()
