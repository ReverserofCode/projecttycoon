    package com.projecttycoon.demo.domain.repository;

    import com.projecttycoon.demo.domain.Entity.DMroomEntity;
    import com.projecttycoon.demo.domain.Entity.MemberEntity;
    import org.springframework.data.jpa.repository.JpaRepository;
    import org.springframework.data.jpa.repository.Modifying;
    import org.springframework.data.jpa.repository.Query;

    import java.util.List;

    public interface DMroomRepository extends JpaRepository<DMroomEntity,Long> {

        // DMroom 만드는 repository
        @Modifying
        @Query(value = "insert into DMroomData(DMFrom, DMTo) values(?1, ?2)", nativeQuery = true)
        void createDMroom(MemberEntity DMFromMember, MemberEntity DMToMember);

        // 두 사람이 대화하는 DMroom ID 찾기
        @Query("select dmroom.DMroomId from DMroomEntity dmroom where dmroom.DMFrom = ?1 and dmroom.DMTo = ?2 " +
                "or dmroom.DMFrom = ?2 and dmroom.DMTo = ?1")
        Long findDMroomId(MemberEntity DMFromMember, MemberEntity DMToMember);

//        @Query("insert into DMroomEntity(DMFrom, DMTo) values(?1, ?2)")
//        Long createDMroom(MemberEntity DMFromMember, MemberEntity DMToMember);

        // 일단 안쓰는중
        DMroomEntity findByDMFromAndDMTo(MemberEntity DMFrom, MemberEntity DMTo);

        // DMroomId로 DMroom 객체 불러오기
        DMroomEntity findByDMroomId(Long DMroomId);

        // 한 사용자가 대화하는 DMroom List 반환
        @Query("select dmroom from DMroomEntity dmroom where dmroom.DMFrom = ?1 or dmroom.DMTo = ?1")
        List<DMroomEntity> findDMroomList(MemberEntity user);
    }