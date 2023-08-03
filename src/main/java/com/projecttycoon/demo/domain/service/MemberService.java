package com.projecttycoon.demo.domain.service;

import com.projecttycoon.demo.domain.dto.MemberRequestDTO;
import com.projecttycoon.demo.domain.Entity.MemberEntity;
import com.projecttycoon.demo.domain.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import javax.swing.text.html.Option;
import java.lang.reflect.Member;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class MemberService {

    private final MemberRepository memberRepository;

    @Autowired
    private final BCryptPasswordEncoder bCryptPasswordEncoder;

    /**
     * Spring Security 필수 메소드 구현
     *
     * @param userId 이메일
     * @return UserDetails
     * @throws UsernameNotFoundException 유저가 없을 때 예외 발생
     */
//    @Override // 기본적인 반환 타입은 UserDetails, UserDetails를 상속받은 UserInfo로 반환 타입 지정 (자동으로 다운 캐스팅됨)
//    public MemberEntity loadUserByUsername(String userId) throws UsernameNotFoundException { // 시큐리티에서 지정한 서비스이기 때문에 이 메소드를 필수로 구현
//        return memberRepository.findByUserId(userId)
//                .orElseThrow(() -> new UsernameNotFoundException((userId)));
//    }

    /**
     * 회원정보 저장
     *
     * @param dto 회원정보가 들어있는 DTO
     * @return 저장되는 회원의 PK
     */

    public void registerMember(MemberRequestDTO dto) {
        dto.setMemberPw(bCryptPasswordEncoder.encode(dto.getMemberPw()));
        MemberEntity memberEntity = new MemberEntity(dto);
        memberRepository.save(memberEntity);
    }

    public void MemberUpdate(MemberEntity memberEntity, MemberRequestDTO requestDTO) {
        bCryptPasswordEncoder.encode(requestDTO.getMemberPw());

    }

    public void delete(String memberId) {
        memberRepository.deleteById(memberId);
    }

    public MemberEntity findUser(String memberId) {
        Optional<MemberEntity> result = memberRepository.findByUserId(memberId);
        if (result.isPresent()) {
            MemberEntity memberEntity = new MemberEntity();
            memberEntity = result.get();
            return memberEntity;
        }
        return null;
    }
}
