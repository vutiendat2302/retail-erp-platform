package com.optima.inventory.dto.response;

import lombok.Data;

@Data
public class ApiResponse <T> {
    private int code;
    private String message;
    private T result;
}
