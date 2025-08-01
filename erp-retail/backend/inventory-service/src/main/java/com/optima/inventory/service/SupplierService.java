package com.optima.inventory.service;

import com.optima.inventory.dto.request.SupplierCreationRequest;
import com.optima.inventory.dto.request.SupplierUpdateRequest;
import com.optima.inventory.dto.response.SupplierResponse;
import com.optima.inventory.entity.SupplierEntity;
import com.optima.inventory.mapper.SupplierMapper;
import com.optima.inventory.reponsitory.SupplierRepository;
import com.optima.inventory.utils.SnowflakeIdGenerator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.function.Supplier;

@Service
public class SupplierService {
    @Autowired
    private SupplierRepository supplierRepository;
    @Autowired
    private SupplierMapper supplierMapper;

    public SupplierEntity createSupplier(SupplierCreationRequest request) {
        SupplierEntity supplierEntity = supplierMapper.toSupplier(request);

        long newSupplierId = SnowflakeIdGenerator.nextId();
        while (supplierRepository.existsById(newSupplierId)) {
            newSupplierId = SnowflakeIdGenerator.nextId();
        }
        supplierEntity.setId(newSupplierId);

        return supplierRepository.save(supplierEntity);
    }

    public List<SupplierEntity> getSuppliers() {
        return supplierRepository.findAll();
    }

    public SupplierResponse getSupplier(long supplierId) {
        return supplierMapper.toSupplierResponse(supplierRepository.findById(supplierId).orElseThrow(() -> new RuntimeException("Supplier not found")));
    }

    public SupplierResponse updateSupplier(long supplierId, SupplierUpdateRequest request) {
        SupplierEntity supplierEntity = supplierRepository.findById(supplierId)
                .orElseThrow(() -> new RuntimeException("Supplier not found"));
        supplierMapper.updateSupplier(supplierEntity, request);

        return supplierMapper.toSupplierResponse(supplierRepository.save(supplierEntity));
    }

    public void deleteSupplier(long supplierId) {
        supplierRepository.deleteById(supplierId);
    }
}
