package com.projecttycoon.demo.controller;

import com.projecttycoon.demo.domain.dto.MemberRequestDTO;
import com.projecttycoon.demo.domain.repository.MemberRepository;
import com.projecttycoon.demo.domain.service.MemberService;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.lang.reflect.Member;

@Log4j2
@RestController
@RequiredArgsConstructor
public class MemberController {

    MemberService memberService;


    @PostMapping("/api/memberRegister")
    public void registerDB(@RequestBody MemberRequestDTO memberRequestDTO){
        memberService.registerMember(memberRequestDTO);
    }

    @PutMapping("/api/memberUpdate/{memberId}")
    public void updateDb(@RequestParam String memberId, @RequestBody MemberRequestDTO memberRequestDTO){
        memberService.memberUpdate(memberId,memberRequestDTO);
    }

    @DeleteMapping("/api/memberDelete/{memberId}")
    public void deleteDb(@RequestParam String memberId){
        memberService.memberDelete(memberId);
    }
}
