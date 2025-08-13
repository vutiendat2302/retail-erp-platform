package com.optima.inventory.entity;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.databind.ser.std.ToStringSerializer;
import jakarta.persistence.*;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "product")
@Data
public class ProductEntity {
    @Id
    @JsonSerialize(using = ToStringSerializer.class)
    private Long id;

    @Column(name = "qr_code")
    private String qrCode;

    private String name;

    @Column(name = "seo_title")
    private String seoTitle;

    private String description;
    private boolean status;
    private String tag;
    private String image;

    @Column(name = "list_image")
    private String listImage;

    @Column(name = "price_normal", precision = 18, scale = 3)
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
    private Long createBy;

    @Column(name = "create_at")
    private LocalDateTime createAt;

    @Column(name = "update_by")
    private Long updateBy;

    @Column(name = "update_at")
    private LocalDateTime updateAt;

    private Boolean sellable;

    @Column(name = "category_id")
    private Long categoryId;

    @Column(name = "brand_id")
    private Long brandId;

    @Column(name = "manufacturing_location_id")
    private Long manufacturingLocationId;

    @PrePersist
    protected void onCreate() {
        this.createAt = LocalDateTime.now();
        this.updateAt = LocalDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        this.updateAt = LocalDateTime.now();
    }
}
