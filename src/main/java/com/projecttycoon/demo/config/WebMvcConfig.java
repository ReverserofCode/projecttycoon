package com.projecttycoon.demo.config;


import org.springframework.context.annotation.Configuration;
import org.springframework.http.CacheControl;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.util.concurrent.TimeUnit;

@Configuration
//이 클래스는 프로젝트의 home 의 위치를 재설정하는 클래스이다.
//이 클래스가 없을 시 React 가 작동하지 않는다. 주의
public class WebMvcConfig implements WebMvcConfigurer {

    @Override
    public void addResourceHandlers(final ResourceHandlerRegistry registry) {
        registry
                .addResourceHandler("/**")
                .addResourceLocations("classpath:/static")
                .setCacheControl(CacheControl.maxAge(10, TimeUnit.MINUTES));
        WebMvcConfigurer.super.addResourceHandlers(registry);
    }
}
