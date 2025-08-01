package com.optima.inventory.controller;

import com.optima.inventory.dto.request.SupplierCreationRequest;
import com.optima.inventory.dto.request.SupplierUpdateRequest;
import com.optima.inventory.dto.response.SupplierResponse;
import com.optima.inventory.entity.SupplierEntity;
import com.optima.inventory.reponsitory.SupplierRepository;
import com.optima.inventory.service.SupplierService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/supplier")
public class SupplierController {
    @Autowired
    private SupplierService supplierService;
    @Autowired
    private SupplierRepository supplierRepository;

    @PostMapping
    public SupplierEntity createSupplier(@RequestBody @Valid SupplierCreationRequest request) {
        return supplierService.createSupplier(request);
    }

    @GetMapping
    public List<SupplierEntity> getSuppliers() {
        return supplierService.getSuppliers();
    }

    @GetMapping("/{supplierId}")
    public SupplierResponse getSupplier(@PathVariable("supplierId") long supplierId) {
        return supplierService.getSupplier(supplierId);
    }

    @PutMapping("/{supplierId}")
    public SupplierResponse updateSupplier(@PathVariable("supplierId") long supplierId, @RequestBody SupplierUpdateRequest request) {
        return supplierService.updateSupplier(supplierId, request);
    }

    @DeleteMapping("/{supplierId}")
    public String deleteCategory(@PathVariable("supplierId") long supplierId) {
        supplierService.deleteSupplier(supplierId);
        return "Supplier has been deleted";
    }
}
