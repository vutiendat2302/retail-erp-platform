package com.optima.backend.POS_Service.order.infrastructure.repository;

import com.optima.backend.POS_Service.order.infrastructure.entity.OrderStatusEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OrderStatusRepository extends JpaRepository<OrderStatusEntity, Long> {
    OrderStatusEntity findByCodeStatus(String code);
}
