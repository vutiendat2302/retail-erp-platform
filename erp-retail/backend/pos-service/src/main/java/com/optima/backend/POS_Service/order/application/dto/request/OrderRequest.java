package com.optima.backend.POS_Service.order.application.dto.request;

import jakarta.validation.constraints.NotNull;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class OrderRequest {
    String note;
    @NotNull(message = "Đơn hàng của bạn không được để trống")
    List<OrderDetailRequest> orderDetails;
}
