package com.projecttycoon.demo.domain.dto;

import com.projecttycoon.demo.domain.Entity.MemberEntity;
import lombok.*;

@Getter
@Setter
@Builder
@AllArgsConstructor
public class DMroompostRequestDTO {
    private MemberEntity DMFrom;

    private MemberEntity DMTo;
}
