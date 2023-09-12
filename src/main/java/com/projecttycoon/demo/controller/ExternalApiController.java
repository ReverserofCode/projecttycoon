package com.projecttycoon.demo.controller;

import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

@Log4j2
@RestController
public class ExternalApiController {

    @Value("${seoul-apiKey}")
    private String seoulApiKey;

    private String apiUrl = "http://openapi.seoul.go.kr:8088";
    private final String service = "jobNewDealBizOpenInfo";
    private final int startIndex = 1;
    private final int endIndex = 2000;

    @GetMapping("/callNewListInSeoul")
    public ResponseEntity<String> callJobList() {

        log.info("call Job List");

        String uri = apiUrl + "/" + seoulApiKey + "/json/" + service + "/" + startIndex + "/" + endIndex;
        ResponseEntity<String> responseEntity = new RestTemplate().getForEntity(uri, String.class);

        return responseEntity;
    }
}
