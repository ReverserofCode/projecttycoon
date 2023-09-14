package com.projecttycoon.demo.controller;

import com.projecttycoon.demo.domain.Entity.MemberEntity;
import com.projecttycoon.demo.domain.dto.MemberLoginDTO;
import com.projecttycoon.demo.domain.dto.MemberRequestDTO;
import com.projecttycoon.demo.domain.repository.MemberRepository;
import com.projecttycoon.demo.domain.service.MemberService;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.view.RedirectView;

import javax.servlet.http.HttpServletRequest;
import java.util.List;
import java.util.Optional;

@Log4j2
@RestController
@RequiredArgsConstructor
public class MemberController {

    final MemberRepository memberRepository;
    MemberService memberService;
    boolean duplicateCheck = false;
    MemberRequestDTO memberRequestDTO;

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
        log.info("Call request Session : " + memberLoginDTO);
        return memberLoginDTO;
    }

    @PostMapping("/api/memberRegister")
    public ResponseEntity<String> registerDB(@RequestBody MemberRequestDTO memberRequestDTO) {
        log.info("call registerDB");
        log.info("memberRegister check memberRequestDTO : " + memberRequestDTO.toString());
        memberService.registerMember(memberRequestDTO);
        return ResponseEntity.status(HttpStatus.FOUND).header("Location", "/static/PageProjectBoard/index.html").build();
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
        memberRequestDTO = new MemberRequestDTO(memberRepository.findByMemberId(memberId).orElseThrow());
        return memberRequestDTO;
    }

    @GetMapping("/api/mypage")
    public MemberRequestDTO myPage(@AuthenticationPrincipal MemberLoginDTO memberLoginDTO) {

        log.info("Call myPage");
        memberRequestDTO = new MemberRequestDTO(memberRepository.findByMemberId(memberLoginDTO.getMemberId()).orElseThrow());
        return memberRequestDTO;
    }

    @GetMapping("/api/callAllMemberRequest")
    public List<MemberEntity> requestAllMember() {
        log.info("requestAllMember");
        return memberRepository.findAll();
    }

    @RequestMapping("/api/checkDuplicateMemberId/{checkId}")
    public ResponseEntity<String> checkMemberId(@PathVariable String checkId) {

        log.info("check MemberId duplicate method");
        Optional<MemberEntity> checkEntity = memberRepository.findById(checkId);
        if (checkEntity.isPresent()) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Duplicate member ID");
        }
        return ResponseEntity.ok("Member ID is available");
    }


    @GetMapping("/api/getClientIp")
    public String getClientIp(HttpServletRequest request) {
        String clientIp = request.getRemoteAddr();
        return clientIp;
    }
}