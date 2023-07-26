package com.projecttycoon.demo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.EntityListeners;

@SpringBootApplication
@EntityListeners(AuditingEntityListener.class)
public class ProjecttycoonApplication {
    public static void main(String[] args) {
        SpringApplication.run(ProjecttycoonApplication.class, args);
    }
}
