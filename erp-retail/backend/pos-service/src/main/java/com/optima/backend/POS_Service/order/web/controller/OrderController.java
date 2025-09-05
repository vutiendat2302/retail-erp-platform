package com.optima.backend.POS_Service.order.web.controller;

import com.optima.backend.POS_Service.common.dto.ApiResponse;
import com.optima.backend.POS_Service.order.application.dto.request.ApplyPromotionRequest;
import com.optima.backend.POS_Service.order.application.dto.request.OrderRequest;
import com.optima.backend.POS_Service.order.application.dto.response.OrderResponse;
import com.optima.backend.POS_Service.order.application.service.OrderService;
import com.optima.backend.POS_Service.promotion.application.dto.response.PromotionResponse;
import jakarta.validation.Valid;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.aspectj.weaver.ast.Or;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequiredArgsConstructor
@RequestMapping("/api/order")
@CrossOrigin(origins = "http://localhost:5173")
public class OrderController {
    OrderService orderService;
    @GetMapping("/{orderId}")
    public ApiResponse<OrderResponse> getPromotion(@PathVariable("orderId") Long orderId) {
        ApiResponse<OrderResponse> apiResponse = new ApiResponse<OrderResponse>();
        apiResponse.setData(orderService.getOrderById(orderId));
        return apiResponse;
    }
    public ApiResponse<List<OrderResponse>> getPromotions() {
        ApiResponse<List<OrderResponse>> apiResponse = new ApiResponse<>();
        apiResponse.setData(orderService.getOrders());
        return apiResponse;
    }
    @PostMapping("/add-to-cart")
    public ApiResponse<OrderResponse> addToCart(@RequestBody  @Valid OrderRequest request) {
        Long customerId = 1L;
        ApiResponse<OrderResponse> apiResponse = new ApiResponse<>();
        apiResponse.setData(orderService.addToCart(request, customerId));
        return apiResponse;
    }
    @PostMapping("/checkout")
    public ApiResponse<OrderResponse> checkout(@RequestParam(required = false) Long orderId,
                                  @RequestBody(required = false) OrderRequest directCheckoutRequest) {
        Long customerId = 1L; // Giả lập
        ApiResponse<OrderResponse> apiResponse = new ApiResponse<>();
        apiResponse.setData(orderService.checkout(orderId, customerId, directCheckoutRequest));
        return apiResponse;
    }

    @PatchMapping("/minus-quantity")
    public ApiResponse<OrderResponse> minusQuantity(@RequestParam Long productId) {
        Long customerId = 1L; // Giả lập
        ApiResponse<OrderResponse> apiResponse = new ApiResponse<>();
        apiResponse.setData(orderService.minusQuantity(customerId, productId,1L));
        return apiResponse;
    }
    @PatchMapping("/add-quantity")
    public ApiResponse<OrderResponse> addQuantity(@RequestParam Long productId) {
        Long customerId = 1L;
        ApiResponse<OrderResponse> apiResponse = new ApiResponse<>();
        apiResponse.setData(orderService.addQuantity(customerId, productId,1L));
        return apiResponse;
    }
    @DeleteMapping("/delete-from-cart")
    public ApiResponse<OrderResponse> deleteFromCart(@RequestParam Long productId) {
        Long customerId = 1L;
        ApiResponse<OrderResponse> apiResponse = new ApiResponse<>();
        apiResponse.setData(orderService.removeFromCart(customerId, productId));
        return apiResponse;
    }
    @PatchMapping("/{orderId}/apply-promotion")
    public ApiResponse<OrderResponse> applyPromotion(@PathVariable("orderId") Long orderId,@RequestBody ApplyPromotionRequest request) {
        ApiResponse<OrderResponse> apiResponse = new ApiResponse<>();
        apiResponse.setData(orderService.applyPromotion(orderId, request.getCodePromotion()));
        return apiResponse;
    }
    @GetMapping("/{orderId}/use-promotion")
    public ApiResponse<List<PromotionResponse>> getUsedPromotion(@PathVariable("orderId") Long orderId) {
        ApiResponse<List<PromotionResponse>> apiResponse = new ApiResponse<>();
        apiResponse.setData(orderService.getPromotionsUsedByOrder(orderId));
        return apiResponse;
    }
}
