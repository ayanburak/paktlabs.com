#!/usr/bin/env bash
# build-release.sh ile uretilen paketi sunucuya yukler, releases altinda acar,
# dosya ozetlerini dogrular ve /var/www/paktlabs symlink'ini yeni surume
# atomik olarak cevirir. Gecis mv -T ile tek rename islemidir, nginx hicbir
# anda yarim kopyalanmis bir dizin gormez. Onceki surum yerinde kalir.
#
# Kullanim: scripts/deploy-release.sh release/paktlabs-....tar.gz
# Sunucu varsayilan olarak ssh config'teki vps alias'i, DEPLOY_HOST ile degisir.
set -euo pipefail

tarball=${1:?paket yolu gerekli}
host=${DEPLOY_HOST:-vps}
name=$(basename "$tarball" .tar.gz)

scp -q "$tarball" "$host:/tmp/$name.tar.gz"

ssh "$host" bash -s -- "$name" <<'REMOTE'
set -euo pipefail
name=$1
releases=/var/www/paktlabs-releases
target=$releases/$name
tmp=/tmp/$name.tar.gz
trap 'rm -f "$tmp"' EXIT

# ilk gecis dizini symlink'e cevirmeyi gerektirir, bu script onu yapmaz
test -L /var/www/paktlabs || { echo "/var/www/paktlabs symlink degil, durduruldu" >&2; exit 1; }
test ! -e "$target" || { echo "$target zaten var, durduruldu" >&2; exit 1; }

tar -xzf "$tmp" -C "$releases"
(cd "$target/site" && sha256sum --quiet -c ../SHA256SUMS)
chown -R www-data:www-data "$target"
find "$target" -type d -exec chmod 755 {} +
find "$target" -type f -exec chmod 644 {} +

previous=$(readlink /var/www/paktlabs)
ln -sfn "$target/site" /var/www/paktlabs.next
mv -T /var/www/paktlabs.next /var/www/paktlabs
echo "onceki surum: $previous"
echo "yeni surum:   $(readlink /var/www/paktlabs)"
REMOTE

# canli index.html'in yeni paketteki JS dosyasini gosterdigini kontrol eder
entry=$(tar -xzOf "$tarball" "$name/site/index.html" | grep -o '/assets/index-[^"]*\.js')
curl -fsS "https://paktlabs.com/" | grep -q "$entry" && echo "canli index.html yeni build'i gosteriyor: $entry"
