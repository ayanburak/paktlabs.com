-- the single card of every product, the source each field was taken from sits next to it
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

-- link between a source record and a product card, a product can have more than one source
CREATE TABLE product_source (
    record_id    text PRIMARY KEY,
    product_id   text NOT NULL REFERENCES product (id),
    source       text NOT NULL,
    decided_by   text NOT NULL CHECK (decided_by IN ('model', 'review'))
);

-- supplier prices are not merged, each supplier stays on its own row
CREATE TABLE product_offer (
    product_id   text NOT NULL REFERENCES product (id),
    supplier     text NOT NULL,
    pack_qty     integer NOT NULL CHECK (pack_qty > 0),
    list_price   numeric(12, 2) NOT NULL,
    unit_price   numeric(12, 5) GENERATED ALWAYS AS (list_price / pack_qty) STORED,
    PRIMARY KEY (product_id, supplier)
);
