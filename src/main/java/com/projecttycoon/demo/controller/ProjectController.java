package com.projecttycoon.demo.controller;

import com.projecttycoon.demo.domain.project.ProjectEntity;
import com.projecttycoon.demo.domain.project.ProjectRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.List;


@RequiredArgsConstructor
public class ProjectController {

    final ProjectRepository projectRepository;

    @GetMapping("/api/projectList")
    public List<ProjectEntity> getProjectList(){
        return projectRepository.findAll();
    }

}
