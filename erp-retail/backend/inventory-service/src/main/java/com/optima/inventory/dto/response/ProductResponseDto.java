package com.optima.inventory.dto.response;

import com.fasterxml.jackson.annotation.JsonGetter;
import com.fasterxml.jackson.annotation.JsonSetter;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.databind.ser.std.ToStringSerializer;
import jakarta.persistence.Column;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
public class ProductResponseDto {

    @JsonSerialize(using = ToStringSerializer.class)
    private Long id;
    private String sku;
    private String name;
    private String seoTitle;
    private String description;
    private boolean status;
    private String tag;
    private int priceNormal;
    private int priceSell;
    private int promotionPrice;
    private BigDecimal vat;
    private BigDecimal weight;
    private String warranty;
    private int viewCount;
    private String metaKeyword;
    @JsonSerialize(using = ToStringSerializer.class)
    private Long createBy;
    @JsonSerialize(using = ToStringSerializer.class)
    private Long updateBy;
    private String categoryName;
    private String brandName;
    private String manufacturingLocationName;
    @JsonSerialize(using = ToStringSerializer.class)
    private Long categoryId;
    @JsonSerialize(using = ToStringSerializer.class)
    private Long brandId;
    @JsonSerialize(using = ToStringSerializer.class)
    private Long manufacturingLocationId;
    private LocalDateTime createAt;
    private LocalDateTime updateAt;

    @JsonGetter("status")
    public String getStatusString() {
        return this.status ? "active" : "inactive";
    }

    @JsonSetter("status")
    public void setStatusString(String status) {
        this.status = "active".equalsIgnoreCase(status);
    }
}
