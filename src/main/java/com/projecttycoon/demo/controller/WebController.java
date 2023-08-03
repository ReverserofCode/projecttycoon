package com.projecttycoon.demo.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;


//웹 사이트 내에서 다른 사이트에 대한 요청을 처리하는 컨르롤러
@Controller
public class WebController {
    @RequestMapping("/api/signup")
    public String signupPage() { // 회원가입페이지
        return "signup";
    }
    @RequestMapping("/api/login")
    public String loginPage() { // 회원가입페이지
        return "login";
    }
}
