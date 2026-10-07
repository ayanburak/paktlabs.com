#!/usr/bin/env bash
# Sunucudaki surumleri listeler veya uygulamanin canli symlink'ini verilen
# eski surume atomik olarak geri cevirir. Hicbir surum silinmez.
#
# Kullanim:
#   scripts/rollback-release.sh <uygulama>              surumleri ve aktif olani listeler
#   scripts/rollback-release.sh <uygulama> <surum-adi>  o surume doner
set -euo pipefail

source "$(dirname "$0")/apps.sh"
load_app "${1:-}"
host=${DEPLOY_HOST:-vps}

# ssh argumanlari tek komut satirina birlestirir, bos arguman uzak tarafa hic
# ulasmaz. Bu yuzden surum adi en sona konur, listeleme modunda $3 tanimsiz
# gelir ve set -u yuzunden varsayilan gerekli.
ssh "$host" bash -s -- "$releases" "$live" "${2:-}" <<'REMOTE'
set -euo pipefail
releases=$1
live=$2
name=${3:-}

if [ -z "$name" ]; then
  echo "aktif: $(readlink "$live")"
  ls -1 "$releases"
  exit 0
fi

test -d "$releases/$name/site" || { echo "$releases/$name/site yok" >&2; exit 1; }
ln -sfn "$releases/$name/site" "$live.next"
mv -T "$live.next" "$live"
echo "aktif: $(readlink "$live")"
REMOTE
