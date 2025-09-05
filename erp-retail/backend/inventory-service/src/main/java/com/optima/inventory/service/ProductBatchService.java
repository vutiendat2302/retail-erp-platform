package com.optima.inventory.service;

import com.optima.inventory.dto.request.ProductBatchRequestDto;
import com.optima.inventory.entity.ProductBatchEntity;
import com.optima.inventory.mapper.ProductBatchMapper;
import com.optima.inventory.repository.ProductBatchRepository;
import com.optima.inventory.utils.SnowflakeIdGenerator;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class ProductBatchService {
    @Autowired
    private ProductBatchRepository productBatchRepository;
    @Autowired
    private ProductBatchMapper productBatchMapper;

    @Transactional
    public ProductBatchEntity createProductBatch(ProductBatchRequestDto request) {
        ProductBatchEntity productBatchEntity = productBatchMapper.toProductBatch(request);

        long newProductBatchId = SnowflakeIdGenerator.nextId();
        while (productBatchRepository.existsById(newProductBatchId)) {
            newProductBatchId = SnowflakeIdGenerator.nextId();
        }
        productBatchEntity.setId(newProductBatchId);

        return productBatchRepository.save(productBatchEntity);
    }

    public List<ProductBatchEntity> getProductBatches() {
        return productBatchRepository.findAll();
    }

    @Transactional
    public ProductBatchEntity getProductBatch(long productBatchId) {
        return productBatchRepository.findById(productBatchId).orElseThrow(() -> new RuntimeException("Product Batch not find"));
    }

    @Transactional
    public ProductBatchEntity updateProductBatch(long productBatchId, ProductBatchRequestDto request) {
        ProductBatchEntity productBatchEntity = productBatchRepository.findById(productBatchId)
                .orElseThrow(() -> new RuntimeException(("Product Batch not found")));
        productBatchMapper.updateProductBatch(productBatchEntity, request);

        return productBatchRepository.save(productBatchEntity);
    }

    public void deleteProductBatch(long productBatchId) {
        productBatchRepository.deleteById(productBatchId);
    }

    public int getExpiringProductCount() {
        LocalDateTime now = LocalDateTime.now();
        LocalDateTime oneMonthLater = now.plusMonths(1);
        return productBatchRepository.countExpiringBatches(now, oneMonthLater);
    }
}
