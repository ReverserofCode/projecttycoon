package com.projecttycoon.demo.controller;

import com.fasterxml.jackson.databind.util.JSONPObject;
import com.projecttycoon.demo.domain.service.KakaoLoginService;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.apache.tomcat.util.json.JSONParser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponents;
import org.springframework.web.util.UriComponentsBuilder;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.HashMap;
import java.util.Map;
import java.util.Objects;

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
