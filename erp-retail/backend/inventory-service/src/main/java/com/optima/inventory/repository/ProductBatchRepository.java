package com.optima.inventory.repository;

import com.optima.inventory.entity.ProductBatchEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface ProductBatchRepository extends JpaRepository<ProductBatchEntity, Long> {
    @Query("""
    select count(b.id)
    from ProductBatchEntity b
    where b.expiryDate between :now and :oneMonthLater
    """)
    int countExpiringBatches(@Param("now") LocalDateTime now,
                             @Param("oneMonthLater") LocalDateTime oneMonthLater);

}
