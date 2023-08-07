package com.projecttycoon.demo.controller;

import org.springframework.http.CacheControl;
import org.springframework.stereotype.Controller;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.util.concurrent.TimeUnit;


//웹 사이트 내에서 다른 사이트에 대한 요청을 처리하는 컨르롤러
@Controller
public class WebController implements WebMvcConfigurer {
    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        registry
                .addResourceHandler("/**")
                .addResourceLocations("classpath:/templates", "classpath:/static")
                .setCacheControl(CacheControl.maxAge(10, TimeUnit.MINUTES));
        WebMvcConfigurer.super.addResourceHandlers(registry);
    }
}
