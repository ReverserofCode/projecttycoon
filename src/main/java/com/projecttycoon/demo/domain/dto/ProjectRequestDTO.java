package com.projecttycoon.demo.domain.dto;


import lombok.Builder;
import lombok.Getter;
import lombok.AllArgsConstructor;
import lombok.Setter;
import lombok.*;

import java.util.Date;


//데이터를 실제로 이동시키는 클래스이다.
@Setter
@Getter
@Builder
@ToString
@AllArgsConstructor
public class ProjectRequestDTO {
    private String projectTitle;    //프로젝트글제목
    private String projectContent;  //프로젝트글 본문
    private String projectWantedRole;   //프로젝트글 모집분야
    private Boolean projectStatus;       //프로젝트글 마감여부(True=모집중)
    private Date projectDue;        //프로젝트글 마감날짜
    private String projectAcademy;  //프로젝트글 진행 학원지점
    private String projectWriterId; //프로젝트글 작성자ID
    private String projectWriterNick; //프로젝트글 작성자닉네임
    private String projectFilePath; //프로젝트글 이미지경로
    private String projectFileName; //프로젝트글 이미지네임
    private int projectScarpNum; //프로젝트글 좋아요,스크랩 수
}