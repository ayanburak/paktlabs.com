# data.paktlabs.com

Bu klasör, PaktLabs'ın veri disiplini için ayrılmış `data.paktlabs.com` adresinin kaynağıdır. Landing ile aynı repoda, `apps/data` olarak durur ve üst barını, alt bilgisini, renklerini ve dil davranışını landing'le birlikte `packages/brand` paketinden alır. Landing sayfası `paktlabs.com` alan bağımsızdır ve web, otomasyon ve veri olmak üzere üç disipline yönlendirir. Veri kartı, veri bandı ve menüdeki Veri bağlantısı bu adrese gelir. Landing'in genel mesajı burada derinleşir: hangi veri işlerinin yapıldığı, nasıl yapıldığı ve sonuçlarının ne olduğu tamamlanmış çalışmalar üzerinden gösterilir.

Belge üç şeyi tanımlar: bu sitenin neden var olduğunu, sayfalarının hangi içeriği taşıdığını ve bu içeriğin hangi dil ve tasarım kurallarıyla yazıldığını. Kuralların çoğu ilk çalışma detay sayfası tasarlanırken, mockup üzerinde yapılan düzeltmelerden çıkarıldı. Her kuralın yanında gerekçesi de yazılıdır, çünkü yeni bir sayfa yazılırken kuralın kendisinden çok gerekçesi yol gösterir.

## Amaç

Sayfanın asıl okuru teknik biridir: bir veri analisti, bir mühendislik yöneticisi ya da veri işi yaptırmak isteyen bir firmanın teknik sorumlusu. Bu okur pazarlama cümlesine değil kanıta güvenir. Site bu yüzden bir hizmet broşürü gibi değil, tamamlanmış işlerin teknik raporları gibi kurulur. Her çalışma sayfası bir sorunu, eldeki veriyi, çözümün nasıl kurulduğunu, sonucun nasıl ölçüldüğünü ve çözümün nerede yetersiz kaldığını anlatır.

Teknik okur hedeflenmesi okurun bilgiye boğulabileceği anlamına gelmez. Sayfaya giren biri önce hızlıca kaydırır, bakınır, ancak ilgisini çeken bir yer olursa durup okur. İçerik bu davranışa göre katmanlanır: ilk katmanda düz dille yazılmış kısa anlatım, ikinci katmanda okurun kendisi açtığında görünen ayrıntı, üçüncü katmanda ayrı bir sayfada kodun ve verinin kendisi bulunur.

## Sayfa türleri

Site üç tür sayfadan oluşur. Üçü de landing ile aynı üst barı ve alt bilgiyi kullanır. Üst barda Veri bağlantısı bulunulan disiplin olarak kalın ve altı çizili durur.

### Veri sayfası

Sitenin girişidir. Açılışta ekranı kaplayan bir hero bulunur, solda büyük "Veri" kelimesi, kısa bir açıklama ve üç kısa ölçü, sağda havada duran bir illüstrasyon yer alır. Metinler mockup'taki gibi lorem ipsum'dur. Mockup'taki dikey tek figürün yerine dört sahneli yatay bir çizim kullanılır, bu yüzden yerleşim landing hero'sunun kalıbını izler: metin kendi genişliğini alır, çizim kalan alana sığar ve dikeyde ortalanır, mobilde metnin altında içerik genişliğinin tamamını kaplar. Boyutu ve oranı `Hero.module.css` içinde `--art-height` ve `--art-ratio` ile tek yerden ayarlanır. Üç ölçü aşağıdaki sayı kutusu kuralıyla çelişir. Mockup'taki tasarım canlıda sınandığı için şimdilik duruyorlar, gerçek içerik yazılırken kuralla birlikte yeniden ele alınırlar. Altında kullanılan teknolojilerin logolarının aktığı bir şerit, ardından çalışmaların listesi gelir. Şeritteki ürün adları iki dilde aynı kaldığı için sözlükte değil `src/content/techStack.ts` içinde durur. Çalışmalar landing'deki altın renkli disiplin bandının içinde, iki kutulu kartlar olarak dizilir: üst kutuda numara ve başlık, alt kutuda kısa açıklama, etiketler ve bağlantı. Listenin üstündeki süzgeç, çalışmaları etiketlerine göre ayırır. Sayfa bir iletişim bölümüyle kapanır. Bu bölümde yalnızca e-posta bağlantısı bulunur. Mockup'taki landing formuna giden düğme kaldırıldı, çünkü o formun gönder düğmesi ortak iletişim servisi kurulana kadar işlem yapmaz.

### Çalışma detay sayfası

Bir kartın açtığı sayfadır ve sitenin asıl içeriğini taşır. Sayfanın sırası şöyledir.

Kapak açılan ekranın tamamını kaplar. Landing ve veri sayfasındaki hero'lar gibi tam genişliktedir: sol kenarda geri dönüş bağlantısı, etiketler, başlık ve tek cümlelik açıklama, sağ kenarda künye bulunur. Künye sektör, süre, girdi ve teslim satırlarını alt alta dizer, satırlar arasında kalın çizgiler vardır. Detay sayfasının kapağında maskot ya da karakter illüstrasyonu kullanılmaz, karakterler veri sayfasına ve landing'e aittir.

Kapağın altında üç sütunlu bir özet bandı yer alır: Sorun, Yaklaşım ve Sonuç. Her biri iki üç cümledir. Sayfayı yalnızca kaydırıp geçen okur bu bandı okuyarak işin tamamını anlar.

Gövde solda sabit duran içindekiler ve sağda numaralı bölümlerden oluşur. İçindekiler okurun hangi bölümde olduğunu gösterir, soldaki dikey çizgi okuma ilerledikçe altınla dolar. Dar ekranda içindekiler sayfanın üstüne yapışan ince bir bara dönüşür. Bölümler genellikle şu sırayı izler: sorun, eldeki veri, çözüm hattı, sonuçların şekillerle gösterildiği bölüm, verilen kararlar, teslim ve takvim, sonuç ve sınırlar. Bir işin doğası farklı bir sıra gerektiriyorsa sıra değişebilir.

Bölümler bittikten sonra bir "Meraklısına" kartı kod ve veri sayfasına bağlanır. Altında sayfayı hazırlayan kişinin adını, e-posta adresini ve profil fotoğrafını taşıyan siyah zeminli bir yazar kutusu bulunur. Sayfa, diğer çalışmalara geçişin bulunduğu bir kapanış bölümüyle biter.

### Kod ve veri sayfası

Detay sayfasındaki "Meraklısına" kartının açtığı sayfadır. Detay sayfası kodu göstermez, çünkü kod okumak zordur ve sayfanın asıl okuru her zaman kod okumak istemez. Kodu ve ham veriyi görmek isteyen okur bu sayfaya kendi isteğiyle gelir. Bu yüzden burada kod ve veri açık durur, açılır kutu kullanılmaz.

Sayfa detay sayfasıyla aynı iskeleti kullanır: tam ekran kapak, sağda künye, solda içindekiler. Künye dili, kütüphaneleri, veritabanını ve paylaşılan dosya sayısını gösterir. Bölümler detay sayfasındaki adımlarla aynı sırayı izler. İlk bölümde deponun dosya ağacı bulunur ve bu sayfada paylaşılan dosyalar işaretlidir. Sonraki bölümlerde her adımın kod dosyası satır numaralarıyla, dosya yoluyla ve sade bir renklendirmeyle gösterilir. Bir değerlendirme komutu varsa çıktısı da verilir ve bu çıktıdaki sayılar detay sayfasındaki sayılarla birebir aynıdır. Son bölümde veri örnekleri bulunur. Her dosyanın tam önizlemesi ve çalışan bir indirme bağlantısı vardır, dosyaların içeriği detay sayfasındaki tabloların ham halidir.

Bu sayfadaki kod da PaktLabs'ın kod yazım stiliyle yazılır: tanımlayıcılar İngilizce, yorumlar Türkçe, modülün başında kullanım açıklaması, altında geliştirici notları. Paylaşılan kod okunabilsin diye kısaltılabilir, bu durum sayfanın girişinde belirtilir.

Firmanın paylaşılmasına izin vermediği bir kod ya da veri yayınlanmaz. İzin verilen kısım paylaşılırken firma adı, tedarikçi adları ve fiyat gibi alanlar gerektiğinde değiştirilir ve bu değişiklik sayfada belirtilir.

## İçerik ilkeleri

### Ayrıntı, okur istediğinde değerlidir

Bütün içerik kurallarının altında tek bir ilke yatar. Aynı bilgi, okurun kendisi istediği yerde değerlidir, istemeden önüne konduğu yerde gürültüdür. Örneğin bir dosyanın hangi karakter kodlamasıyla kaydedildiği, okurun butonla açtığı ham veri tablosunun altında yerindedir, çünkü okur gerçek veriye bakmaya karar vermiştir. Aynı bilgi herkesin karşısına kendiliğinden çıkan bir tabloda yer aldığında okura hiçbir şey anlatmaz. Bir bilgi sayfaya konmadan önce okurun onu kendisinin mi istediği, yoksa bir anda mı aktarıldığı sorulur.

### Sayılar

Bağlamı olmayan sayı kullanılmaz. Neyi kanıtladığı belli olmayan, kayıt sayısı ya da satır sayısı gibi yalnızca hacim gösteren sayılar sayfadan çıkarılır. Açıkta duran bir sayı bir cümlenin içinde ve yuvarlanmış olarak geçer: "yaklaşık 184 bin kayıt 86 bin ürüne indi" gibi. Kesin sayılar ve tablolar okurun açtığı ayrıntıya ya da bir şeklin içine aittir. Bir sayıyı tek başına büyük puntoyla gösteren sayı kutuları kullanılmaz. Kapalı bir açılır kutunun başlığında da sayı bulunmaz, çünkü o başlık da okurun karşısına kendiliğinden çıkar.

Sayfalardaki her sayı tutarlı olmalıdır. Bir sayfadaki tablo, şekil ve metin aynı veriden gelir, biri değişirse diğerleri de değişir. Tahmin olan bir sayı tahmin olarak yazılır, kesin bir sayım gibi sunulmaz. Az sayıda örnek üzerinden ölçülmüş bir oranın yanında belirsizlik payı verilir. Bir işin yetersiz kaldığı yerler bir "Bilinen sınırlar" bölümünde açıkça anlatılır.

### Terimler ve kısaltmalar

Sektöre ya da alana özel kısaltma düz metinde kullanılmaz. Teknik bir okur bile başka bir sektörün jargonunu bilmeyebilir. Bu yüzden EAN yerine barkod, Cohen kappa yerine "iki kişi aynı çiftleri ayrı ayrı işaretledi ve büyük ölçüde aynı kararları verdi" denir. Bir terim gerçekten gerekiyorsa cümlenin içinde düz dille açıklanır. Gerçek kodda ve gerçek dosya alan adlarında kısaltma olduğu gibi kalır, okur onları kod olarak okur.

### Başlıklar

Başlıklar slogan olmaz. "Dört katalog, tek ürün listesi" ya da "Tek eşik yerine iki eşik" gibi ritmik, karşıtlık kuran ya da iki noktayla ikiye bölünmüş başlıklar şablon üretimi izlenimi verir ve teknik okurun ilgisini çekmez. Detay sayfasının başlığı firma adı ve yapılan işten oluşur. İlk çalışma bu kuralın tek istisnasıdır: mockup aşamasında sayfa tasarımını sınamak için yazılmış kurgusal bir iştir ve gerçek bir müşteri işi gibi görünmesin diye firma adı yerine "Demo Veri" adıyla yayınlanır. Sayıları birbirini tutar ama gerçek bir firmadan gelmez. Bölüm ve adım başlıkları da düzdür: Doğrulama, Normalizasyon, Kümeleme gibi.

### Etkileşim

Sunum durağandır. Sürgüyle değiştirilen grafikler, sekmeler, üzerine gelince açılan terim balonları gibi öğeler kullanılmaz. Gösterişli görünseler de sayfaya üretilmiş bir vitrin havası verir ve okuyucuyu içerikten uzaklaştırırlar. Kalan tek etkileşim açılır kutudur ve yalnızca ayrıntıyı ilk katmandan ayırmak için kullanılır. Kural iki istisna taşır. Kod sayfasında kod bloklarının kopyalama düğmesi bulunur. Veri sayfasının teknoloji şeridinde ise üzerine gelinen logonun adı küçük bir kutuda açılır. Bu kutu bir terimi açıklamaz, yalnızca logonun hangi araca ait olduğunu söyler. Bir logo herkes tarafından tanınmayabileceği için Burak'ın kararıyla kalır.

### Tekrar eden bloklar

Bir sayfada art arda gelen bloklar birebir aynı kalıba sokulmaz. Örneğin altı adımın her birinde üç sayı, iki paragraf ve bir "neden böyle" kutusu bulunması, içerik değil şablon okunduğu hissi verir. Gerekçe yalnızca anlatılacak bir şey olan yerde yazılır. Bir adımın ayrıntısı üç paragraf, bir diğerininki tek paragraf olabilir.

### Gerçek görsel yoksa çizim yok

Gerçek bir ekran görüntüsünün yerine HTML ile çizilmiş sahte bir arayüz, örneğin iki kaydı ve klavye tuşlarını gösteren bir inceleme ekranı kullanılmaz. Gerçek görsel yoksa yerine gerçek bir veri kesiti, örneğin inceleme kararlarının kaydı, açılır kutuda verilir.

### Ham veri tabloları

Ham veri, hesap tablosu programlarına yakın bir görünümle gösterilir: dosya adı, ad kutusu, formül çubuğu, sütun harfleri, satır numaraları, filtre okları ve alt kenarda sayfa sekmeleri. Tablonun yazısı marka fontu değil, hesap tablosu programlarının varsayılan fontudur. Tablo gerçek bir dışa aktarımın kesiti gibi görünmelidir. Bozuk Türkçe harfler, farklı ondalık ayıraçlar ve boş kod alanları gibi kaynak kusurları düzeltilmeden bırakılır ve tablonun altındaki notta açıklanır. Formül çubuğunda gerçek bir formül ya da hücrenin gerçek değeri durur. Formül yazılıyorsa Türkçe Excel'de geçerli bir fonksiyon olmalıdır, örneğin TOPLA. Bir veri analisti yanlış bir fonksiyon adını hemen fark eder.

Ham verinin önce ve sonra halleri iki ayrı açılır kutuda verilir. Böylece okur bir işin veriyi nasıl dönüştürdüğünü kendisi karşılaştırabilir.

### Şekiller

Sonuçların gösterildiği bölüm sayfanın en yoğun yeridir ve sayıların çoğu orada bir şeklin içinde anlam kazanır. Her şekil tek bir soruya cevap verir. Şeklin üstünde başlığı ve tek cümlelik okuması, altında verisinin Excel görünümündeki tablosu ve ayrıntılı anlatımı açılır bir kutuda bulunur.

Şekiller ilk bakışta okunabilir olmalıdır. Aynalanmış histogram, kırık eksen ya da kısaltılmış bölge etiketi gibi okumayı zorlaştıran çizimler kullanılmaz. Eksen sıfırdan başlar ve kesilmez. Birbirine yakın değerler sıfır tabanlı eksende ayırt edilemiyorsa, bulunan eşleşme oranı yerine kaçırılan eşleşme oranı gibi aynı bilgiyi farkı görünür kılan bir ölçü seçilir. Az örnek içeren dilimler gürültü yaratıyorsa dilimler birleştirilir ve mümkünse karar eşiklerine hizalanır. Değerler çubuğun hemen ucuna yazılır. Bölgeler tam kelimelerle adlandırılır. Şekiller HTML ve CSS ile çizilir, çünkü ölçeklenen bir SVG içindeki yazı dar ekranda okunmayacak kadar küçülür.

### Hata analizi

Bir işin yanıldığı yerler gizlenmez, kanıtıyla gösterilir. Modelin yanlış birleştirdiği ya da kaçırdığı kayıtlar gerçek satırlarıyla verilir ve bunun üzerine yapılan düzeltme anlatılır. Teknik okurun güvenini en çok kazandıran şey, başarı oranından çok hatanın dürüstçe açıklanmasıdır.

## Yazım dili

Metinler PaktLabs'ın marka sesiyle "biz" diliyle yazılır. Dil sade ve Türkçedir. Cümleler kısa tutulur, pazarlama sıfatları kullanılmaz. Bir sonucun büyüklüğü sıfatla değil, bağlamıyla verilen bir sayıyla anlatılır.
Bir yazım yönergesi metnin içine taşınmaz. Metin kendisini anlatmaz, "bu bölümde sade bir dille anlatılmıştır" gibi cümleler kurulmaz.

Kod tarafında koda bağlanan her şey İngilizcedir: değişken, fonksiyon, sınıf, dosya ve klasör adları. Yorumlar, docstring'ler, arayüz metinleri ve belgeler Türkçedir.

## Tasarım dili

Tasarım dili landing sayfasından gelir ve elle yazılır. Mockup'lar saf HTML ile yazıldığı için landing'le her noktada uyuşmaz, ikisi ayrıştığında sayfa düzeni ve ölçüler için canlıdaki landing esas alınır. Tailwind veya benzeri bir utility CSS framework'ü kullanılmaz, çünkü sitenin kendine ait, şablonla tekrar üretilemeyen bir görünümü olmalıdır.

### Renkler ve fontlar

Renkler `packages/brand/styles/tokens.css` dosyasından gelir, landing de aynı dosyayı kullanır. data kendi stillerinde renk sabiti yazmaz, aşağıdaki değişkenleri kullanır.

| Değişken | Değer | Kullanım |
| --- | --- | --- |
| `--paper` | `#e9e8e0` | sayfa zemini |
| `--surface` | `#f2f1ea` | kutu içleri, alt bilgi |
| `--panel` | `#dcdbd0` | bant zeminleri |
| `--ink` | `#2d3037` | metin, çizgi, koyu kutular |
| `--muted` | `#565a62` | ikincil metin |
| `--faint` | `#52626e` | küçük etiketler |
| `--gold` | `#e5b32e` | vurgu, ilerleme, seçili durum |
| `--gray` | `#7e909e` | dekoratif çizgiler, etiket çerçeveleri |

Başlıklarda Space Grotesk, gövde metninde Atkinson Hyperlegible, küçük etiketlerde, numaralarda ve kodda IBM Plex Mono kullanılır. Üst etiketler büyük harfli, geniş harf aralıklı ve mono fontludur.

### Biçim

İçerik genişliği landing'in `--maxw` değeridir, mockup'lardaki 1180 piksel kullanılmaz. Kenar boşlukları da landing'deki `clamp(20px, 4vw, 56px)` değeridir. Bölümler iki piksellik mürekkep çizgilerle ayrılır. Köşeler düzdür. Kartlar iki ayrı kutudan oluşur: üstte başlık kutusu, aralarında altı piksellik bir boşluk, altta içerik kutusu. Bağlantı olan kartlar hover'da üç piksel kalkar ve altına sert bir gölge düşer. Altın renk vurgu içindir, zemin olarak yalnızca veri sayfasındaki çalışma bandında kullanılır.

Bu öğeler bir sayfada her bloğa uygulanırsa sayfa marka öğeleriyle dolar ve içerik geri planda kalır. Kutu, mono etiket ve sert gölge vurgu olarak az kullanılır, gövde metni çoğunlukla kâğıt zemin üzerinde düz akar.

Figürlerin ayaklarının bölüm çizgisine oturması landing'den gelen genel kuraldır ama her sayfa için geçerli değildir. Bir figür havada duracak şekilde çizildiyse havada durur. Veri sayfasının hero çizimi böyledir, sahneler ekranın dikey ortasında, çizgiden uzakta durur.

Henüz çizilmemiş illüstrasyonlar kesikli çizgili boş alanlar olarak bırakılır, alanın içinde hangi çizimin önerildiği yazar. Bu alanlar yayında da görünür, çizim gelene kadar sayfa bilerek bu haliyle durur. Çizim hazır olunca alanın yerine tek bir `img` konur, alanın oranı değişmez.

### Tarayıcı uyumu

Medya sorguları klasik `min-width` ve `max-width` biçiminde yazılır. Range sözdizimi ve `@container` kullanılmaz, çünkü eski Safari sürümleri bu kuralların tamamını sessizce yok sayar. Aynı nedenle derleme sırasında CSS küçültme kapalı tutulur, varsayılan küçültücü klasik sorguları range sözdizimine çevirir.

## Dil desteği

Site landing gibi Türkçe ve İngilizcedir. Metinler kod içinde düz string olarak değil, iki dilin sözlüğünde anahtar olarak tutulur. Üst bar ve alt bilgi gibi ortak metinler brand paketinin sözlüğündedir, sayfa metinleri `src/i18n/tr.json` ve `en.json` dosyalarında sayfa sayfa bölünmüş durur. Çalışmaların metni ise sözlükte değil, kendi içerik dosyalarındadır, bu belgede aşağıda anlatılır. Sayfada her zaman görünür bir TR ve EN değiştiricisi bulunur. Bir çalışma sayfası yayına alınmadan önce iki dilde de yazılır.

## Teknik yapı

Site React, Vite ve TypeScript ile yazılır, statik olarak derlenir ve nginx tarafından sunulur. Vite, TypeScript ve Playwright ayarları landing'inkilerin aynısıdır, böylece iki sitenin derleme ve test koşulları birbirinden ayrışmaz. Tek fark portlardır: geliştirme sunucusu 5174, testlerin kullandığı sunucu 4174 portunda çalışır. Landing 5173 ve 4173 portlarını kullandığı için iki site aynı anda açılabilir, testleri aynı anda çalışabilir.

Her sayfa `src/components/Page.tsx` çerçevesiyle kurulur. Çerçeve üst barı Veri bağlantısı işaretli olarak, içerik alanını ve paktlabs.com'a dönen bağlantısıyla alt bilgiyi yerleştirir, sekme başlığını günceller. Sayfa yalnızca kendi bölümlerini ve metnini verir.

### Rotalar

Sitede üç adres bulunur. `/` veri sayfasıdır. `/work/<slug>` bir çalışmanın detay sayfası, `/work/<slug>/source` aynı çalışmanın kod ve veri sayfasıdır. Adreste bilinmeyen bir yol, bilinmeyen bir çalışma ya da kod sayfası olmayan bir çalışma varsa sitenin kendi bulunamadı sayfası gösterilir.

Site tek sayfalık bir uygulama olarak sunulur. nginx bilinmeyen her yolda `index.html` döndürür ve hangi sayfanın gösterileceğine tarayıcıdaki uygulama karar verir. Bu yüzden bulunamadı sayfası da HTTP 200 koduyla gelir. Arama motorları bunu gerçek bir 404 olarak görmez. Bu bilinen bir sınırdır, sayfalar derleme sırasında önceden üretilirse kaldırılabilir.

### Çalışmaların içeriği

Her çalışma `src/content/studies/<slug>/` klasöründe durur. `index.ts` dilden bağımsız alanları tutar: adresteki slug, listedeki numara, yıl ve filtre etiketleri. `tr.ts` ve `en.ts` aynı tipte iki dilin metnini tutar. Metinler JSON yerine TypeScript dosyalarında yazılır, çünkü bir çalışma düz metinden ibaret değildir. Tablolar, şekiller ve hat istasyonları gibi blokların her birinin kendi alanları vardır ve TypeScript bu alanları derleme sırasında denetler. Bir dilde eksik kalan alan derleme hatası verir.

Kod ve veri sayfası her çalışmada olmayabilir, çünkü firmanın paylaşılmasına izin vermediği kod yayınlanmaz. Sayfa varsa iki dilde birden yazılır, tek dilde yazılmış bir kod sayfası derleme hatası verir. Yeni bir çalışma kendi klasöründe yazılır ve `src/content/studies/index.ts` içindeki listeye numara sırasıyla eklenir.

### Komutlar

Bağımlılıklar repo kökünde kurulur, lint de kökte bütün repoyu tek seferde tarar. Uygulama komutları bu klasörde çalıştırılır.

```bash
npm ci                 # repo kökünde
npm run lint           # repo kökünde
cd apps/data
npm run dev            # http://localhost:5174
npm run typecheck
npm run build          # dist/ klasörüne üretim derlemesi
npx playwright install chromium   # yalnızca ilk kurulumda
npm test
```

Testler landing'deki gibi üretim derlemesine karşı çalışır. Üst bar ve alt bilginin data'ya doğru bağlandığını, sayfa başlıklarını iki dilde, rotaları ve bulunamadı davranışını kontrol eder.

### İletişim formu

Bu sitenin kendine ait bir backend'i yoktur. İletişim formu gerektiğinde landing ile disiplin sitelerinin paylaşacağı tek bir servis kurulur, bir siteye özel bir servis yazılmaz. Bu servis kurulana kadar landing'deki formun gönder düğmesi bilerek işlem yapmaz, bu yüzden data'dan o forma yönlendirmek ziyaretçiyi çalışmayan bir düğmeye götürür.

Veri işlerini gösteren çalışan bir uygulama bu repoya girmez. Uygulama kendi reposunda yazılır, sunucuda kendi servisi olarak çalışır ve bu siteden yalnızca bağlantıyla açılır.

## Yayın

Site landing'deki atomik sürüm düzeniyle yayınlanır: paket commit'lenmiş kaynaktan temiz bir ortamda üretilir, sunucuda sürüm klasörüne açılır ve canlı dizin tek bir symlink geçişiyle yeni sürüme çevrilir. Böylece ziyaretçi hiçbir anda yarım kopyalanmış bir sürüm görmez ve eski sürüme dönüş dosya kopyalamadan yapılabilir. İlk yayın 2026-10-08'de yapıldı.

```bash
scripts/build-release.sh data                                  # repo kökünde
scripts/deploy-release.sh data release/data-<zaman>-<commit>.tar.gz
scripts/rollback-release.sh data                               # sürümleri listeler
scripts/rollback-release.sh data <sürüm>                       # o sürüme döner
```

nginx bilinmeyen yollarda `index.html` döndürür, böylece bir çalışmanın adresi doğrudan açılabilir. Landing'deki gibi hazır sıkıştırılmış dosyalar sunulur, hash'li dosyalar bir yıl önbelleğe alınır, `index.html` her ziyarette yeniden doğrulanır. Sunucu tarafındaki kurulum ayrı bir altyapı belgesinde tutulur.

## Tasarım referansları

Sayfaların onaylı görünümü üç mockup dosyasında durur: veri sayfası için `data.html`, çalışma detay sayfası için `detail.html`, kod ve veri sayfası için `detail-source.html`. Bu dosyalar repo dışında, Burak'ın bilgisayarında tutulur. Yeni bir sayfa ya da bileşen yazılırken önce bu mockup'lardaki karşılığına bakılır. Mockup ile canlıdaki landing sayfa düzeni ya da ölçüde ayrıştığında landing esas alınır. Bu belgedeki kurallar mockup'larla çelişirse önce hangisinin doğru olduğu netleştirilir.
