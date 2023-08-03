package com.projecttycoon.demo.domain.repository;

import com.projecttycoon.demo.domain.Entity.MemberEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface MemberRepository extends JpaRepository<MemberEntity, String> {

    Optional<MemberEntity> findByUserId(String memberId);

}

