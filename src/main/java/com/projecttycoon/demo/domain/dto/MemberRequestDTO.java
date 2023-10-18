package com.projecttycoon.demo.domain.dto;

import com.projecttycoon.demo.domain.Entity.CommentEntity;
import com.projecttycoon.demo.domain.Entity.MemberEntity;
import com.projecttycoon.demo.domain.Entity.ProjectEntity;
import com.projecttycoon.demo.domain.repository.ProjectRepository;
import lombok.*;

import java.util.List;

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
    private List<ProjectEntity> myProjectlist;
    private List<CommentEntity> myCommentlist;

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

