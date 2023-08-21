package com.projecttycoon.demo.controller;

import lombok.extern.log4j.Log4j2;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.GetMapping;


//웹 사이트 내에서 다른 사이트에 대한 요청을 처리하는 컨르롤러
@Log4j2
@Controller
public class WebController {
    @RequestMapping("/api/signup")
    public String signupPage() { // 회원가입페이지
        return "signup";
    }

    @RequestMapping("/uploadEx")
    public void fileUpload() {
    }

    @GetMapping("/")
    public String callMain() {
        log.info("Call Main index");
        return "/PageProjectBoard/index";
    }

    @GetMapping("/PageLogin")
    public String callPageLogin() {
        return "/PageLogin/index";
    }

    @GetMapping("/PageProjectBoard")
    public String callPageProjectBoard() {
        return "/PageProjectBoard/index";
    }
}
