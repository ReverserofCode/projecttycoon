package com.projecttycoon.demo.domain.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class CommentRequestDTO {
    private Long projectId; // 댓글이 속한 프로젝트의 ID
    private String commentWriterId; // 댓글 작성자의 ID
    private String commentContent; // 댓글 내용
}