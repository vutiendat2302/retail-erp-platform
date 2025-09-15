package com.optima.inventory.dto.response;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.databind.ser.std.ToStringSerializer;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class ProductBatchNameResponse {
    @JsonSerialize(using = ToStringSerializer.class)
    private Long id;
    private String name;
}
