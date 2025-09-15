package com.optima.inventory.controller;

import com.optima.inventory.dto.response.CategoryNameResponse;
import com.optima.inventory.dto.response.CategoryResponseDto;
import com.optima.inventory.repository.CategoryRepository;
import com.optima.inventory.service.CategoryService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/category")
public class CategoryController {
    @Autowired
    private CategoryService categoryService;
    @Autowired
    private CategoryRepository categoryRepository;


    // CRUD
    @PostMapping
    public CategoryResponseDto createCategory(@RequestBody @Valid CategoryResponseDto request) {
        return categoryService.createCategory(request);
    }

    @GetMapping("/{categoryId}")
    public CategoryResponseDto getCategory(@PathVariable("categoryId") Long categoryId) {
        return categoryService.getCategory(categoryId);
    }

    @PutMapping("/{categoryId}")
    public CategoryResponseDto updateCategory(@PathVariable("categoryId") Long categoryId, @RequestBody CategoryResponseDto request) {
        return categoryService.updateCategory(categoryId, request);
    }

    @DeleteMapping("/{categoryId}")
    public String deleteCategory(@PathVariable("categoryId") Long categoryId) {
        categoryService.deleteCategory(categoryId);
        return "Category has been deleted";
    }

    @GetMapping("/name")
    public List<CategoryNameResponse> getCategoryName() {
        return categoryService.getCategoryName();
    }

    @GetMapping("/getCountCategoryActive")
    public int getCountCategoryActive() {
        return categoryService.getCountCategoryActive();
    }

    @GetMapping("/search")
    public ResponseEntity<Page<CategoryResponseDto>> getSearchAllIn4(
            @RequestParam(required = false) String search,
            @RequestParam(required = false) String status,
            Pageable pageable) {
        Boolean statusBool = null;
        if ("active".equalsIgnoreCase(status)) {
            statusBool = true;
        } else if ("inactive".equalsIgnoreCase(status)) {
            statusBool = false;
        }
        return ResponseEntity.ok(categoryService.getSearchAllIn4(search, statusBool, pageable));
    }
}
