#!/usr/bin/env bash
# Sunucudaki surumleri listeler veya uygulamanin canli symlink'ini verilen
# eski surume atomik olarak geri cevirir. Hicbir surum silinmez. Bir serviste
# geri donusten sonra servis yeniden baslatilir.
#
# Kullanim:
#   scripts/rollback-release.sh <uygulama>              surumleri ve aktif olani listeler
#   scripts/rollback-release.sh <uygulama> <surum-adi>  o surume doner
set -euo pipefail

source "$(dirname "$0")/apps.sh"
load_app "${1:-}"
host=${DEPLOY_HOST:-vps}

# ssh argumanlari tek komut satirina birlestirir, bos arguman uzak tarafa hic
# ulasmaz. Bu yuzden surum adi en sona konur, listeleme modunda $5 tanimsiz
# gelir ve set -u yuzunden varsayilan gerekli. unit sitelerde bos gelir, ayni
# sebeple siteler icin bir yer tutucu verilir.
ssh "$host" bash -s -- "$releases" "$live" "$kind" "${unit:--}" "${2:-}" <<'REMOTE'
set -euo pipefail
releases=$1
live=$2
kind=$3
unit=$4
name=${5:-}

if [ -z "$name" ]; then
  echo "aktif: $(readlink "$live")"
  ls -1 "$releases"
  exit 0
fi

test -d "$releases/$name/$kind" || { echo "$releases/$name/$kind yok" >&2; exit 1; }
ln -sfn "$releases/$name/$kind" "$live.next"
mv -T "$live.next" "$live"
echo "aktif: $(readlink "$live")"

# servis eski koda ancak yeniden baslatilinca gecer
if [ "$kind" = service ]; then
  systemctl restart "$unit"
  echo "$unit yeniden baslatildi"
fi
REMOTE
