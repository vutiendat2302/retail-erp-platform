create index fk_batch_product
    on store_product (batch_id);

create index fk_store
    on store_product (store_id);

create index fk_store_product
    on store_product (product_id);

