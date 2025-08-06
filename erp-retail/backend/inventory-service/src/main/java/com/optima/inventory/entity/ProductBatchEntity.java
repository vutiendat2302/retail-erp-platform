package com.optima.inventory.entity;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.databind.ser.std.ToStringSerializer;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Cleanup;
import lombok.Data;

import java.time.LocalDateTime;

@Entity
@Table(name = "product_batch")
@Data
public class ProductBatchEntity {
    @Id
    @JsonSerialize(using = ToStringSerializer.class)
    private long id;
    private String description;

    @Column(name = "create_by")
    private long createBy;

    @Column(name = "create_at")
    private LocalDateTime createAt;

    @Column(name = "update_by")
    private long updateBy;

    @Column(name = "update_at")
    private LocalDateTime updateAt;

    @Column(name = "import_date")
    private LocalDateTime importDate;

    @Column(name = "expiry_date")
    private LocalDateTime expiryDate;
}
