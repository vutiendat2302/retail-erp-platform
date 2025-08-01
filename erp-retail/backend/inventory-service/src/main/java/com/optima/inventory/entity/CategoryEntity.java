package com.optima.inventory.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

import java.time.LocalDateTime;

@Entity
@Table(name = "category")
@Data
public class CategoryEntity {
    @Id
    private long id;
    private String name;

    @Column(name = "seo_title")
    private String seoTitle;
    private String description;
    private Boolean status;
    private long parent_id;

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

    @Column(name = "small_image")
    private String smallImage;
}
