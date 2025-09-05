package com.optima.backend.POS_Service.order.infrastructure.repository;

import com.optima.backend.POS_Service.order.infrastructure.entity.OrderDetailEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OrderDetailRepository extends JpaRepository<OrderDetailEntity, Long> {
}
