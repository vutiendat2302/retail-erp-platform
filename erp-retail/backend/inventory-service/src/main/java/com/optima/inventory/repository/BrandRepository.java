package com.optima.inventory.repository;

import com.optima.inventory.entity.BrandEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BrandRepository extends JpaRepository<BrandEntity, Long> {
    public interface BrandView {
        Long getId();
        String getName();
    }

    @Query("""
    select
        a.id as id,
        a.name as name
    from BrandEntity a
    """)
    List<BrandView> getBrandName();

    @Query("""
    select count(a.id)
    from BrandEntity a
    where a.status = true
    """)
    int getCountBrandActive();
}


