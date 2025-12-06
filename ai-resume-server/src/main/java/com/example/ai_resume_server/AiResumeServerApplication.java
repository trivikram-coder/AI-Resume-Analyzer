package com.example.ai_resume_server;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
@RestController
@SpringBootApplication
public class AiResumeServerApplication {

	public static void main(String[] args) {
		SpringApplication.run(AiResumeServerApplication.class, args);
	}
	@GetMapping
	public String health(){
		return "Server running successfully done 🚀🚀🚀";
	}

}
