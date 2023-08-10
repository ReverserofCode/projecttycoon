package com.projecttycoon.demo.domain.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;


//카카오 로그인 API 호출 관리 하는 클래스
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
    @Value("${kakao-dataUrl}")
    String dataUrl;

    public ResponseEntity<String> kakaoLoginProcess(String code) throws Exception {

        log.info("Call Post logic");
        final String grant_type = "authorization_code";
        log.info("Call KakaoRestApiKey : " + kakaoRestAPIKey);
        log.info("Call redirect uri : " + redirectUri);
        log.info("Call KakaoRestAPiKEY : " + kakaoApiUrl);

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

            ObjectMapper objectMapper = new ObjectMapper();
            JsonNode jsonNode = objectMapper.readTree(responseBody);

            String accessToken = jsonNode.get("access_token").asText();
            String tokenType = jsonNode.get("token_type").asText();

            log.info("Access Token : " + accessToken);
            log.info("Token Type : " + tokenType);

            responseEntity = getAgreementInfo(accessToken);

            return responseEntity;
        } else {
            log.info("Fail login response");
            return null;
        }
    }

    public ResponseEntity<String> getAgreementInfo(String accessToken) throws Exception {

        log.info("Call getAgreement");
        log.info("call AccessToken : " + accessToken);
        log.info("Call DataUrl : " + dataUrl);

        // RestTemplate 생성
        RestTemplate restTemplate = new RestTemplate();
        HttpHeaders headers = new HttpHeaders();

        headers.add("Authorization", "Bearer " + accessToken);
        headers.add("Content-type", "application/x-www-form-urlencoded;charset=utf-8");

        HttpEntity<MultiValueMap<String, String>> kakaoProfileRequest = new HttpEntity<>(headers);
        ResponseEntity<String> response = restTemplate.exchange(dataUrl, HttpMethod.GET, kakaoProfileRequest, String.class);
        log.info(response.getBody());

        return response;
    }
}
