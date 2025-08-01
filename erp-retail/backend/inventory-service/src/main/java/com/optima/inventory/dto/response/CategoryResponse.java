package com.optima.inventory.dto.response;

import jakarta.persistence.Column;
import jakarta.persistence.Id;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class CategoryResponse {
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
