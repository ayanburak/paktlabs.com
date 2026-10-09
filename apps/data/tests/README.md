# data testleri

Testler landing'deki gibi Playwright ile yazılmıştır ve gerçek bir Chromium tarayıcısında, üretim derlemesine karşı çalışır. Kaydırma, font yüklemesi, panoya kopyalama ve dosya indirme gerçek tarayıcı davranışına bağlı olduğu için jsdom tabanlı bir ortam kullanılmamıştır.

## Çalıştırma

Komutlar `apps/data` klasöründe çalıştırılır, bağımlılıklar önce repo kökünde `npm ci` ile kurulur.

```bash
npx playwright install chromium   # yalnızca ilk kurulumda
npm test
```

Playwright önce `vite build` ile derleme alır ve onu `vite preview` ile 4174 portunda sunar. Landing 4173'ü kullandığı için iki sitenin testleri aynı anda çalışabilir. 4174'te başka bir sunucu açıksa eski bir derlemenin test edilmemesi için çalıştırma başlamaz, açık kalan önizleme kapatılıp komut tekrar çalıştırılır. CI her push'ta bu testleri çalıştırır.

## Dosyalar

`frame.spec.ts` üst barın Veri bağlantısını işaretlediğini, alt bilginin ana siteye döndüğünü, sekme başlığının ve açıklamanın iki dilde doğru geldiğini ve `index.html`'in JS çalışmadan önce Türkçe başlık taşıdığını denetler.

`home.spec.ts` veri sayfasının hero'sunu, teknoloji şeridini, çalışma kartlarını, süzgeci ve ortak iletişim bölümünü denetler. `layout.spec.ts` hero'nun yerleşimini, yani metnin ve çizimin üst barın altındaki alanın dikey ortasında durmasını, başlıkla çizim arasındaki boşluğu ve yatay taşmayı eşiklerin iki yanında ve iki dilde ölçer.

`routes.spec.ts` adresleri ve bulunamadı sayfasını, `scroll.spec.ts` site içi geçişlerde ve bölüm adresleri doğrudan açıldığında kaydırma konumunu denetler. Bu test fontları bilerek geciktirir.

`study.spec.ts` çalışma detay sayfasını, `source.spec.ts` kod ve veri sayfasını Demo Veri üzerinden denetler: bölüm sırası, veri dili seçimi, açılır kutular, kopyalama, indirme ve bağlantılar. `data.spec.ts` tarayıcı açmadan iki dilin CSV'lerini ve kod dosyalarını karşılaştırır, `highlight.spec.ts` kod renklendiricisini küçük örneklerle denetler.

`a11y.spec.ts` dört sayfa türünde tek bir h1 olduğunu, başlık seviyelerinin atlanmadığını, üst bar, ana içerik ve alt bilgi bölgelerinin birer kez bulunduğunu, üst bardaki adreslerin doğru yere gittiğini ve sayfada boş ya da yeni sekmede açılan bağlantı kalmadığını denetler. Otomatik bir erişilebilirlik tarayıcısı değildir, ekran okuyucuyla yapılan gerçek bir testin yerine geçmez.

`support.ts` sayfayı istenen dil tercihiyle açan ve fontların yüklenmesini bekleyen yardımcıları ve iki sitenin sözlüklerini birleştiren `dict`'i taşır. Beklenen adresler testlerde elle yazılıdır, uygulamanın kendi adres dosyasından okunmaz, böylece yanlış yazılmış bir adres testi de geçirmez.

## Kapsam dışında kalanlar

Görsel karşılaştırma testleri yoktur. Veri sayfasındaki öne çıkan kartın bölgesi koşudan koşuya birkaç yüz piksellik çizim farkı verir, logo maskesi de üst bar yazılarında gözle görünmeyen kenar yumuşatma farkları yaratır. Sıfır toleranslı bir görsel test bu yüzden yanlış alarm üretir, önce bu farkın sebebi bulunmalıdır. Görünüm değişikliklerinde şimdilik önce ve sonra görüntüleri elle karşılaştırılır.

Landing'deki depolama hatalarıyla ilgili dil testleri burada tekrarlanmaz, çünkü dil katmanı iki sitede ortaktır ve landing'de denetlenir. Firefox, WebKit ve gerçek cihaz testi yoktur.
