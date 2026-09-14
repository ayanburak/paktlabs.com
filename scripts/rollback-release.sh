#!/usr/bin/env bash
# Sunucudaki surumleri listeler veya /var/www/paktlabs symlink'ini verilen
# eski surume atomik olarak geri cevirir. Hicbir surum silinmez.
#
# Kullanim:
#   scripts/rollback-release.sh             surumleri ve aktif olani listeler
#   scripts/rollback-release.sh <surum-adi> o surume doner
set -euo pipefail

host=${DEPLOY_HOST:-vps}

ssh "$host" bash -s -- "${1:-}" <<'REMOTE'
set -euo pipefail
# ssh argumanlari tek komut satirina birlestirir, bos arguman uzak tarafa hic
# ulasmaz. Listeleme modunda $1 tanimsiz gelir, set -u yuzunden varsayilan gerekli.
name=${1:-}
releases=/var/www/paktlabs-releases

if [ -z "$name" ]; then
  echo "aktif: $(readlink /var/www/paktlabs)"
  ls -1 "$releases"
  exit 0
fi

test -d "$releases/$name/site" || { echo "$releases/$name/site yok" >&2; exit 1; }
ln -sfn "$releases/$name/site" /var/www/paktlabs.next
mv -T /var/www/paktlabs.next /var/www/paktlabs
echo "aktif: $(readlink /var/www/paktlabs)"
REMOTE
