package com.library.user_service.userService.service;

import com.library.user_service.userService.dto.LoginRequest;
import com.library.user_service.userService.model.User;
import com.library.user_service.userService.repository.UserRepository;
import com.library.user_service.userService.util.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
public class UserService {
    @Autowired
    private UserRepository repo;

    @Autowired
    private JwtUtil jwtUtil;

    public Map<String,String> login(LoginRequest request){
        User user =repo.findByUsername(request.username);

        if (user != null && user.getPassword().trim().equals(request.password.trim())){
             String token =jwtUtil.generateToken(user.getUsername(), user.getRole());
             return Map.of(
                     "token",token,
                     "role", user.getRole()
             );
        }
        throw new RuntimeException("Invalid Credentials");
    }

}
