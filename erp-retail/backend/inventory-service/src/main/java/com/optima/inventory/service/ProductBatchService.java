package com.optima.inventory.service;

import com.optima.inventory.dto.request.ProductBatchCreationRequest;
import com.optima.inventory.dto.request.ProductBatchUpdateRequest;
import com.optima.inventory.dto.response.ProductBatchResponse;
import com.optima.inventory.entity.ProductBatchEntity;
import com.optima.inventory.mapper.ProductBatchMapper;
import com.optima.inventory.reponsitory.ProductBatchRepository;
import com.optima.inventory.utils.SnowflakeIdGenerator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductBatchService {
    @Autowired
    private ProductBatchRepository productBatchRepository;
    @Autowired
    private ProductBatchMapper productBatchMapper;

    public ProductBatchEntity createProductBatch(ProductBatchCreationRequest request) {
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

    public ProductBatchResponse getProductBatch(long productBatchId) {
        return productBatchMapper.toProductBatchResponse(productBatchRepository.findById(productBatchId).orElseThrow(() -> new RuntimeException("Product Batch not find")));
    }

    public ProductBatchResponse updateProductBatch(long productBatchId, ProductBatchUpdateRequest request) {
        ProductBatchEntity productBatchEntity = productBatchRepository.findById(productBatchId)
                .orElseThrow(() -> new RuntimeException(("Product Batch not found")));
        productBatchMapper.updateProductBatch(productBatchEntity, request);

        return productBatchMapper.toProductBatchResponse(productBatchRepository.save(productBatchEntity));
    }

    public void deleteProductBatch(long productBatchId) {
        productBatchRepository.deleteById(productBatchId);
    }
}
