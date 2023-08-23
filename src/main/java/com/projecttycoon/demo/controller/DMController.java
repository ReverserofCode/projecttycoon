package com.projecttycoon.demo.controller;

import com.projecttycoon.demo.domain.Entity.DMEntity;
import com.projecttycoon.demo.domain.Entity.DMroomEntity;
import com.projecttycoon.demo.domain.Entity.MemberEntity;
import com.projecttycoon.demo.domain.TimeStamp;
import com.projecttycoon.demo.domain.dto.DMNewRequestDTO;
import com.projecttycoon.demo.domain.dto.DMRequestDTO;
import com.projecttycoon.demo.domain.dto.MemberRequestDTO;
import com.projecttycoon.demo.domain.repository.DMRepository;
import com.projecttycoon.demo.domain.repository.DMroomRepository;
import com.projecttycoon.demo.domain.repository.MemberRepository;
import com.projecttycoon.demo.domain.service.DMService;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Log4j2
@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
public class DMController extends TimeStamp {
    private final DMService dmService;
    private final DMRepository dmRepository;
    private final DMroomRepository dmroomRepository;
    private final MemberRepository memberRepository;

    // 두 사용자의 ID를 받아 DM Room 생성 및 오픈하는 API
    // 동작 확인 O
    @PostMapping("/openDMroomDirectly")
    public DMroomEntity openDMroomDirectly(@RequestBody DMNewRequestDTO dmNewDTO) {
        System.out.println("Controller DTO Test: " + dmNewDTO);
        DMroomEntity response = dmService.openDMroom(dmNewDTO.getDMFromId(), dmNewDTO.getDMToId());
        log.info("from: {}, to: {}", response.getDMFrom(), response.getDMTo());
        return response;
    }

    // DM 보내는 API
    // 동작 확인 X
    @PostMapping("/dmsend")
    public void sendDM(@RequestBody DMRequestDTO dmRequestDTO) {
        System.out.println("Controller DTO Test: " + dmRequestDTO);
        Long response = dmService.sendDM(dmRequestDTO);
        log.info("DMId: {}", response);
    }

    // 현재 사용자의 DMroom List 반환하는 API
    // 동작 확인 X
    @GetMapping("/dmroomList/{userId}")
    public List<DMroomEntity> getDMList(@PathVariable String userId) {
        List<DMroomEntity> response = dmService.readDMroomList(userId);
        log.info(response.size());
        log.info(response.get(0).getDMFrom());
        log.info(response.get(0).getDMTo());
        return response;
    }

    // DMroomId로 해당 DM창의 대화 보여주는 API
    // 동작 확인 O
    @GetMapping("/getMessages/{DMroomId}")
    public List<DMEntity> openDMroom(@PathVariable Long DMroomId) {
        List<DMEntity> response = dmService.readDMroom(DMroomId);
        log.info("firstDM: {}", response.size());
        return response;
    }
}