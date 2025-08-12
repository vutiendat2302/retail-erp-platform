package com.optima.inventory.dto.request;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.databind.ser.std.ToStringSerializer;
import com.optima.inventory.entity.BrandEntity;
import com.optima.inventory.entity.CategoryEntity;
import com.optima.inventory.entity.ManufacturingLocationEntity;
import jakarta.persistence.*;
import jakarta.validation.constraints.Size;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
public class ProductRequestDto {

    @JsonSerialize(using = ToStringSerializer.class)
    private Long id;
    private Long brandId;
    private Long categoryId;
    private Long manufacturingLocationId;

    @Column(name = "qr_code")
    private String qrCode;

    private String name;

    @Column(name = "seo_title")
    private String seoTitle;

    private String description;
    private Boolean status;
    private String tag;
    private String image;

    @Column(name = "list_image")
    private String listImage;

    @Column(name = "price_normal")
    private int priceNormal;

    @Column(name = "price_sell")
    private int priceSell;

    @Column(name = "promotion_price")
    private int promotionPrice;

    private BigDecimal vat;
    private BigDecimal weight;
    private String warranty;
    private LocalDateTime hot;

    @Column(name = "view_count")
    private int viewCount;

    @Column(name = "meta_keyword")
    private String metaKeyword;

    @Column(name = "create_by")
    private long createBy;

    @Column(name = "create_at")
    private LocalDateTime createAt;

    @Column(name = "update_by")
    private long updateBy;

    @Column(name = "update_at")
    private LocalDateTime updateAt;

    private Boolean sellable;
}
