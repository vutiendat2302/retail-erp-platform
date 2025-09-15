package com.optima.inventory.repository;

import com.optima.inventory.entity.CategoryEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface CategoryRepository extends JpaRepository<CategoryEntity, Long> {
    public interface CategoryNameView {
        Long getId();
        String getName();
    }

    @Query("""
    select
        a.id as id,
        a.name as name
    from CategoryEntity a
    """)
    List<CategoryNameView> getCategoryName();

    @Query("""
    select count(a.id)
    from CategoryEntity a
    where a.status = true
    """)
    int getCountCategoryActive();

    public interface CategoryView {
        Long getId();
        String getName();
        String getDescription();
        String seoTitle();
        String getStatus();
        String getMetaKeyword();
        Long parentId();
        Long getCreateBy();
        Long getUpdateBy();
        LocalDateTime getCreateAt();
        LocalDateTime getUpdateAt();
        String smallImage();
    }

    @Query("""
    select 
        a.id as id,
        a.name as name,
        a.description as description,
        a.seoTitle as seoTitle,
        a.metaKeyword as metaKeyword,
        a.parentId as parentId,
        a.createBy as createBy,
        a.updateBy as updateBy,
        a.createAt as createAt,
        a.updateAt as updateAt,
        a.smallImage as smallImage,
        a.status as status
    from CategoryEntity a
    where 
    (
        :search IS NULL
        or lower(a.name) like  lower(concat('%', :search, '%'))
    ) and (:status is null or a.status = :status)
    """)
    Page<CategoryView> getSearchAllIn4(
            @Param("search") String search,
            @Param("status") Boolean status,
            Pageable pageable
    );
}
