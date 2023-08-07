package com.projecttycoon.demo.domain.service;


import com.projecttycoon.demo.domain.Entity.Project;
import com.projecttycoon.demo.domain.dto.ProjectRequestDTO;
import com.projecttycoon.demo.domain.repository.ProjectRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ProjectService {
    private final ProjectRepository projectRepository;

    public void createProject(ProjectRequestDTO projectRequestDTO) {
        Project project = new Project(projectRequestDTO);
        projectRepository.save(project);
    }

    public Project oneProject(Long id) {
        return projectRepository.findById(id).orElseThrow(() -> new NullPointerException("찾으시는 아이디가 없습니다."));
    }

    public Page<Project> allProject(int page) {
        PageRequest pageRequest = PageRequest.of(page, 8);
        return projectRepository.findAll(pageRequest);
    }

    public Page<Project> isEndProject(String projectIsEnd, int page){
        PageRequest pageRequest = PageRequest.of(page,8);
        return projectRepository.findByProjectIsEnd(projectIsEnd,pageRequest);
    }

    public void UpdateProject(ProjectRequestDTO projectRequestDTO) {
        Project project = new Project(projectRequestDTO);
        projectRepository.save(project);
    }

    public Long deleteProject(Long id) {
        projectRepository.deleteById(id);
        return id;
    }

    public Page<Project> searchProject(String projectName, int page) {
        PageRequest pageRequest = PageRequest.of(page, 8);
        return projectRepository.findByProjectTitleContainingIgnoreCaseOrProjectContentContainingIgnoreCase(projectName, projectName, projectName, pageRequest);
    }



}
