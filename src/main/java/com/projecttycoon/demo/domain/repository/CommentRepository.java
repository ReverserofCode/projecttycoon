package com.projecttycoon.demo.domain.repository;

import com.projecttycoon.demo.domain.Entity.CommentEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CommentRepository extends JpaRepository<CommentEntity, Long> {

    List<CommentEntity> findByProjectId(Long projectId);
}
