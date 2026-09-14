#!/usr/bin/env bash
# Canliya alinacak paketi bir commit'ten uretir. Kaynak git archive ile
# commit'in kendisinden cikarilir, calisma agacinda commit'lenmemis bir
# degisiklik varsa bile pakete giremez.
#
# Kullanim: scripts/build-release.sh [commit]
# Commit verilmezse HEAD kullanilir. Cikti release/<ad>.tar.gz olur.
#
# Paketin icinde:
#   <ad>/site/        nginx'in sunacagi dosyalar ve hazir .gz kopyalari
#   <ad>/SHA256SUMS   site altindaki her dosyanin ozeti, sunucuda dogrulama icin
#   <ad>/RELEASE      kaynak commit ve paketleme zamani
set -euo pipefail

repo=$(git rev-parse --show-toplevel)
commit=$(git -C "$repo" rev-parse --verify "${1:-HEAD}^{commit}")
name="paktlabs-$(date -u +%Y%m%d-%H%M%S)-${commit:0:7}"
work=$(mktemp -d)
trap 'rm -rf "$work"' EXIT

git -C "$repo" archive "$commit" frontend | tar -x -C "$work"
(cd "$work/frontend" && npm ci --no-audit --no-fund && npm run build)

mkdir -p "$work/$name"
cp -a "$work/frontend/dist" "$work/$name/site"

# gzip_static bu kopyalari hazir sunar, nginx her istekte yeniden sikistirmaz.
# -n dosya adini ve zamani gz basligina yazmaz, ayni build ayni .gz'yi uretir.
find "$work/$name/site" -type f \( -name '*.html' -o -name '*.js' -o -name '*.css' -o -name '*.svg' \) \
  -exec gzip -9 -n -k {} \;

(cd "$work/$name/site" && find . -type f -print0 | sort -z | xargs -0 sha256sum) > "$work/$name/SHA256SUMS"
printf 'commit %s\npackaged %s\n' "$commit" "$(date -u +%Y-%m-%dT%H:%M:%SZ)" > "$work/$name/RELEASE"

mkdir -p "$repo/release"
tar -C "$work" -czf "$repo/release/$name.tar.gz" "$name"
echo "$repo/release/$name.tar.gz"
