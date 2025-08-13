package com.optima.backend.POS_Service.order.external;

import com.optima.backend.POS_Service.order.application.dto.response.ProductResponse;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@FeignClient(name = "inventory-service", url = "http://inventory-service:8086")
public interface InventoryClient {
    @GetMapping("/api/product/{productId}")
    ProductResponse getProduct(@PathVariable("productId") Long productId);
}
