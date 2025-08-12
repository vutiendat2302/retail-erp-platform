package com.optima.inventory.dto.response;

import com.fasterxml.jackson.annotation.JsonGetter;
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

    @Column(name = "sku")
    private String sku;

    private String name;

    @Column(name = "seo_title")
    private String seoTitle;

    private String description;
    private boolean status;
    private String tag;

    @Column(name = "price_normal")
    private int priceNormal;

    @Column(name = "price_sell")
    private int priceSell;

    @Column(name = "promotion_price")
    private int promotionPrice;

    private BigDecimal vat;
    private BigDecimal weight;
    private String warranty;

    @Column(name = "view_count")
    private int viewCount;

    @Column(name = "meta_keyword")
    private String metaKeyword;

    @Column(name = "create_by")
    private Long createBy;

    @Column(name = "update_by")
    private Long updateBy;

    private String categoryName;
    private String brandName;
    private String manufacturingLocationName;

    @JsonGetter("status")
    public String getStatusString() {
        return this.status ? "Active" : "Inactive";
    }
}
