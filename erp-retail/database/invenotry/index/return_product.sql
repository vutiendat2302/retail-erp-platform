create index fk_return_batch
    on return_product (batch_id);

create index return_product_product_id_fk
    on return_product (product_id);

create index return_product_return_log_id_fk
    on return_product (return_log_id);

