package com.optima.inventory.repository;

import com.optima.inventory.entity.ProductEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<ProductEntity, Long> {

    public interface ProductView {
        Long getId();
        String getName();
        String getDescription();
        boolean getStatus();
        BigDecimal getPriceNormal();
        String getBrandName();
        String getCategoryName();
        String getManufacturingLocationName();
    }

    @Query("""
    select 
        a.id as id,
        a.name as name,
        a.description as description,
        a.priceNormal as priceNormal,
        a.status as status,
        b.name as brandName,
        c.name as categoryName,
        d.name as manufacturingLocationName

    from ProductEntity a
    left join BrandEntity b on a.brandId = b.id
    left join CategoryEntity c on a.categoryId = c.id
    left join ManufacturingLocationEntity d on a.manufacturingLocationId = d.id
    """)

    List<ProductView> findAllWithBrandCategoryManufacturing();

    @Query("""
    select
        a.id as id,
        a.name as name,
        a.description as description,
        a.priceNormal as priceNormal,
        a.status as status,
        b.name as brandName,
        c.name as categoryName,
        d.name as manufacturingLocationName
    from ProductEntity a
    left join BrandEntity b on a.brandId = b.id
    left join CategoryEntity c on a.categoryId = c.id
    left join ManufacturingLocationEntity d on a.manufacturingLocationId = d.id
    """)
    Page<ProductView> findAllIn4(Pageable pageable);
}
