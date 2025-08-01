package com.optima.inventory.service;

import com.optima.inventory.dto.request.ProductCreationRequest;
import com.optima.inventory.dto.request.ProductUpdateRequest;
import com.optima.inventory.dto.response.ProductResponse;
import com.optima.inventory.entity.ProductEntity;
import com.optima.inventory.mapper.ProductMapper;
import com.optima.inventory.reponsitory.ProductRepository;
import com.optima.inventory.utils.SnowflakeIdGenerator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ProductService {
    @Autowired
    private ProductRepository productRepository;
    @Autowired
    private ProductMapper productMapper;

    public ProductEntity createProduct(ProductCreationRequest request) {
        ProductEntity productEntity = productMapper.toProduct(request);

        long newProductId = SnowflakeIdGenerator.nextId();
        while (productRepository.existsById(newProductId)) {
            newProductId = SnowflakeIdGenerator.nextId();
        }
        productEntity.setId(newProductId);

        return productRepository.save(productEntity);
    }

    public List<ProductEntity> getProducts() {
        return productRepository.findAll();
    }

    public ProductResponse getProduct(long productId) {
        return productMapper.toProductResponse(productRepository.findById(productId).orElseThrow(() -> new RuntimeException("Product not find")));
    }

    public ProductResponse updateProduct(long productId, ProductUpdateRequest request) {
        ProductEntity productEntity = productRepository.findById(productId)
                .orElseThrow(() -> new RuntimeException(("Product not found")));
        productMapper.updateProduct(productEntity, request);

        return productMapper.toProductResponse(productRepository.save(productEntity));
    }

    public void deleteProduct(long productId) {
        productRepository.deleteById(productId);
    }

    public Page<ProductEntity> getAllProducts(Pageable pageable) {
        return productRepository.findAll(pageable);
    }
    
}
