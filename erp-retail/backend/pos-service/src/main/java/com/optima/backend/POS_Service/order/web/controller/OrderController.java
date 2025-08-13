package com.optima.backend.POS_Service.order.web.controller;

import com.optima.backend.POS_Service.order.application.dto.request.OrderRequest;
import com.optima.backend.POS_Service.order.application.dto.response.OrderResponse;
import com.optima.backend.POS_Service.order.application.service.OrderService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@RestController
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequiredArgsConstructor
@RequestMapping("/api/order")
public class OrderController {
    OrderService orderService;
    @PostMapping("/add-to-cart")
    public OrderResponse addToCart(@RequestBody OrderRequest request) {
        Long customerId = 1L; // Giả lập customerId cho test
        return orderService.addToCart(request, customerId);
    }
    @PostMapping("/checkout")
    public OrderResponse checkout(@RequestParam(required = false) Long orderId,
                                  @RequestBody(required = false) OrderRequest directCheckoutRequest) {
        Long customerId = 1L; // Giả lập
        return orderService.checkout(orderId, customerId, directCheckoutRequest);
    }

    @DeleteMapping("/minus-quantity")
    public OrderResponse minusQuantity(@RequestParam Long productId) {
        Long customerId = 1L; // Giả lập
        return orderService.minusQuantity(customerId, productId,1L);
    }
    @GetMapping("/add-quantity")
    public OrderResponse addQuantity(@RequestParam Long productId) {
        Long customerId = 1L;
        return orderService.addQuantity(customerId, productId,1L);
    }
    @DeleteMapping("/delete-from-cart")
    public OrderResponse deleteFromCart(@RequestParam Long productId) {
        Long customerId = 1L;
        return orderService.removeFromCart(customerId, productId);
    }
}
