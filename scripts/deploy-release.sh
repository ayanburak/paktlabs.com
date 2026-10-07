#!/usr/bin/env bash
# build-release.sh ile uretilen paketi sunucuya yukler, uygulamanin releases
# klasoru altinda acar, dosya ozetlerini dogrular ve canli symlink'i yeni surume
# atomik olarak cevirir. Gecis mv -T ile tek rename islemidir, nginx hicbir
# anda yarim kopyalanmis bir dizin gormez. Onceki surum yerinde kalir.
#
# Kullanim: scripts/deploy-release.sh <uygulama> release/<onek>-....tar.gz
# Uygulamanin klasorleri ve adresi scripts/apps.sh'ta durur. Sunucu varsayilan
# olarak ssh config'teki vps alias'i, DEPLOY_HOST ile degisir.
set -euo pipefail

source "$(dirname "$0")/apps.sh"
load_app "${1:-}"
tarball=${2:?paket yolu gerekli}
host=${DEPLOY_HOST:-vps}
name=$(basename "$tarball" .tar.gz)

# baska bir uygulamanin paketi yanlislikla bu uygulamanin canli dizinine
# gecmesin diye paket adi uygulamanin onekiyle baslamak zorunda
case "$name" in
  "$prefix"-*) ;;
  *) echo "$name, $prefix uygulamasinin paketi degil, durduruldu" >&2; exit 1 ;;
esac

scp -q "$tarball" "$host:/tmp/$name.tar.gz"

ssh "$host" bash -s -- "$name" "$releases" "$live" <<'REMOTE'
set -euo pipefail
name=$1
releases=$2
live=$3
target=$releases/$name
tmp=/tmp/$name.tar.gz
trap 'rm -f "$tmp"' EXIT

# ilk gecis dizini symlink'e cevirmeyi gerektirir, bu script onu yapmaz
test -L "$live" || { echo "$live symlink degil, durduruldu" >&2; exit 1; }
test ! -e "$target" || { echo "$target zaten var, durduruldu" >&2; exit 1; }

tar -xzf "$tmp" -C "$releases"
(cd "$target/site" && sha256sum --quiet -c ../SHA256SUMS)
chown -R www-data:www-data "$target"
find "$target" -type d -exec chmod 755 {} +
find "$target" -type f -exec chmod 644 {} +

previous=$(readlink "$live")
ln -sfn "$target/site" "$live.next"
mv -T "$live.next" "$live"
echo "onceki surum: $previous"
echo "yeni surum:   $(readlink "$live")"
REMOTE

# canli index.html'in yeni paketteki JS dosyasini gosterdigini kontrol eder
entry=$(tar -xzOf "$tarball" "$name/site/index.html" | grep -o '/assets/index-[^"]*\.js')
curl -fsS "$url/" | grep -q "$entry" && echo "canli index.html yeni build'i gosteriyor: $entry"
