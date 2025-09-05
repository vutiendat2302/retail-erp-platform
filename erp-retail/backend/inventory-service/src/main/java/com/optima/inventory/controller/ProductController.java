package com.optima.inventory.controller;

import com.optima.inventory.dto.request.ProductRequestDto;
import com.optima.inventory.dto.response.ProductResponseDto;
import com.optima.inventory.entity.ProductEntity;
import com.optima.inventory.repository.BrandRepository;
import com.optima.inventory.repository.CategoryRepository;
import com.optima.inventory.repository.ProductRepository;
import com.optima.inventory.service.ProductService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/product")
public class ProductController {
    @Autowired
    private ProductService productService;
    @Autowired
    private ProductRepository productRepository;

    @PostMapping
    public ProductResponseDto createProduct(@RequestBody @Valid ProductResponseDto request) {
        return productService.createProduct(request);
    }

    @GetMapping
    public List<ProductResponseDto> getProducts() {
        return productService.getProducts();
    }

    @GetMapping("/{productId}")
    public ProductResponseDto getProduct(@PathVariable("productId") long productId) {
        return productService.getProduct(productId);
    }

    @PutMapping("/{productId}")
    public ProductResponseDto updateProduct(@PathVariable("productId") long productId, @RequestBody ProductResponseDto request) {
        return productService.updateProduct(productId, request);
    }

    @DeleteMapping("/{productId}")
    public String deleteProduct(@PathVariable("productId") long productId) {
        productService.deleteProduct(productId);
        return "Product has been deleted";
    }

    @GetMapping("/page")
    public ResponseEntity<Page<ProductResponseDto>> getProductsPage(Pageable pageable) {
        return ResponseEntity.ok(productService.getAllPage(pageable));
    }

    @GetMapping("/active")
    public int getProductActive() {
        return productService.getProductActive();
    }
}




