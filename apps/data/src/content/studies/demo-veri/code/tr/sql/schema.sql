-- her ürünün tek kartı, alanların hangi kaynaktan seçildiği yanında durur
CREATE TABLE product (
    id           text PRIMARY KEY,
    kind         text NOT NULL,
    d1           numeric,
    d2           numeric,
    finish       text,
    brand        text,
    ean          char(13),
    name         text NOT NULL,
    name_source  text NOT NULL
);

-- kaynak kayıt ile ürün kartı arasındaki bağ, bir ürünün birden çok kaynağı olabilir
CREATE TABLE product_source (
    record_id    text PRIMARY KEY,
    product_id   text NOT NULL REFERENCES product (id),
    source       text NOT NULL,
    decided_by   text NOT NULL CHECK (decided_by IN ('model', 'review'))
);

-- tedarikçi fiyatı birleştirilmez, her tedarikçi kendi satırında kalır
CREATE TABLE product_offer (
    product_id   text NOT NULL REFERENCES product (id),
    supplier     text NOT NULL,
    pack_qty     integer NOT NULL CHECK (pack_qty > 0),
    list_price   numeric(12, 2) NOT NULL,
    unit_price   numeric(12, 5) GENERATED ALWAYS AS (list_price / pack_qty) STORED,
    PRIMARY KEY (product_id, supplier)
);
