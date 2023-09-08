package com.projecttycoon.demo.controller;

import com.projecttycoon.demo.domain.Entity.MemberEntity;
import com.projecttycoon.demo.domain.dto.MemberLoginDTO;
import com.projecttycoon.demo.domain.dto.MemberRequestDTO;
import com.projecttycoon.demo.domain.repository.MemberRepository;
import com.projecttycoon.demo.domain.service.MemberService;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;

@Log4j2
@RestController
@RequiredArgsConstructor
public class MemberController {

    final MemberRepository memberRepository;
    MemberService memberService;

    @Autowired
    MemberController(MemberService memberService, MemberRepository memberRepository) {
        this.memberService = memberService;
        this.memberRepository = memberRepository;
    }

    @GetMapping("/api/callTest")
    public void callTest() {
        log.info("call callTest");
    }

    @GetMapping("/sessionObject")
    public MemberLoginDTO requestSession(@AuthenticationPrincipal MemberLoginDTO memberLoginDTO) {
        log.info("Call request Session : "+memberLoginDTO);
        return memberLoginDTO;
    }

    @PostMapping("/api/memberRegister")
    public void registerDB(@RequestBody MemberRequestDTO memberRequestDTO) {
        log.info("call registerDB");
        log.info("memberRegister check memberRequestDTO : "+memberRequestDTO.toString());
        memberService.registerMember(memberRequestDTO);
    }

    @PutMapping("/api/memberUpdate/{memberId}")
    public void updateDb(@PathVariable String memberId, @RequestBody MemberRequestDTO memberRequestDTO) {
        log.info("call updateDb");
        log.info(memberId);

        memberService.memberUpdate(memberId, memberRequestDTO);
    }

    @DeleteMapping("/api/memberDelete/{memberId}")
    public void deleteDb(@PathVariable String memberId) {
        memberService.memberDelete(memberId);
    }

    @GetMapping("/api/memberPage/{memberId}")
    public MemberRequestDTO memberPage(@PathVariable String memberId) {
        MemberRequestDTO memberRequestDTO = new MemberRequestDTO(memberRepository.findByMemberId(memberId).orElseThrow());
        return memberRequestDTO;
    }

    @GetMapping("/api/mypage")
    public MemberRequestDTO mypage(@AuthenticationPrincipal MemberLoginDTO memberLoginDTO) {
        MemberRequestDTO memberRequestDTO = new MemberRequestDTO(memberRepository.findByMemberId(memberLoginDTO.getMemberId()).orElseThrow());
        return memberRequestDTO;
    }

    @GetMapping("/api/getClientIp")
    public String getClientIp (HttpServletRequest request){
        String clientIp = request.getRemoteAddr();
        return clientIp;
    }
}