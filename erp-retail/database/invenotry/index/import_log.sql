create index import_log_supplier_id_fk
    on import_log (from_supplier_id);

create index import_log_warehouse_id_fk
    on import_log (to_warehouse_id);

