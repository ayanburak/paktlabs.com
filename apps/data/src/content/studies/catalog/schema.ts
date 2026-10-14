/*
file: schema.ts
importable: schema

Blok katalogundaki veritabani orneklerinin semasi. Bir calismada da ayni
bicimde calismanin klasorunde schema.ts dosyasina yazilir, sema ve
veritabani tablosu parcalari onu ayni yerden okur.

description: Blok katalogundaki sema ve veritabani tablosu orneklerinin ortak veritabani tanimi.
*/

import type { DbSchema } from '../blocks'

export const schema: DbSchema = {
  engine: 'PostgreSQL',
  tables: [
    {
      name: 'product',
      rows: 85850,
      brief: ['name'],
      columns: [
        { name: 'id', type: 'integer', pk: true, note: { tr: 'Ürün kartının kimliği', en: 'Product card id' } },
        { name: 'name', type: 'text', note: { tr: 'Normalize edilmiş ürün adı', en: 'Normalised product name' } },
        { name: 'brand_id', type: 'integer', ref: 'brand.id', nullable: true, note: { tr: 'Marka, bilinmiyorsa boş', en: 'Brand, empty when unknown' } },
        { name: 'size', type: 'text', nullable: true, note: { tr: 'Ölçü, örneğin 4 × 40 mm', en: 'Size, for example 4 × 40 mm' } },
        { name: 'finish', type: 'text', nullable: true, note: { tr: 'Kaplama ya da renk', en: 'Finish or colour' } },
        { name: 'pack_qty', type: 'integer', note: { tr: 'Paketteki adet', en: 'Pieces in a pack' } },
        { name: 'barcode', type: 'text', nullable: true, note: { tr: 'Kontrol hanesinden geçen barkod', en: 'Barcode that passed the check digit' } },
      ],
    },
    {
      name: 'supplier_item',
      rows: 184312,
      brief: ['unit_price'],
      columns: [
        { name: 'id', type: 'integer', pk: true, note: { tr: 'Kaynak satırının kimliği', en: 'Source row id' } },
        { name: 'product_id', type: 'integer', ref: 'product.id', note: { tr: 'Eşleştirmenin bağladığı ürün', en: 'Product the matching linked it to' } },
        { name: 'supplier_id', type: 'integer', ref: 'supplier.id', note: { tr: 'Satırın geldiği kaynak', en: 'Source the row came from' } },
        { name: 'source_code', type: 'text', nullable: true, note: { tr: 'Kaynağın kendi ürün kodu', en: 'The source’s own product code' } },
        { name: 'raw_name', type: 'text', note: { tr: 'Kaynakta yazdığı haliyle ad', en: 'Name as written in the source' } },
        { name: 'unit_price', type: 'numeric(12,2)', note: { tr: 'Paket fiyatı, TL', en: 'Pack price, TRY' } },
        { name: 'pack_size', type: 'integer', note: { tr: 'Fiyatın kaç adet için olduğu', en: 'How many pieces the price is for' } },
      ],
    },
    {
      name: 'review_decision',
      rows: 14000,
      brief: ['decision'],
      columns: [
        { name: 'id', type: 'integer', pk: true, note: { tr: 'Kararın kimliği', en: 'Decision id' } },
        { name: 'product_id', type: 'integer', ref: 'product.id', note: { tr: 'Kararın yazıldığı ürün', en: 'Product the decision was written to' } },
        { name: 'pair_score', type: 'real', note: { tr: 'Modelin çifte verdiği skor', en: 'Score the model gave the pair' } },
        { name: 'decision', type: 'text', note: { tr: 'same ya da different', en: 'same or different' } },
        { name: 'decided_by', type: 'text', note: { tr: 'İnceleyen kişi', en: 'Reviewer' } },
        { name: 'decided_at', type: 'timestamptz', note: { tr: 'Kararın zamanı', en: 'Time of the decision' } },
      ],
    },
    {
      name: 'price_history',
      rows: 1204000,
      brief: ['price'],
      columns: [
        { name: 'id', type: 'bigint', pk: true, note: { tr: 'Kaydın kimliği', en: 'Row id' } },
        { name: 'supplier_item_id', type: 'integer', ref: 'supplier_item.id', note: { tr: 'Fiyatın ait olduğu kaynak satırı', en: 'Source row the price belongs to' } },
        { name: 'price', type: 'numeric(12,2)', note: { tr: 'O tarihteki paket fiyatı', en: 'Pack price on that date' } },
        { name: 'valid_from', type: 'date', note: { tr: 'Fiyatın geçerli olduğu ilk gün', en: 'First day the price was valid' } },
      ],
    },
    {
      name: 'brand',
      rows: 410,
      brief: ['name'],
      columns: [
        { name: 'id', type: 'integer', pk: true, note: { tr: 'Markanın kimliği', en: 'Brand id' } },
        { name: 'name', type: 'text', note: { tr: 'Markanın tek doğru yazımı', en: 'The one correct spelling of the brand' } },
        { name: 'aliases', type: 'text[]', note: { tr: 'Kaynaklarda görülen öteki yazımlar', en: 'Other spellings seen in the sources' } },
      ],
    },
    {
      name: 'supplier',
      rows: 4,
      brief: ['name'],
      columns: [
        { name: 'id', type: 'integer', pk: true, note: { tr: 'Kaynağın kimliği', en: 'Source id' } },
        { name: 'name', type: 'text', note: { tr: 'ERP ya da tedarikçinin adı', en: 'Name of the ERP or the supplier' } },
        { name: 'feed_format', type: 'text', note: { tr: 'CSV, Excel, XML ya da PDF', en: 'CSV, Excel, XML or PDF' } },
        { name: 'updated_at', type: 'timestamptz', note: { tr: 'Son okunduğu gece', en: 'Night it was last read' } },
      ],
    },
  ],
  links: {
    'product.brand_id': { tr: 'Bir markanın birden çok ürünü olur.', en: 'A brand has many products.' },
    'supplier_item.product_id': {
      tr: 'Bir ürüne dört kaynaktan birden çok satır bağlanabilir, eşleştirmenin sonucu bu bağdır.',
      en: 'Several rows from the four sources can link to one product, this link is the result of the matching.',
    },
    'supplier_item.supplier_id': {
      tr: 'Her kaynak satırı tek bir kaynaktan, ERP ya da bir tedarikçiden gelir.',
      en: 'Every source row comes from one source, the ERP or a supplier.',
    },
    'review_decision.product_id': { tr: 'Ekibin her inceleme kararı bir ürün kartına yazılır.', en: 'Every review decision of the team is written to a product card.' },
    'price_history.supplier_item_id': {
      tr: 'Fiyatlar ürüne değil kaynak satırına bağlıdır, her tedarikçinin fiyat geçmişi ayrı tutulur.',
      en: 'Prices belong to the source row, not the product, so every supplier keeps its own price history.',
    },
  },
}
