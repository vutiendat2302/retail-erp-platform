package com.optima.inventory.service;

import com.optima.inventory.dto.request.ProductRequestDto;
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
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ProductService {
    @Autowired
    private ProductRepository productRepository;
    @Autowired
    private ProductMapper productMapper;
    @Autowired
    private BrandRepository brandRepository;
    @Autowired
    private CategoryRepository categoryRepository;
    @Autowired
    private ManufacturingLocationRepository manufacturingLocationRepository;

    public ProductService(ProductRepository productRepository,
                          ProductMapper productMapper,
                          BrandRepository brandRepository,
                          CategoryRepository categoryRepository,
                          ManufacturingLocationRepository manufacturingLocationRepository) {
        this.productRepository = productRepository;
        this.productMapper = productMapper;
        this.brandRepository = brandRepository;
        this.categoryRepository = categoryRepository;
        this.manufacturingLocationRepository = manufacturingLocationRepository;
    }

    @Transactional
    public ProductResponseDto createProduct(ProductRequestDto request) {
        BrandEntity brand = brandRepository.findById(request.getBrandId())
                .orElseThrow(() -> new RuntimeException("Brand not found with ID: " + request.getBrandId()));
        CategoryEntity category = categoryRepository.findById(request.getCategoryId())
                .orElseThrow(() -> new RuntimeException("Category not found with ID: " + request.getCategoryId()));
        ManufacturingLocationEntity manufacturingLocation = manufacturingLocationRepository.findById(request.getManufacturingLocationId())
                .orElseThrow(() -> new RuntimeException("Manufacturing Location not found with ID: " + request.getManufacturingLocationId()));
        ProductEntity productEntity = productMapper.toProduct(request, brand, category, manufacturingLocation);

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

    public ProductResponseDto updateProduct(long productId, ProductRequestDto request) {

        ProductEntity productEntity = productRepository.findById(productId)
                .orElseThrow(() -> new RuntimeException(("Product not found")));

        BrandEntity brand = brandRepository.findById(request.getBrandId())
                .orElseThrow(() -> new RuntimeException("Brand not found with ID: " + request.getBrandId()));
        CategoryEntity category = categoryRepository.findById(request.getCategoryId())
                .orElseThrow(() -> new RuntimeException("Category not found with ID: " + request.getCategoryId()));
        ManufacturingLocationEntity manufacturingLocation = manufacturingLocationRepository.findById(request.getManufacturingLocationId())
                .orElseThrow(() -> new RuntimeException("Manufacturing Location not found with ID: " + request.getManufacturingLocationId()));

        productMapper.updateProduct(productEntity, request, brand, category, manufacturingLocation);
        ProductEntity afterUpdateProduct = productRepository.save(productEntity);
        return productMapper.toProductResponseDto(afterUpdateProduct);
    }

    @Transactional
    public void deleteProduct(long productId) {
        productRepository.deleteById(productId);
    }
}
