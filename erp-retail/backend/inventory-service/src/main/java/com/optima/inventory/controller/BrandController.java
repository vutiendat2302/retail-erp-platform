package com.optima.inventory.controller;

import com.optima.inventory.dto.request.BrandRequesDto;
import com.optima.inventory.entity.BrandEntity;
import com.optima.inventory.repository.BrandRepository;
import com.optima.inventory.service.BrandService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/brand")
public class BrandController {
    @Autowired
    private BrandService brandService;
    @Autowired
    private BrandRepository brandRepository;

    @PostMapping
    public BrandEntity createBrand(@RequestBody @Valid BrandRequesDto request) {
        return brandService.createBrand(request);
    }

    @GetMapping
    public List<BrandEntity> getBrands() {
        return brandService.getBrands();
    }

    @GetMapping("/{brandId}")
    public BrandEntity getBrand(@PathVariable("brandId") long brandId) {
        return brandService.getBrand(brandId);
    }

    @PutMapping("/{brandId}")
    public BrandEntity updateBrand(@PathVariable("brandId") long brandId, @RequestBody BrandRequesDto request) {
        return brandService.updateBrand(brandId, request);
    }

    @DeleteMapping("/{brandId}")
    public String deleteBrand(@PathVariable("brandId") long brandId) {
        brandService.deleteBrand(brandId);
        return "Brand has been deleted";
    }
}
