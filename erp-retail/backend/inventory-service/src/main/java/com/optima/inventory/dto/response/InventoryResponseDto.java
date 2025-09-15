package com.optima.inventory.dto.response;

import com.fasterxml.jackson.annotation.JsonGetter;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.databind.ser.std.ToStringSerializer;
import jakarta.persistence.Column;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class InventoryResponseDto {

    @JsonSerialize(using = ToStringSerializer.class)
    private Long id;
    private int quantityAvailable;
    private int minimumQuantity;
    private int maximumQuantity;
    private boolean status;
    private long createBy;
    private long updateBy;
    private LocalDateTime suggestDayMinimumWarehouse;
    private String productBatchName;
    private String productName;
    private String warehouseName;
    private LocalDateTime expiryDate;
    private LocalDateTime importDate;
    private int priceNormal;
    private String manufacturingLocation;

    @JsonGetter("status")
    public String getStatusString() {
        return this.status ? "active" : "inactive";
    }
}
