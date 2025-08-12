package com.optima.inventory.service;

import com.optima.inventory.dto.response.ProductResponseDto;
import com.optima.inventory.entity.BrandEntity;
import com.optima.inventory.entity.CategoryEntity;
import com.optima.inventory.entity.ManufacturingLocationEntity;
import com.optima.inventory.entity.ProductEntity;
import com.optima.inventory.mapper.ProductMapper;
import com.optima.inventory.repository.BrandRepository;
import com.optima.inventory.repository.CategoryRepository;
import com.optima.inventory.repository.ManufacturingLocationRepository;
import com.optima.inventory.repository.ProductRepository;
import com.optima.inventory.utils.SnowflakeIdGenerator;
import jakarta.transaction.Transactional;
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

    public ProductService(ProductRepository productRepository,
                          ProductMapper productMapper) {
        this.productRepository = productRepository;
        this.productMapper = productMapper;
    }

    @Transactional
    public ProductResponseDto createProduct(ProductResponseDto productResponseDto) {

        ProductEntity productEntity = productMapper.toProduct(productResponseDto);

        long newProductId = SnowflakeIdGenerator.nextId();
        while (productRepository.existsById(newProductId)) {
            newProductId = SnowflakeIdGenerator.nextId();
        }
        productEntity.setId(newProductId);

        return productMapper.toProductResponseDto(productRepository.save(productEntity));
    }

    @Transactional
    public List<ProductResponseDto> getProducts() {
        return productRepository.findAll().stream()
                .map(productMapper::toProductResponseDto)
                .collect(Collectors.toList());
    }

    public ProductResponseDto getProduct(long productId) {
        ProductEntity productEntity = productRepository.findById(productId)
                .orElseThrow(() -> new RuntimeException("Product not find" + productId));
        return productMapper.toProductResponseDto(productEntity);
    }

    public ProductResponseDto updateProduct(long productId, ProductResponseDto productResponseDto) {
        ProductEntity productEntity = productMapper.toProduct(productResponseDto);
        productMapper.updateProduct(productEntity, productResponseDto);
        ProductEntity afterUpdateProduct = productRepository.save(productEntity);
        return productMapper.toProductResponseDto(afterUpdateProduct);
    }

    @Transactional
    public void deleteProduct(long productId) {
        productRepository.deleteById(productId);
    }

    public List<ProductResponseDto> getProductWithBrandCategoryManufacturing() {
        return productRepository.findAllWithBrandCategoryManufacturing().stream()
                .map(productMapper::fromProjection)
                .collect(Collectors.toList());
    }

    public Page<ProductResponseDto> getAllPage(Pageable pageable) {
        return productRepository.findAllIn4(pageable).map(productMapper::fromProjection);
    }
}
