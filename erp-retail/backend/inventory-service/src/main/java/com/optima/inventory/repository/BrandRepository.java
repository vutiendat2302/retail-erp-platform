package com.optima.inventory.repository;

import com.optima.inventory.entity.BrandEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface BrandRepository extends JpaRepository<BrandEntity, Long> {
    public interface BrandNameView {
        Long getId();
        String getName();
    }

    @Query("""
    select
        a.id as id,
        a.name as name
    from BrandEntity a
    """)
    List<BrandNameView> getBrandName();

    @Query("""
    select count(a.id)
    from BrandEntity a
    where a.status = true
    """)
    int getCountBrandActive();

    public interface BrandView {
        Long getId();
        String getName();
        String getDescription();
        String getCountry();
        String getStatus();
        Long getCreateBy();
        Long getUpdateBy();
        LocalDateTime getCreateAt();
        LocalDateTime getUpdateAt();
    }

    @Query("""
    select
        a.id as id,
        a.name as name,
        a.description as description,
        a.country as country,
        a.createdBy as createdBy,
        a.updateBy as updateBy,
        a.createAt as createAt,
        a.updateAt as updateAt,
        a.status as status
    from BrandEntity a
    where
    (
        :search IS NULL
        or lower(a.name) like  lower(concat('%', :search, '%'))
    ) and (:status is null or a.status = :status)
    """)
    Page<BrandView> getSearchAllIn4(
            @Param("search") String search,
            @Param("status") Boolean status,
            Pageable pageable
    );
}


