package com.optima.inventory.repository;

import com.optima.inventory.entity.InventoryEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.querydsl.binding.QuerydslPredicate;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.math.BigInteger;
import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface InventoryRepository extends JpaRepository<InventoryEntity, Long> {

    public interface InventoryView {
        Long getId();
        int getQuantityAvailable();
        int getMinimumQuantity();
        int getMaximumQuantity();
        String getStatus();
        String getProductBatchName();
        String getProductName();
        String getWarehouseName();
        int getPriceNormal();
        LocalDateTime getImportDate();
        LocalDateTime getExpiryDate();
        String getManufacturingLocation();
    }

    @Query("""
    select
        a.id as id,
        a.quantityAvailable as quantityAvailable,
        a.minimumQuantity as minimumQuantity,
        a.status as status,
        a.maximumQuantity as maximumQuantity,
        b.name as productBatchName,
        c.name as productName,
        d.name as warehouseName,
        b.expiryDate as expiryDate,
        b.importDate as importDate,
        c.priceNormal as priceNormal
    from InventoryEntity a
    inner join ProductBatchEntity b on a.productBatchId = b.id
    inner join ProductEntity c on a.productId = c.id
    inner join WarehouseEntity d on a.warehouseId = d.id
    where d.id = :warehouseIdFind
    """)

    List<InventoryView> findInventoryByWarehouse(@Param("warehouseIdFind") Long warehouseIdFind);

    @Query("""
    select
        a.id as id,
        a.quantityAvailable as quantityAvailable,
        a.minimumQuantity as minimumQuantity,
        a.status as status,
        a.maximumQuantity as maximumQuantity,
        b.name as productBatchName,
        c.name as productName,
        d.name as warehouseName,
        b.expiryDate as expiryDate,
        b.importDate as importDate,
        c.priceNormal as priceNormal
    from InventoryEntity a
    left join ProductBatchEntity b on a.productBatchId = b.id
    left join ProductEntity c on a.productId = c.id
    left join WarehouseEntity d on a.warehouseId = d.id
    """)
    Page<InventoryView> findAllInf(Pageable pageable);

    @Query("""
    select sum(c.priceNormal * a.quantityAvailable)
    from InventoryEntity a
    join ProductBatchEntity b on a.productBatchId = b.id
    join ProductEntity c on a.productId = c.id
    join WarehouseEntity d on d.id = a.warehouseId
    where d.id = :warehouseId
    """)
    BigInteger getTotalPriceNormal(@Param("warehouseId")Long warehouseId);

    @Query("""
    select count(distinct c.id)
    from InventoryEntity a
    join ProductEntity c on a.productId = c.id
    join WarehouseEntity d on d.id = a.warehouseId
    where d.id = :warehouseId
    """)
    BigInteger getCountProductInWarehouse(@Param("warehouseId") Long warehouseId);

    @Query("""
    select sum(a.quantityAvailable)
    from InventoryEntity a
    join ProductBatchEntity b on a.productBatchId = b.id
    join ProductEntity c on a.productId = c.id
    join WarehouseEntity d on d.id = a.warehouseId
    where d.id = :warehouseId
    """)
    BigInteger getSumQuantityProductInWarehouse(@Param("warehouseId") Long warehouseId);

    @Query("""
    select count(c.id)
    from InventoryEntity a
    join ProductBatchEntity b on a.productBatchId = b.id
    join ProductEntity c on a.productId = c.id
    join WarehouseEntity d on d.id = a.warehouseId
    where d.id = :warehouseId and b.expiryDate < :afterTimeNow
    """)
    int getCountProductsNearExpiry(@Param("warehouseId") Long warehouseId,
                                        @Param("afterTimeNow") LocalDateTime afterTimeNow
    );

    @Query("""
    select count(c.id)
    from InventoryEntity a
    join ProductBatchEntity b on a.productBatchId = b.id
    join ProductEntity c on a.productId = c.id
    join WarehouseEntity d on d.id = a.warehouseId
    where d.id = :warehouseId and a.quantityAvailable < a.minimumQuantity
    """)
    int getCountProductsNearOut(@Param("warehouseId") Long warehouseId);

    @Query("""
    select
        a.id as id,
        a.quantityAvailable as quantityAvailable,
        a.minimumQuantity as minimumQuantity,
        a.status as status,
        a.maximumQuantity as maximumQuantity,
        b.name as productBatchName,
        c.name as productName,
        d.name as warehouseName,
        b.expiryDate as expiryDate,
        b.importDate as importDate,
        c.priceNormal as priceNormal,
        e.name as manufacturingLocation
    from InventoryEntity a
    join ProductBatchEntity b on a.productBatchId = b.id
    join ProductEntity c on a.productId = c.id
    join WarehouseEntity d on a.warehouseId = d.id
    join ManufacturingLocationEntity  e on e.id = c.manufacturingLocationId
    where
        (
        d.id = :warehouseId
        and
        (:productName is null
            or lower(c.name) like lower(concat('%', :productName, '%')))
        and (:productBatch is null or a.productBatchId = :productBatch)
    )
    """)

    Page<InventoryView> getSearchAllIn4(
            @Param("warehouseId") Long warehouseId,
            @Param("productName") String productName,
            @Param("productBatch") Long productBatch,
            Pageable pageable
    );
}
