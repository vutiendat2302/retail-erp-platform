create index fk_import_batch
    on import_product (batch_id);

create index import_product_import_log_id_fk
    on import_product (log_id);

create index import_product_product_id_fk
    on import_product (product_id);

