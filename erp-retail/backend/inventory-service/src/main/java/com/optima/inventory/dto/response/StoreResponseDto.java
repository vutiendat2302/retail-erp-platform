package com.optima.inventory.dto.response;

import com.fasterxml.jackson.annotation.JsonGetter;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.databind.ser.std.ToStringSerializer;
import jakarta.persistence.Column;
import jakarta.persistence.Id;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class StoreResponseDto {
    @JsonSerialize(using = ToStringSerializer.class)
    private Long id;
    private String name;
    private String address;
    private String description;

    @Column(name = "create_by")
    private long createBy;

    @Column(name = "update_by")
    private long updateBy;

    private boolean status;

    @JsonGetter("status")
    public String getStatusString() {
        return this.status ? "active" : "inactive";
    }

    public void isStatus(String status) {
        if (status.equalsIgnoreCase("active")) {
            this.status = true;
        } else {
            this.status = false;
        }
    }
}
