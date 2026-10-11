# @paktlabs/config

Bu paket PaktLabs sitelerinin ortak yapılandırmasını taşır. İçinde yalnızca yapılandırma dosyaları vardır, çalışma zamanında hiçbir siteye kod girmez.

## İçerik

`tsconfig.app.json`, `tsconfig.node.json` ve `tsconfig.tests.json` iki sitede aynı olan TypeScript ayarlarının tabanlarıdır. Bir sitenin kendi tsconfig dosyaları bunları `extends` ile alır ve yalnızca dosyaya göreli olanları tutar: `tsBuildInfoFile`, `include`, `types`, `baseUrl` ve `paths`. `strict` tabanlarda açıkça yazılıdır.

`vite.ts` içindeki `siteConfig` React eklentisini, `@` alias'ını, sabit geliştirme portunu ve `cssMinify: false` ayarını kurar. Sitenin kendine özel ayarı Vite'ın `mergeConfig` fonksiyonuyla üstüne eklenir. `playwright.ts` içindeki `siteTestConfig` testleri üretim derlemesine karşı çalıştırır, `LIVE_URL` verilirse build almadan o adrese bağlanır.

```ts
// vite.config.ts
export default siteConfig({ root: import.meta.dirname, port: 5174 })

// playwright.config.ts
export default siteTestConfig({ port: 4174 })
```

## Neden packages altında

Yayın paketi `git archive` ile yalnızca kökteki `package.json` ve `package-lock.json` dosyalarını, `packages` ve `apps` klasörlerini alır. Kökte açılan bir klasör pakete girmez ve sunucudaki derleme kırılırdı.
