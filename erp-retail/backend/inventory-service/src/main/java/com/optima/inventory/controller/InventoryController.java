package com.optima.inventory.controller;

import com.optima.inventory.dto.request.InventoryRequestDto;
import com.optima.inventory.dto.response.InventoryResponseDto;
import com.optima.inventory.dto.response.ProductResponseDto;
import com.optima.inventory.entity.InventoryEntity;
import com.optima.inventory.mapper.InventoryMapper;
import com.optima.inventory.repository.InventoryRepository;
import com.optima.inventory.service.InventoryService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.w3c.dom.html.HTMLParagraphElement;

import java.math.BigInteger;
import java.util.List;
@CrossOrigin("http://localhost:5173")
@RestController
@RequestMapping("/api/inventory")
public class InventoryController {
    @Autowired
    private InventoryService inventoryService;
    @Autowired
    private InventoryRepository inventoryRepository;
    @Autowired
    private InventoryMapper inventoryMapper;

    @PostMapping
    public InventoryResponseDto createInventory(@RequestBody @Valid InventoryResponseDto inventoryResponseDto)  {
        return inventoryService.createInventory(inventoryResponseDto);
    }

    @GetMapping("/page")
    public ResponseEntity<Page<InventoryResponseDto>> getPageInventory(Pageable pageable) {
        return ResponseEntity.ok(inventoryService.getAllPage(pageable));
    }

    @GetMapping("/{warehouseId}")
    public List<InventoryResponseDto> getInventoryByWarehouse(@PathVariable Long warehouseId) {
        return inventoryService.findInventoryByWarehouse(warehouseId);
    }

    @GetMapping("/totalPrice/{warehouseId}")
    public BigInteger getTotalPriceNormal(@PathVariable Long warehouseId) {
        return inventoryService.getTotalPriceNormal(warehouseId);
    }

    @GetMapping("/getCountProductInWarehouse/{warehouseId}")
    public BigInteger getCountProductInWarehouse(@PathVariable Long warehouseId) {
        return inventoryService.getCountProductInWarehouse(warehouseId);
    }

    @GetMapping("/getSumQuantityProductInWarehouse/{warehouseId}")
    public BigInteger getSumQuantityProductInWarehouse(@PathVariable Long warehouseId) {
        return inventoryService.getSumProductInWarehouse(warehouseId);
    }

    @GetMapping("/getCountProductsNearExpiry/{warehouseId}")
    public int getCountProductsNearExpiry(@PathVariable Long warehouseId) {
        return inventoryService.getCountProductsNearExpiry(warehouseId);
    }

    @GetMapping("/getCountProductsNearOut/{warehouseId}")
    public int getCountProductsNearOut(@PathVariable Long warehouseId) {
        return inventoryService.getCountProductsNearOut(warehouseId);
    }

    @GetMapping("/{warehouseId}/search")
    public ResponseEntity<Page<InventoryResponseDto>> getSearchAllIn4(
            @PathVariable Long warehouseId,
            @RequestParam(required = false) String productName,
            @RequestParam(required = false) Long productBatch,
            Pageable pageable
    ) {
        return ResponseEntity.ok(inventoryService.getSearchAllIn4(warehouseId,productName, productBatch, pageable));
    }
}
