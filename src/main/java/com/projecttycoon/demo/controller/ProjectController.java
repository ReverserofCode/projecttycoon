package com.projecttycoon.demo.controller;

import com.projecttycoon.demo.domain.project.ProjectDto;
import com.projecttycoon.demo.domain.project.ProjectEntity;
import com.projecttycoon.demo.domain.project.ProjectRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

//실제 송수신 되는 데이터를 요청받는 컨트롤러 클래스
//REST API 테스트를 마쳐야 함
@Log4j2
@RestController
@RequiredArgsConstructor
public class ProjectController {

    private final ProjectRepository projectRepository;

    @GetMapping("/api/projectList")
    public List<ProjectEntity> getProjectList() {
        log.info("call GetMapping findAll");
        projectRepository.findAll();
        return projectRepository.findAll();
    }
    @PostMapping("/api/projectData/{id}")
    public ProjectEntity findProjectData(@PathVariable Long id) {
        log.info("call Post Mapping findbyId");
        Optional<ProjectEntity> optionalProject = projectRepository.findById(id);
        ProjectEntity projectEntity = new ProjectEntity();
        if (optionalProject.isPresent()) projectEntity = optionalProject.get();
        return projectEntity;
    }
    @PostMapping("/api/projectRegiste")
    public void registeProject(@RequestBody ProjectDto projectDto) {
        log.info("call PostMapping request DB Register Logic");
        ProjectEntity projectEntity = new ProjectEntity(projectDto);
        projectRepository.save(projectEntity);

//        ㅁㅇㄻㄴㅇㄻㄴㅇㄻㄴㅇㄻㄴㅇㄻㄴㅇㄻㄴㅇㅁㄴㅇㄻㄴㅇㄻㄴㅇㄹ
    }
}
