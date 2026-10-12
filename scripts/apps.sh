# Yayinlanan her uygulamanin paket adi oneki, sunucudaki klasorleri ve canli
# adresi. build, deploy ve rollback script'leri bu dosyayi source eder, yeni bir
# site eklendiginde yalnizca buraya bir satir eklenir.
#
# Landing'in degerleri atomik yayin duzeni kuruldugundan beri ayni. Sunucudaki
# eski surumler ve geri donus yolu bozulmasin diye degistirilmemeli.
#
# kind iki turden biridir. site nginx'in dogrudan sundugu derlenmis bir
# vitrin sitesidir, paketi site klasorudur. service sunucuda kendi systemd
# servisiyle calisan bir Python servisidir, paketi service klasorudur ve
# sunucuda kendi sanal ortamiyla kurulur. source servisin repodaki
# klasorudur, unit systemd servisinin adidir.
#
# Kullanim: load_app <uygulama>
# Sonrasinda kind, prefix, releases, live ve url, servislerde ek olarak
# source ve unit dolu gelir.

load_app() {
  case "${1:-}" in
    landing)
      kind=site
      prefix=paktlabs
      releases=/var/www/paktlabs-releases
      live=/var/www/paktlabs
      url=https://paktlabs.com
      ;;
    data)
      kind=site
      prefix=data
      releases=/var/www/data-releases
      live=/var/www/data
      url=https://data.paktlabs.com
      ;;
    web)
      kind=site
      prefix=web
      releases=/var/www/web-releases
      live=/var/www/web
      url=https://web.paktlabs.com
      ;;
    automation)
      kind=site
      prefix=automation
      releases=/var/www/automation-releases
      live=/var/www/automation
      url=https://automation.paktlabs.com
      ;;
    api)
      kind=service
      prefix=api
      source=services/contact-api
      unit=paktlabs-api
      releases=/opt/paktlabs-api/releases
      live=/opt/paktlabs-api/current
      url=https://paktlabs.com/api/health
      ;;
    *)
      echo "bilinmeyen uygulama: '${1:-}', landing, data, web, automation veya api olmali" >&2
      exit 1
      ;;
  esac
}
