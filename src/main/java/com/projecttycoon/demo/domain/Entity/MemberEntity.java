package com.projecttycoon.demo.domain.Entity;

import com.projecttycoon.demo.domain.TimeStamp;
import com.projecttycoon.demo.domain.dto.MemberRequestDTO;
import lombok.*;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;

@Entity
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Table(name="MemberData")
@EntityListeners(AuditingEntityListener.class)
public class MemberEntity extends TimeStamp{

    @Id
    @Column(name = "memberId", unique = true)
    private String memberId;
    @Column(name = "memberPw")
    private String memberPw;
    @Column(name = "memberNickname")
    private String memberNickname;
    @Column(name = "memberAcademy")
    private String memberAcademy;
    @Column(name = "memberRole")
    private String memberRole; //멤버역할 (권한아님)
    @Column(name = "memberIntroduce")
    private String memberIntroduce;
    @Column(name = "memberLink")
    private String memberLink;
    @Column(name = "memberFilePath")
    private String memberFilePath;
    @Column(name= "memberFileName")
    private String memberFileName;
    @Column(name = "authority")
    private String memberAuthority;

    public MemberEntity(MemberRequestDTO requestDTO) {
        this.memberId = requestDTO.getMemberId();
        this.memberPw = requestDTO.getMemberPw();
        this.memberNickname = requestDTO.getMemberNickname();
        this.memberAcademy = requestDTO.getMemberAcademy();
        this.memberRole = requestDTO.getMemberRole();
        this.memberIntroduce = requestDTO.getMemberIntroduce();
        this.memberLink = requestDTO.getMemberLink();
        this.memberFilePath = requestDTO.getMemberFilePath();
        this.memberFileName = requestDTO.getMemberFileName();
        this.memberAuthority = "member";
    }

    public void memberUpdate(MemberRequestDTO requestDTO){
        this.memberPw = requestDTO.getMemberPw();
        this.memberNickname = requestDTO.getMemberNickname();
        this.memberAcademy = requestDTO.getMemberAcademy();
        this.memberRole = requestDTO.getMemberRole();
        this.memberIntroduce = requestDTO.getMemberIntroduce();
        this.memberLink = requestDTO.getMemberLink();
        this.memberFilePath = requestDTO.getMemberFilePath();
        this.memberFileName = requestDTO.getMemberFileName();
    }

}