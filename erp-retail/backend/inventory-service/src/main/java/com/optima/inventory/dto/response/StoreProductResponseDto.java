package com.optima.inventory.dto.response;

import jakarta.persistence.Column;
import jakarta.persistence.Id;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class StoreProductResponseDto {
    @Id
    private long id;

    @Column(name = "store_id")
    private long storeId;

    @Column(name = "product_id")
    private long productId;

    private int quantity;

    @Column(name = "create_by")
    private long createBy;

    @Column(name = "create_at")
    private LocalDateTime createAt;

    @Column(name = "update_by")
    private long updateBy;

    @Column(name = "update_at")
    private LocalDateTime updateAt;

    @Column(name = "batch_id")
    private long batchId;

    private Boolean status;
}
