create index product_ibfk_1
    on product (category_id);

create index product_ibfk_2
    on product (brand_id);

create index product_ibfk_3
    on product (manufacturing_location_id);

