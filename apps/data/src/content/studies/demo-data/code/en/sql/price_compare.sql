-- products found at two or more suppliers, sorted by unit price
SELECT p.id,
       p.name,
       o.supplier,
       o.unit_price,
       o.unit_price / min(o.unit_price) OVER (PARTITION BY p.id) AS vs_cheapest
FROM product p
JOIN product_offer o ON o.product_id = p.id
WHERE p.id IN (
    SELECT product_id
    FROM product_offer
    GROUP BY product_id
    HAVING count(DISTINCT supplier) >= 2
)
ORDER BY p.id, o.unit_price;
