package com.optima.inventory.repository;

import com.optima.inventory.entity.CategoryEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CategoryRepository extends JpaRepository<CategoryEntity, Long> {
    public interface CategoryNameView {
        Long getId();
        String getName();
    }

    @Query("""
    select
        a.id as id,
        a.name as name
    from CategoryEntity a
    """)
    List<CategoryNameView> getCategoryName();

    @Query("""
    select count(a.id)
    from CategoryEntity a
    where a.status = true
    """)
    int getCountCategoryActive();
}
