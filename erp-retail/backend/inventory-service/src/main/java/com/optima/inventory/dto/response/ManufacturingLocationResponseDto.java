package com.optima.inventory.dto.response;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.databind.ser.std.ToStringSerializer;
import lombok.Data;

@Data
public class ManufacturingLocationResponseDto {
    @JsonSerialize(using = ToStringSerializer.class)
    private long id;
    private String name;
}
