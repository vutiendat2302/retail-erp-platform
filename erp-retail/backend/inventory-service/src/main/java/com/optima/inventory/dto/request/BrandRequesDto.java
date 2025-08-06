package com.optima.inventory.dto.request;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.databind.ser.std.ToStringSerializer;
import jakarta.persistence.Column;
import jakarta.persistence.Id;
import jakarta.validation.constraints.Size;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class BrandRequesDto {
    @JsonSerialize(using = ToStringSerializer.class)
    private Long id;

    @Size(min = 4, message = "Name must be at least 4 character")
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
