package com.projecttycoon.demo.domain.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Getter
@ToString
@NoArgsConstructor
public class DMroomRequestDTO {
    private String DMFromId;

    private String DMToId;
}
