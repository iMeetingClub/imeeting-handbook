#!/bin/bash
# 把 assets/*.jsx 编译成同名 .js
# 用 esbuild 原生二进制（不需要 Node）。改完 .jsx 后执行本脚本即可。
set -e
HERE="$(cd "$(dirname "$0")" && pwd)"
ROOT="$(cd "$HERE/.." && pwd)"
# 兼容两种目录结构：仓库内（tools/ 与 assets/ 同级）或原工作区（tools/ 与 site/ 同级）
if [ -d "$ROOT/assets" ]; then ASSETS="$ROOT/assets"; else ASSETS="$ROOT/site/assets"; fi
ESB="$HERE/esbuild/package/bin/esbuild"
if [ ! -x "$ESB" ]; then
  echo "缺少 esbuild，请先执行： $HERE/get-esbuild.sh" >&2
  exit 1
fi
for f in "$ASSETS"/*.jsx; do
  out="${f%.jsx}.js"
  "$ESB" "$f" --jsx=transform --target=es2019 --outfile="$out" --log-level=warning
  printf 'built %s\n' "$(basename "$out")"
done
