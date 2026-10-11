# @paktlabs/brand

Bu paket PaktLabs'ın bütün vitrin sitelerinin ortak katmanıdır. Landing ve disiplin subdomain'leri renklerini, fontlarını, üst barını, alt bilgisini ve dil davranışını buradan alır. Amaç, ziyaretçinin paktlabs.com'dan data.paktlabs.com'a geçtiğinde aynı stüdyonun içinde kaldığını hissetmesidir. Bunun için ortak parçalar tek bir kaynakta tutulur, her site kendi kopyasını taşımaz.

## İçerik

`styles/` altında üç dosya durur. `tokens.css` renk, boşluk, font ve ölçü değişkenlerini, `global.css` reset'i, tipografiyi ve `.wrap`, `.eyebrow`, `.cta`, `.reveal`, `.rise` gibi paylaşılan sınıfları taşır. `HeroLayout.module.css` sitelerin hero'larında ortak olan masaüstü yerleşimidir. Global değildir, bir bileşen onu import edip sınıflarını verdiğinde devreye girer. Bir site renk ya da font sabitini kendi stillerinde tekrar yazmaz, her zaman bu değişkenleri kullanır.

Klavyeyle gelinen her eleman aynı odak çerçevesini alır: bağlantılar ve düğmeler gibi açılır kutu başlıkları ve tarayıcının Tab sırasına kendisi aldığı yana kayan kutular da. Fareyle tıklamada çerçeve görünmez. Çerçevenin rengi `tokens.css` içindeki `--focus-ring` değişkeninden gelir, varsayılanı mürekkeptir. Koyu zeminli bir alan bu değişkeni kendi kutusunda açık bir renge çevirir, böylece içindeki düğmelerin çerçevesi koyu zeminde kaybolmaz. data'nın kod çerçevesi bunu altınla yapar.

`.reveal` sınıfı `hooks/useReveal.ts` ile birlikte çalışır. Eleman yüzde on beşi ekrana girince belirir. Klavyeyle elemanın içindeki bir düğmeye gelindiğinde bu eşik beklenmez, eleman hemen belirir. Tarayıcı Tab'da yalnızca odaklanan düğmeyi ekrana getirdiği için uzun bir kutunun yüzde on beşi ekrana girmeyebilir ve düğme görünmez bir kutunun içinde kalırdı. Fareyle tıklamada bu kural çalışmaz, çünkü belirirken yukarı kayan eleman tıklanan düğmeyi imlecin altından kaçırırdı.

`components/` altında `Header`, `Footer`, `Contact`, `NotFound` ve `RevealImg` bileşenleri durur. Header bulunulan disiplini `current` ile, logonun gideceği adresi `homeHref` ile alır. Footer'a `homeHref` verildiğinde ana siteye dönen bir bağlantı eklenir. Landing ikisine de prop vermez.

`i18n/` altında dil katmanı durur. `LanguageProvider` aktif dili tutar ve seçimi bütün `paktlabs.com` alt alan adlarının okuduğu `pl_lang` çerezine ve `localStorage`'a yazar. Okurken önce çereze bakar, böylece bir sitede seçilen dil öteki sitelerde de geçerli olur. `useDocumentMeta` sayfanın başlığını ve açıklamasını günceller, bu iş provider'da değil sayfada yapılır çünkü bir sitenin her rotası kendi başlığını taşır. `createDictHook` bir sitenin iki sözlüğünden `useDict` hook'unu üretir ve en sözlüğünde eksik kalan bir anahtarı derleme hatasına çevirir. `useBrandDict` menü, alt bilgi ve erişilebilirlik etiketleri gibi bütün sitelerde aynı kalan metinleri döndürür.

`hooks/useReveal.ts`, `lib/cx.ts`, `content/disciplines.ts`, `content/contact.ts`, `content/site.ts`, `content/dataTags.ts`, `assets/logo.svg`, bulunamadı sayfasının çizimi `assets/barrier.svg` ve iletişim bölümünün çizimi `assets/phone.svg` küçük ortak parçalardır. Disiplin adresleri yalnızca `disciplines.ts` içinde, e-posta adresi ve iletişim sayfasının adresi yalnızca `contact.ts` içinde, disiplin sitelerinin logoda ve alt bilgide döndüğü ana site adresi yalnızca `site.ts` içinde tutulur. Bir adres değiştiğinde bütün siteler aynı anda doğru yere gider.

`dataTags.ts` veri çalışmalarının altı kategorisinin kimliklerini ve sırasını tutar, adları ortak sözlükte `dataTags` altındadır. data sitesi süzgecini ve kartlarını, landing Veri bandının satırlarını bu listeden kurar. Aynı dosya bir kategoriye giden adresi `dataTagUrl` ile üretir ve adresteki anahtarın adını, `tag`, tek bir sabitte tutar. Landing bu adla yazar, data bu adla okur, biri değişirse öteki de değişir. Kimlikler adreste geçtiği için değiştirilirse eski bağlantılar süzgeçsiz açılır.

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

## Hero

Bütün PaktLabs sitelerinin hero'su aynı açılışı ve aynı masaüstü yerleşimini paylaşır. Ziyaretçi landing'den bir disiplin sitesine geçtiğinde ilk ekran tanıdık gelmelidir, bu yüzden ortak kısım brand'de bir kez yazılır. Bugün landing ve data bu kısmı kullanır, web ve automation siteleri kurulduğunda onların hero'ları da buradan başlar.

### Giriş animasyonu

Hero metinleri sayfa açılırken sırayla aşağıdan yükselir. Bu davranış `global.css` içindeki `.rise` sınıfıyla verilir. `.reveal`'dan farkı, elemanın ekrana girmesini beklememesidir. Animasyon sayfa açılır açılmaz başlar. Elemanın sırası `--rise-delay`, ne kadar aşağıdan geleceği `--rise-offset` ile sitenin kendi CSS modülünde verilir. Offset sıfır verilirse eleman yalnızca belirir.

```css
.title { --rise-delay: 0.12s; }
.cta   { --rise-delay: 0.5s; --rise-offset: 0px; }
```

Elemanın kendi stili son halidir. Animasyon yalnızca girişi oynatır, bittiğinde geride bir etki bırakmaz ve elemanın konumuna dokunmaz. Bu yüzden animasyon kaldırılsa da yerleşim değişmez. Son hal animasyonla tutulsaydı eleman ayrı bir çizim katmanında kalırdı ve yazının kenar yumuşatması durağan sayfadakinden farklı olurdu. Hareket azaltma tercihinde animasyon hiç oynamaz, eleman baştan son halinde görünür. Landing'in yerleşim ve görsel testleri bu tercihle çalıştığı için ölçümler animasyonun zamanlamasına bağlı kalmaz.

### Masaüstü yerleşimi

Masaüstünde metin kendi genişliğini alan bir sütunda, çizim kalan sütunda durur. İkisi de header'ın altında kalan alanın dikey ortasına hizalanır. Çizim zemine oturmadan havada durur ve sağ kenara biraz yaklaşır. Bu kurallar `styles/HeroLayout.module.css` dosyasındadır. Bir site bu dosyayı hero bileşeninde kendi stil dosyasından önce import eder ve ortak sınıfı kendi sınıfıyla birlikte verir:

```tsx
import layout from '@paktlabs/brand/styles/HeroLayout.module.css'
import styles from './Hero.module.css'

<section className={cx(layout.hero, styles.hero)}>
  <div className={cx(layout.copy, styles.copy)}>…</div>
  <figure className={cx(layout.art, styles.art)}>…</figure>
</section>
```

Sitenin `.art` sınıfı çiziminin oranını verir:

```css
.art { --art-ratio: 1600 / 900; }
```

Yerleşimin ölçüleri `tokens.css` içindeki üç değişkenden gelir. `--header-height` üst barın yüksekliğidir. Hero'nun üst boşluğu ve dikey ortalaması bu değerden hesaplanır, bar değişirse hero'lar da onunla birlikte kayar. `--hero-art-height` çizimin en fazla yüksekliğidir. `--hero-art-right-share` ise sütunda boşta kalan alanın ne kadarının çizimin sağında kalacağını belirler: 0.5 tam ortalamadır, daha küçük bir değer çizimi sağa yaklaştırır. Site yalnızca kendi çiziminin oranını `--art-ratio` ile verir, bu değer olmadan çizim kutusunun boyutu hesaplanamaz. Yazı stilleri, giriş sıraları, düğme, zemin rengi ve mobil düzen sitede kalır, çünkü her sitenin mobil kompozisyonu farklıdır.

Ortak kurallar derlenen CSS'te sitenin kendi kurallarından önce gelir, çünkü bileşen ortak dosyayı kendi stil dosyasından önce import eder. Bu yüzden site, eşit önemdeki bir kuralla ortak kuralı ezebilir. Mobil düzenler de böyle kurulur. CSS modüllerinin `composes` özelliği bu yüzden kullanılmaz: `composes` ortak kuralları onları kullanan her stil dosyasının içine ayrıca kopyalar. Bir sitede ikinci bir kullanıcı olduğunda, örneğin hero ile bulunamadı sayfası, ikinci kopya ilk kullanıcının mobil kurallarından sonra gelir ve onları sessizce ezer. Import ile ortak dosya derlemeye bir kez girer. Bu dosyada yapılan bir değişiklikten sonra landing'in testlerine ek olarak data'nın yerleşim testleri de çalıştırılır.

### Bulunamadı sayfası

Bütün sitelerin bulunamadı sayfası `components/NotFound.tsx`'tir. Metni solda, bariyere yaslanmış bir karakter çizimini sağda gösterir ve masaüstünde hero'ların yerleşimini kullanır. Ziyaretçi hangi sitede yanlış bir adrese düşerse düşsün aynı sayfayı görür, sunucunun kendi hata sayfasını görmez. Bileşen yalnızca sayfanın içeriğini çizer, üst bar, alt bilgi ve sekme başlığı sitenin kendi sayfa çerçevesinden gelir. Metinleri ortak sözlükte `notFound` altında durur.

Geri dön düğmesi ziyaretçiyi aynı sitede geldiği sayfaya götürür. Ziyaretçi adrese başka bir siteden ya da adres çubuğuna yazarak geldiyse sitenin ana sayfasına gider, böylece düğme ziyaretçiyi hiçbir zaman PaktLabs'ın dışına çıkarmaz. Önceki sayfanın aynı siteden olup olmadığı tarayıcının Navigation API'siyle, bu API'yi desteklemeyen tarayıcılarda ise önceki sayfanın adresiyle anlaşılır.

### İletişim bölümü

Bütün sitelerin ana sayfası `components/Contact.tsx` ile kapanır. Bölüm prop almaz, metinleri ortak sözlükte `contact` altında, adresleri `content/contact.ts` içinde durur, bu yüzden her sitede birebir aynı görünür. Bölümde form yoktur. Tek düğme ziyaretçiyi ana sitenin iletişim sayfasına götürür, form o sayfadadır, doğrudan yazmak isteyen için altında e-posta adresi durur. İletişim sayfası yalnızca ana sitede olduğu için adresi tam adres olarak yazılır, disiplin sitelerinden de ana siteye gider. Üst bardaki İletişim bağlantısı da aynı adresi kullanır. Telefon çizimi masaüstünde gösterilir, dar ekranda hiç indirilmez. Bölüm üst çizgisini kendisi çizer, bu yüzden hemen üstündeki bölüm alt çizgi çizmez.

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
