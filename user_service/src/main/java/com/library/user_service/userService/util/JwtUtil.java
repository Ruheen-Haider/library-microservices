package com.library.user_service.userService.util;

import io.jsonwebtoken.Jwts;
import org.springframework.stereotype.Component;
import io.jsonwebtoken.security.Keys;

import javax.crypto.SecretKey;

@Component
public class JwtUtil {

    private final SecretKey key = Keys.hmacShaKeyFor(
            "my-super-secret-key-my-super-secret-key".getBytes()
    );



    public String generateToken(String username, String role) {
        return Jwts.builder()
                .setSubject(username)
                .claim("role", role)
                .signWith(key)
                .compact();
    }


}
