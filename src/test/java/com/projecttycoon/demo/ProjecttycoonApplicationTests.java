package com.projecttycoon.demo;

import com.projecttycoon.demo.domain.Entity.MemberEntity;
import com.projecttycoon.demo.domain.Entity.ProjectEntity;
import com.projecttycoon.demo.domain.repository.ProjectRepository;
import org.junit.jupiter.api.DisplayNameGenerator;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.text.SimpleDateFormat;
import java.util.stream.IntStream;

@SpringBootTest
class ProjecttycoonApplicationTests {

    //테스트입니다
    final ProjectRepository projectRepository;

    @Autowired
    ProjecttycoonApplicationTests(ProjectRepository projectRepository) {
        this.projectRepository = projectRepository;
    }


    @Test
    public void creatingProjectDummies() {

        IntStream.rangeClosed(1, 100).forEach(i -> {
            ProjectEntity projectEntity = ProjectEntity.builder()
                    .projectTitle("TestTitle" + i)
                    .projectContent("TestContents" + i)
                    .projectWantedRole("TestWantedRole" + i)
                    .projectStatus(Boolean.TRUE)
                    .projectDue(null)
                    .projectAcademy("TestAcademy" + i)
                    .projectWriterId("TestWriterId" + i)
                    .projectWriterNick("TestWriterNickName" + i)
                    .projectScrapNum(i).build();
            projectRepository.save(projectEntity);
        });


    }
}
