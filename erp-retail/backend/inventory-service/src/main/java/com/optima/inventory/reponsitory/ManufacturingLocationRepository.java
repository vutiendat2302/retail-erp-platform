package com.optima.inventory.reponsitory;

import com.optima.inventory.entity.ManufacturingLocationEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ManufacturingLocationRepository extends JpaRepository<ManufacturingLocationEntity, Long> {
}
