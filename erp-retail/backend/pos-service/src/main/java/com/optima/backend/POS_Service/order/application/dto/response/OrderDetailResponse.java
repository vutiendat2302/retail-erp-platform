package com.optima.backend.POS_Service.order.application.dto.response;

import lombok.*;
import lombok.experimental.FieldDefaults;

import java.math.BigDecimal;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class OrderDetailResponse {
    Long Id;
    Long quantity;
    BigDecimal price;
    BigDecimal discount;
    String productName;
    BigDecimal totalAmount;
}
