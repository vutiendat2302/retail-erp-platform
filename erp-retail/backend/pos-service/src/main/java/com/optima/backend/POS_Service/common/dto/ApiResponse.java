package com.optima.backend.POS_Service.common.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.optima.backend.POS_Service.utils.PaginationMetadata;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Getter
@Setter
@FieldDefaults(level = AccessLevel.PRIVATE)
@JsonInclude(JsonInclude.Include.NON_NULL)
@AllArgsConstructor
@NoArgsConstructor
public class ApiResponse<T> {
    int code = 200;
    String message;
    T data;
    PaginationMetadata pagination;
    public ApiResponse(String message) {
        this.message = message;
    }
    public ApiResponse(T data, PaginationMetadata pagination) {
        this.data = data;
        this.pagination = pagination;
    }
}
