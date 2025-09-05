package com.optima.backend.POS_Service.promotion.infrastructure.entity;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;
import org.hibernate.annotations.GenericGenerator;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "promotion")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class PromotionEntity {
    @Id
    @GeneratedValue(generator = "snowflakeGenerator")
    @GenericGenerator(name = "snowflakeGenerator",strategy = "com.optima.backend.POS_Service.utils.SnowflakeIdGenerator")
    @Column(name = "id")
    Long Id;
    @Column(name = "code_promotion")
    String codePromotion;
    @Column(name = "name_promotion")
    String namePromotion;
    @Column(name = "description_promotion")
    String descriptionPromotion;
    @Column(name = "discount_type")
    String discountType;
    @Column(name = "percent_discount_value")
    BigDecimal percentDiscountValue;
    @Column(name = "max_discount_value")
    BigDecimal maxDiscountValue;
    @Column(name = "min_order_amount")
    BigDecimal minOrderAmount;
    @Column(name = "start_date")
    LocalDateTime startDate;
    @Column(name = "end_date")
    LocalDateTime endDate;
    @Column(name = "max_user")
    Long maxUser;
    @Column(name = "count_user")
    Long currentUser;
    @Column(name = "is_active")
    Boolean isActive = true;
    @Column(name = "created_at")
    LocalDateTime createdAt;
    @Column(name = " update_at")
    LocalDateTime updateAt;
}
