package com.projecttycoon.demo.domain.dto;

import com.projecttycoon.demo.domain.Entity.MemberEntity;
import lombok.*;

@Getter
@Setter
@Builder
@AllArgsConstructor
@ToString
public class MemberRequestDTO  {
    private String memberId;
    private String memberPw;
    private String memberRole;
    private String memberIntroduce;
    private String memberLink;
    private String memberAcademy;
    private String memberNickname;
    private String memberFilePath;
    private String memberFileName;
    private String memberStack;

    public MemberRequestDTO(MemberEntity memberEntity){
        this.memberId = memberEntity.getMemberId();
        this.memberPw = memberEntity.getMemberPw();
        this.memberRole = memberEntity.getMemberRole();
        this.memberIntroduce = memberEntity.getMemberIntroduce();
        this.memberLink = memberEntity.getMemberLink();
        this.memberAcademy = memberEntity.getMemberAcademy();
        this.memberNickname = memberEntity.getMemberNickname();
        this.memberFilePath = memberEntity.getMemberFilePath();
        this.memberFileName = memberEntity.getMemberFileName();
        this.memberStack = memberEntity.getMemberStack();
    }

}
