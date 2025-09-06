create index fk_export_batch
    on export_product (batch_id);

create index fk_export_log
    on export_product (log_id);

create index fk_export_product
    on export_product (product_id);

