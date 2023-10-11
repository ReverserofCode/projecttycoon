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
    List<DMEntity> findAllByDMroom(DMroomEntity DMroom);

    // DMId 리스트로 DM 리스트 리턴
    @Override
    List<DMEntity> findAllById(Iterable<Long> longs);

    // DMroom의 마지막 DM의 ID를 List로 리턴
    @Transactional
    @Query("SELECT MAX(dm.DMId) FROM DMEntity dm WHERE dm.DMroom IN :dmroomList GROUP BY dm.DMroom")
    List<Long> findLastDMidList(@Param("dmroomList") List<DMroomEntity> dmroomList);

    // 메시지 읽음표시
    @Transactional
    @Modifying
    @Query("UPDATE DMEntity dm SET dm.DMRead = true " +
            "WHERE dm.DMroom = :dmroom AND dm.DMTo = :dmTo AND dm.DMRead = false")
    void DMreadCheck(@Param("dmroom") DMroomEntity dmroom, @Param("dmTo") MemberEntity dmTo);
}