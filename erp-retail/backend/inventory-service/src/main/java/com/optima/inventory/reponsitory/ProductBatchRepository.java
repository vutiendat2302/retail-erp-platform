package com.optima.inventory.reponsitory;

import com.optima.inventory.entity.ProductBatchEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductBatchRepository extends JpaRepository<ProductBatchEntity, Long> {
}
