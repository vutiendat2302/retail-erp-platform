package com.optima.auth.service;

import com.optima.auth.domain.RefreshToken;
import com.optima.auth.domain.User;
import com.optima.auth.repository.RefreshTokenRepository;
import com.optima.auth.repository.UserRepository;
import com.optima.auth.security.JwtService;
import com.optima.auth.web.dto.LoginRequest;
import com.optima.auth.web.dto.RefreshRequest;
import com.optima.auth.web.dto.RegisterRequest;
import com.optima.auth.web.dto.TokenResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepo;
    private final RefreshTokenRepository rtRepo;
    private final PasswordEncoder encoder;
    private final JwtService jwt;

    @Value("${security.jwt.refresh-token-ttl-days}")
    private long refreshTtlDays;

    public void register(RegisterRequest req) {
        if (userRepo.existsByUsernameOrEmail(req.username(), req.email()))
            throw new IllegalArgumentException("Username hoặc email đã tồn tại");

        var u = new User();
        u.setUsername(req.username());
        u.setEmail(req.email());
        u.setPasswordHash(encoder.encode(req.password()));
        u.setRoles("ROLE_USER");
        u.setEnabled(true);
        userRepo.save(u);
    }

    public TokenResponse login(LoginRequest req) {
        var user = userRepo.findByUsernameOrEmail(req.usernameOrEmail(), req.usernameOrEmail())
                .orElseThrow(() -> new BadCredentialsException("Sai thông tin đăng nhập"));

        if (!encoder.matches(req.password(), user.getPasswordHash()))
            throw new BadCredentialsException("Sai thông tin đăng nhập");

        var access = jwt.generateAccessToken(user);

        var refresh = new RefreshToken();
        refresh.setToken(UUID.randomUUID().toString());
        refresh.setUser(user);
        refresh.setExpiresAt(Instant.now().plus(refreshTtlDays, ChronoUnit.DAYS));
        rtRepo.save(refresh);

        return new TokenResponse(access, refresh.getToken(), 60L * 15L);
    }

    public TokenResponse refresh(RefreshRequest req) {
        var rt = rtRepo.findByToken(req.refreshToken())
                .orElseThrow(() -> new BadCredentialsException("Refresh token không hợp lệ"));
        if (rt.isRevoked() || rt.getExpiresAt().isBefore(Instant.now()))
            throw new BadCredentialsException("Refresh token hết hạn/đã thu hồi");

        var user = rt.getUser();
        var access = jwt.generateAccessToken(user);

        // token rotation
        rt.setRevoked(true);
        rtRepo.save(rt);

        var newRt = new RefreshToken();
        newRt.setToken(UUID.randomUUID().toString());
        newRt.setUser(user);
        newRt.setExpiresAt(Instant.now().plus(refreshTtlDays, ChronoUnit.DAYS));
        rtRepo.save(newRt);

        return new TokenResponse(access, newRt.getToken(), 60L * 15L);
    }
}
