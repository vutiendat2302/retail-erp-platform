package com.optima.backend.POS_Service.order.infrastructure.entity;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.GenericGenerator;
import org.hibernate.annotations.UpdateTimestamp;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "order_detail")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class OrderDetailEntity {
    @Id
    @GeneratedValue(generator = "snowflakeGenerator")
    @GenericGenerator(name = "snowflakeGenerator", strategy = "com.optima.backend.POS_Service.order.application.utils.SnowflakeIdGenerator")
    @Column(name = "id")
    Long Id;
    @ManyToOne (fetch = FetchType.LAZY)
    @JoinColumn (name = "order_id")
    OrderEntity orderEntity;
    @Column(name = "product_id")
    Long productId;
    @Column(name = "quantity")
    Long quantity;
    @Column (name = "price")
    BigDecimal price;
    @CreationTimestamp
    @Column (name = "created_at",nullable = false, updatable = false)
    LocalDateTime createdAt;
    @UpdateTimestamp
    @Column (name = "updated_at",nullable = false)
    LocalDateTime updatedAt;
    @Column (name = "product_name")
    String productName;
    public BigDecimal getTotalAmount(){
       BigDecimal quantityB = BigDecimal.valueOf(quantity);
       return quantityB.multiply(price);
    }
}
