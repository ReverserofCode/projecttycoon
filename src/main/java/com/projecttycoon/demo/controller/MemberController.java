package com.projecttycoon.demo.controller;

import com.projecttycoon.demo.domain.Entity.MemberEntity;
import com.projecttycoon.demo.domain.Entity.MemberSpecifications;
import com.projecttycoon.demo.domain.Entity.ProjectEntity;
import com.projecttycoon.demo.domain.dto.MemberLoginDTO;
import com.projecttycoon.demo.domain.dto.MemberRequestDTO;
import com.projecttycoon.demo.domain.repository.MemberRepository;
import com.projecttycoon.demo.domain.repository.ProjectRepository;
import com.projecttycoon.demo.domain.service.MemberService;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.lang.reflect.Member;
import java.util.List;
import java.util.Optional;

@Log4j2
@RestController
@RequiredArgsConstructor
public class MemberController {
    final MemberRepository memberRepository;
    final ProjectRepository projectRepository;
    MemberService memberService;
    boolean checkResult;


    @Autowired
    MemberController(MemberService memberService, MemberRepository memberRepository, ProjectRepository projectRepository) {
        this.memberService = memberService;
        this.memberRepository = memberRepository;
        this.projectRepository = projectRepository;
        this.checkResult = false;
    }

    @GetMapping("/api/callTest")
    public void callTest() {
        log.info("call callTest");
    }

    @GetMapping("/sessionObject")
    public MemberLoginDTO loginProcess(@AuthenticationPrincipal MemberLoginDTO memberLoginDTO) {
        log.info(memberLoginDTO);
        return memberLoginDTO;
    }

    @PostMapping("/api/memberRegister")
    public void registerDB(@RequestBody MemberRequestDTO memberRequestDTO) {
        memberRequestDTO.setMemberFilePath("/static/icons/");
        memberRequestDTO.setMemberFileName(memberService.createIcon());
        log.info(memberRequestDTO.getMemberId());
        memberService.registerMember(memberRequestDTO);
        log.info(memberRequestDTO);
        log.info("call registerDB");
    }

    @PutMapping("/api/memberUpdate/{memberId}")
    public void updateDb(@PathVariable String memberId, @RequestBody MemberRequestDTO memberRequestDTO) {
        log.info("call updateDb");
        log.info(memberId);
        memberService.memberUpdate(memberId, memberRequestDTO);
    }

    @PutMapping("/api/memberUpdateEcPw/{memberId}")
    public void updateDbEcPw(@PathVariable String memberId, @RequestBody MemberRequestDTO memberRequestDTO) {
        log.info("call updateDb");
        log.info(memberId);
        memberService.memberUpdateEcPw(memberId, memberRequestDTO);
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
        memberRequestDTO.setMylist(projectRepository.findAllByProjectWriterId(memberRequestDTO.getMemberId()));
        return memberRequestDTO;
    }

    @GetMapping("/api/memberList")
    public List<MemberRequestDTO> memberList() {
        return memberService.memberList();
    }

    //지역 필터링
    @GetMapping("/api/membersByAcademy")
    public List<MemberEntity> getMemberByAcademy(@RequestParam("memberAcademy") String memberAcademy) {
        log.info("메서드 getProjectsByStatus 호출");

        Specification<MemberEntity> spec = MemberSpecifications.hasMemberAcademy(memberAcademy);
        return memberRepository.findAll(spec);
    }


    //분야 필터링
    @GetMapping("/api/membersByRole")
    public List<MemberEntity> getMemberByRole(@RequestParam("memberRole") String memberRole) {
        log.info("메서드 getProjectsByRoles 호출");

        if (memberRole.length() == 0) {
            // 아무런 역할도 입력하지 않은 경우 모든 프로젝트 반환
            return memberRepository.findAll();
        }

        Specification<MemberEntity> spec = MemberSpecifications.hasMemberRole(memberRole);
        return memberRepository.findAll(spec);
    }

    //분야+지역 필터링
    @GetMapping("/api/membersByAcademyAndRole")
    public List<MemberEntity> getMemberByAcademyAndRole(@RequestParam("memberAcademy") String memberAcademy, @RequestParam("memberRole") String memberRole) {
        log.info("메서드 getProjectsByStatusAndAllRoles 호출");

        Specification<MemberEntity> spec = MemberSpecifications.hasMemberAcademyAndMemberRole(memberAcademy, memberRole);
        return memberRepository.findAll(spec);
    }

    @GetMapping("/api/memberIcon/{memberId}")
    public String memberIcon(@PathVariable String memberId) {
        MemberRequestDTO memberRequestDTO = new MemberRequestDTO(memberRepository.findByMemberId(memberId).orElseThrow());
        String icon = memberRequestDTO.getMemberFilePath() + memberRequestDTO.getMemberFileName();
        return icon;
    }

//   ID의 중복을 검사하는 코드
    @GetMapping("/api/checkDuplicateMemberId/{checkId}")
    public boolean duplicateMemberCheck(@PathVariable String checkId) {
        checkResult = false;
        Optional<MemberEntity> memberCheckOption = memberRepository.findById(checkId);
        log.info(memberCheckOption);

        if (memberCheckOption.isPresent()) {
            checkResult = true;
        }
        return checkResult;
    }

// 닉네임의 중복을 검사하는 코드
    @GetMapping("/api/checkDuplicateNickName/{checkNickName}")
    public boolean duplicateNickName(@PathVariable String checkNickName) {
        checkResult = false;
        Optional<MemberEntity> memberNickNameCheck = memberRepository.findByMemberNickname(checkNickName);
        log.info(memberNickNameCheck);
        if (memberNickNameCheck.isPresent()) {
            checkResult = true;
        }
        return checkResult;
    }
}
