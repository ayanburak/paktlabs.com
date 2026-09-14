# Dile göre disiplin görselleri

Disiplinler bölümünün görselleri `frontend/src/routes/Home/sections/Disciplines.tsx` içindeki `illustrations` eşlemesinden seçilir. Dil mevcut dil sağlayıcısından gelir; ekran genişliğine uygun dosyayı `picture` seçer. Her dil şu an mevcut SVG çiftini kullanır. İngilizce SVG metni henüz çevrilmiş değildir.

Yeni görseller `frontend/src/assets/illustrations/` altına eklenir. Önerilen adlar ve eşleme:

| Dosya | Eşleme |
| --- | --- |
| `inceleyin-tr.svg` | `tr.desktop` |
| `inceleyin-en.svg` | `en.desktop` |
| `inceleyin-mobile-tr.svg` | `tr.mobile` |
| `inceleyin-mobile-en.svg` | `en.mobile` |

Dosyalar bileşene statik olarak import edilir ve eşlemedeki ilgili değerler bu importlarla değiştirilir. Bir sürüm hazır değilse mevcut import o alanda korunur; henüz bulunmayan dosya yolları yazılmaz. Dosya eklemek tek başına eşlemeyi değiştirmez.

1680 piksel ve altında mobil kompozisyon kartların üstünde, daha geniş ekranlarda masaüstü kompozisyon kartların solunda kullanılır. Eşik değişirse bileşendeki `source` ve yanındaki CSS medya sorgusu birlikte güncellenir.

## SVG hazırlama ölçüleri

- Masaüstü dil çiftinde mevcut `viewBox` ölçüleri korunur: `0 0 891.70386 1460.7936`.
- Mobil dil çiftinde mevcut `viewBox` ölçüleri korunur: `0 0 819.68787 1040.6843`.
- Aynı kompozisyonun TR ve EN sürümlerinde figürün konumu, zemin çizgisi ve kenar boşlukları aynı kalır. Metin kendi alanında değiştirilir; çizim dışına taşmamalıdır.
- Masaüstü ile mobil kompozisyonun birbirinin aynısı olması gerekmez. Ölçüler dil çiftleri içinde korunur.
- Görselin anlamı değişirse `tr.json` ve `en.json` içindeki `disciplines.artAlt` da güncellenir.

Bu ölçüler korunduğunda yeni dosyalar için yerleşim ve animasyon kodunu değiştirmek gerekmez. Farklı oran veya iç boşluklarla gelen çizimlerde piksel düzeyindeki yerleşim yeniden kontrol edilir.

Yeni dosyalar bağlandıktan sonra iki dilde 390, 768, 769, 1024, 1680, 1681 ve 1920 piksel genişlikleri; sayfa açıkken dil değiştirme ve eşik üzerinden yeniden boyutlandırma kontrol edilir. Soğuk yüklemede bu bölüm için yalnızca seçilen SVG indirilmelidir. Ekran veya dil değişince yeni seçilen dosyanın indirilmesi normaldir.
