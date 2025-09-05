package com.optima.inventory.service;

import com.optima.inventory.dto.request.CategoryRequestDto;
import com.optima.inventory.dto.response.CategoryNameResponse;
import com.optima.inventory.entity.CategoryEntity;
import com.optima.inventory.mapper.CategoryMapper;
import com.optima.inventory.repository.CategoryRepository;
import com.optima.inventory.utils.SnowflakeIdGenerator;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CategoryService {
    @Autowired
    private CategoryRepository categoryRepository;
    @Autowired
    private CategoryMapper categoryMapper;

    @Transactional
    public CategoryEntity createCategory(CategoryRequestDto request) {
        CategoryEntity categoryEntity = categoryMapper.toCategory(request);

        long newCategoryId = SnowflakeIdGenerator.nextId();
        while (categoryRepository.existsById(newCategoryId)) {
            newCategoryId = SnowflakeIdGenerator.nextId();
        }
        categoryEntity.setId(newCategoryId);

        return categoryRepository.save(categoryEntity);
    }

    public List<CategoryEntity> getCategories() {
        return categoryRepository.findAll();
    }

    public CategoryEntity getCategory(long categoryId) {
        return categoryRepository.findById(categoryId).orElseThrow(() -> new RuntimeException("category not found"));
    }

    @Transactional
    public CategoryEntity updateCategory(long categoryId, CategoryRequestDto request) {
        CategoryEntity categoryEntity = categoryRepository.findById(categoryId)
                .orElseThrow(() -> new RuntimeException("Category not found"));
        categoryMapper.updateCategory(categoryEntity, request);

        return categoryRepository.save(categoryEntity);
    }

    @Transactional
    public void deleteCategory(long categoryId) {
        categoryRepository.deleteById(categoryId);
    }

    public List<CategoryNameResponse> getCategoryName() {
        return categoryRepository.getCategoryName().stream()
                .map(categoryMapper::toCategoryName)
                .collect(Collectors.toList());
    }

    public int getCountCategoryActive() {
        return categoryRepository.getCountCategoryActive();
    }
}
