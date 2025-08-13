package com.optima.inventory.service;

import com.optima.inventory.dto.request.SupplierRequestDto;
import com.optima.inventory.entity.SupplierEntity;
import com.optima.inventory.mapper.SupplierMapper;
import com.optima.inventory.repository.SupplierRepository;
import com.optima.inventory.utils.SnowflakeIdGenerator;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SupplierService {
    @Autowired
    private SupplierRepository supplierRepository;
    @Autowired
    private SupplierMapper supplierMapper;

    @Transactional
    public SupplierEntity createSupplier(SupplierRequestDto request) {
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

    public SupplierEntity getSupplier(long supplierId) {
        return supplierRepository.findById(supplierId).orElseThrow(() -> new RuntimeException("Supplier not found"));
    }

    @Transactional
    public SupplierEntity updateSupplier(long supplierId, SupplierRequestDto request) {
        SupplierEntity supplierEntity = supplierRepository.findById(supplierId)
                .orElseThrow(() -> new RuntimeException("Supplier not found"));
        supplierMapper.updateSupplier(supplierEntity, request);

        return supplierRepository.save(supplierEntity);
    }

    @Transactional
    public void deleteSupplier(long supplierId) {
        supplierRepository.deleteById(supplierId);
    }
}
