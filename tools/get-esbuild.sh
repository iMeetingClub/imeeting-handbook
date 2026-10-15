#!/bin/bash
# 下载 esbuild 原生二进制（用于把 .jsx 编译成 .js，不需要 Node）
set -e
HERE="$(cd "$(dirname "$0")" && pwd)"
DIR="$HERE/esbuild"
case "$(uname -m)" in
  arm64)  PKG=darwin-arm64 ;;
  x86_64) PKG=darwin-x64 ;;
  *) echo "暂不支持的架构: $(uname -m)"; exit 1 ;;
esac
if [ -x "$DIR/package/bin/esbuild" ]; then
  echo "esbuild 已存在：$("$DIR/package/bin/esbuild" --version)"
  exit 0
fi
mkdir -p "$DIR" && cd "$DIR"
echo "下载 $PKG ..."
curl -fsSL -o esbuild.tgz "https://registry.npmjs.org/@esbuild/$PKG/-/$PKG-0.21.5.tgz"
tar xzf esbuild.tgz && rm -f esbuild.tgz
"$DIR/package/bin/esbuild" --version
echo "完成。现在可以运行 tools/build.sh"
