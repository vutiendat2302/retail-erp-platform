package com.optima.inventory.dto.response;

import com.fasterxml.jackson.annotation.JsonGetter;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.databind.ser.std.ToStringSerializer;
import jakarta.persistence.Column;
import jakarta.persistence.Id;
import lombok.Data;

@Data
public class WarehouseResponseDto {
    @JsonSerialize(using = ToStringSerializer.class)
    private Long id;
    private String name;
    private String email;
    private String address;
    private String description;
    private boolean status;

    @Column(name = "create_by")
    private long createBy;

    @Column(name = "update_by")
    private long updateBy;

    @JsonGetter("status")
    public String getStatusString() {
        return this.status ? "active" : "inactive";
    }

}
