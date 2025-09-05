package com.optima.backend.POS_Service.utils;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PaginationMetadata {
    private int currentPage;
    private int pageSize;
    private long totalItems;
    private int totalPages;
    private boolean hasNext;
    private boolean hasPrevious;
    public PaginationMetadata(int currentPage, int pageSize, long totalItems, int totalPages) {
        this.currentPage = currentPage;
        this.pageSize = pageSize;
        this.totalItems = totalItems;
        this.totalPages = totalPages;
        this.hasNext = (currentPage < totalPages);
        this.hasPrevious = (currentPage > 1);
    }
}
