package com.optima.backend.POS_Service.promotion.application.dto.request;

import lombok.*;
import lombok.experimental.FieldDefaults;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class PromotionRequest {
    String codePromotion;
    String namePromotion;
    String descriptionPromotion;
    String discountType;
    BigDecimal percentDiscountValue;
    BigDecimal maxDiscountValue;
    BigDecimal minOrderAmount;
    LocalDateTime startDate;
    LocalDateTime endDate;
    Long maxUser;
    Long currentUser;
}
