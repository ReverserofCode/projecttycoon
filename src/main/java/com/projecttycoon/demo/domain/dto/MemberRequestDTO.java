package com.projecttycoon.demo.domain.dto;


import com.projecttycoon.demo.domain.Timestamped;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class MemberRequestDTO extends Timestamped {
    private String memberId;
    private String memberPw;
    private String memberRole; //권한
    private String memberIntroduce;
    private String memberIcon;
    private String memberLink;
    private String memberAcademy;
    private String memberNickname;
}
