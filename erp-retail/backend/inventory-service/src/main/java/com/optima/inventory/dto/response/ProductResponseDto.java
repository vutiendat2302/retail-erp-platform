package com.optima.inventory.dto.response;

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
    private BigDecimal priceNormal;

    @Column(name = "price_sell")
    private BigDecimal priceSell;

    @Column(name = "promotion_price")
    private BigDecimal promotionPrice;

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

    private BrandResponseDto brandResponseDto;
    private CategoryResponseDto categoryResponseDto;
    private ManufacturingLocationResponseDto manufacturingLocationResponseDto;
}
