package com.projecttycoon.demo.controller;


import com.projecttycoon.demo.domain.service.ScrapService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api") // 엔드포인트에 대한 베이스 URL을 설정
public class ScrapController {

    private final ScrapService scrapService;

    @Autowired
    public ScrapController(ScrapService scrapService) {
        this.scrapService = scrapService;
    }

    // 1. 사용자가 프로젝트를 스크랩하는 엔드포인트
    @PostMapping("/project/{projectId}/{memberId}")
    public ResponseEntity<String> scrapProject(
            @PathVariable Long projectId,
            @PathVariable String memberId
    ) {
        scrapService.scrapProject(memberId, projectId);
        return ResponseEntity.ok("Project scrapped successfully.");
    }

    // 2. 스크랩 취소
    @DeleteMapping("/project/{projectId}/{memberId}")
    public ResponseEntity<String> removeScrap(
            @PathVariable Long projectId,
            @PathVariable String memberId
    ){
        scrapService.removeScrap(memberId, projectId);
        return ResponseEntity.ok("Scrapped project removed successfully.");
    }

    //3. 없는글 스크랩시 실패오류


}
