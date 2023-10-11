package com.projecttycoon.demo.domain.repository;

import com.projecttycoon.demo.domain.Entity.MemberEntity;
import com.projecttycoon.demo.domain.Entity.ProjectEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import java.lang.reflect.Member;
import java.util.List;
import java.util.Optional;

public interface MemberRepository extends JpaRepository<MemberEntity, String>, JpaSpecificationExecutor<MemberEntity> {
    List<MemberEntity> findAllByOrderByCreatedAtDesc();
    Optional<MemberEntity> findByMemberId(String memberId);

    Optional<MemberEntity> findByMemberNickname(String memberNickName);
}

