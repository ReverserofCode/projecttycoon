package com.projecttycoon.demo.domain.service;

import com.projecttycoon.demo.domain.Entity.MemberEntity;
import com.projecttycoon.demo.domain.dto.MemberLoginDTO;
import com.projecttycoon.demo.domain.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;
import java.util.stream.Collectors;

@Log4j2
@Service
@Transactional
@RequiredArgsConstructor
public class MemberDetailService implements UserDetailsService {

    private final MemberRepository memberRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

        Optional<MemberEntity> result = memberRepository.findById(username);

        if (result.isEmpty()) {
            throw new UsernameNotFoundException("Check Your Id");
        }

        MemberEntity member = result.get();
        MemberLoginDTO loginDTO = new MemberLoginDTO(
                member.getMemberNickname(),
                member.getMemberAcademy(),
                member.getMemberRole(),
                member.getMemberIntroduce(),
                member.getMemberLink(),
                member.getMemberFilePath(),
                member.getMemberFileName(),
                member.getMemberId(),
                member.getMemberPw(),
                member.getMemberAuthority().stream().map(role -> new SimpleGrantedAuthority("ROLE_" + role.name())).collect(Collectors.toSet())
        );

        return loginDTO;
    }
}