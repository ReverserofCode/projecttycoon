package com.projecttycoon.demo.domain.dto;


import com.projecttycoon.demo.domain.TimeStamp;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class MemberRequestDTO extends TimeStamp {
    private String memberId;
    private String memberPw;
    private String memberRole;
    private String memberIntroduce;
    private String memberIcon;
    private String memberLink;
    private String memberAcademy;
    private String memberNickname;
}
