package com.optima.inventory.controller;

import com.optima.inventory.dto.request.SupplierRequestDto;
import com.optima.inventory.dto.response.SupplierResponseDto;
import com.optima.inventory.entity.SupplierEntity;
import com.optima.inventory.repository.SupplierRepository;
import com.optima.inventory.service.SupplierService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/supplier")
public class SupplierController {
    @Autowired
    private SupplierService supplierService;
    @Autowired
    private SupplierRepository supplierRepository;

    @PostMapping
    public SupplierResponseDto createSupplier(@RequestBody @Valid SupplierResponseDto supplierResponseDto) {
        return supplierService.createSupplier(supplierResponseDto);
    }

    @GetMapping("/{supplierId}")
    public SupplierResponseDto getSupplier(@PathVariable("supplierId") Long supplierId) {
        return supplierService.getSupplier(supplierId);
    }

    @PutMapping("/{supplierId}")
    public SupplierResponseDto updateSupplier(@PathVariable("supplierId") Long supplierId, @RequestBody SupplierResponseDto supplierResponseDto) {
        return supplierService.updateSupplier(supplierId, supplierResponseDto);
    }

    @DeleteMapping("/{supplierId}")
    public String deleteCategory(@PathVariable("supplierId") Long supplierId) {
        supplierService.deleteSupplier(supplierId);
        return "Supplier has been deleted";
    }

    @GetMapping("/search")
    public ResponseEntity<Page<SupplierResponseDto>> getSearchAllIn4(
            @RequestParam(required = false) String search,
            @RequestParam(required = false) String status,
            Pageable pageable) {
        Boolean statusBool = null;
        if (status != null) {
            if ("active".equalsIgnoreCase(status)) {
                statusBool = true;
            } else if ("inactive".equalsIgnoreCase(status)) {
                statusBool = false;
            }
        }
        return ResponseEntity.ok(supplierService.getSearchAllIn4(search, statusBool, pageable));
    }
}
