package com.optima.inventory.dto.response;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.databind.ser.std.ToStringSerializer;
import jakarta.persistence.Column;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class BrandResponseDto {
    @JsonSerialize(using = ToStringSerializer.class)
    private Long id;
    private String name;
    private String description;
    private String country;
    private LocalDateTime createAt;
    private long createdBy;
    private LocalDateTime updateAt;
    private long updateBy;
    private boolean status;
}
