package com.optima.inventory.dto.response;

import com.fasterxml.jackson.annotation.JsonGetter;
import com.fasterxml.jackson.annotation.JsonSetter;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.databind.ser.std.ToStringSerializer;
import jakarta.persistence.Column;
import jakarta.persistence.Id;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class SupplierResponseDto {
    @JsonSerialize(using = ToStringSerializer.class)
    private long id;
    private String name;
    private String email;
    private String address;
    private String description;
    private long createBy;
    private LocalDateTime createAt;
    private long updateBy;
    private LocalDateTime updateAt;
    private Boolean status;
    private String phone;

    @JsonGetter("status")
    public String getStatusString() {
        return this.status ? "active" : "inactive";
    }

    @JsonSetter("status")
    public void setStatusString(String status) {
        this.status = "active".equalsIgnoreCase(status);
    }
}
