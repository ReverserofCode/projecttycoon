package com.projecttycoon.demo.controller;

import com.projecttycoon.demo.domain.dto.MemberRequestDTO;
import com.projecttycoon.demo.domain.service.MemberService;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.web.bind.annotation.*;


@Log4j2
@RestController
@RequiredArgsConstructor
public class MemberController {

    @Autowired
    MemberService memberService;

    @GetMapping("/api/callTest")
    public void calltest(){
        log.info("call calltest");
    }


    @PostMapping("/api/memberRegister")
    public void registerDB(@RequestBody MemberRequestDTO memberRequestDTO){
        log.info(memberRequestDTO.getMemberId());
        memberService.registerMember(memberRequestDTO);
        log.info("call registerDB");
    }

    @PutMapping("/api/memberUpdate/{memberId}")
    public void updateDb(@PathVariable String memberId, @RequestBody MemberRequestDTO memberRequestDTO){
        log.info("call updateDb");
        log.info(memberId);

        memberService.memberUpdate(memberId,memberRequestDTO);
    }

    @DeleteMapping("/api/memberDelete/{memberId}")
    public void deleteDb(@PathVariable String memberId){
        memberService.memberDelete(memberId);
    }
}
