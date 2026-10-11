#!/usr/bin/env bash
# build-release.sh ile uretilen paketi sunucuya yukler, uygulamanin releases
# klasoru altinda acar, dosya ozetlerini dogrular ve canli symlink'i yeni surume
# atomik olarak cevirir. Gecis mv -T ile tek rename islemidir, nginx hicbir
# anda yarim kopyalanmis bir dizin gormez. Onceki surum yerinde kalir.
#
# Kullanim: scripts/deploy-release.sh <uygulama> release/<onek>-....tar.gz
# Uygulamanin klasorleri ve adresi scripts/apps.sh'ta durur. Sunucu varsayilan
# olarak ssh config'teki vps alias'i, DEPLOY_HOST ile degisir.
#
# Bir serviste ayrica surumun kendi Python sanal ortami kurulur, gecisten
# sonra systemd servisi yeniden baslatilir ve servisin saglik adresine
# bakilir. Servis cevap vermezse symlink onceki surume geri cevrilir, servis
# onunla yeniden baslatilir ve script hata verir.
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

ssh "$host" bash -s -- "$name" "$releases" "$live" "$kind" "${unit:--}" <<'REMOTE'
set -euo pipefail
name=$1
releases=$2
live=$3
kind=$4
unit=$5
target=$releases/$name
payload=$target/$kind
tmp=/tmp/$name.tar.gz
trap 'rm -f "$tmp"' EXIT

# ilk gecis dizini symlink'e cevirmeyi gerektirir, bu script onu yapmaz
test -L "$live" || { echo "$live symlink degil, durduruldu" >&2; exit 1; }
test ! -e "$target" || { echo "$target zaten var, durduruldu" >&2; exit 1; }

tar -xzf "$tmp" -C "$releases"
(cd "$payload" && sha256sum --quiet -c ../SHA256SUMS)

if [ "$kind" = site ]; then
  chown -R www-data:www-data "$target"
  find "$target" -type d -exec chmod 755 {} +
  find "$target" -type f -exec chmod 644 {} +
else
  # sanal ortam surumun icinde kurulur, eski surume donuldugunde onun kendi
  # paketleri geri gelir. Dosyalar root'undur, servis yalnizca okur
  python3 -m venv "$payload/.venv"
  "$payload/.venv/bin/pip" install --quiet --no-cache-dir --disable-pip-version-check -r "$payload/requirements.txt"
  chown -R root:root "$target"
  chmod -R go-w "$target"
fi

previous=$(readlink "$live")
ln -sfn "$payload" "$live.next"
mv -T "$live.next" "$live"
echo "onceki surum: $previous"
echo "yeni surum:   $(readlink "$live")"

if [ "$kind" = service ]; then
  systemctl restart "$unit"
  for _ in $(seq 20); do
    if curl -fsS http://127.0.0.1:8001/api/health >/dev/null 2>&1; then
      echo "$unit yeni surumle ayakta"
      exit 0
    fi
    sleep 0.5
  done
  echo "$unit cevap vermedi, onceki surume donuluyor" >&2
  ln -sfn "$previous" "$live.next"
  mv -T "$live.next" "$live"
  systemctl restart "$unit"
  journalctl -u "$unit" -n 20 --no-pager >&2
  exit 1
fi
REMOTE

# Canlida yeni surumun sunuldugunu disaridan kontrol eder. Sitede canli
# index.html'in yeni paketteki giris JS'ini gostermesine, serviste saglik
# adresinin nginx uzerinden cevap vermesine bakilir.
if [ "$kind" = site ]; then
  entry=$(tar -xzOf "$tarball" "$name/site/index.html" | grep -o '/assets/[^"]*\.js' | head -n 1)
  curl -fsS "$url/" | grep -q "$entry" && echo "canli index.html yeni build'i gosteriyor: $entry"
else
  curl -fsS "$url" && echo
fi
