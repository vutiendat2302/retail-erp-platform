package com.optima.inventory.controller;

import com.optima.inventory.dto.request.ProductCreationRequest;
import com.optima.inventory.dto.request.ProductUpdateRequest;
import com.optima.inventory.dto.response.ProductResponse;
import com.optima.inventory.entity.ProductEntity;
import com.optima.inventory.reponsitory.BrandRepository;
import com.optima.inventory.reponsitory.CategoryRepository;
import com.optima.inventory.reponsitory.ProductRepository;
import com.optima.inventory.service.ProductService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/product")
public class ProductController {
    @Autowired
    private ProductService productService;
    @Autowired
    private ProductRepository productRepository;
    @Autowired
    private BrandRepository brandRepository;

    @Autowired
    private CategoryRepository categoryRepository;

    @PostMapping
    public ProductEntity createProduct(@RequestBody @Valid ProductCreationRequest request) {
        return productService.createProduct(request);
    }

    @GetMapping
    public List<ProductEntity> getProducts() {
        return productService.getProducts();
    }

    @GetMapping("/{productId}")
    public ProductResponse getProduct(@PathVariable("productId") long productId) {
        return productService.getProduct(productId);
    }

    @PutMapping("/{productId}")
    public ProductResponse updateProduct(@PathVariable long productId, @RequestBody ProductUpdateRequest request) {
        return productService.updateProduct(productId, request);
    }

    @DeleteMapping("/{productId}")
    public String deleteProduct(@PathVariable("productId") long productId) {
        productService.deleteProduct(productId);
        return "Product has been deleted";
    }

    @GetMapping("/paged")
    public Page<ProductEntity> getPagedProducts(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "100") int size,
            @RequestParam(defaultValue = "name, asc") String sort
    ) {
        String[] sortParams = sort.split(",");
        String sortField = sortParams[0].trim();
        Sort.Direction sortDirection = sortParams[1].trim().equalsIgnoreCase("desc") ? Sort.Direction.DESC : Sort.Direction.ASC;

        Pageable pageable = PageRequest.of(page, size, Sort.by(sortDirection, sortField));
        return productService.getAllProducts(pageable);
    }
}
