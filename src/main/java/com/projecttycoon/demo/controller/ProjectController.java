package com.projecttycoon.demo.controller;

import com.projecttycoon.demo.domain.Entity.ProjectEntity;
import com.projecttycoon.demo.domain.dto.ProjectRequestDTO;
import com.projecttycoon.demo.domain.repository.ProjectRepository;
import com.projecttycoon.demo.domain.service.ProjectService;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Optional;


@Log4j2
@RestController // @Controller 대신 @RestController로 변경
@RequiredArgsConstructor
@RequestMapping("/api") // 공통된 API 경로 설정
public class ProjectController {

    private final ProjectService projectService;
    private final ProjectRepository projectRepository;

    @GetMapping("/projectAllRequest")
    public List<ProjectEntity> allProjectRequest() {
        log.info("Call Method allProjectRequest");
        return projectRepository.findAll();
    }

    @PostMapping("/projectRegister")
    public String saveProject(@RequestPart(value = "file") MultipartFile file, @RequestPart(value = "projectRequestDTO") ProjectRequestDTO projectRequestDTO) throws Exception {
        log.info("Call Method saveProject ");
        projectService.createProject(projectRequestDTO, file);
        return "success";
    }

    @DeleteMapping("/project/{id}")
    public String deleteProject(@PathVariable Long id) {
        projectRepository.deleteById(id);
        return "success";
    }

    @PutMapping("/project/{id}")
    public void updateProject(@PathVariable Long id, @RequestBody ProjectRequestDTO projectRequestDTO) {
        Optional<ProjectEntity> optionalProjectEntity = projectRepository.findById(id);

        if (optionalProjectEntity.isPresent()) {
            ProjectEntity projectEntity = optionalProjectEntity.get();
            //setter사용시...
            //projectEntity.setProjectTitle(projectRequestDTO.getProjectTitle());
            //projectEntity.setProjectContent(projectRequestDTO.getProjectContent());
            projectEntity.updateFromDTO(projectRequestDTO);
            projectRepository.save(projectEntity);
        }
    }


}
