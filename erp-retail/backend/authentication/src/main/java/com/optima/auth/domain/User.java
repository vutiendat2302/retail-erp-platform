package com.optima.auth.domain;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Setter
public class User {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private String username;

    @Column(unique = true, nullable = false)
    private String email;

    @Column(nullable = false)
    private String passwordHash;

    @Column(nullable = false)
    private String roles; // "ROLE_USER,ROLE_ADMIN"

    private boolean enabled = true;
}
