create index fk_batch_inventory
    on inventory (batch_id);

create index inventory_product_id_fk
    on inventory (product_id);

create index inventory_warehouse_id_fk
    on inventory (warehouse_id);

