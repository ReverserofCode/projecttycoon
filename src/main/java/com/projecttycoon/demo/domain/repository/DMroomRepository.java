    package com.projecttycoon.demo.domain.repository;

    import com.projecttycoon.demo.domain.Entity.DMroomEntity;
    import org.springframework.data.jpa.repository.JpaRepository;

    public interface DMroomRepository extends JpaRepository<DMroomEntity,Long> {
        DMroomEntity findByDMFromIdAndDMToId(String DMFromId, String DMToId);
    }
