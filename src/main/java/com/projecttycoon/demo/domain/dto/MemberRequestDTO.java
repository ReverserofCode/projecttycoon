package com.projecttycoon.demo.domain.dto;

import com.projecttycoon.demo.domain.Entity.MemberEntity;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
@AllArgsConstructor
public class MemberRequestDTO  {
    private String memberId;
    private String memberPw;
    private String memberRole;
    private String memberIntroduce;
    private String memberFilePath; //멤버프로필 이미지경로
    private String memberFileName; //멤버프로필 이미지네임
    private String memberLink;
    private String memberAcademy;
    private String memberNickname;

    public MemberRequestDTO(MemberEntity memberEntity){
        this.memberId = memberEntity.getMemberId();
        this.memberPw = memberEntity.getMemberPw();
        this.memberRole = memberEntity.getMemberRole();
        this.memberIntroduce = memberEntity.getMemberIntroduce();
        this.memberFilePath = memberEntity.getMemberFilePath();
        this.memberFileName = memberEntity.getMemberFileName();
        this.memberLink = memberEntity.getMemberLink();
        this.memberAcademy = memberEntity.getMemberAcademy();
        this.memberNickname = memberEntity.getMemberNickname();
    }

}
