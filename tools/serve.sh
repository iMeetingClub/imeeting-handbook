#!/bin/bash
# 本地/局域网预览：把 site/ 作为网站根目录对外提供
# 用法：./serve.sh [端口]   默认 8080
# 访问：http://127.0.0.1:${1:-8080}/   局域网：http://$(ipconfig getifaddr en0):${1:-8080}/
PORT="${1:-8080}"
HERE="$(cd "$(dirname "$0")" && pwd)"
echo "iMeeting 说明书站 → http://127.0.0.1:$PORT/"
IP="$(ipconfig getifaddr en0 2>/dev/null || ipconfig getifaddr en1 2>/dev/null)"
[ -n "$IP" ] && echo "同一局域网内 → http://$IP:$PORT/"
echo "（Ctrl+C 停止）"
exec python3 -m http.server "$PORT" --bind 0.0.0.0 --directory "$HERE/../site"
