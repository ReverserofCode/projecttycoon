package com.projecttycoon.demo.controller;

import com.projecttycoon.demo.domain.service.KakaoLoginService;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.*;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

@Log4j2
@Component
@RequiredArgsConstructor
@RestController
@RequestMapping("/auth")
public class KakaoLoginController {

    @ResponseBody
    @GetMapping("/kakao")
    public ResponseEntity<String> kakaoCallBack(@RequestParam String code) throws Exception {
        log.info("call /auth/kakao");
        KakaoLoginService kakaoLoginService = new KakaoLoginService();
        return kakaoLoginService.kakaoLoginProcess(code);
    }

//    @GetMapping("/kakaoProcessCall")
//    public String kakaoLoginProcessCall() {
//
//        log.info("call kakaoProcessCall");
//        final String kakaoLoginURL = "https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=777cadaafac1cb2cb8aa5dc765cde3f4&redirect_uri=http://projecttycoon.com/auth/kakao";
//        RestTemplate restTemplate = new RestTemplate();
//        ResponseEntity<String> responseEntity = restTemplate.getForEntity(kakaoLoginURL, String.class);
//        if (responseEntity.getStatusCode().is2xxSuccessful()) {
//            log.info("KakaoLogin Process Accept");
//            String responseBody = responseEntity.getBody();
//            log.info("Response : " + responseBody);
//            return responseBody;
//        } else {
//            log.info("Failed to get data. Status code : " + responseEntity.getStatusCode());
//            return null;
//        }
//    }
}
