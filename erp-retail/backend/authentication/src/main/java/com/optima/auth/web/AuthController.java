package com.optima.auth.web;

import com.optima.auth.security.JwtService;
import com.optima.auth.service.AuthService;
import com.optima.auth.web.dto.*;
import io.jsonwebtoken.Claims;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService auth;
    private final JwtService jwt;

    @PostMapping("/register")
    public ResponseEntity<Void> register(@Valid @RequestBody RegisterRequest req) {
        auth.register(req);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @PostMapping("/login")
    public ResponseEntity<TokenResponse> login(@Valid @RequestBody LoginRequest req) {
        return ResponseEntity.ok(auth.login(req));
    }

    @PostMapping("/refresh")
    public ResponseEntity<TokenResponse> refresh(@Valid @RequestBody RefreshRequest req) {
        return ResponseEntity.ok(auth.refresh(req));
    }

    // Optional: kiểm tra nhanh token
    @GetMapping("/me")
    public Map<String, Object> me(@RequestHeader("Authorization") String authz) {
        String token = authz.replace("Bearer", "").trim();
        Claims c = jwt.verifyAndGetClaims(token);
        return Map.of(
                "sub", c.getSubject(),
                "uid", c.get("uid"),
                "roles", c.get("roles")
        );
    }
}
