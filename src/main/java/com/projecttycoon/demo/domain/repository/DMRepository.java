package com.projecttycoon.demo.domain.repository;

import com.projecttycoon.demo.domain.Entity.DMEntity;
import com.projecttycoon.demo.domain.Entity.DMroomEntity;
import com.projecttycoon.demo.domain.Entity.MemberEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;



public interface DMRepository extends JpaRepository<DMEntity, Long> {
    List<DMEntity> findAllByDMFromAndDMTo(MemberEntity DMFrom, MemberEntity DMTo);
    List<DMEntity> findAllByDMroom(DMroomEntity DMroom);

    // 메시지 읽음표시
    @Transactional
    @Modifying
    @Query("UPDATE DMEntity dm SET dm.DMRead = true WHERE dm.DMroom = :dmroom AND dm.DMTo = :dmTo AND dm.DMRead = false")
    void DMreadCheck(@Param("dmroom") DMroomEntity dmroom, @Param("dmTo") MemberEntity dmTo);
}