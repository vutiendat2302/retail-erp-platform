package com.optima.inventory.dto.response;

import jakarta.persistence.Column;
import jakarta.persistence.Id;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class BrandResponse {
    @Id
    private long id;
    private String name;
    private String description;
    private String country;

    @Column(name = "create_at")
    private LocalDateTime createAt;

    @Column(name = "created_by")
    private long createdBy;

    @Column(name = "update_at")
    private LocalDateTime updateAt;

    @Column(name = "update_by")
    private long updateBy;

    private Boolean status;
}
