package com.optima.inventory.repository;

import com.optima.inventory.entity.ProductEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<ProductEntity, Long> {

    public interface ProductView {
        Long getId();
        String getName();
        String getDescription();
        String getSku();
        String getStatus();
        int getPriceNormal();
        String getBrandName();
        String getCategoryName();
        String getManufacturingLocationName();
        Long getBrandId();
        Long getCategoryId();
        Long getManufacturingLocationId();
        String getSeoTitle();
        String getTag();
        int getPriceSell();
        int getPromotionPrice();
        BigDecimal getVat();
        BigDecimal getWeight();
        String getMetaKeyword();
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
        a.priceNormal as priceNormal,
        a.status as status,
        a.seoTitle as seoTitle,
        a.tag as tag,
        a.priceSell as priceSell,
        a.promotionPrice as promotionPrice,
        a.vat as vat,
        a.weight as weight,
        a.metaKeyword as metaKeyword,
        a.createBy as createBy,
        a.updateBy as updateBy,
        a.createAt as createAt,
        a.updateAt as updateAt,
        b.name as brandName,
        c.name as categoryName,
        d.name as manufacturingLocationName,
        b.id as brandId,
        c.id as categoryId,
        d.id as manufacturingLocationId,
        a.sku as sku
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
        a.seoTitle as seoTitle,
        a.tag as tag,
        a.priceSell as priceSell,
        a.promotionPrice as promotionPrice,
        a.vat as vat,
        a.weight as weight,
        a.metaKeyword as metaKeyword,
        a.createBy as createBy,
        a.updateBy as updateBy,
        a.createAt as createAt,
        a.updateAt as updateAt,
        b.name as brandName,
        c.name as categoryName,
        d.name as manufacturingLocationName,
        b.id as brandId,
        d.id as manufacturingLocationId,
        c.id as categoryId,
        a.sku as sku
    from ProductEntity a
    left join BrandEntity b on a.brandId = b.id
    left join CategoryEntity c on a.categoryId = c.id
    left join ManufacturingLocationEntity d on a.manufacturingLocationId = d.id
    """)
    Page<ProductView> findAllIn4(Pageable pageable);


    @Query("""
    select count(a.id)
    from ProductEntity a
    where a.status = true
    """)
    int getCountProductActive();
}
