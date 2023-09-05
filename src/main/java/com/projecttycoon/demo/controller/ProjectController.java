package com.projecttycoon.demo.controller;

import com.projecttycoon.demo.domain.Entity.ProjectEntity;
import com.projecttycoon.demo.domain.Entity.ProjectSpecifications;
import com.projecttycoon.demo.domain.dto.ProjectRequestDTO;
import com.projecttycoon.demo.domain.repository.ProjectRepository;
import com.projecttycoon.demo.domain.service.ProjectService;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.ModelAndView;

import javax.websocket.server.PathParam;
import java.util.List;
import java.util.Optional;


@Log4j2
@RestController // @Controller 대신 @RestController로 변경
@RequiredArgsConstructor
@RequestMapping("/api") // 공통된 API 경로 설정
public class ProjectController {

    private final ProjectService projectService;
    private final ProjectRepository projectRepository;

    //필터링없이 전체출력
    @GetMapping("/projectAllRequest")
    public List<ProjectEntity> allProjectRequest() {
        log.info("Call Method allProjectRequest");
        return projectRepository.findAll();
    }


    //프로젝트 상태로 필터링
    @GetMapping("/projects")
    public List<ProjectEntity> getProjectsByStatus(@RequestParam("status") boolean status) {
        log.info("메서드 getProjectsByStatus 호출");

        Specification<ProjectEntity> spec = ProjectSpecifications.hasStatus(status);
        return projectRepository.findAll(spec);
    }

    //프로젝트상태+모집역할로 필터링
    @GetMapping("/projectsByStatusAndRoles")
    public List<ProjectEntity> getProjectsByStatusAndRoles(@RequestParam("status") boolean status, @RequestParam("roles") String[] roles) {
        Specification<ProjectEntity> statusSpec = ProjectSpecifications.hasStatus(status);
        Specification<ProjectEntity> rolesSpec = ProjectSpecifications.hasWantedRole(roles);

        Specification<ProjectEntity> combinedSpec = Specification.where(statusSpec).and(rolesSpec);

        return projectRepository.findAll(combinedSpec);
    }


    @PostMapping("/projectRegister")
    public String saveProject(@RequestPart(value = "file", required = false) MultipartFile file, @RequestPart(value = "projectRequestDTO") ProjectRequestDTO projectRequestDTO) throws Exception {
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


    //1개의프로젝트가져오기
    @GetMapping("/project/{id}")
    public ProjectEntity listOne(@PathVariable Long id) {
//        ProjectEntity pe = new ProjectEntity();
//        pe = projectRepository.findById(id).get();
//        return pe;
        return projectRepository.findById(id).orElse(null);
    }

    @GetMapping("/callProjectDetail/{id}")
    public String callProjectDetailIdParam(@PathVariable String id) {
        log.info("Request Detail Number : " + id);
        log.info("Call Project Detail Id");

        return id;
    }

}
