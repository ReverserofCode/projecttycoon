package com.projecttycoon.demo.domain.service;

import com.projecttycoon.demo.domain.details.MemberDetails;
import com.projecttycoon.demo.domain.dto.MemberRequestDTO;
import com.projecttycoon.demo.domain.Entity.MemberEntity;
import com.projecttycoon.demo.domain.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;


//실제 프로그램의 서비스로직을 정의한 클래스
@Service
@RequiredArgsConstructor
public class MemberService implements UserDetailsService {

    private final MemberRepository memberRepository;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;

    /**
     * Spring Security 필수 메소드 구현
     *
     * @param memberId 이메일
     * @return UserDetails
     * @throws UsernameNotFoundException 유저가 없을 때 예외 발생
     */
    @Override // 기본적인 반환 타입은 UserDetails, UserDetails를 상속받은 UserInfo로 반환 타입 지정 (자동으로 다운 캐스팅됨)
    public MemberDetails loadUserByUsername(String memberId) throws UsernameNotFoundException { // 시큐리티에서 지정한 서비스이기 때문에 이 메소드를 필수로 구현
        return new MemberDetails(memberRepository.findByMemberId(memberId)
                .orElseThrow(() -> new UsernameNotFoundException((memberId))
                )
                );
    }

    /**
     * 회원정보 저장
     *
     * @param requestDTO 회원정보가 들어있는 DTO
     * @return 저장되는 회원의 PK
     */
    public void registerMember(MemberRequestDTO requestDTO) {
        requestDTO.setMemberPw(bCryptPasswordEncoder.encode(requestDTO.getMemberPw()));
        MemberEntity memberEntity = new MemberEntity(requestDTO);
        memberRepository.save(memberEntity);
    }

    public void memberUpdate(String memberId, MemberRequestDTO requestDTO) {
        Optional<MemberEntity> result = memberRepository.findById(memberId);
        if (result.isPresent()) {
            MemberEntity memberEntity;
            memberEntity = result.get();

           requestDTO.setMemberPw(bCryptPasswordEncoder.encode(requestDTO.getMemberPw()));

            memberEntity.memberUpdate(requestDTO);
            memberRepository.save(memberEntity);
        }
    }

    public void memberDelete(String memberId) {
        memberRepository.deleteById(memberId);
    }

}
