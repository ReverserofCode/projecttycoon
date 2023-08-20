package com.projecttycoon.demo.domain.dto;


import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;


//데이터를 실제로 이동시키는 클래스이다.
@Getter
@ToString
@NoArgsConstructor
public class DMRequestDTO {
    private String DMFromId;

    private String DMToId;

    private String DMContent;

    private boolean DMRead;
}