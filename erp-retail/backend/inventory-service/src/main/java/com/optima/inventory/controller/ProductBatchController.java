package com.optima.inventory.controller;

import com.optima.inventory.dto.request.ProductBatchCreationRequest;
import com.optima.inventory.dto.request.ProductBatchUpdateRequest;
import com.optima.inventory.dto.response.ProductBatchResponse;
import com.optima.inventory.entity.ProductBatchEntity;
import com.optima.inventory.reponsitory.ProductBatchRepository;
import com.optima.inventory.service.ProductBatchService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/product_batch")
public class ProductBatchController {
    @Autowired
    private ProductBatchService productBatchService;
    @Autowired
    private ProductBatchRepository productBatchRepository;

    @PostMapping
    public ProductBatchEntity createProductBatch(@RequestBody @Valid ProductBatchCreationRequest request) {
        return productBatchService.createProductBatch(request);
    }

    @GetMapping
    public List<ProductBatchEntity> getProductBatches() {
        return productBatchService.getProductBatches();
    }

    @GetMapping("/{productBatchId}")
    public ProductBatchResponse getProductBatch(@PathVariable("productBatchId") long productBatchId) {
        return productBatchService.getProductBatch(productBatchId);
    }

    @PutMapping("/{productBatchId}")
    public ProductBatchResponse updateProductBatch(@PathVariable long productBatchId, @RequestBody ProductBatchUpdateRequest request) {
        return productBatchService.updateProductBatch(productBatchId, request);
    }

    @DeleteMapping("/{productBatchId}")
    public String deleteProductBatch(@PathVariable("productBatchId") long productBatchId) {
        productBatchService.deleteProductBatch(productBatchId);
        return "Product Batch has been deleted";
    }
}
