package com.projecttycoon.demo.domain.service;

import com.projecttycoon.demo.domain.Entity.CommentEntity;
import com.projecttycoon.demo.domain.Entity.MemberEntity;
import com.projecttycoon.demo.domain.Entity.ProjectEntity;
import com.projecttycoon.demo.domain.dto.CommentRequestDTO;
import com.projecttycoon.demo.domain.repository.CommentRepository;
import com.projecttycoon.demo.domain.repository.MemberRepository;
import com.projecttycoon.demo.domain.repository.ProjectRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CommentService {

    private final CommentRepository commentRepository;
    private final ProjectRepository projectRepository;
    private final MemberRepository memberRepository;


    // 댓글 생성
    @Transactional
    public CommentEntity createComment(Long projectId, CommentRequestDTO commentRequestDTO) {
        Optional<ProjectEntity> projectOptional = projectRepository.findById(projectId);

        if (projectOptional.isPresent()) {
            ProjectEntity project = projectOptional.get();

            // CommentWriterId를 MemberEntity로 변환
            Optional<MemberEntity> commentWriter = memberRepository.findByMemberId(commentRequestDTO.getCommentWriterId());

            if (commentWriter.isPresent()) {
                CommentEntity commentEntity = CommentEntity.builder()
                        .commentProject(project)
                        .commentWriter(commentWriter.get())
                        .commentContent(commentRequestDTO.getCommentContent())
                        .build();

                return commentRepository.save(commentEntity);
            } else {
                throw new IllegalArgumentException("댓글작성자 불러오기실패: " + commentRequestDTO.getCommentWriterId());
            }
        } else {
            throw new IllegalArgumentException("프로젝트 불러오기실패: " + projectId);
        }
    }

    //해당 프로젝트게시물 전체 댓글
    @Transactional(readOnly = true)
    public List<CommentEntity> getAllCommentsByProjectId(Long projectId) {
        return commentRepository.findByProjectId(projectId);
    }

    //특정댓글 조회<마이페이지에서 확인할때 쓰일까??>
    @Transactional(readOnly = true)
    public Optional<CommentEntity> getCommentById(Long id) {
        return commentRepository.findById(id);
    }


//    댓글수정
    @Transactional
    public void updateComment(Long id, String commentContent) {
        commentRepository.updateComment(id, commentContent);
    }

    //댓글삭제
    @Transactional
    public void deleteComment(Long id) {
        commentRepository.deleteById(id);
    }
}