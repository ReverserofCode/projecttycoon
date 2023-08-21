package com.projecttycoon.demo.domain.dto;


import com.projecttycoon.demo.domain.TimeStamp;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
@AllArgsConstructor
public class DMNewRequestDTO{
    private String DMFromId;
    private String DMToId;
}
