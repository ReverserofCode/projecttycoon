package com.projecttycoon.demo.domain.Entity;

import com.projecttycoon.demo.domain.TimeStamp;
import com.projecttycoon.demo.domain.dto.MemberRequestDTO;
import lombok.*;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;

@Entity
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Table(name="MemberData")
@EntityListeners(AuditingEntityListener.class)
public class MemberEntity extends TimeStamp {

    @Id
    @Column(name = "memberid", unique = true)
    private String memberId;
    @Column(name = "password")
    private String memberPw;
    @Column(name = "memberNickname")
    private String memberNickname;
    @Column(name = "memberAcademy")
    private String memberAcademy;
    @Column(name = "memberRole")
    private String memberRole; //권한
    @Column(name = "memberIntroduce")
    private String memberIntroduce;
    @Column(name = "memberLink")
    private String memberLink;
    @Column(name = "memberIcon")
    private String memberIcon;
    @Column(name = "authority")
    private String memberAuthority;

    @ManyToOne
    @JoinColumn(name = "chatroomId")
    private ChatroomEntity chatroomEntity;

    public MemberEntity(MemberRequestDTO requestDTO) {
        this.memberId = requestDTO.getMemberId();
        this.memberPw = requestDTO.getMemberPw();
        this.memberNickname = requestDTO.getMemberNickname();
        this.memberAcademy = requestDTO.getMemberAcademy();
        this.memberRole = requestDTO.getMemberRole();
        this.memberIntroduce = requestDTO.getMemberIntroduce();
        this.memberLink = requestDTO.getMemberLink();
        this.memberIcon = requestDTO.getMemberIcon();
        this.memberAuthority = "member";
    }
}