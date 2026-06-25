package com.library.user_service.userService.controller;

import com.library.user_service.userService.dto.LoginRequest;
import com.library.user_service.userService.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/auth")
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/login")
    public Map<String,String> login(@RequestBody LoginRequest request){

        return userService.login(request);
    }

    @GetMapping("/test")
    public String test() {
        return "Backend is working";
    }

}
