package com.optima.inventory.reponsitory;

import com.optima.inventory.entity.StoreProductEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StoreProductRepository extends JpaRepository<StoreProductEntity, Long> {
}
