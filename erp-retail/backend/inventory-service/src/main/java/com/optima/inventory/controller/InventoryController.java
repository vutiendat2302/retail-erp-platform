package com.optima.inventory.controller;

import com.optima.inventory.dto.request.InventoryRequestDto;
import com.optima.inventory.entity.InventoryEntity;
import com.optima.inventory.repository.InventoryRepository;
import com.optima.inventory.service.InventoryService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/inventory")
public class InventoryController {
    @Autowired
    private InventoryService inventoryService;
    @Autowired
    private InventoryRepository inventoryRepository;

    @PostMapping
    public InventoryEntity createInventory(@RequestBody @Valid InventoryRequestDto request) {
        return inventoryService.createInventory(request);
    }

    @GetMapping
    public List<InventoryEntity> getInventories() {
        return inventoryService.getInventories();
    }

    @GetMapping("/{inventoryId}")
    public InventoryEntity getInventory(@PathVariable("inventoryId") long inventoryId) {
        return inventoryService.getInventory(inventoryId);
    }

    @PutMapping("/{inventoryId}")
    public InventoryEntity updateInventory(@PathVariable("inventoryId") long inventoryId, @RequestBody InventoryRequestDto request) {
        return inventoryService.updateInventory(inventoryId, request);
    }

    @DeleteMapping("/{inventoryId}")
    public String deleteInventory(@PathVariable("inventoryId") long inventoryId) {
        inventoryService.deleteInventory(inventoryId);
        return "Inventory has been deleted";
    }
}
