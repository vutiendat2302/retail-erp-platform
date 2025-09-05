package com.optima.inventory.repository;

import com.optima.inventory.entity.ManufacturingLocationEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ManufacturingLocationRepository extends JpaRepository<ManufacturingLocationEntity, Long> {

    public interface ManufacturingLocationView {
        Long getId();
        String getName();
    }

    @Query("""
    select
        a.id as id,
        a.name as name
    from ManufacturingLocationEntity a
    """)
    List<ManufacturingLocationView> getManufacturingLocationName();
}
