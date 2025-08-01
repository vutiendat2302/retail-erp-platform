package com.optima.inventory.dto.response;

import jakarta.persistence.Column;
import jakarta.persistence.Id;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class WarehouseResponse {
    @Id
    private long id;
    private String email;
    private String address;
    private String description;
    private String type;
    private Boolean status;

    @Column(name = "create_by")
    private long createBy;

    @Column(name = "create_at")
    private LocalDateTime createAt;

    @Column(name = "update_by")
    private long updateBy;

    @Column(name = "update_at")
    private LocalDateTime updateAt;
}
