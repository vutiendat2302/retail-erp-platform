package com.optima.inventory.controller;

import com.optima.inventory.dto.request.WarehouseRequestDto;
import com.optima.inventory.dto.response.WarehouseResponseDto;
import com.optima.inventory.entity.WarehouseEntity;
import com.optima.inventory.repository.WarehouseRepository;
import com.optima.inventory.service.WarehouseService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/warehouse")
public class WarehouseController {
    @Autowired
    private WarehouseService warehouseService;
    @Autowired
    private WarehouseRepository warehouseRepository;

    @PostMapping
    public WarehouseResponseDto createWarehouse(@RequestBody @Valid WarehouseResponseDto warehouseResponseDto) {
        return warehouseService.createWarehouse(warehouseResponseDto);
    }

    @GetMapping
    public List<WarehouseResponseDto> getWarehouses() {
        return warehouseService.getWarehouses();
    }

    @GetMapping("/{warehouseId}")
    public WarehouseEntity getWarehouse(@PathVariable Long warehouseId) {
        return warehouseService.getWarehouse(warehouseId);
    }
}
