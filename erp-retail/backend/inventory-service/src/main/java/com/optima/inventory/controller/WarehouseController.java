package com.optima.inventory.controller;

import com.optima.inventory.dto.request.WarehouseCreationRequest;
import com.optima.inventory.dto.request.WarehouseUpdateRequest;
import com.optima.inventory.dto.response.WarehouseResponse;
import com.optima.inventory.entity.WarehouseEntity;
import com.optima.inventory.reponsitory.WarehouseRepository;
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
    public WarehouseEntity createWarehouse(@RequestBody @Valid WarehouseCreationRequest request) {
        return warehouseService.createWarehouse(request);
    }

    @GetMapping
    public List<WarehouseEntity> getWarehouses() {
        return warehouseService.getWarehouses();
    }

    @GetMapping("/{warehouseId}")
    public WarehouseResponse getWarehouse(@PathVariable("warehouseId") long warehouseId) {
        return warehouseService.getWarehouse(warehouseId);
    }

    @PutMapping("/{warehouseId}")
    public WarehouseResponse updateWarehouse(@PathVariable("warehouseId") long warehouseId, @RequestBody WarehouseUpdateRequest request) {
        return warehouseService.updateWarehouse(warehouseId, request);
    }

    @DeleteMapping("/{warehouseId}")
    public String deleteWarehouse(@PathVariable("warehouseId") long warehouseId) {
        warehouseService.deleteWarehouse(warehouseId);
        return "Warehouse has been deleted";
    }
}
