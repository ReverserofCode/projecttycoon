package com.projecttycoon.demo.domain.dto;


import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.Column;


//데이터를 실제로 이동시키는 클래스이다.
@Getter
@ToString
@NoArgsConstructor
public class ChatRequestDTO {
    private String chatFromId;

    private String chatToId;

    private String chatContent;

    private Boolean chatRead;
}