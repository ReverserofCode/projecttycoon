package com.projecttycoon.demo.controller;

import com.projecttycoon.demo.domain.service.KakaoLoginService;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.*;

@Log4j2
@Component
@RestController
@RequestMapping("/auth")
public class KakaoLoginController {

    @Autowired
    KakaoLoginService kakaoLoginService;

    @ResponseBody
    @GetMapping("/kakao")
    public ResponseEntity<String> kakaoCallBack(@RequestParam String code) throws Exception {
        log.info("call /auth/kakao");
        return kakaoLoginService.kakaoLoginProcess(code);
    }
}
