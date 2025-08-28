package com.optima.auth.web.dto;

public record TokenResponse(
        String accessToken,
        String refreshToken,
        long expiresInSec
) {}