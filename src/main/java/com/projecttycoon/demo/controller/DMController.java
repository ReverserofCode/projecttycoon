package com.projecttycoon.demo.controller;

import com.projecttycoon.demo.domain.Entity.DMEntity;
import com.projecttycoon.demo.domain.Entity.DMroomEntity;
import com.projecttycoon.demo.domain.Entity.MemberEntity;
import com.projecttycoon.demo.domain.dto.DMNewRequestDTO;
import com.projecttycoon.demo.domain.dto.DMRequestDTO;
import com.projecttycoon.demo.domain.repository.DMRepository;
import com.projecttycoon.demo.domain.repository.DMroomRepository;
import com.projecttycoon.demo.domain.repository.MemberRepository;
import com.projecttycoon.demo.domain.service.DMService;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@Log4j2
@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
public class DMController {
    private final DMService dmService;
    private final MemberRepository memberRepository;

    // 두 사용자의 ID를 받아 DM Room 생성 및 오픈하는 API
    // 동작 확인 O
    @PostMapping("/openDMroomDirectly")
    public DMroomEntity openDMroomDirectly(@RequestBody DMNewRequestDTO dmNewDTO) {
        DMroomEntity response = dmService.openDMroom(dmNewDTO.getDMFromId(), dmNewDTO.getDMToId());
        log.info("from: {}, to: {}", response.getDMFrom(), response.getDMTo());
        return response;
    }

    // DM 보내는 API
    @PostMapping("/dmsend")
    public void sendDM(@RequestBody DMRequestDTO dmRequestDTO) {
        Long response = dmService.sendDM(dmRequestDTO);
        log.info("DMId: {}", response);
    }

    // 현재 사용자의 DMroom List 반환하는 API
    // 동작 확인 O
    @GetMapping("/dmroomList/{userId}")
    public List<DMEntity> getDMList(@PathVariable String userId) {
        List<DMEntity> response = dmService.readDMroomList(userId);

        return response;
    }

    // DMroomId로 해당 DM창의 대화 보여주는 API
    // 동작 확인 O
    @GetMapping("/getMessages/{DMroomId}")
    public List<DMEntity> openDMroom(@PathVariable Long DMroomId, Authentication authentication) {
        String loggedInUsername = authentication.getName();
        log.info("session: {}", loggedInUsername);
        MemberEntity loggedInUser = memberRepository.findByMemberId(loggedInUsername).orElse(null);

        List<DMEntity> response = dmService.readDMroom(DMroomId, loggedInUser);
        log.info("response size: {}", response.size());
        return response;
    }
}