package com.projecttycoon.demo.controller;

import com.projecttycoon.demo.domain.Entity.CommentEntity;
import com.projecttycoon.demo.domain.dto.CommentRequestDTO;
import com.projecttycoon.demo.domain.service.CommentService;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@Log4j2
@RestController
@RequiredArgsConstructor
@RequestMapping("/api") // 프로젝트 게시물 ID를 경로에 추가
public class CommentController {

    private final CommentService commentService;

    //댓글 생성
    @PostMapping("/projects/{projectId}/commentsPost")
    public CommentEntity createComment(@PathVariable Long projectId, @RequestBody CommentRequestDTO commentRequestDTO) {
        return commentService.createComment(projectId, commentRequestDTO);
    }

    //해당 프로젝트게시물 전체 댓글
    @GetMapping("/projects/{projectId}/commentsGet")
    public List<CommentEntity> getAllCommentsByProjectId(@PathVariable Long projectId) {
        return commentService.getAllCommentsByProjectId(projectId);
    }

    //특정댓글 조회<마이페이지에서 확인할때 쓰일까??>
    @GetMapping("/projects/{projectId}/commentsGet/{id}")
    public CommentEntity getCommentById(@PathVariable Long id) {
        Optional<CommentEntity> optionalComment = commentService.getCommentById(id);
        return optionalComment.orElse(null);
    }

    //마이페이지 댓글 조회
//    @GetMapping("/mypage/commentsGetList")
//    public List<CommentEntity> getCommentByUserId(Authentication authentication) {
//        List<CommentEntity> optionalComment = commentService.getCommentByUserId(id);
//        return optionalComment.orElse(null);
//    }

    //댓글수정
    @PutMapping("/projects/{projectId}/commentsUpdate/{id}")
    public void updateComment(@PathVariable Long id, @RequestBody CommentRequestDTO commentRequestDTO) {
        String commentContent = commentRequestDTO.getCommentContent();
        commentService.updateComment(id, commentContent);
        log.info("Comment update : " + id);
    }

    //댓글삭제
    @DeleteMapping("/projects/{projectId}/commentsDelete/{id}")
    public void deleteComment(@PathVariable Long id) {
        commentService.deleteComment(id);
    }

}