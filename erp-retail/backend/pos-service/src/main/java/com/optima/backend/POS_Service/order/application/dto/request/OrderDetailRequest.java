package com.optima.backend.POS_Service.order.application.dto.request;

import jakarta.validation.constraints.Min;
import lombok.*;
import lombok.experimental.FieldDefaults;
import jakarta.validation.constraints.NotNull;


@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class OrderDetailRequest {
    @NotNull(message = "Đơn hàng của bạn phải có ít nhất 1 sản phẩm")
    Long productId;
    @NotNull(message = "Số lượng không thể là 0")
    @Min(value = 1, message = "Bạn phải thêm ít nhất 1 sản phẩm")
    Long quantity;
}
