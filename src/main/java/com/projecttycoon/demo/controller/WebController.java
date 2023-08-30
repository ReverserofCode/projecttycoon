package com.projecttycoon.demo.controller;

import lombok.extern.log4j.Log4j2;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.GetMapping;


//웹 사이트 내에서 다른 사이트에 대한 요청을 처리하는 컨르롤러
@Log4j2
@Controller
public class WebController {

    @RequestMapping("/api/login")
    public String initiatingLogin() {
        return "/static/PageLogin/index.html";
    }

    @RequestMapping("/uploadEx")
    public void fileUpload() {
    }

    @GetMapping("/")
    public String callMain() {
        return "/static/PageProjectBoard/index.html";
    }

    @GetMapping("/PageLogin")
    public String callPageLogin() {
        return "/static/PageLogin/index.html";
    }

    @GetMapping("/PageProjectBoard")
    public String callPageProjectBoard() {
        return "/static/PageProjectBoard/index.html";
    }

    @GetMapping("/loginProcess")
    public String callLoginProcess() {
        return "/static/loginProcess/index.html";
    }

    @GetMapping("/callPageNewProject")
    public String callPageNewProject() {
        return "/static/PageNewProject/index.html";
    }

    @GetMapping("/callPageProjectBoardDetail")
    public String callPageProjectBoardDetail() {
        return "/static/PageProjectBoardDetail/index.html";
    }


}
