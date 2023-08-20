package com.projecttycoon.demo.domain.repository;

import com.projecttycoon.demo.domain.Entity.DMEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;


public interface DMRepository extends JpaRepository<DMEntity, Long> {


    List<DMEntity> findAllByDMFromIdAndDMToId(String fromId, String toId);
}