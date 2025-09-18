package com.optima.inventory.controller;

import com.optima.inventory.dto.request.BrandRequesDto;
import com.optima.inventory.dto.response.BrandNameResponse;
import com.optima.inventory.dto.response.BrandResponseDto;
import com.optima.inventory.dto.response.CategoryResponseDto;
import com.optima.inventory.entity.BrandEntity;
import com.optima.inventory.repository.BrandRepository;
import com.optima.inventory.service.BrandService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
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

    @GetMapping("/name")
    public List<BrandNameResponse> getBrandName() {
        return brandService.getBrandName();
    }

    @GetMapping("/getCountBrandActive")
    public int getCountBrandActive() {
        return brandService.getCountBrandActive();
    }

    @PostMapping
    public BrandResponseDto createBrand(@RequestBody @Valid BrandResponseDto request) {
        return brandService.createBrand(request);
    }

    @GetMapping("/{brandId}")
    public BrandResponseDto getBrand(@PathVariable("brandId") Long brandId) {
        return brandService.getBrand(brandId);
    }

    @PutMapping("/{brandId}")
    public BrandResponseDto updateBrand(@PathVariable("brandId") Long brandId, @RequestBody BrandResponseDto request) {
        return brandService.updateBrand(brandId, request);
    }

    @DeleteMapping("/{brandId}")
    public String deleteBrand(@PathVariable("brandId") Long brandId) {
        brandService.deleteBrand(brandId);
        return "Brand has been deleted";
    }

    @GetMapping("/search")
    public ResponseEntity<Page<BrandResponseDto>> getSearchAllIn4(
            @RequestParam(required = false) String search,
            @RequestParam(required = false) String status,
            Pageable pageable) {
        Boolean statusBool = null;
        if ("active".equalsIgnoreCase(status)) {
            statusBool = true;
        } else if ("inactive".equalsIgnoreCase(status)) {
            statusBool = false;
        }
        return ResponseEntity.ok(brandService.getSearchAllIn4(search, statusBool, pageable));
    }
}
