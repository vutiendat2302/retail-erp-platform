package com.optima.backend.POS_Service.order.infrastructure.repository;

import com.optima.backend.POS_Service.order.infrastructure.entity.OrderEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface OrderRepository extends JpaRepository<OrderEntity, Long> {
    Optional<OrderEntity> findByCustomerIdAndOrderStatus_codeStatus(Long customerId, String status);
}
