#!/bin/bash
# 一键发布：编译 .jsx → 同步到 deploy/ → 生成预览图 → 推到 GitHub Pages
# 用法：./publish.sh [owner/repo]     默认 iMeetingClub/imeeting-handbook
# token：从环境变量 GH_TOKEN 读取，或写成 /tmp/ghtoken（不写进项目目录，用完请撤销）
set -e
HERE="$(cd "$(dirname "$0")" && pwd)"
IMEETING="$(cd "$HERE/.." && pwd)"
REPO="${1:-iMeetingClub/imeeting-handbook}"
SRC="$IMEETING/site"
DST="$IMEETING/deploy"

echo "1/4 编译 .jsx"
"$HERE/build.sh" >/dev/null

echo "2/4 同步站点文件到 deploy/"
cp "$SRC/index.html" "$DST/"
rsync -a --delete "$SRC/assets/" "$DST/assets/"

echo "3/4 生成预览图（JPEG）"
mkdir -p "$DST/preview"
for f in "$SRC"/preview/*.png; do
  sips -s format jpeg -s formatOptions 82 -Z 1600 "$f" --out "$DST/preview/$(basename "${f%.png}").jpg" >/dev/null
done

echo "4/4 推送到 $REPO"
python3 "$DST/tools/publish_github.py" --repo "$REPO" --dir "$DST"
