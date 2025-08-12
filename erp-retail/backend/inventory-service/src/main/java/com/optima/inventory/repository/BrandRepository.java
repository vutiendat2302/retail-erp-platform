package com.optima.inventory.repository;

import com.optima.inventory.entity.BrandEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BrandRepository extends JpaRepository<BrandEntity, Long> {
    boolean existsByName(String name); // Thông báo ra lỗi khi đã tồn tại tồn tại name
}
