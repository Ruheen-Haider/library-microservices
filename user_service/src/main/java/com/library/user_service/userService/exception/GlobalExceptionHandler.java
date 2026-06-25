package com.library.user_service.userService.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

@ControllerAdvice
public class GlobalExceptionHandler {

        // Handle runtime exceptions
        @ExceptionHandler(RuntimeException.class)
        public ResponseEntity<Map<String, Object>> handleRuntimeException(RuntimeException ex) {

            Map<String, Object> error = new HashMap<>();
            error.put("timestamp", LocalDateTime.now());
            error.put("status", 401);
            error.put("message", ex.getMessage());

            return new ResponseEntity<>(error, HttpStatus.UNAUTHORIZED);
        }

        // Catch-all for unexpected errors
        @ExceptionHandler(Exception.class)
        public ResponseEntity<Map<String, Object>> handleException(Exception ex) {

            Map<String, Object> error = new HashMap<>();
            error.put("timestamp", LocalDateTime.now());
            error.put("status", 500);
            error.put("message", "Something went wrong");

            return new ResponseEntity<>(error, HttpStatus.INTERNAL_SERVER_ERROR);
        }

}
