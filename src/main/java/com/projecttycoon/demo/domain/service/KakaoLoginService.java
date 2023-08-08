package com.projecttycoon.demo.domain.service;


import lombok.NoArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

@Log4j2
@Service
@Component
public class KakaoLoginService {
    @Value("${kakao-RestAPIKey}")
    String kakaoRestAPIKey;
    @Value("${kakao-redirectUri}")
    String redirectUri;
    @Value("${kakao-ApiUrl}")
    String kakaoApiUrl;

    public ResponseEntity<String> kakaoLoginProcess(String code) throws Exception{

        log.info("Call Post logic");
        final String grant_type = "authorization_code";
        log.info("Call KakaoRestApiKey : "+kakaoRestAPIKey);
        log.info("Call redirect uri : "+redirectUri);
        log.info("Call KakaoRestAPiKEY : "+kakaoApiUrl);


        MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
        params.add("grant_type", grant_type);
        params.add("client_id", kakaoRestAPIKey);
        params.add("redirect_uri", redirectUri);
        params.add("code", code);

        ResponseEntity<String> responseEntity = new RestTemplate().postForEntity(kakaoApiUrl, params, String.class);

        if (responseEntity.getStatusCode().is2xxSuccessful()) {
            log.info("Success response");
            String responseBody = responseEntity.getBody();
            log.info(responseBody);
            return responseEntity;
        } else {
            log.info("Fail login response");
            return null;
        }

    }
}
