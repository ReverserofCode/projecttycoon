package com.projecttycoon.demo.controller;

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

        log.info("Call Post logic");

        final String grant_type = "authorization_code";
        final String client_id = "777cadaafac1cb2cb8aa5dc765cde3f4";
        final String redirect_uri = "http://localhost:9999/auth/kakao";
        final String api_Url = "https://kauth.kakao.com/oauth/token";

        MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
        params.add("grant_type", grant_type);
        params.add("client_id", client_id);
        params.add("redirect_uri", redirect_uri);
        params.add("code",code);

        ResponseEntity<String> responseEntity = new RestTemplate()
                .postForEntity(api_Url, params, String.class);

        if(responseEntity.getStatusCode().is2xxSuccessful()){
            log.info("Success response");
            String responseBody = responseEntity.getBody();
            log.info(responseBody);
            return responseEntity;
        }
        else {
            log.info("Fail login response");
            return null;
        }
    }
}