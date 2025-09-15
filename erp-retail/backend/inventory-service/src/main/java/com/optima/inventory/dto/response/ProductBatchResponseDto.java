package com.optima.inventory.dto.response;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.databind.ser.std.ToStringSerializer;
import jakarta.persistence.Column;
import jakarta.persistence.Id;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class ProductBatchResponseDto {
    @JsonSerialize(using = ToStringSerializer.class)
    private Long id;
    private String description;
    private String name;
    private long createBy;
    private LocalDateTime createAt;
    private long updateBy;
    private LocalDateTime updateAt;
    private LocalDateTime importDate;
    private LocalDateTime expiryDate;
}
