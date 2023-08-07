package com.projecttycoon.demo.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;


//웹 사이트 내에서 다른 사이트에 대한 요청을 처리하는 컨르롤러
@Controller
public class WebController  {
    @GetMapping("/")
    public String callMain(){
        return "index";
    }
}
