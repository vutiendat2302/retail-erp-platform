package com.optima.backend.POS_Service.order.application.dto.response;

import lombok.*;
import lombok.experimental.FieldDefaults;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class OrderResponse {
    Long Id;
    List<OrderDetailResponse> orderDetails = new ArrayList<>();
    BigDecimal taxAmount;
    BigDecimal finalAmountBeforeTax;
    BigDecimal finalAmountAfterTax;
}
