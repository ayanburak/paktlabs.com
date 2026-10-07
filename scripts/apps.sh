# Yayinlanan her uygulamanin paket adi oneki, sunucudaki klasorleri ve canli
# adresi. build, deploy ve rollback script'leri bu dosyayi source eder, yeni bir
# site eklendiginde yalnizca buraya bir satir eklenir.
#
# Landing'in degerleri atomik yayin duzeni kuruldugundan beri ayni. Sunucudaki
# eski surumler ve geri donus yolu bozulmasin diye degistirilmemeli.
#
# Kullanim: load_app <uygulama>
# Sonrasinda prefix, releases, live ve url degiskenleri dolu gelir.

load_app() {
  case "${1:-}" in
    landing)
      prefix=paktlabs
      releases=/var/www/paktlabs-releases
      live=/var/www/paktlabs
      url=https://paktlabs.com
      ;;
    data)
      prefix=data
      releases=/var/www/data-releases
      live=/var/www/data
      url=https://data.paktlabs.com
      ;;
    *)
      echo "bilinmeyen uygulama: '${1:-}', landing veya data olmali" >&2
      exit 1
      ;;
  esac
}
