package com.optima.inventory.entity;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.databind.ser.std.ToStringSerializer;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

import java.time.LocalDateTime;

@Entity
@Table(name = "store_product")
@Data
public class StoreProductEntity {
    @Id
    @JsonSerialize(using = ToStringSerializer.class)
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
