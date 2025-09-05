package com.optima.inventory.dto.response;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.databind.ser.std.ToStringSerializer;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class ManufacturingLocationResponseDto {
    @JsonSerialize(using = ToStringSerializer.class)
    private Long id;
    private String name;
    private String email;
    private String phone;
    private boolean status;
    private String description;
    private long createBy;
    private LocalDateTime createAt;
    private long updateBy;
    private LocalDateTime updateAt;
    private String address;
}
