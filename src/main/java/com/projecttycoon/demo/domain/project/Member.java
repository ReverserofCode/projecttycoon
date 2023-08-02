package com.projecttycoon.demo.domain.project;

import lombok.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import javax.persistence.*;
import javax.transaction.Transactional;
import java.util.Collection;
import java.util.HashSet;
import java.util.Set;

@Setter
@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Member extends Timestamped implements UserDetails {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(name="member_id")
    private String memberId;
    @Column(name="password")
    private String memberPw;
    @Column(name = "memberRole")
    private String memberRole; //권한
    @Column(name = "memberIcon")
    private String memberIcon;
    @Column(name = "memberIntroduce")
    private String memberIntroduce;
    @Column(name = "memberAcademy")
    private String memberAcademy;
    @Column(name = "memberNickname")
    private String memberNickname;
    @Column(name = "memberLink")
    private String memberLink;

    @Builder
    public Member(String memberId, String memberPw,
                  String memberRole, String memberIcon, String memberIntroduce,
                  String memberNickname, String memberAcademy, String memberLink){
        this.memberIcon = memberIcon;
        this.memberIntroduce = memberIntroduce;
        this.memberPw = memberPw;
        this.memberId = memberId;
        this.memberRole = memberRole;
        this.memberLink = memberLink;
        this.memberAcademy = memberAcademy;
        this.memberNickname = memberNickname;
    }

    // 사용자의 권한을 콜렉션 형태로 반환
    // 단, 클래스 자료형은 GrantedAuthority를 구현해야함
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        Set<GrantedAuthority> roles = new HashSet<>();
        for (String role : memberRole.split(",")) {
            roles.add(new SimpleGrantedAuthority(role));
        }
        return roles;
    }

    // 사용자의 id를 반환 (unique한 값)
    @Override
    public String getUsername() {
        return memberId;
    }

    // 사용자의 password를 반환
    @Override
    public String getPassword() {
        return memberPw;
    }


    // 계정 만료 여부 반환
    @Override
    public boolean isAccountNonExpired() {
        // 만료되었는지 확인하는 로직
        return true; // true -> 만료되지 않았음
    }

    // 계정 잠금 여부 반환
    @Override
    public boolean isAccountNonLocked() {
        // 계정 잠금되었는지 확인하는 로직
        return true; // true -> 잠금되지 않았음
    }

    // 패스워드의 만료 여부 반환
    @Override
    public boolean isCredentialsNonExpired() {
        // 패스워드가 만료되었는지 확인하는 로직
        return true; // true -> 만료되지 않았음
    }

    // 계정 사용 가능 여부 반환
    @Override
    public boolean isEnabled() {
        // 계정이 사용 가능한지 확인하는 로직
        return true; // true -> 사용 가능
    }
    @Transactional
    public void icon_update(String memberId, Member member){
        this.memberIcon = member.getMemberIcon();

    }


}