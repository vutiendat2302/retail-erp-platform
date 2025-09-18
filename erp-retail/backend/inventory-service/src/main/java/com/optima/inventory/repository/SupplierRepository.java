package com.optima.inventory.repository;

import com.optima.inventory.entity.SupplierEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;

@Repository
public interface SupplierRepository extends JpaRepository<SupplierEntity, Long> {
    public interface SupplierView {
        Long getId();
        String getName();
        String getDescription();
        String getStatus();
        String getPhone();
        String getEmail();
        String getAddress();
        Long getCreateBy();
        Long getUpdateBy();
        LocalDateTime getCreateAt();
        LocalDateTime getUpdateAt();
    }
    @Query("""
    select
        a.id as id,
        a.name as name,
        a.status as status,
        a.createAt as createAt,
        a.createBy as createBy,
        a.updateBy as updateBy,
        a.updateAt as updateAt,
        a.email as email,
        a.phone as phone,
        a.address as address,
        a.description as description
    from SupplierEntity a
    where
    (
        :search is null
        or lower(a.name) like lower(concat('%', :search, '%'))
    ) and (:status is null or a.status = :status)
""")
    Page<SupplierView> getSearchAllIn4(
            @Param("search") String search,
            @Param("status") Boolean status,
            Pageable pageable
    );
}
