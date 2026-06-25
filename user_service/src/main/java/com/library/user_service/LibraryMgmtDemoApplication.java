package com.library.user_service;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;



@SpringBootApplication
@EntityScan("com.library.user_service.userService.model")
@EnableJpaRepositories("com.library.user_service.userService.repository")
public class LibraryMgmtDemoApplication {

	public static void main(String[] args) {
		SpringApplication.run(LibraryMgmtDemoApplication.class, args);
	}

}
