package com.projecttycoon.demo.domain.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Getter
@ToString
@NoArgsConstructor
public class ChatroomRequestDTO {
    private String chatFromId;

    private String chatToId;
}
