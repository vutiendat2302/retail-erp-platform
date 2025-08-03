package com.optima.inventory.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.math.BigDecimal;
import java.math.BigInteger;
import java.time.LocalDateTime;

@Entity
@Table(name = "product")
@Data
public class ProductEntity {
    @Id
    private long id;

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

    @Column(name = "manufacturing_location_id")
    private long manufacturingLocationId;

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

    @JoinColumn(name = "brand_id")
    private long brandId;

    @Column(name = "category_id")
    private long categoryId;

}
