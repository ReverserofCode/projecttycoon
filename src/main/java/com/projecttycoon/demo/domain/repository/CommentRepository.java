package com.projecttycoon.demo.domain.repository;

import com.projecttycoon.demo.domain.Entity.CommentEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface CommentRepository extends JpaRepository<CommentEntity, Long> {

    List<CommentEntity> findByProjectId(Long projectId);

    @Transactional
    @Modifying
    @Query("UPDATE CommentEntity comment SET comment.commentContent = :commentContent WHERE comment.commentId = :commentId")
    void updateComment(@Param("commentId") long commentId, @Param("commentContent") String commentContent);
}
