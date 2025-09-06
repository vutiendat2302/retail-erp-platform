create table brand
(
    id          bigint       not null,
    name        varchar(100) null,
    description varchar(250) null,
    country     varchar(100) null,
    create_at   datetime     null,
    update_at   datetime     null,
    created_by  bigint       null,
    update_by   bigint       null,
    status      tinyint(1)   null,
    primary key (id)
)
    comment 'Bảng lưu các thương hiệu sản phẩm';

create table category
(
    id           bigint       not null,
    name         varchar(100) null,
    seo_title    varchar(250) null,
    description  varchar(250) null,
    status       tinyint(1)   null,
    parent_id    bigint       null comment 'Xác định mối quan hệ phân cấp, danh mục cha',
    meta_keyword varchar(100) null comment 'mô tả ngắn',
    create_by    bigint       null,
    create_at    datetime     null,
    update_by    bigint       null,
    update_at    datetime     null,
    small_image  varchar(250) null,
    primary key (id)
)
    comment 'Bảng lưu thông tin các danh mục sản phẩm, hỗ trợ phân cấp danh mục';

create table export_log
(
    id                bigint       not null,
    description       varchar(250) null,
    from_warehouse_id bigint       null,
    to_store_id       bigint       null,
    status            tinyint(1)   null,
    start_time        datetime     null,
    end_time          datetime     null,
    create_by         bigint       null,
    create_at         datetime     null,
    update_by         bigint       null,
    update_at         datetime     null,
    primary key (id)
);

create index fk_export_from_warehouse
    on export_log (from_warehouse_id);

create index fk_export_to_store
    on export_log (to_store_id);

create table export_product
(
    id         bigint not null,
    log_id     bigint null comment 'ID phiếu xuất (liên kết với export_log)',
    product_id bigint null comment 'ID sản phẩm được xuất',
    quantity   int    null comment 'Số lượng sản phẩm xuất',
    batch_id   bigint null comment 'ID lô hàng tương ứng',
    primary key (id)
)
    comment 'Chi tiết sản phẩm trong phiếu xuất hàng';

create index fk_export_batch
    on export_product (batch_id);

create index fk_export_log
    on export_product (log_id);

create index fk_export_product
    on export_product (product_id);

create table history_pay
(
    id        bigint               not null,
    log_id    bigint               not null comment 'Khóa ngoại tới import_log.id',
    time_pay  datetime             null comment 'Thời gian thanh toán',
    method    varchar(250)         null comment 'Phương thức thanh toán: tiền mặt, chuyển khoản, v.v.',
    status    tinyint(1) default 1 null comment 'Trạng thái: TRUE = hoàn tất, FALSE = lỗi hoặc hủy',
    amount    bigint               null,
    create_by bigint               null comment 'Người tạo',
    create_at datetime             null,
    update_by bigint               null comment 'Người cập nhật',
    update_at datetime             null,
    primary key (id)
)
    comment 'Lịch sử các lần thanh toán cho phiếu nhập hàng';

create index history_pay_import_log_id_fk
    on history_pay (log_id);

create table import_log
(
    id               bigint       not null,
    description      varchar(250) null comment 'mô tả, ghi chú',
    from_supplier_id bigint       null comment 'ID nhà cung cấp (FK supplier)',
    to_warehouse_id  bigint       null comment 'ID kho nhập (FK warehouse)',
    start_time       datetime     null comment 'Thời gian bắt đầu nhập',
    end_time         datetime     null comment 'Thời gian hoàn tất nhập',
    total_amount     bigint       null,
    status           tinyint(1)   null comment 'Trạng thái phiếu nhập',
    create_by        bigint       null comment 'ID người tạo phiếu',
    create_at        datetime     null comment 'Thời gian tạo phiếu',
    update_by        bigint       null comment 'ID người cập nhật',
    update_at        datetime     null comment 'Thời gian cập nhật',
    primary key (id)
)
    comment 'Bảng ghi nhận các phiếu nhập hàng từ nhà cung cấp về kho';

create index import_log_supplier_id_fk
    on import_log (from_supplier_id);

create index import_log_warehouse_id_fk
    on import_log (to_warehouse_id);

create table import_product
(
    id         bigint       not null,
    log_id     bigint       not null comment 'Mã phiếu nhập',
    product_id bigint       not null comment 'ID sản phẩm',
    quantity   int          null comment 'Số lượng nhập',
    price      int          null,
    note       varchar(250) null comment 'Ghi chú',
    batch_id   bigint       null,
    primary key (id)
)
    comment 'Chi tiết sản phẩm trong từng phiếu nhập kho';

create index fk_import_batch
    on import_product (batch_id);

create index import_product_import_log_id_fk
    on import_product (log_id);

create index import_product_product_id_fk
    on import_product (product_id);

create table inventory
(
    id                            bigint              not null,
    warehouse_id                  bigint              not null,
    product_id                    bigint              not null,
    quantity_available            int default 0       null comment 'so luong hien co trong kho',
    minimum_quantity              int default 0       null comment 'nguong toi thieu de nhap kho, hoac canh bao ton kho',
    maximum_quantity              int default 1000000 null comment 'nguong toi da de canh bao ton kho',
    status                        tinyint(1)          null,
    create_by                     bigint              not null,
    create_at                     datetime            not null,
    update_at                     datetime            null,
    update_by                     bigint              null,
    suggest_day_minimum_warehouse datetime            null,
    batch_id                      bigint              not null,
    primary key (id)
)
    comment 'bang quan ly ton kho cua cac san pham';

create index fk_batch_inventory
    on inventory (batch_id);

create index inventory_product_id_fk
    on inventory (product_id);

create index inventory_warehouse_id_fk
    on inventory (warehouse_id);

create table manufacturing_location
(
    id          bigint       not null,
    name        varchar(150) null,
    email       varchar(150) null,
    phone       varchar(15)  null,
    address     varchar(250) null,
    status      tinyint(1)   null,
    description varchar(250) null,
    create_by   bigint       null,
    create_at   datetime     null,
    update_by   bigint       null,
    update_at   datetime     null,
    primary key (id)
)
    comment 'Bảng lưu thông tin các nhà cung cấp sản phẩm';

create table product
(
    id                        bigint        not null,
    sku                       varchar(250)  null comment 'mã vạch',
    name                      varchar(100)  null,
    seo_title                 varchar(250)  null comment 'tiêu đề',
    description               varchar(250)  null comment 'mô tả sản phẩm',
    status                    tinyint(1)    null,
    tag                       varchar(150)  null comment 'tag',
    image                     varchar(250)  null comment 'ảnh đại diên',
    list_image                text          null comment 'ảnh khác',
    price_normal              int           null,
    price_sell                int           null,
    promotion_price           int           null,
    vat                       decimal(4, 3) null comment 'thuế vat',
    weight                    decimal(5, 3) null comment 'trọng lượng',
    warranty                  varchar(50)   null comment 'Thời gian bảo hành',
    hot                       datetime      null comment 'thời điểm đánh dấu nối bật',
    view_count                int           null,
    category_id               bigint        null,
    brand_id                  bigint        null,
    manufacturing_location_id bigint        null comment 'nhà cung cấp sản phẩm',
    meta_keyword              varchar(100)  null comment 'key word mô ta để tìm kiếm',
    create_by                 bigint        null,
    create_at                 datetime      null,
    update_by                 bigint        null,
    update_at                 datetime      null,
    sellable                  tinyint(1)    null comment 'có được bán trực tiếp hay không',
    primary key (id)
)
    comment 'Bảng lưu thông tin chi tiết các sản phẩm';

create index product_ibfk_1
    on product (category_id);

create index product_ibfk_2
    on product (brand_id);

create index product_ibfk_3
    on product (manufacturing_location_id);

create table product_batch
(
    id          bigint       not null,
    description varchar(250) null,
    create_by   bigint       null,
    create_at   datetime     null,
    update_by   bigint       null,
    update_at   datetime     null,
    import_date datetime     not null,
    expiry_date datetime     null,
    name        varchar(250) null,
    primary key (id)
)
    comment 'Bảng để kiểm soát các lô nhập hàng';

create table return_log
(
    id                bigint                        not null,
    from_warehouse_id bigint                        not null comment 'Kho gửi hàng trả (FK tới warehouse)',
    to_supplier_id    bigint                        not null comment 'Nhà cung cấp nhận hàng trả (FK tới supplier)',
    reason            varchar(250)                  null comment 'Lý do trả hàng',
    return_date       datetime                      not null comment 'Ngày thực hiện trả hàng',
    total_refund      bigint                        null,
    status            varchar(50) default 'PENDING' null comment 'Trạng thái: PENDING, COMPLETED, CANCELLED',
    create_by         bigint                        null,
    create_at         datetime                      null,
    update_by         bigint                        null,
    update_at         datetime                      null,
    primary key (id)
)
    comment 'Phiếu trả hàng cho nhà cung cấp';

create index return_log_supplier_id_fk
    on return_log (to_supplier_id);

create index return_log_warehouse_id_fk
    on return_log (from_warehouse_id);

create table return_product
(
    id            bigint not null,
    return_log_id bigint not null comment 'fk toi return_log',
    product_id    bigint not null comment 'fk toi product id',
    quantity      int    not null comment 'so luong tra',
    unit_price    int    null,
    batch_id      bigint null,
    primary key (id)
)
    comment 'Chi tien san pham duoc tra theo phieu tra hang';

create index fk_return_batch
    on return_product (batch_id);

create index return_product_product_id_fk
    on return_product (product_id);

create index return_product_return_log_id_fk
    on return_product (return_log_id);

create table store
(
    id          bigint       not null comment 'Khóa chính, định danh cửa hàng',
    name        varchar(150) null comment 'Tên cửa hàng',
    email       varchar(150) null,
    address     varchar(250) null,
    description varchar(250) null,
    create_by   bigint       null comment 'ID người tạo cửa hàng',
    create_at   datetime     null comment 'Thời gian tạo cửa hàng',
    update_by   bigint       null comment 'ID người cập nhật gần nhất',
    update_at   datetime     null comment 'Thời gian cập nhật gần nhất',
    status      tinyint(1)   null comment 'Trạng thái cửa hàng: true = hoạt động',
    primary key (id)
)
    comment 'Bảng lưu thông tin các cửa hàng';

create table store_product
(
    id         bigint     not null,
    store_id   bigint     null,
    product_id bigint     null,
    quantity   int        null,
    create_by  bigint     null,
    create_at  datetime   null,
    update_by  bigint     null,
    update_at  datetime   null,
    batch_id   bigint     not null,
    status     tinyint(1) null,
    primary key (id)
);

create index fk_batch_product
    on store_product (batch_id);

create index fk_store
    on store_product (store_id);

create index fk_store_product
    on store_product (product_id);

create table supplier
(
    id          bigint       not null,
    name        varchar(150) null,
    email       varchar(150) null,
    address     varchar(150) null,
    description varchar(250) null,
    create_by   bigint       null comment 'ID người tạo',
    create_at   datetime     null comment 'Thời gian tạo',
    update_by   bigint       null comment 'ID người cập nhật',
    update_at   datetime     null comment 'Thời gian cập nhật',
    status      tinyint(1)   null comment 'Trạng thái kho: true = hoạt động',
    primary key (id)
)
    comment 'Bảng lưu thông tin nhà cung cấp';

create table warehouse
(
    id          bigint                         not null,
    name        varchar(150)                   not null comment 'Tên kho',
    email       varchar(150)                   not null comment 'Email liên hệ (nếu có)',
    address     varchar(250)                   not null comment 'Địa chỉ kho',
    description varchar(250)                   null comment 'Mô tả thêm (tùy chọn)',
    type        varchar(150) default 'GENERAL' null comment 'Loại kho: chính, phụ, trả hàng, trung chuyển,...',
    status      tinyint(1)   default 1         null comment 'Trạng thái: TRUE = đang hoạt động, FALSE = ngưng dùng',
    create_by   bigint                         not null comment 'Người tạo kho',
    create_at   datetime                       not null,
    update_by   bigint                         null,
    update_at   datetime                       null,
    primary key (id)
)
    comment 'Bảng quản lý thông tin các kho hàng trong hệ thống';


