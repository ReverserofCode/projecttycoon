package com.projecttycoon.demo.controller;

import com.projecttycoon.demo.domain.Entity.DMEntity;
import com.projecttycoon.demo.domain.Entity.MemberEntity;
import com.projecttycoon.demo.domain.dto.DMRequestDTO;
import com.projecttycoon.demo.domain.dto.MemberRequestDTO;
import com.projecttycoon.demo.domain.repository.DMRepository;
import com.projecttycoon.demo.domain.repository.DMroomRepository;
import com.projecttycoon.demo.domain.repository.MemberRepository;
import com.projecttycoon.demo.domain.service.DMService;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Log4j2
@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
public class DMController {
    private final DMService dmService;
    private final DMRepository dmRepository;
    private final DMroomRepository dmroomRepository;
    private final MemberRepository memberRepository;

    // DM Room 생성하는 API
    @PostMapping("/dmroomCreate")
    public void openDM(MemberRequestDTO DMFromDTO, MemberRequestDTO DMToDTO, @AuthenticationPrincipal MemberEntity member) {
        MemberEntity DMFrom = memberRepository.findByMemberId(DMFromDTO.getMemberId()).get();
        MemberEntity DMTo = memberRepository.findByMemberId(DMToDTO.getMemberId()).get();
        if (dmroomRepository.findDMroomId(DMFrom, DMTo) == null) {

        }
    }

    @PostMapping("/dmsent")
    public void sendDirectMessage(@RequestBody DMRequestDTO dmRequestDTO) {
        dmService.sendDM(dmRequestDTO);
    }

    @PostMapping("/dmreceive")
    public void receiveDirectMessage(@RequestBody DMRequestDTO dmRequestDTO) {
        dmService.readDM(dmRequestDTO);
    }

    @GetMapping("/getMessages")
    public List<DMEntity> getMessages(@RequestParam String DMFromId, @RequestParam String DMToId) {
        log.info("fromId: {}, toId: {}", DMFromId, DMToId);
        List<DMEntity> messages= dmRepository.findAllByDMFromIdAndDMToId(DMFromId, DMToId);
        log.info("Retrieved messages: {}", messages);
        return messages;
    }
}