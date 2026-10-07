# @paktlabs/brand

Bu paket PaktLabs'ın bütün vitrin sitelerinin ortak katmanıdır. Landing ve disiplin subdomain'leri renklerini, fontlarını, üst barını, alt bilgisini ve dil davranışını buradan alır. Amaç, ziyaretçinin paktlabs.com'dan data.paktlabs.com'a geçtiğinde aynı stüdyonun içinde kaldığını hissetmesidir. Bunun için ortak parçalar tek bir kaynakta tutulur, her site kendi kopyasını taşımaz.

## İçerik

`styles/` altında `tokens.css` ve `global.css` durur. Renk, boşluk ve font değişkenleri ile reset, tipografi ve `.wrap`, `.eyebrow`, `.cta`, `.reveal` gibi paylaşılan sınıflar buradadır. Bir site renk ya da font sabitini kendi stillerinde tekrar yazmaz, her zaman bu değişkenleri kullanır.

`components/` altında `Header`, `Footer` ve `RevealImg` bileşenleri durur. Header bulunulan disiplini `current` ile, logonun gideceği adresi `homeHref` ile alır. Footer'a `homeHref` verildiğinde ana siteye dönen bir bağlantı eklenir. Landing ikisine de prop vermez.

`i18n/` altında dil katmanı durur. `LanguageProvider` aktif dili tutar ve `pl_lang` anahtarıyla saklar. `useDocumentMeta` sayfanın başlığını ve açıklamasını günceller, bu iş provider'da değil sayfada yapılır çünkü bir sitenin her rotası kendi başlığını taşır. `createDictHook` bir sitenin iki sözlüğünden `useDict` hook'unu üretir ve en sözlüğünde eksik kalan bir anahtarı derleme hatasına çevirir. `useBrandDict` menü, alt bilgi ve erişilebilirlik etiketleri gibi bütün sitelerde aynı kalan metinleri döndürür.

`hooks/useReveal.ts`, `lib/cx.ts`, `content/disciplines.ts`, `content/contact.ts` ve `assets/logo.svg` küçük ortak parçalardır. Disiplin adresleri yalnızca `disciplines.ts` içinde, iletişim adresi yalnızca `contact.ts` içinde tutulur. Bir adres değiştiğinde bütün siteler aynı anda doğru yere gider.

## Kullanım

Paketin kendi derleme adımı yoktur. TypeScript ve CSS kaynağı doğrudan uygulamanın Vite derlemesine girer. Böylece paket değiştiğinde ayrıca derlenip yayınlanması gerekmez, uygulama bir sonraki build'de güncel hali alır.

Parçalar alt yollarla import edilir. Tek bir giriş dosyası kullanılmaz, çünkü öyle olsaydı yalnızca bir hook isteyen bir sayfa bütün bileşenleri de bağımlılık zincirine almış olurdu.

```tsx
// bir bileşende
import { Header } from '@paktlabs/brand/components/Header'
import { createDictHook } from '@paktlabs/brand/i18n/createDictHook'

// uygulamanın giriş dosyası main.tsx içinde
import { App } from './App.tsx'
import '@paktlabs/brand/styles/global.css'
```

Global stil dosyası uygulamanın giriş dosyasında, `App` import edildikten sonra import edilir. Bu sıra derlenen CSS içinde global kuralların bileşen kurallarından sonra gelmesini sağlar, sıra değişirse eşit önem derecesindeki kurallarda kazanan değişir.

Paketin içindeki dosyalar birbirini göreli yolla import eder. Uygulamalardaki `@/` alias'ı paketin içinde çalışmaz, çünkü o alias her uygulamanın kendi `src` klasörünü gösterir.

## Değişiklik yaparken

Bu pakette yapılan her değişiklik bütün siteleri aynı anda etkiler. Bu yüzden bir değişiklikten sonra kök dizinde lint, paket içinde tip kontrolü ve landing'in hem davranış hem görsel testleri çalıştırılır.

```bash
npm run lint
npm run typecheck -w packages/brand
cd apps/landing
npm test
npm run test:visual
```

Görsel testlerde açıklanamayan bir fark çıkarsa referanslar yenilenmez, önce değişikliğin neden o farkı ürettiği bulunur. Yeni bir ortak parça bu pakete ancak en az iki site onu gerçekten kullanacaksa eklenir. Tek bir siteye ait olan bileşen o sitenin kendi klasöründe kalır.
