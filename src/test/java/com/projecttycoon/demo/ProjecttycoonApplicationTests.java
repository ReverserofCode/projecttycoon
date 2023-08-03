package com.projecttycoon.demo;

import com.projecttycoon.demo.domain.Entity.MemberEntity;
import com.projecttycoon.demo.domain.Entity.ProjectEntity;
import com.projecttycoon.demo.domain.dto.MemberRequestDTO;
import com.projecttycoon.demo.domain.repository.MemberRepository;
import com.projecttycoon.demo.domain.repository.ProjectRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.util.Optional;
import java.util.stream.IntStream;


@SpringBootTest
class ProjecttycoonApplicationTests {

    @Autowired
    ProjectRepository projectRepository;
    @Autowired
    MemberRepository memberRepository;

    @Autowired
    BCryptPasswordEncoder bCryptPasswordEncoder;

    @Test
    void contextLoads() {
//        IntStream.rangeClosed(1, 100).forEach(i -> {
//            ProjectEntity projectEntity = ProjectEntity.builder()
//                    .projectContent("sample....Contents")
//                    .projectTitle("sample...Title").build();
//            projectRepository.save(projectEntity);
//        });

        Pageable pageable = PageRequest.of(0, 10);
        Page<ProjectEntity> result = projectRepository.findAll(pageable);

        System.out.println("---------------------------------------------------");
        System.out.println("Total page : " + result.getTotalPages());
        System.out.println("Total Count  : " + result.getTotalElements());
        System.out.println("Page Number : " + result.getNumber());
        System.out.println("Page Size : " + result.getSize());
        System.out.println("has next page? : " + result.hasNext());
        System.out.println("first page? : " + result.isFirst());

        for (ProjectEntity projectEntity : result.getContent()) {
            System.out.println(projectEntity);
        }
    }

    @Test
    void logicTest() {
        IntStream.rangeClosed(1, 100).forEach(i -> {
            MemberEntity memberEntity = MemberEntity.builder()
                    .memberId("testId" + i)
                    .memberPw(bCryptPasswordEncoder.encode("testPassword" + i))
                    .memberNickname("testNickname" + i)
                    .memberAcademy("testAcademy" + i)
                    .memberRole("testRole" + i)
                    .memberIntroduce("testIntroduce" + i)
                    .memberLink("testLink" + i)
                    .memberIcon("testIcon" + i)
                    .memberAuthority("testAutho" + i)
                    .build();
            memberRepository.save(memberEntity);
        });
    }

    @Test
    void memberUpdate() {
        Optional<MemberEntity> result = memberRepository.findById("testId3");

        if (result.isPresent()) {
            MemberEntity memberEntity = new MemberEntity();
            memberEntity = result.get();
            MemberRequestDTO memberRequestDTO = MemberRequestDTO.builder()
                    .memberPw(bCryptPasswordEncoder.encode("UpdatePW"))
                    .memberNickname("UpdateNickName")
                    .memberAcademy("UpdateAcademy")
                    .memberRole("UpdateRole")
                    .memberIntroduce("UpdateIntro")
                    .memberLink("UpdateLink")
                    .memberIcon("UpdateLink")
                    .build();
            memberEntity.memberUpdate(memberRequestDTO);
            memberRepository.save(memberEntity);
        }
    }
}
