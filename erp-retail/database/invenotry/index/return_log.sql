create index return_log_supplier_id_fk
    on return_log (to_supplier_id);

create index return_log_warehouse_id_fk
    on return_log (from_warehouse_id);

