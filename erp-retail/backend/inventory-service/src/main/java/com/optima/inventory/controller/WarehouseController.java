package com.optima.inventory.controller;

import com.optima.inventory.dto.request.WarehouseRequestDto;
import com.optima.inventory.entity.WarehouseEntity;
import com.optima.inventory.repository.WarehouseRepository;
import com.optima.inventory.service.WarehouseService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/warehouse")
public class WarehouseController {
    @Autowired
    private WarehouseService warehouseService;
    @Autowired
    private WarehouseRepository warehouseRepository;

    @PostMapping
    public WarehouseEntity createWarehouse(@RequestBody @Valid WarehouseRequestDto request) {
        return warehouseService.createWarehouse(request);
    }

    @GetMapping
    public List<WarehouseEntity> getWarehouses() {
        return warehouseService.getWarehouses();
    }

    @GetMapping("/{warehouseId}")
    public WarehouseEntity getWarehouse(@PathVariable("warehouseId") long warehouseId) {
        return warehouseService.getWarehouse(warehouseId);
    }

    @PutMapping("/{warehouseId}")
    public WarehouseEntity updateWarehouse(@PathVariable("warehouseId") long warehouseId, @RequestBody WarehouseRequestDto request) {
        return warehouseService.updateWarehouse(warehouseId, request);
    }

    @DeleteMapping("/{warehouseId}")
    public String deleteWarehouse(@PathVariable("warehouseId") long warehouseId) {
        warehouseService.deleteWarehouse(warehouseId);
        return "Warehouse has been deleted";
    }
}
