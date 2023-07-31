package com.projecttycoon.demo;

import com.projecttycoon.demo.domain.project.ProjectDto;
import com.projecttycoon.demo.domain.project.ProjectEntity;
import com.projecttycoon.demo.domain.project.ProjectRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.stream.IntStream;


@SpringBootTest
class ProjecttycoonApplicationTests {

    @Autowired
    ProjectRepository projectRepository;

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
        System.out.println("Total page : "+result.getTotalPages());
        System.out.println("Total Count  : "+result.getTotalElements());
        System.out.println("Page Number : "+result.getNumber());
        System.out.println("Page Size : "+result.getSize());
        System.out.println("has next page? : "+result.hasNext());
        System.out.println("first page? : "+result.isFirst());

        for (ProjectEntity projectEntity : result.getContent()){
            System.out.println(projectEntity);
        }
    }
}
