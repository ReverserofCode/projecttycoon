package com.projecttycoon.demo.domain.repository;

import com.projecttycoon.demo.domain.Entity.DMEntity;
import com.projecttycoon.demo.domain.Entity.DMroomEntity;
import com.projecttycoon.demo.domain.Entity.MemberEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;


public interface DMRepository extends JpaRepository<DMEntity, Long> {


    List<DMEntity> findAllByDMFromAndDMTo(MemberEntity DMFrom, MemberEntity DMTo);
    List<DMEntity> findAllByDMroom(DMroomEntity DMroom);
}