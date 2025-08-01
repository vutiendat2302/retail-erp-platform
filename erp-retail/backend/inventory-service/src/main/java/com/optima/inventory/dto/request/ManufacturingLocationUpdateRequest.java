package com.optima.inventory.dto.request;

import jakarta.persistence.Column;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class ManufacturingLocationUpdateRequest {
    private String name;
    private String email;
    private String phone;
    private Boolean status;
    private String description;
    @Column(name = "create_by")
    private long createBy;

    @Column(name = "create_at")
    private LocalDateTime createAt;

    @Column(name = "update_by")
    private long updateBy;

    @Column(name = "update_at")
    private LocalDateTime updateAt;
}
