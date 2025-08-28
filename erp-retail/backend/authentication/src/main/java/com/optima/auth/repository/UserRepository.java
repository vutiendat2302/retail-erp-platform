package com.optima.auth.repository;

import com.optima.auth.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByUsernameOrEmail(String u, String e);
    boolean existsByUsernameOrEmail(String u, String e);
}
