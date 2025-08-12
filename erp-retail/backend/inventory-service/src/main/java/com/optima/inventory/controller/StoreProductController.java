package com.optima.inventory.controller;

import com.optima.inventory.dto.request.StoreProductRequestDto;
import com.optima.inventory.entity.StoreProductEntity;
import com.optima.inventory.repository.StoreProductRepository;
import com.optima.inventory.service.StoreProductService;
import com.optima.inventory.service.StoreService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/store_product")
public class StoreProductController {
    @Autowired
    private StoreProductService storeProductService;
    @Autowired
    private StoreProductRepository storeProductRepository;
    @Autowired
    private StoreService storeService;

    @PostMapping
    public StoreProductEntity createStoreProduct(@RequestBody @Valid StoreProductRequestDto request) {
        return storeProductService.createStoreProduct(request);
    }

    @GetMapping
    public List<StoreProductEntity> getStoreProducts() {
        return storeProductService.getStores();
    }

    @GetMapping("/{storeProductId}")
    public StoreProductEntity getStoreProduct(@PathVariable("storeProductId") long storeProductId) {
        return storeProductService.getStore(storeProductId);
    }

    @PutMapping("/{storeProductId}")
    public StoreProductEntity updateStoreProduct(@PathVariable("storeProductId") long storeProductId, @RequestBody StoreProductRequestDto request) {
        return storeProductService.updateStoreProduct(storeProductId, request);
    }

    @DeleteMapping("/{storeProductId}")
    public String deleteCategory(@PathVariable("storeProductId") long storeProductId) {
        storeProductService.deleteStoreProduct(storeProductId);
        return "Store Product has been deleted";
    }
}
