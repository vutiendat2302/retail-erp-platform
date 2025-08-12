package com.optima.backend.POS_Service.order.infrastructure.entity;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.GenericGenerator;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Getter
@Entity
@Setter
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@Table(name = "order_status")
public class OrderStatusEntity {
    @Id
    @GeneratedValue(generator = "snowflakeGenerator")
    @GenericGenerator(name = "snowflakeGenerator", strategy = "com.optima.backend.POS_Service.order.application.utils.SnowflakeIdGenerator")
    @Column(name = "id")
    Long Id;
    @Column(name = "code_status")
    String codeStatus;
    @Column(name = "name_status")
    String nameStatus;
    @Column(name = "description_status")
    String descriptionStatus;
    @OneToMany(mappedBy = "orderStatus",cascade = CascadeType.ALL,orphanRemoval = true)
    List<OrderEntity> orderEntity = new ArrayList<>();
    @CreationTimestamp
    @Column(name = "created_at",nullable = false,updatable = false)
    LocalDateTime createdAt;
    @UpdateTimestamp
    @Column(name = "updated_at")
    LocalDateTime updatedAt;
}
