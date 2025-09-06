create index fk_export_from_warehouse
    on export_log (from_warehouse_id);

create index fk_export_to_store
    on export_log (to_store_id);

