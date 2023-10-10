package com.projecttycoon.demo.domain.dto;

import com.projecttycoon.demo.domain.Entity.MemberRoleEntity;
import lombok.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.User;

import java.util.Collection;
import java.util.Set;


//인증 후 사용자의 데이터를 전송할 DTO 클래스로 이 클래스를 통해 인증정보를 주고 받는다.
@Getter
@Setter
@ToString
public class MemberLoginDTO extends User {

    private String memberNickName;
    private String memberAcademy;
    private String memberRole;
    private String memberIntroduce;
    private String memberLink;
    private String memberFilePath;
    private String memberFileName;
    private String memberId;
    private String memberPw;
    private String memberStack;
    private Collection<? extends GrantedAuthority> memberAuthority;

    public MemberLoginDTO(String memberNickName,
                          String memberAcademy,
                          String memberRole,
                          String memberIntroduce,
                          String memberLink,
                          String memberFilePath,
                          String memberFileName,
                          String username,String password,
                          String memberStack,
                          Collection<? extends GrantedAuthority> authorities) {
        super(username, password, authorities);

        this.memberId = username;
        this.memberPw = password;
        this.memberNickName = memberNickName;
        this.memberAcademy = memberAcademy;
        this.memberRole = memberRole;
        this.memberIntroduce = memberIntroduce;
        this.memberLink = memberLink;
        this.memberFilePath = memberFilePath;
        this.memberFileName = memberFileName;
        this.memberAuthority = authorities;
        this.memberStack = memberStack;
    }

}
