package com.projecttycoon.demo.domain.service;

import com.projecttycoon.demo.domain.dto.MemberRequestDTO;
import com.projecttycoon.demo.domain.Entity.MemberEntity;
import com.projecttycoon.demo.domain.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class MemberService implements UserDetailsService {

    private final MemberRepository memberRepository;

    /**
     * Spring Security 필수 메소드 구현
     *
     * @param userId 이메일
     * @return UserDetails
     * @throws UsernameNotFoundException 유저가 없을 때 예외 발생
     */
    @Override // 기본적인 반환 타입은 UserDetails, UserDetails를 상속받은 UserInfo로 반환 타입 지정 (자동으로 다운 캐스팅됨)
    public MemberEntity loadUserByUsername(String userId) throws UsernameNotFoundException { // 시큐리티에서 지정한 서비스이기 때문에 이 메소드를 필수로 구현
        return memberRepository.findByUserId(userId)
                .orElseThrow(() -> new UsernameNotFoundException((userId)));
    }

    /**
     * 회원정보 저장
     *
     * @param dto 회원정보가 들어있는 DTO
     * @return 저장되는 회원의 PK
     */
    public String save(MemberRequestDTO dto) {
        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
        dto.setMemberPw(encoder.encode(dto.getMemberPw()));

        return memberRepository.save(MemberEntity.builder()
                        .memberIntroduce(dto.getMemberIntroduce())
                        .memberLink(dto.getMemberLink())
                        .memberNickname(dto.getMemberNickname())
                        .memberIcon(dto.getMemberIcon())
                        .memberRole(dto.getMemberRole())
                        .memberPw(dto.getMemberPw()).build()).getMemberId();
    }

    public void update(MemberEntity memberEntity, MemberRequestDTO dto) {
        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
        dto.setMemberPw(encoder.encode(dto.getMemberPw()));
        memberEntity.setMemberPw(dto.getMemberPw());
        memberEntity.setMemberIcon(dto.getMemberIcon());
        memberEntity.setMemberLink(dto.getMemberLink());
        memberEntity.setMemberAcademy(dto.getMemberAcademy());
        memberEntity.setMemberIntroduce(dto.getMemberIntroduce());
        memberEntity.setMemberNickname(dto.getMemberNickname());
        memberEntity.setMemberRole(dto.getMemberRole());

        memberRepository.save(memberEntity);
    }

    public void delete(String memberId) {
        memberRepository.deleteById(memberId);
    }

    public MemberEntity findUser(String memberId){
        return memberRepository.findById(memberId).get();
    }
}
