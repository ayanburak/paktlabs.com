# data.paktlabs.com

Bu klasör, PaktLabs'ın veri disiplini için ayrılmış `data.paktlabs.com` adresinin kaynağıdır. Landing ile aynı repoda, `apps/data` olarak durur ve üst barını, alt bilgisini, renklerini ve dil davranışını landing'le birlikte `packages/brand` paketinden alır. Landing sayfası `paktlabs.com` alan bağımsızdır ve web, otomasyon ve veri olmak üzere üç disipline yönlendirir. Veri kartı, veri bandı ve menüdeki Veri bağlantısı bu adrese gelir. Landing'in genel mesajı burada derinleşir: hangi veri işlerinin yapıldığı, nasıl yapıldığı ve sonuçlarının ne olduğu tamamlanmış çalışmalar üzerinden gösterilir.

Belge üç şeyi tanımlar: bu sitenin neden var olduğunu, sayfalarının hangi içeriği taşıdığını ve bu içeriğin hangi dil ve tasarım kurallarıyla yazıldığını. Kuralların çoğu ilk çalışma detay sayfası tasarlanırken, mockup üzerinde yapılan düzeltmelerden çıkarıldı. Her kuralın yanında gerekçesi de yazılıdır, çünkü yeni bir sayfa yazılırken kuralın kendisinden çok gerekçesi yol gösterir.

## Amaç

Sayfanın asıl okuru teknik biridir: bir veri analisti, bir mühendislik yöneticisi ya da veri işi yaptırmak isteyen bir firmanın teknik sorumlusu. Bu okur pazarlama cümlesine değil kanıta güvenir. Site bu yüzden bir hizmet broşürü gibi değil, tamamlanmış işlerin teknik raporları gibi kurulur. Her çalışma sayfası bir sorunu, eldeki veriyi, çözümün nasıl kurulduğunu, sonucun nasıl ölçüldüğünü ve çözümün nerede yetersiz kaldığını anlatır.

Teknik okur hedeflenmesi okurun bilgiye boğulabileceği anlamına gelmez. Sayfaya giren biri önce hızlıca kaydırır, bakınır, ancak ilgisini çeken bir yer olursa durup okur. İçerik bu davranışa göre katmanlanır: ilk katmanda düz dille yazılmış kısa anlatım, ikinci katmanda okurun kendisi açtığında görünen ayrıntı, üçüncü katmanda ayrı bir sayfada kodun ve verinin kendisi bulunur.

## Sayfa türleri

Site üç tür sayfadan oluşur. Üçü de landing ile aynı üst barı ve alt bilgiyi kullanır. Üst barda Veri bağlantısı bulunulan disiplin olarak kalın ve altı çizili durur.

### Veri sayfası

Sitenin girişidir. Açılışta ekranı kaplayan bir hero bulunur, solda büyük "Veri" kelimesi, kısa bir açıklama ve üç kısa ölçü, sağda havada duran bir illüstrasyon yer alır. Metinler mockup'taki gibi lorem ipsum'dur. Mockup'taki dikey tek figürün yerine dört sahneli yatay bir çizim kullanılır, bu yüzden yerleşim landing hero'sunun kalıbını izler: metin kendi genişliğini alır, çizim kalan alana sığar ve dikeyde ortalanır, mobilde metnin altında içerik genişliğinin tamamını kaplar. Masaüstü yerleşimi landing'le ortaktır ve brand'deki `HeroLayout.module.css` dosyasından gelir. Çizimin en fazla yüksekliği ve sağa yaklaşma oranı brand'in `tokens.css` dosyasında `--hero-art-height` ve `--hero-art-right-share` olarak, hero'nun üst boşluğunu belirleyen üst bar yüksekliği de `--header-height` olarak iki site için ortak tutulur. Bu sitenin `Hero.module.css` dosyası yalnızca çizimin oranını `--art-ratio` ile verir, çizim değiştiğinde güncellenen tek değer budur. Üç ölçü aşağıdaki sayı kutusu kuralıyla çelişir. Mockup'taki tasarım canlıda sınandığı için şimdilik duruyorlar, gerçek içerik yazılırken kuralla birlikte yeniden ele alınırlar. Altında kullanılan teknolojilerin logolarının aktığı bir şerit, ardından çalışmaların listesi gelir. Şeritteki ürün adları iki dilde aynı kaldığı için sözlükte değil `src/content/techNames.ts` içinde durur, şeridin sırası da bu listenin sırasıdır. Logolar tek renk kömürdür. Üzerine gelinen kare koyulaşır ve logo altına döner. Her logonun tek bir dosyası vardır ve dosya yalnızca logonun şeklini verir, rengini site verir. `src/components/TechLogo.tsx` dosyayı bir kalıp gibi kullanıp sitenin rengiyle boyar. Bu yüzden altın ya da kömür için ayrı dosya tutulmaz, renkler değişirse logolar da `tokens.css` ile birlikte değişir. Çalışma kartlarındaki küçük logolar da aynı bileşenle çizilir. Yeni bir araç eklenirken logosu `src/assets/stack/` altına tek renkli ve zemini boş bir SVG olarak konur, adı `techNames.ts`'e, dosyası `techStack.ts`'e yazılır. Çok renkli bir logo bu yolla boyanamaz, tek renge çevrilerek eklenir. Çalışmalar landing'deki altın renkli disiplin bandının içinde, iki kutulu kartlar olarak dizilir: üst kutuda numara ve başlık, alt kutuda kısa açıklama, etiketler ve bağlantı. Listenin üstündeki süzgeç, çalışmaları etiketlerine göre ayırır. Sayfa, landing'le birebir aynı olan ortak iletişim bölümüyle kapanır. Bölüm brand paketindedir: ana sitenin iletişim sayfasına giden bir düğme, altında e-posta adresi ve telefonla konuşan karakter çizimi. Bölüm üst çizgisini kendisi çizdiği için üstündeki altın bant alt çizgi çizmez.

### Çalışma detay sayfası

Bir kartın açtığı sayfadır ve sitenin asıl içeriğini taşır. Sayfanın sırası şöyledir.

Kapak açılan ekranın tamamını kaplar. Landing ve veri sayfasındaki hero'lar gibi tam genişliktedir: sol kenarda geri dönüş bağlantısı, etiketler, başlık ve tek cümlelik açıklama, sağ kenarda künye bulunur. Künye sektör, süre, girdi ve teslim satırlarını alt alta dizer, satırlar arasında kalın çizgiler vardır. Detay sayfasının kapağında maskot ya da karakter illüstrasyonu kullanılmaz, karakterler veri sayfasına ve landing'e aittir.

Kapağın altında üç sütunlu bir özet bandı yer alır: Sorun, Yaklaşım ve Sonuç. Her biri iki üç cümledir. Sayfayı yalnızca kaydırıp geçen okur bu bandı okuyarak işin tamamını anlar.

Gövde solda sabit duran içindekiler ve sağda numaralı bölümlerden oluşur. İçindekiler okurun hangi bölümde olduğunu gösterir, soldaki dikey çizgi okuma ilerledikçe altınla dolar. Dar ekranda içindekiler sayfanın üstüne yapışan ince bir bara dönüşür. Bölümler genellikle şu sırayı izler: sorun, eldeki veri, çözüm hattı, sonuçların şekillerle gösterildiği bölüm, verilen kararlar, teslim ve takvim, sonuç ve sınırlar. Bir işin doğası farklı bir sıra gerektiriyorsa sıra değişebilir.

Bölümler bittikten sonra bir "Meraklısına" kartı bulunur. Firma kodun açık kaynak olarak yayınlanmasına izin verdiyse kart yalnızca GitHub'daki depoya, vermediyse sitedeki kod ve veri sayfasına bağlanır. Altında sayfayı hazırlayan kişinin adını, e-posta adresini ve profil fotoğrafını taşıyan siyah zeminli bir yazar kutusu bulunur, kutu ana sitedeki profil sayfasına bağlanır. Sayfa, tüm çalışmalara ve varsa sonraki çalışmaya geçişin bulunduğu bir kapanış bölümüyle biter. Sonraki çalışma listede bu çalışmadan sonra gelen ilk gerçek çalışmadır, yer tutucular atlanır, başka gerçek çalışma yoksa yalnızca tüm çalışmalara dönüş kartı görünür.

### Kod ve veri sayfası

Detay sayfasındaki "Meraklısına" kartının açtığı sayfadır. Detay sayfası kodu göstermez, çünkü kod okumak zordur ve sayfanın asıl okuru her zaman kod okumak istemez. Kodu ve ham veriyi görmek isteyen okur bu sayfaya kendi isteğiyle gelir. Bu yüzden burada kod ve veri açık durur, açılır kutu kullanılmaz.

Sayfa detay sayfasıyla aynı iskeleti ve aynı bileşenleri kullanır: tam ekran kapak, sağda künye, solda içindekiler, numaralı bölümler ve yazar kutusu. Özet bandı ve kapanış bölümü yoktur, sayfa çalışmaya dönüş kartıyla biter. Kapaktaki etiketler çalışmanın konu etiketleri değil, kodun yazıldığı araçlardır. Künye dili, kütüphaneleri, veritabanını ve paylaşılan dosya sayısını gösterir. Kod ve veri açık durduğu için içindekilerin altında okuma süresi yerine bunu söyleyen bir not bulunur. Bölümler detay sayfasındaki adımlarla aynı sırayı izler. İlk bölümde deponun dosya ağacı bulunur, paylaşılan dosyalar altınla, paylaşılmayanlar soluk işaretlidir. Sonraki bölümlerde her adımın kod dosyası satır numaralarıyla, dosya yoluyla ve sade bir renklendirmeyle gösterilir. Bir değerlendirme komutu varsa çıktısı da verilir ve bu çıktıdaki sayılar detay sayfasındaki sayılarla birebir aynıdır. Son bölümde veri örnekleri bulunur. Her dosyanın tam önizlemesi ve çalışan bir indirme bağlantısı vardır, dosyaların içeriği detay sayfasındaki tabloların ham halidir. Satır sayısı, sütun sayısı, dosya boyutu ve kodun dili elle yazılmaz, dosyanın kendisinden ve uzantısından hesaplanır.

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
| `--gold-wash` | altının kâğıda karışmış açık tonu | şekillerde vurgulu bölgenin zemini |
| `--gray` | `#7e909e` | dekoratif çizgiler, etiket çerçeveleri |

Başlıklarda Space Grotesk, gövde metninde Atkinson Hyperlegible, küçük etiketlerde, numaralarda ve kodda IBM Plex Mono kullanılır. Üst etiketler büyük harfli, geniş harf aralıklı ve mono fontludur.

### Biçim

İçerik genişliği landing'in `--maxw` değeridir, mockup'lardaki 1180 piksel kullanılmaz. Kenar boşlukları da landing'le aynıdır ve brand'in `--gutter` değişkeninden gelir. Bölümler iki piksellik mürekkep çizgilerle ayrılır. Köşeler düzdür. Kartlar iki ayrı kutudan oluşur: üstte başlık kutusu, aralarında altı piksellik bir boşluk, altta içerik kutusu. Bağlantı olan kartlar hover'da üç piksel kalkar ve altına sert bir gölge düşer. Altın renk vurgu içindir, zemin olarak yalnızca veri sayfasındaki çalışma bandında kullanılır.

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

Sitede üç adres bulunur. `/` veri sayfasıdır. `/work/<slug>` bir çalışmanın detay sayfası, `/work/<slug>/source` aynı çalışmanın kod ve veri sayfasıdır. Adreste bilinmeyen bir yol, bilinmeyen bir çalışma ya da kod sayfası olmayan bir çalışma varsa bulunamadı sayfası gösterilir. Bu sayfanın içeriği ve metinleri bütün PaktLabs siteleriyle ortaktır ve brand paketindeki `NotFound` bileşeninden gelir, data yalnızca onu kendi üst barı ve alt bilgisiyle çerçeveler. Sayfadaki geri dön düğmesi ziyaretçiyi data içinde geldiği sayfaya, adresi doğrudan açtıysa veri sayfasına götürür.

Site içindeki geçişler sayfayı yeniden yüklemez, bu yüzden tarayıcı kaydırma konumunu kendisi kurmaz. Kaydırmayı React Router'ın `ScrollRestoration` parçası yönetir, `src/routes/Root.tsx` bütün rotaları onunla sarar. İleri gidilen sayfa en üstten, adreste bir bölüm varsa o bölümden açılır, geri ve ileri düğmesinde okur kaldığı yere döner. Bu parça yalnızca kütüphanenin `createBrowserRouter` kurulumunda çalışır ve sıkıştırılmış paketi yaklaşık 17 KB büyütür. Kurulum yine de bu yüzden seçildi: çalışma sayfalarının dosyaları ana pakete gömülmez, sayfa açılmadan önce rota yükleyicisinde indirilir ve konum ancak sayfa tam boyuyla çizildikten sonra kurulur. İçeriği sonradan gelen bir sayfada tarayıcı konumu içerik gelmeden kurar ve okur yanlış yere düşerdi. Bir çalışmanın dosyaları ana paketten çıktığı için bu büyüme ilk çalışmada dengelenir. Bir bölüm adresi doğrudan açıldığında fontlar birkaç dalga halinde sonradan gelir ve üstteki metinler yeniden dizilince bölüm yerinden kayar. `Root.tsx` bu yüzden her font dalgasından sonra bölüme yeniden hizalar, okur kendisi kaydırmaya ya da tıklamaya başlayınca durur. `tests/scroll.spec.ts` bu davranışları fontları bilerek geciktirerek denetler.

Site tek sayfalık bir uygulama olarak sunulur. nginx bilinmeyen her yolda `index.html` döndürür ve hangi sayfanın gösterileceğine tarayıcıdaki uygulama karar verir. Bu yüzden bulunamadı sayfası da HTTP 200 koduyla gelir. Arama motorları bunu gerçek bir 404 olarak görmez. Bu bilinen bir sınırdır, sayfalar derleme sırasında önceden üretilirse kaldırılabilir.

### Çalışmaların içeriği

Her çalışma `src/content/studies/<slug>/` klasöründe durur. Klasördeki `index.ts` künye dosyasıdır: adresteki slug, listedeki numara, yıl, filtre etiketleri, başlık, listedeki kartın metni, verinin orijinal dili ve kodun yeri burada yazılır. Detay sayfasının içeriği `page.ts`, kodu sitede paylaşılan çalışmalarda kod sayfasının içeriği `source.ts` dosyasındadır. Künye dosyası bu iki dosyayı doğrudan içine almaz, `page: () => import('./page')` biçiminde yalnızca nasıl yükleneceklerini yazar. Böylece sayfaların metni ana pakete girmez, ayrı bir parça olarak yalnızca o sayfa açılırken indirilir ve veri sayfasını açan okur hiçbir çalışmanın metnini indirmez. Derleyici yine her çalışmanın bir detay sayfası olduğunu, kodu sitede paylaşılan çalışmanın da bir kod sayfası olduğunu denetler. Böylece yeni bir çalışma eklenirken yalnızca bu klasör yazılır, bileşen ya da CSS yazılmaz.

Metinler dil başına ayrı dosyalarda değil, aynı yerde iki dili yan yana yazılır. Bir paragrafın Türkçesi ve İngilizcesi aynı alanın içinde durur, böylece çevirisi ayrı bir dosyada unutulamaz. İngilizcesi eksik kalan bir metin derleme hatası verir. Metinler JSON yerine TypeScript dosyalarında yazılır, çünkü bir çalışma düz metinden ibaret değildir. Tablolar, şekiller ve hat istasyonları gibi parçaların her birinin kendi alanları vardır ve TypeScript bu alanları derleme sırasında denetler.

Kodun yeri iki seçenekten biridir. Firma kodun paylaşılmasına izin verdiyse künye dosyasına GitHub deposunun adresi yazılır, detay sayfasındaki Meraklısına kartı yalnızca depoya bağlanır ve sitede ayrıca kod sayfası bulunmaz. İzin vermediyse paylaşılan kısım sitedeki kod sayfasında gösterilir. İkisinden birinin yazılması zorunludur, ikisi birden yazılamaz. Kodu GitHub'da olan bir çalışmanın kod sayfası adresi bulunamadı sayfasına düşer.

Veri sayfasındaki listede gerçek çalışmalarla birlikte mockup'tan taşınan lorem yer tutucular da durur. Yer tutucular yalnızca listede görünen alanları taşır, detay ve kod sayfaları yoktur. Gerçek bir çalışma geldiğinde aynı numaralı yer tutucu `placeholders.ts`'ten silinir. Yeni bir çalışma kendi klasöründe yazılır ve `src/content/studies/index.ts` içindeki listeye eklenir, liste numara sırasıyla dizilir.

### Verinin dili

Bir çalışmanın ham verisi Türkçe ya da İngilizce olabilir ve her çalışmanın verisi iki dilde de hazırlanır. Sayfada iki ayrı dil vardır. Sitenin dili metni, başlıkları, menüleri, şekilleri ve düz tabloları belirler, sayfadaki TR ve EN değiştiricisi onu değiştirir. Verinin dili çalışmanın kendi dosyalarını belirler: hesap tablolarını, indirilen veri dosyalarını, kod sayfasındaki kod dosyalarını ve terminal çıktılarını. Kod dosyaları da iki dilde yazılır. Yollar ve tanımlayıcılar iki dilde aynıdır, yalnızca yorumlar, docstring'ler ve çıktıdaki yazılar çevrilir, böylece İngilizce okur kodu İngilizce yorumlarıyla görür. Satır numaralarının dil değişince kaymaması için çeviri satır satır yapılır, ama bu zorunlu değildir. Böylece okur her zaman okuyabildiği metni görür, ama isterse çalışmanın orijinal halini de inceleyebilir.

Künye dosyasındaki `dataLanguage` verinin orijinal dilidir. Sayfa açıldığında verinin dili sitenin diline eşittir. İkisi farklıysa birinci bölümden önce 00 numaralı "Verinin dili" bölümü çıkar. Bu bölüm verinin aslen hangi dilde olduğunu söyler ve tabloları çeviri ile orijinal arasında değiştiren iki seçenekli bir seçici taşır. Seçici sitenin dilini değiştirmez. Numarası 00 olduğu için eklendiğinde içerik bölümlerinin numaraları kaymaz, içindekilerde de yer alır, böylece okur bu seçimi sayfanın başında görür. Diller aynıysa bölüm hiç çıkmaz. Seçim hiçbir yere kaydedilmez, sayfa yenilendiğinde, başka bir çalışmaya geçildiğinde ya da sitenin dili değiştiğinde veri dili yeniden sitenin diline döner. Bölümün metni çalışmaya değil sitenin sözlüğüne aittir. Giriş paragrafı ve seçicinin adı sayfaya göre değişir, detay sayfası tabloları, kod sayfası kod ve veri dosyalarını anar.

Veri dosyaları çalışmanın klasöründe `data/tr/` ve `data/en/` altında, kod dosyaları ve terminal çıktıları `code/tr/` ve `code/en/` altında, deponun kendi klasör düzeniyle durur, örneğin `code/en/rules/catalog.py`. İki klasörde aynı kimlikle adlandırılmış CSV'ler bulunur, örneğin `data/tr/raw-records.csv` ve `data/en/raw-records.csv`. Kimlik dilden bağımsızdır, ekranda görünen dosya adı ise hesap tablosunun ayarlarından gelir ve çevrilebilir. Dosyalar Türkçe Excel dışa aktarımları gibi noktalı virgülle ayrılır, çünkü Türkçe sayılarda virgül ondalık ayıracıdır. Kaynak kusurları, örneğin bozuk Türkçe harfler ya da farklı ondalık ayıraçları, CSV'de olduğu gibi bırakılır. Çalışmanın dosyaları ana pakete gömülmez, derlemede her biri ayrı bir statik dosya olur ve yalnızca o çalışmanın sayfası açılırken indirilir. Böylece her yeni çalışma, veri sayfasını açan herkesin indirdiği paketi büyütmez, indirme bağlantıları da aynı dosyayı gösterir. Dosyaların nereden geldiğini `src/content/studies/files.ts` içindeki `StudyFiles` soyut sınıfı saklar, bugünkü somut hali `assetFiles.ts`'tir ve bütün çalışmaların dosyalarını kendiliğinden bulur. Dosyalar ileride başka bir kaynaktan gelirse yalnızca bu somut hal değişir. Sayfalar dosyaları `src/routes/studyLoader.ts` ile sayfa çizilmeden önce alır, parçalar dosyayı `useStudyFile` ile o an seçili veri dilinde ister. `tests/data.spec.ts` iki dilin CSV'lerinin aynı kimliklerde, aynı satır ve hücre sayısında, kod dosyalarının aynı yollarda olduğunu ve iki sayfadaki her parçanın çağırdığı dosyanın iki dilde de var olduğunu denetler.

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

Testler landing'deki gibi üretim derlemesine karşı çalışır. Üst bar ve alt bilginin data'ya doğru bağlandığını, sayfa başlıklarını iki dilde, rotaları ve bulunamadı davranışını, veri sayfasındaki hero'nun yerleşimini kontrol eder. `study.spec.ts` detay sayfasının davranışını Demo Veri üzerinden denetler: bölümlerin ve içindekilerin sırası, veri dili bölümünün yalnızca diller farklıyken çıkması, seçicinin tabloları orijinal dile çevirmesi ve site dili değişince geri dönmesi, açılır kutular, içindekilerden bölüme geçiş, Meraklısına kartının, yazar kutusunun ve kapanış kartlarının adresleri, eşiklerin iki yanında yatay taşma. `source.spec.ts` kod sayfasını aynı çalışma üzerinden denetler: bölümlerin ve içindekilerin sırası, kapak, kod ve veri dosyalarının verinin dilini izlemesi, kopyalanan metnin dosyanın kendisiyle birebir aynı olması ve satır numarası taşımaması, indirilen dosyanın adının ve içeriğinin seçili veri dilinde olması, yazar kutusu, dönüş kartı ve yatay taşma. `data.spec.ts` tarayıcı açmadan iki dilin CSV'lerini ve kod dosyalarını, iki sayfadaki parçaların çağırdığı dosyaları, her kod dosyasının dilinin kayıtlı olduğunu ve bölüm adreslerinin tekilliğini denetler. `highlight.spec.ts` kod renklendiricisinin kurallarını küçük örneklerle ve renklendirmenin hiçbir kod dosyasının metnini değiştirmediğini denetler. `a11y.spec.ts` dört sayfa türünde başlık sırasını, sayfa bölgelerini ve bağlantıları denetler. `visual.spec.ts` dört sayfa türünün onaylı görünümünü tam sayfa referanslarla karşılaştırır, `npm run test:visual` ile ayrıca çalıştırılır. Test koşulları ve testlerin neyi kanıtlamadığı `tests/README.md` içinde anlatılır.

### İletişim

Bu sitenin kendine ait bir backend'i ve iletişim formu yoktur. İletişim bölümü ve üst bardaki İletişim bağlantısı ziyaretçiyi ana sitenin iletişim sayfasına götürür. Bu sayfa gerektiğinde bütün PaktLabs sitelerinin paylaşacağı tek yerdir, bir siteye özel iletişim sayfası ya da servisi yazılmaz.

Veri işlerini gösteren çalışan bir uygulama bu repoya girmez. Uygulama kendi reposunda yazılır, sunucuda kendi servisi olarak çalışır ve bu siteden yalnızca bağlantıyla açılır.

## Yazım rehberi

Detay sayfası her çalışmada aynı iskeletle kurulur: kapak ve künye, Sorun, Yaklaşım ve Sonuç bandı, içindekiler, numaralı bölümler, Meraklısına kartı, yazar kutusu ve kapanış. İskeletin içeriği çalışmanın `page.ts` dosyasında yazılır. Bölümlerin içi ise serbesttir. Her bölüm `blocks` listesinde sırayla dizilen parçalardan oluşur. Bir parça içeriği bilmez, adını hikâyeden değil biçimden alır. Hangi parçanın hangi sırayla ve kaç kez kullanılacağı serbesttir, böylece iki çalışmanın sayfası birbirine benzemek zorunda kalmaz. Yeni bir anlatım biçimi gerektiğinde `src/content/studies/blocks.ts` içine yeni bir parça tipi, `src/components/study/blocks/` altına bileşeni eklenir. Eski sayfalara dokunulmaz. Yanlış ya da eksik yazılmış bir parça derleme hatası verir.

Her metin iki dili yan yana taşır. Aşağıdaki örneklerde kısalık için yalnızca bir iki alan gösterilir.

### Sayfa iskeleti

`page.ts` iskeletin içeriğini taşır. `lede` kapaktaki tek cümlelik açıklama ve sekmenin açıklamasıdır. `kunye` kapağın sağındaki satırlardır. `summary` Sorun, Yaklaşım ve Sonuç bandıdır. `chapters` numaralı bölümlerdir. `closing` kapanış bölümünün sorusu ve yanındaki çizimin yeridir, çizim gelene kadar alanın içinde hangi çizimin istendiği yazar. Yazar ise künye dosyasında `author` kimliğiyle anılır, adı ve e-postası `src/content/authors.ts` içinde durur. Meraklısına kartının metni çalışmaya değil sitenin sözlüğüne aittir ve kodun yerine göre seçilir.

```ts
closing: {
  title: { tr: 'Benzer bir dağınıklık sizde de var mı?', en: '…' },
  art: { label: { tr: 'Svg alanı · D2 · detay-teslim.svg · üçe dört', en: '…' }, note: { tr: '…', en: '…' } },
}
```

### Bölüm

Bölümün `id`'si adresteki parçadır, içindekiler bölüme onunla atlar. Sayfada tekil olmalı ve dilden bağımsız yazılmalıdır. Numara yazılmaz, bölümün sırasından çıkar. `label` hem başlığın üstünde hem içindekilerde görünen kısa addır. `lede` okurun yalnızca onu okusa bile hikâyeyi alacağı giriş paragrafıdır.

```ts
{
  id: 'sorun',
  label: { tr: 'Sorun', en: 'Problem' },
  title: { tr: 'Aynı vida, dört farklı stok kartı', en: 'One screw, four different stock cards' },
  lede: { tr: '…', en: '…' },
  blocks: [],
}
```

### Paragraf

Bölüm girişinden sonra gelen ara anlatım içindir, örneğin bir tabloyu tanıtan cümle. Girişten daha küçük ve soluk yazılır.

```ts
{ type: 'paragraph', text: { tr: '…', en: '…' } }
```

### Liste

Kısa maddelerden oluşur, her maddenin kalın bir baş cümlesi ve açıklaması vardır. `columns` görünüşü maddeleri numaralı ve yan yana dizer, birkaç kısa etkiyi bir bakışta göstermek için. `stack` görünüşü maddeleri alt alta ve aralarında çizgiyle dizer, biraz daha uzun anlatılan sınırlar ya da uyarılar için. `title` verilirse listenin üstünde küçük bir başlık olarak durur.

```ts
{
  type: 'list',
  view: 'stack',
  title: { tr: 'Bilinen sınırlar', en: 'Known limits' },
  items: [{ title: { tr: 'Model yaşlanır.', en: 'The model ages.' }, text: { tr: '…', en: '…' } }],
}
```

### Açılır kutu

Ayrıntıyı ilk katmandan ayırır, okur isterse açar. Kapalıyken üstte küçük bir etiket ve başlık görünür. İçine başka parçalar konur, en sık hesap tablosu. Kapalı kutunun başlığında sayı kullanılmaz, çünkü o başlık da okurun karşısına kendiliğinden çıkar.

```ts
{
  type: 'details',
  meta: { tr: 'Tablo 1 · önce', en: 'Table 1 · before' },
  title: { tr: 'Ham veri: dört kaynaktan gelen kayıtlar', en: 'Raw data: records from four sources' },
  blocks: [/* hesap tablosu */],
}
```

### Hesap tablosu

Ham veriyi hesap tablosu programlarına benzeyen bir görünümle gösterir. Hücreler `csv` kimliğiyle çağrılan dosyadan gelir, buradaki alanlar yalnızca görünümü ayarlar. `name`, `tabs` ve `formula` verinin parçası sayılır ve verinin dilini izler: Türkçe veride `=TOPLA(C2:C5)`, İngilizce veride `=SUM(C2:C5)` yazılır. `cell` seçili hücredir, `formula` verilmezse formül çubuğu bu hücrenin değerini gösterir. `numbers` sağa yaslanan sayı sütunlarının harfleridir. `total` son satırın toplam satırı olduğunu söyler, `rows` dosya gerçek tablonun bir kesitiyse gerçek satır sayısını verir. `notes` tablonun altındaki açıklamalardır, sitenin dilini izler ve kaynak kusurlarını burada açıklar.

```ts
{
  type: 'sheet',
  csv: 'quarantine-summary',
  name: { tr: 'karantina_ozet.xlsx', en: 'quarantine_summary.xlsx' },
  tabs: { tr: ['ozet', 'kayitlar'], en: ['summary', 'records'] },
  cell: 'C6',
  formula: { tr: '=TOPLA(C2:C5)', en: '=SUM(C2:C5)' },
  numbers: ['C', 'D'],
  total: true,
  notes: [{ tr: '…', en: '…' }],
}
```

### Düz tablo

Kısa bir karşılaştırma içindir, hesap tablosu görünümü taşımaz ve sitenin dilini izler. İlk sütun satırın adıdır ve kalın yazılır. Bir hücre ya iki dilli bir metin ya da `{ meter: 34 }` gibi yüzde olarak bir orandır. Oran hücresine küçük bir çubuk ve yanında değeri çizilir.

```ts
{
  type: 'table',
  head: [{ tr: 'Kaynak', en: 'Source' }, { tr: 'Barkod dolu', en: 'Barcode filled' }],
  rows: [[{ tr: 'Tedarikçi A', en: 'Supplier A' }, { meter: 71 }]],
}
```

### İstasyon hattı

Sırayla geçilen adımlar içindir. İstasyonlar soldaki numaralı bir hattın üzerinde alt alta durur, numaralar sıradan çıkar. Her istasyonun adı ve ne yaptığını anlatan kısa bir metni vardır. `details` verilirse istasyonun alt kenarında "Ayrıntı" şeridi çıkar ve paragraflar okur açınca görünür.

```ts
{
  type: 'stations',
  items: [{ title: { tr: 'Doğrulama', en: 'Validation' }, text: { tr: '…', en: '…' }, details: [{ tr: '…', en: '…' }] }],
}
```

### Çubuk şekli

Tek bir soruya cevap verir. `label` şeklin üstündeki küçük etikettir, örneğin Şekil 1, `title` soru, `reading` tek cümlelik okuması. `direction` çubukların dikey mi yatay mı duracağını seçer. Eksen sıfırdan `max`'a uzanır ve kesilmez, `ticks` eksende yazan değerlerdir. `unit` ve `decimals` değerlerin nasıl yazılacağını söyler, yüzdeler sitenin diline göre %0,1 ya da 0.1% yazılır. Bir çubuğa `highlight` verilirse altın çizilir. `group` verilirse çubuğun üstünde yeni bir grup başlığı açılır. `zones` verilirse çubukların `zone` alanıyla bağlandığı bölgeler adlandırılır ve dikey şekilde çubukların altında bir bant olarak durur, `style` bölgenin zeminini seçer: `none`, `hatched` ya da `shaded`. `blocks` şeklin altına konan parçalardır, genellikle verisini taşıyan açılır kutu. Ekran okuyucunun okuduğu açıklama elle yazılmaz, çubuklardan üretilir.

```ts
{
  type: 'chart',
  direction: 'horizontal',
  label: { tr: 'Şekil 2', en: 'Figure 2' },
  title: { tr: 'Kaynağa göre kaçırılan eşleşme oranı', en: 'Share of missed matches, by source' },
  reading: { tr: '…', en: '…' },
  unit: 'percent',
  decimals: 1,
  max: 8,
  ticks: [0, 2, 4, 6, 8],
  bars: [{ label: { tr: 'Tedarikçi C', en: 'Supplier C' }, value: 6.2, highlight: true }],
  blocks: [/* açılır kutu ve hesap tablosu */],
}
```

### Karar listesi

Teknik okurun ilk soracağı "neden böyle" sorularının cevabı içindir. Her kararın sorusu başlık, cevabı paragraf olarak yazılır, üstünde "Karar 01" gibi numaralı bir etiket durur. Numara sıradan, etiketteki kelime sitenin sözlüğünden gelir. Her cevap bir deneme ya da ölçüme dayanmalıdır.

```ts
{
  type: 'decisions',
  items: [{ title: { tr: 'Neden barkodu doğrudan anahtar yapmadık', en: '…' }, text: { tr: '…', en: '…' } }],
}
```

### Zaman çizelgesi

Bir işin takvimini gösterir. `periods` dönem sayısı, `periodLabel` dönemlerin kısaltmasıdır, hafta için H ve W yazılırsa başlıklar H1, H2 diye çıkar. Her işin `start` başladığı dönem, `length` kaç dönem sürdüğüdür, yarım dönemler ondalıkla yazılır. `highlight` işi altın çizer, `legend` altın çubukların ne anlama geldiğini söyler.

```ts
{
  type: 'timeline',
  periods: 7,
  periodLabel: { tr: 'H', en: 'W' },
  tasks: [{ label: { tr: 'Etiketleme', en: 'Labelling' }, start: 3, length: 1.2, highlight: true }],
  legend: { tr: '…', en: '…' },
}
```

### Dosya ağacı

Teslim edilen bir deponun ya da veritabanının yapısını kod görünümünde gösterir. Her kolun bir kök adı ve altında öğeleri vardır. Öğe adları dosya ya da tablo adı olduğu için iki dilde aynı yazılır, yanındaki açıklama sitenin dilini izler. Bir öğeye `items` verilirse klasör olur ve altındaki öğeler bir kademe içeride çizilir. `highlight` öğeyi altınla, `muted` soluk çizer, kod sayfası paylaşılan ve paylaşılmayan dosyaları böyle ayırır. Ağaç çizgileri ve açıklamaların hizası kendiliğinden kurulur, boşlukla elle hizalama yapılmaz. `label` ekran okuyucunun ağacı tanıttığı addır.

```ts
{
  type: 'tree',
  label: { tr: 'Teslim edilen depo yapısı', en: 'Structure of the delivered repository' },
  groups: [{ root: 'matcher/', items: [{ name: 'rules/', items: [{ name: 'catalog.py', highlight: true }] }] }],
}
```

### Önce ve sonra

Bir işin öncesini ve sonrasını satır satır karşılaştırır. Her satırda neyin ölçüldüğü, önceki ve sonraki hal yazılır. `lead` verilirse sonraki halin başında kalın durur, okurun gözü önce değişimin kendisine gitsin diye. Sütun başlıkları sitenin sözlüğünden gelir.

```ts
{
  type: 'compare',
  rows: [{ label: { tr: 'Bulunan gerçek eşleşme', en: '…' }, before: { tr: 'Yüzde 18', en: '…' }, lead: { tr: 'Yüzde 97,2', en: '…' }, after: { tr: ', test setinde', en: '…' } }],
}
```

### Not kutusu

Akışın dışında kalan ama okurun bilmesi gereken kısa bir not içindir, örneğin bir sınırlama ya da bir uyarı. Paragraflardan ayrılsın diye solunda altın bir çizgiyle çerçeveli bir kutuda durur. Bir sayfada az kullanılır, çok kullanılırsa vurgusu kaybolur.

```ts
{ type: 'note', label: { tr: 'Erişim', en: 'Access' }, text: { tr: '…', en: '…' } }
```

### Kod sayfası

Kodu sitede paylaşılan bir çalışmanın kod sayfası `source.ts` dosyasında yazılır. Künye dosyası onu `code: { kind: 'page', page: () => import('./source') }` biçiminde anar. Sayfa detay sayfasıyla aynı bölüm yapısını kullanır, bölümlere detay sayfasındaki bütün parçalar da konabilir. `tags` kapakta görünen araç adlarıdır ve iki dilde aynıdır. Kod sayfasında açılır kutu kullanılmaz, kod ve veri açık durur.

```ts
export const source: SourcePage = {
  title: { tr: '…', en: '…' },
  lede: { tr: '…', en: '…' },
  tags: ['Python', 'SQL', 'CSV'],
  kunye: [{ label: { tr: 'Dil', en: 'Language' }, value: { tr: 'Python 3.12', en: 'Python 3.12' } }],
  chapters: [],
}
```

### Kod dosyası

Çalışmanın `code` klasöründeki bir dosyayı satır numaralarıyla, yoluyla ve kopyalama düğmesiyle gösterir. `path` dosyanın `code/tr/` ve `code/en/` altındaki yoludur, başlıkta da bu yol yazar. Satır sayısı dosyadan, dilin adı ve renklendirme kuralları uzantıdan gelir. Dil `src/components/study/blocks/languages.ts` kaydından seçilir. Yeni bir dil gerektiğinde oraya bir kayıt eklenir, renklendirici ve kod bileşeni değişmez. Kayıtlı olmayan bir uzantı hata verir.

```ts
{ type: 'code', path: 'rules/catalog.py' }
```

### Terminal çıktısı

Bir komutun çıktısını kod dosyalarından biraz daha koyu bir zeminde, satır numarasız ve renksiz gösterir. Metni `code` klasöründeki bir dosyadadır ve kod gibi verinin dilini izler. Çıktıdaki sayılar sayfadaki tablolar ve şekillerle aynı olmalıdır.

```ts
{ type: 'output', path: 'out/evaluate.txt' }
```

### Veri dosyası

İndirilebilir bir veri dosyasını tam önizlemesiyle, indirme bağlantısıyla ve altındaki notla gösterir. `csv` dosyanın `data` klasöründeki kimliğidir, hesap tablosundaki gibi. `name` indirilen ve başlıkta görünen dosya adıdır, verinin dilini izler. `note` sitenin dilini izler. Satır, sütun ve boyut dosyadan hesaplanır.

```ts
{
  type: 'datafile',
  csv: 'raw-sample',
  name: { tr: 'ham_kayitlar_ornek.csv', en: 'raw_records_sample.csv' },
  note: { tr: '…', en: '…' },
}
```

Okuma süresi elle yazılmaz. İçindekilerin altında görünen süre, sayfadaki düz metnin kelime sayısından dakikada yaklaşık iki yüz kelimeyle hesaplanır. Tablo hücreleri sayılmaz, okur onları okumaz, göz atar.

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
