package com.optima.inventory.service;

import com.optima.inventory.dto.response.CategoryNameResponse;
import com.optima.inventory.dto.response.CategoryResponseDto;
import com.optima.inventory.entity.CategoryEntity;
import com.optima.inventory.mapper.CategoryMapper;
import com.optima.inventory.repository.CategoryRepository;
import com.optima.inventory.utils.SnowflakeIdGenerator;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
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
    public CategoryResponseDto createCategory(CategoryResponseDto response) {
        CategoryEntity categoryEntity = categoryMapper.toCategory(response);

        long newCategoryId = SnowflakeIdGenerator.nextId();
        while (categoryRepository.existsById(newCategoryId)) {
            newCategoryId = SnowflakeIdGenerator.nextId();
        }
        categoryEntity.setId(newCategoryId);

        return categoryMapper.toCategoryResponseDto(categoryRepository.save(categoryEntity));
    }

    public CategoryResponseDto getCategory(Long categoryId) {
        CategoryEntity categoryEntity = categoryRepository.findById(categoryId)
                .orElseThrow(() -> new RuntimeException("category not find" + categoryId));
        return categoryMapper.toCategoryResponseDto(categoryEntity);
    }

    @Transactional
    public CategoryResponseDto updateCategory(Long categoryId, CategoryResponseDto categoryResponseDto) {
        CategoryEntity categoryEntity = categoryMapper.toCategory(categoryResponseDto);
        categoryMapper.updateCategory(categoryEntity, categoryResponseDto);
        CategoryEntity afterUpdateCategory = categoryRepository.save(categoryEntity);
        return categoryMapper.toCategoryResponseDto(afterUpdateCategory);
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

    public Page<CategoryResponseDto> getSearchAllIn4(String search, Boolean status, Pageable pageable) {
        return categoryRepository.getSearchAllIn4(search, status, pageable).map(categoryMapper::fromProjection);
    }
}
