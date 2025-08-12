package com.optima.backend.POS_Service.order.web.controller;

import com.optima.backend.POS_Service.order.application.dto.response.ProductResponse;
import com.optima.backend.POS_Service.order.external.CallService;
import com.optima.backend.POS_Service.order.external.InventoryClient;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequiredArgsConstructor
@RequestMapping("/test")
public class TestController {
    CallService callService;
    @GetMapping("/product/{id}")
    public ProductResponse testFeign(@PathVariable("id") Long id) {
         return callService.getProductById(id);
    }
}
