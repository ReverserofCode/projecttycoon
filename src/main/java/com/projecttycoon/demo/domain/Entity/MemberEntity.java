package com.projecttycoon.demo.domain.Entity;

import com.projecttycoon.demo.domain.TimeStamp;
import com.projecttycoon.demo.domain.dto.MemberLoginDTO;
import com.projecttycoon.demo.domain.dto.MemberRequestDTO;
import lombok.*;
import org.hibernate.Hibernate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Entity
@Getter
@Builder
@Transactional
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "MemberData")
@EntityListeners(AuditingEntityListener.class)
public class MemberEntity extends TimeStamp {

    @Id
    @Column(name = "memberId", unique = true)
    private String memberId;
    @Column(name = "memberPw")
    private String memberPw;
    @Column(name = "memberNickname", unique = true) //닉네임 중복 방지
    private String memberNickname;
    @Column(name = "memberAcademy")
    private String memberAcademy;
    @Column(name = "memberRole")
    private String memberRole; //멤버역할 (권한아님) << 기술스택(프론트, 백)
    @Column(name = "memberIntroduce")
    private String memberIntroduce;
    @Column(name = "memberLink")
    private String memberLink;
    @Column(name = "memberFilePath",nullable = true)
    private String memberFilePath;
    @Column(name = "memberFileName",nullable = true)
    private String memberFileName;
    @Column(name = "memberStack", nullable = true)
    private String memberStack;


    @Column(name = "authority")
    @ElementCollection(fetch = FetchType.LAZY)
    @Builder.Default
    public Set<MemberRoleEntity> memberAuthority = new HashSet<>();

    public void addMemberRole(MemberRoleEntity memberRoleEntity) {
        this.memberAuthority.add(memberRoleEntity);
    }

    //양방향 매핑
    @Builder.Default
    @ManyToMany(fetch = FetchType.EAGER, mappedBy = "scrappedBy")
    // 멤버가 어떤 프로젝트를 스크랩했는지
    private Set<ProjectEntity> scrappedProjects = new HashSet<>();

    public void initializeScrapedProjects(){
        Hibernate.initialize(this.scrappedProjects);
    }

    //스크랩 추가
    public void addScrappedProject(ProjectEntity project) {
        project.getScrappedBy().add(this);
    }

    //스크랩 삭제
    public void removeScrappedProject(ProjectEntity project) {
        project.getScrappedBy().remove(this);
    }

    public MemberEntity(MemberRequestDTO requestDTO) {
        this.memberId = requestDTO.getMemberId();
        this.memberPw = requestDTO.getMemberPw();
        this.memberNickname = requestDTO.getMemberNickname();
        this.memberAcademy = requestDTO.getMemberAcademy();
        this.memberRole = requestDTO.getMemberRole();
        this.memberIntroduce = requestDTO.getMemberIntroduce();
        this.memberLink = requestDTO.getMemberLink();
        this.memberFileName = requestDTO.getMemberFileName();
        this.memberFilePath = requestDTO.getMemberFilePath();
        this.memberStack = requestDTO.getMemberStack();
        this.memberAuthority = new HashSet<>();
    }

    public MemberEntity(MemberLoginDTO loginDTO) {
        this.memberId = loginDTO.getUsername();
        this.memberPw = loginDTO.getPassword();
        this.memberNickname = loginDTO.getMemberNickName();
        this.memberAcademy = loginDTO.getMemberAcademy();
        this.memberRole = loginDTO.getMemberRole();
        this.memberIntroduce = loginDTO.getMemberIntroduce();
        this.memberLink = loginDTO.getMemberLink();
        this.memberFilePath = loginDTO.getMemberFilePath();
        this.memberFileName = loginDTO.getMemberFileName();
    }

    public void memberUpdate(MemberRequestDTO requestDTO) {
        this.memberPw = requestDTO.getMemberPw();
        this.memberNickname = requestDTO.getMemberNickname();
        this.memberAcademy = requestDTO.getMemberAcademy();
        this.memberRole = requestDTO.getMemberRole();
        this.memberIntroduce = requestDTO.getMemberIntroduce();
        this.memberLink = requestDTO.getMemberLink();
        this.memberStack = requestDTO.getMemberStack();
        this.memberFilePath = requestDTO.getMemberFilePath();
        this.memberFileName = requestDTO.getMemberFileName();
    }

}
