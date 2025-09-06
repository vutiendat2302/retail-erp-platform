create table return_log
(
    id                bigint                        not null
        primary key,
    from_warehouse_id bigint                        not null comment 'Kho gửi hàng trả (FK tới warehouse)',
    to_supplier_id    bigint                        not null comment 'Nhà cung cấp nhận hàng trả (FK tới supplier)',
    reason            varchar(250)                  null comment 'Lý do trả hàng',
    return_date       datetime                      not null comment 'Ngày thực hiện trả hàng',
    total_refund      bigint                        null,
    status            varchar(50) default 'PENDING' null comment 'Trạng thái: PENDING, COMPLETED, CANCELLED',
    create_by         bigint                        null,
    create_at         datetime                      null,
    update_by         bigint                        null,
    update_at         datetime                      null
)
    comment 'Phiếu trả hàng cho nhà cung cấp';



INSERT INTO `optima-project-retail-manager`.return_log (id, from_warehouse_id, to_supplier_id, reason, return_date, total_refund, status, create_by, create_at, update_by, update_at) VALUES (1954796198109294592, 1954794442793070592, 1954793639772598273, 'Mỗi tự của mà chỉ tự các của trong thay đúng nơi một của rất giống dưới.', '2023-10-17 01:55:08', 5837116277, '1', 1450492617670998016, '2025-04-06 14:58:27', 1450492617670998018, '2025-08-11 13:45:06');
INSERT INTO `optima-project-retail-manager`.return_log (id, from_warehouse_id, to_supplier_id, reason, return_date, total_refund, status, create_by, create_at, update_by, update_at) VALUES (1954796198117683200, 1954794442805653504, 1954793639822929921, 'Dưới nhiều vẫn đi trong từ này một nhiều cho sẽ đó từ của tại.', '2023-11-27 21:24:49', 4808908897, '1', 1450492617670998016, '2025-01-10 19:59:53', 1450492617670998019, '2025-08-11 13:45:06');
INSERT INTO `optima-project-retail-manager`.return_log (id, from_warehouse_id, to_supplier_id, reason, return_date, total_refund, status, create_by, create_at, update_by, update_at) VALUES (1954796198121877504, 1954794442814042112, 1954793639785181186, 'Gần làm dưới về được chưa với vài này thay từ là đã mà giống như tự vì đến rất gần từ mà cho đúng.', '2024-01-13 14:51:55', 7908690701, '1', 1450492617670998018, '2023-11-20 02:30:45', 1450492617670998016, '2025-08-11 13:45:06');
INSERT INTO `optima-project-retail-manager`.return_log (id, from_warehouse_id, to_supplier_id, reason, return_date, total_refund, status, create_by, create_at, update_by, update_at) VALUES (1954796198126071808, 1954794442818236416, 1954793639743238144, 'Các làm theo từng một đã dưới nào lớn là rất thì đến nơi và về dưới cái rất dưới giống.', '2024-05-20 12:33:23', 7775423610, '1', 1450492617670998019, '2024-03-31 01:08:50', 1450492617670998018, '2025-08-11 13:45:06');
INSERT INTO `optima-project-retail-manager`.return_log (id, from_warehouse_id, to_supplier_id, reason, return_date, total_refund, status, create_by, create_at, update_by, update_at) VALUES (1954796198130266112, 1954794442822430720, 1954793639793569792, 'Vì về sẽ một mỗi về sẽ giống nơi với làm vài đó thì để cách nhiều.', '2024-05-25 05:46:27', 7570646468, '1', 1450492617670998020, '2025-03-13 10:02:07', 1450492617670998019, '2025-08-11 13:45:06');
INSERT INTO `optima-project-retail-manager`.return_log (id, from_warehouse_id, to_supplier_id, reason, return_date, total_refund, status, create_by, create_at, update_by, update_at) VALUES (1954796198130266113, 1954794442822430721, 1954793639780986881, 'Làm bên tôi mỗi giữa điều như tự hoặc từ và để nếu như với vẫn của người vẫn như có là hoặc cho.', '2023-08-19 17:54:16', 8893586899, '1', 1450492617670998020, '2024-05-09 16:47:52', 1450492617670998020, '2025-08-11 13:45:06');
INSERT INTO `optima-project-retail-manager`.return_log (id, from_warehouse_id, to_supplier_id, reason, return_date, total_refund, status, create_by, create_at, update_by, update_at) VALUES (1954796198134460416, 1954794442826625024, 1954793639772598273, 'Có cũng tại nhưng mỗi tôi tại đang như từ từng được đó chưa với của theo hơn tại sẽ sẽ khiến rất.', '2024-09-25 14:35:34', 8115683667, '1', 1450492617670998017, '2024-03-17 13:28:36', 1450492617670998020, '2025-08-11 13:45:06');
INSERT INTO `optima-project-retail-manager`.return_log (id, from_warehouse_id, to_supplier_id, reason, return_date, total_refund, status, create_by, create_at, update_by, update_at) VALUES (1954796198134460417, 1954794442830819328, 1954793639760015360, 'Cũng hoặc cho thì cho vẫn mà được chỉ là đang trong thay của để làm về.', '2023-11-24 08:00:21', 6612392008, '1', 1450492617670998020, '2024-03-10 13:58:57', 1450492617670998017, '2025-08-11 13:45:06');
INSERT INTO `optima-project-retail-manager`.return_log (id, from_warehouse_id, to_supplier_id, reason, return_date, total_refund, status, create_by, create_at, update_by, update_at) VALUES (1954796198159626240, 1954794442830819329, 1954793639806152705, 'Khi từng vậy như đúng vì cái lớn để số nếu được của để đó số như thì tự thì cũng đó bạn.', '2024-08-06 17:32:37', 6636053716, '1', 1450492617670998018, '2025-03-29 10:03:31', 1450492617670998020, '2025-08-11 13:45:06');
INSERT INTO `optima-project-retail-manager`.return_log (id, from_warehouse_id, to_supplier_id, reason, return_date, total_refund, status, create_by, create_at, update_by, update_at) VALUES (1954796198176403456, 1954794442835013632, 1954793639806152704, 'Với được thế để nhưng cũng từ này người nhiều từng có đã để có được nào tự đến để vài.', '2024-11-10 10:51:49', 6152541510, '1', 1450492617670998020, '2023-10-29 18:52:07', 1450492617670998020, '2025-08-11 13:45:06');
