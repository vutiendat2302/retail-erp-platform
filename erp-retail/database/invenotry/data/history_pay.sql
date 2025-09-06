create table history_pay
(
    id        bigint               not null
        primary key,
    log_id    bigint               not null comment 'Khóa ngoại tới import_log.id',
    time_pay  datetime             null comment 'Thời gian thanh toán',
    method    varchar(250)         null comment 'Phương thức thanh toán: tiền mặt, chuyển khoản, v.v.',
    status    tinyint(1) default 1 null comment 'Trạng thái: TRUE = hoàn tất, FALSE = lỗi hoặc hủy',
    amount    bigint               null,
    create_by bigint               null comment 'Người tạo',
    create_at datetime             null,
    update_by bigint               null comment 'Người cập nhật',
    update_at datetime             null
)
    comment 'Lịch sử các lần thanh toán cho phiếu nhập hàng';



INSERT INTO `optima-project-retail-manager`.history_pay (id, log_id, time_pay, method, status, amount, create_by, create_at, update_by, update_at) VALUES (1949742479873323008, 1949742123563003904, '2025-07-28 06:23:13', 'credit card', 1, 148799108329, 1450492617670998019, '2024-07-12 16:51:19', 1450492617670998020, '2025-07-28 15:03:26');
INSERT INTO `optima-project-retail-manager`.history_pay (id, log_id, time_pay, method, status, amount, create_by, create_at, update_by, update_at) VALUES (1949742479885905920, 1949742123546226688, '2025-07-28 05:25:24', 'paypal', 1, 155391382760, 1450492617670998019, '2025-01-29 10:27:28', 1450492617670998017, '2025-07-28 15:03:26');
INSERT INTO `optima-project-retail-manager`.history_pay (id, log_id, time_pay, method, status, amount, create_by, create_at, update_by, update_at) VALUES (1949742479890100224, 1949742123550420992, '2025-07-27 06:40:21', 'crypto', 1, 99830632916, 1450492617670998016, '2024-08-16 02:18:03', 1450492617670998018, '2025-07-28 15:03:26');
INSERT INTO `optima-project-retail-manager`.history_pay (id, log_id, time_pay, method, status, amount, create_by, create_at, update_by, update_at) VALUES (1949742479894294528, 1949742123571392513, '2025-07-28 01:28:07', 'debit card', 1, 149925543897, 1450492617670998020, '2024-08-19 20:48:35', 1450492617670998017, '2025-07-28 15:03:26');
INSERT INTO `optima-project-retail-manager`.history_pay (id, log_id, time_pay, method, status, amount, create_by, create_at, update_by, update_at) VALUES (1949742479898488832, 1949742123567198208, '2025-07-25 05:21:07', 'credit card', 1, 135773204424, 1450492617670998020, '2025-07-27 07:32:46', 1450492617670998020, '2025-07-28 15:03:26');
INSERT INTO `optima-project-retail-manager`.history_pay (id, log_id, time_pay, method, status, amount, create_by, create_at, update_by, update_at) VALUES (1949742479902683136, 1949742123558809600, '2025-07-26 11:34:53', 'debit card', 1, 113891901303, 1450492617670998020, '2023-12-26 07:33:58', 1450492617670998017, '2025-07-28 15:03:26');
INSERT INTO `optima-project-retail-manager`.history_pay (id, log_id, time_pay, method, status, amount, create_by, create_at, update_by, update_at) VALUES (1949742479906877440, 1949742123558809601, '2025-07-28 11:20:32', 'paypal', 1, 119835625716, 1450492617670998016, '2024-02-28 04:52:15', 1450492617670998018, '2025-07-28 15:03:26');
INSERT INTO `optima-project-retail-manager`.history_pay (id, log_id, time_pay, method, status, amount, create_by, create_at, update_by, update_at) VALUES (1949742479911071744, 1949742123567198209, '2025-07-27 15:44:09', 'credit card', 1, 108330748729, 1450492617670998017, '2024-09-27 00:56:40', 1450492617670998016, '2025-07-28 15:03:26');
INSERT INTO `optima-project-retail-manager`.history_pay (id, log_id, time_pay, method, status, amount, create_by, create_at, update_by, update_at) VALUES (1949742479915266048, 1949742123571392512, '2025-07-26 06:58:43', 'cash', 1, 163945980091, 1450492617670998020, '2024-06-28 21:22:43', 1450492617670998016, '2025-07-28 15:03:26');
INSERT INTO `optima-project-retail-manager`.history_pay (id, log_id, time_pay, method, status, amount, create_by, create_at, update_by, update_at) VALUES (1949742479919460352, 1949742123554615296, '2025-07-28 14:31:31', 'bank transfer', 1, 141530240080, 1450492617670998020, '2023-11-08 23:02:20', 1450492617670998018, '2025-07-28 15:03:26');
