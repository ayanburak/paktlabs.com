# @paktlabs/config

Bu paket PaktLabs sitelerinin ortak yapılandırmasını taşır. İçinde yalnızca yapılandırma dosyaları vardır, çalışma zamanında hiçbir siteye kod girmez.

## İçerik

`tsconfig.app.json`, `tsconfig.node.json` ve `tsconfig.tests.json` bütün sitelerde aynı olan TypeScript ayarlarının tabanlarıdır. Bir sitenin kendi tsconfig dosyaları bunları `extends` ile alır ve yalnızca dosyaya göreli olanları tutar: `tsBuildInfoFile`, `include`, `types`, `baseUrl` ve `paths`. `strict` tabanlarda açıkça yazılıdır. `tsconfig.app.json` ve `tsconfig.tests.json` ayrıca `noUncheckedIndexedAccess` açar: dizi ve kayıt indeksi `undefined` dönebilir, kod bunu `!` ile susturmaz, koruma ya da açık bir hata ile karşılar.

`vite.ts` içindeki `siteConfig` React eklentisini, `@` alias'ını, sabit geliştirme portunu ve `cssMinify: false` ayarını kurar. Sitenin kendine özel ayarı Vite'ın `mergeConfig` fonksiyonuyla üstüne eklenir. `playwright.ts` içindeki `siteTestConfig` testleri üretim derlemesine karşı çalıştırır, `LIVE_URL` verilirse build almadan o adrese bağlanır.

```ts
// vite.config.ts
export default siteConfig({ root: import.meta.dirname, port: 5174 })

// playwright.config.ts
export default siteTestConfig({ port: 4174 })
```

`testing/` sitelerin Playwright testlerinin ortak dosyalarını taşır ve `@paktlabs/config/testing/expected` ile `@paktlabs/config/testing/support` yoluyla alınır. `expected.ts` testlerin beklediği adresleri ve hizmet listesini elle yazılı tek yerde tutar, uygulamanın kendi dosyalarından okunmaz. `support.ts` dil listesini, font ve görsel beklemeyi, `required`'ı ve derlenmiş CSS'te eski tarayıcıda çalışmayan sorguları arayan `expectClassicMediaQueries`'i taşır. Ayrıntı sitelerin `tests/README.md` dosyalarında.

## Neden packages altında

Yayın paketi `git archive` ile yalnızca kökteki `package.json` ve `package-lock.json` dosyalarını, `packages` ve `apps` klasörlerini alır. Kökte açılan bir klasör pakete girmez ve sunucudaki derleme kırılırdı.
