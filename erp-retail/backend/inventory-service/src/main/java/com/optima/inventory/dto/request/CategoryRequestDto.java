package com.optima.inventory.dto.request;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.databind.ser.std.ToStringSerializer;
import jakarta.persistence.Column;
import jakarta.persistence.Id;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class CategoryRequestDto {
    @JsonSerialize(using = ToStringSerializer.class)
    private Long id;
    private String name;

    @Column(name = "seo_title")
    private String seoTitle;
    private String description;
    private Boolean status;

    @Column(name = "parent_id", nullable = true)
    private Long parentId;

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
