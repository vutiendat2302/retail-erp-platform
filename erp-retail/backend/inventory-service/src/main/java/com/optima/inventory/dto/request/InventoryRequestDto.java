package com.optima.inventory.dto.request;

import jakarta.persistence.Column;
import jakarta.persistence.Id;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class InventoryRequestDto {
    @Id
    private long id;

    @Column(name = "warehouse_id")
    private long warehouseId;

    @Column(name = "product_id")
    private long productId;

    @Column(name = "quantity_available")
    private int quantityAvailable;

    @Column(name = "minimum_quantity")
    private int minimumQuantity;

    @Column(name = "maximum_quantity")
    private int maximumQuantity;

    private Boolean status;

    @Column(name = "create_by")
    private long createBy;

    @Column(name = "create_at")
    private LocalDateTime createAt;

    @Column(name = "update_by")
    private long updateBy;

    @Column(name = "update_at")
    private LocalDateTime updateAt;

    @Column(name = "suggest_day_minimum_warehouse")
    private LocalDateTime suggestDayMinimumWarehouse;

    @Column(name = "batch_id")
    private long batchId;
}
