package com.projecttycoon.demo.controller;

import com.projecttycoon.demo.domain.service.KakaoLoginService;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.*;
import org.springframework.stereotype.Component;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.client.RestTemplate;

@Log4j2
@Component
@RequiredArgsConstructor
@RequestMapping("/auth")
public class KakaoLoginController {

    @ResponseBody
    @GetMapping("/kakao")
    public ResponseEntity<String> kakaoCallBack(@RequestParam String code) throws Exception {
        KakaoLoginService kakaoLoginService = new KakaoLoginService();
        return kakaoLoginService.kakaoLoginProcess(code);
    }
}
