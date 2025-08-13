package com.optima.backend.POS_Service.order.infrastructure.entity;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.GenericGenerator;
import org.hibernate.annotations.UpdateTimestamp;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;


@Entity
@Table(name = "orders")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class OrderEntity {
    @Id
    @GeneratedValue(generator = "snowflakeGenerator")
    @GenericGenerator(name = "snowflakeGenerator", strategy = "com.optima.backend.POS_Service.order.application.utils.SnowflakeIdGenerator")
    @Column(name = "id")
    Long Id;
    @Column (name = "customer_id")
    Long customerId;
    @Column (name = "order_date")
    LocalDateTime orderDate;
    @Column (name = "ship_amount")
    BigDecimal shipAmount;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "order_status_id")
    OrderStatusEntity orderStatus;
    @Column (name = "note")
    String note;
    @CreationTimestamp
    @Column (name = "created_at", nullable = false, updatable = false)
    LocalDateTime createdAt;
    @UpdateTimestamp
    @Column (name = "updated_at", nullable = false)
    LocalDateTime updateAt;
    @Column (name = "customer_name")
    String customerName;
    @Column (name = "promotion_discount")
    BigDecimal promotionDiscount;
    @OneToMany(mappedBy = "orderEntity",cascade = CascadeType.ALL,orphanRemoval = true)
    List<OrderDetailEntity> orderDetails = new ArrayList<>();
    public void addOrderDetail(OrderDetailEntity detail) {
        orderDetails.add(detail);
        detail.setOrderEntity(this);
    }
    public void removeOrderDetail(OrderDetailEntity detail) {
        orderDetails.remove(detail);
        detail.setOrderEntity(null);
    }
    public BigDecimal getTaxAmount() {
        BigDecimal taxAmount = BigDecimal.ZERO;
        for (OrderDetailEntity detail : orderDetails) {
           taxAmount = taxAmount.add(detail.getTotalAmount());
        }
        return taxAmount.multiply(BigDecimal.valueOf(0.08));
    }
    public BigDecimal getFinalAmountBeforeTax(){
        BigDecimal finalAmount = BigDecimal.ZERO;
        for (OrderDetailEntity detail : orderDetails) {
           finalAmount = finalAmount.add(detail.getTotalAmount());
        }
        return finalAmount;
    }
    public BigDecimal getFinalAmountAfterTax(){
        BigDecimal finalAmount = BigDecimal.ZERO;
       for (OrderDetailEntity detail : orderDetails) {
           finalAmount = finalAmount.add(detail.getTotalAmount());
       }
       return finalAmount.add(getTaxAmount());
    }
}
