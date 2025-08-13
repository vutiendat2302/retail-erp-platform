package com.optima.inventory.repository;

import com.optima.inventory.entity.InventoryEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.querydsl.binding.QuerydslPredicate;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface InventoryRepository extends JpaRepository<InventoryEntity, Long> {

    public interface InventoryView {
        Long getId();
        int getQuantityAvailable();
        int getMinimumQuantity();
        int getMaximumQuantity();
        boolean getStatus();
        String getProductBatchName();
        String getProductName();
        String getWarehouseName();

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
        d.name as warehouseName
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
        d.name as warehouseName
    from InventoryEntity a
    left join ProductBatchEntity b on a.productBatchId = b.id
    left join ProductEntity c on a.productId = c.id
    left join WarehouseEntity d on a.warehouseId = d.id
    """)
    Page<InventoryView> findAllInf(Pageable pageable);
}
