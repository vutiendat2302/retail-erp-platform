package com.optima.inventory.dto.request;

import jakarta.persistence.Column;
import jakarta.persistence.Id;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class ProductBatchRequestDto {
    @Id
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
