package com.optima.inventory.dto.response;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.databind.ser.std.ToStringSerializer;
import lombok.Data;

@Data
public class ManufacturingLocationNameResponse {
    @JsonSerialize(using = ToStringSerializer.class)
    private Long id;
    private String name;
}
