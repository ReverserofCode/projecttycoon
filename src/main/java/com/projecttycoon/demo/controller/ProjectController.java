package com.projecttycoon.demo.controller;
import java.lang.String;

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

import java.util.List;
import java.util.Optional;

@Log4j2
@RestController // @Controller 대신 @RestController로 변경
@RequiredArgsConstructor
@RequestMapping("/api") // 공통된 API 경로 설정
public class ProjectController {


    private final ProjectService projectService;
    private final ProjectRepository projectRepository;


    //CRUD

    //1. CREATE
    @PostMapping("/projectRegister")
    public String saveProject(@RequestPart(value = "file",required = false)  MultipartFile file, @RequestPart(value = "projectRequestDTO") ProjectRequestDTO projectRequestDTO) throws Exception {
        log.info("Call Method saveProject ");
        // projectRequestDTO에서 projectWantedRole을 배열로 받음
        projectService.createProject(projectRequestDTO, file);
        return "success";
    }


    //2. READ

    //2-1. 프로젝트출력
    @GetMapping("/projectAllRequest")
    public List<ProjectEntity> allProjectRequest() {
        log.info("Call Method allProjectRequest");
        return projectRepository.findAll();
    }

    //2-2. 프로젝트 1개출력
    @GetMapping("/project/{id}")
    public ProjectEntity listone(@PathVariable Long id) {
//        ProjectEntity pe = new ProjectEntity();
//        pe = projectRepository.findById(id).get();
//        return pe;
        return projectRepository.findById(id).orElse(null);
    }

    //2-3. <프로젝트 모집상태> 로 필터링
    @GetMapping("/projectsByStatus")
    public List<ProjectEntity> getProjectsByStatus(@RequestParam("status") boolean status) {
        log.info("메서드 getProjectsByStatus 호출");

        Specification<ProjectEntity> spec = ProjectSpecifications.hasStatus(status);
        return projectRepository.findAll(spec);
    }

    //2-4. <프로젝트 모집지역> 으로 필터링
    @GetMapping("/projectsByAcademy")
    public List<ProjectEntity> getProjectsByAcademy(@RequestParam("academy") String academy) {
        log.info("메서드 getProjectsByAcademy 호출");

        Specification<ProjectEntity> spec = ProjectSpecifications.hasAcademy(academy);
        return projectRepository.findAll(spec);
    }

    //2-5. <프로젝트 모집역할> 로 필터링
    @GetMapping("/projectsByRoles")
    public List<ProjectEntity> getProjectsByRoles(@RequestParam("roles") String... roles) {
        log.info("메서드 getProjectsByRoles 호출");

        if (roles.length == 0) {
            // 아무런 역할도 입력하지 않은 경우 모든 프로젝트 반환
            return projectRepository.findAll();
        }

        Specification<ProjectEntity> spec = ProjectSpecifications.hasRoles(roles);
        return projectRepository.findAll(spec);
    }


    //2-6. <프로젝트 모집상태 + 프로젝트 모집역할> 로 필터링
    @GetMapping("/projectsByStatusAndRoles")
    public List<ProjectEntity> getProjectsByStatusAndRoles(@RequestParam("status") boolean status, @RequestParam("roles") String... roles) {
        log.info("메서드 getProjectsByStatusAndRoles 호출");

        Specification<ProjectEntity> spec = ProjectSpecifications.hasStatusAndRoles(status, roles);
        return projectRepository.findAll(spec);
    }

    //2-7. <프로젝트 모집상태 + 프로젝트 모집지역> 으로 필터링
    @GetMapping("/projectsByStatusAndAcademy")
    public List<ProjectEntity> getProjectsByStatusAndAcademy(@RequestParam("status") boolean status, @RequestParam("academy") String academy) {
        log.info("메서드 getProjectsByStatusAndAcademy 호출");

        Specification<ProjectEntity> spec = ProjectSpecifications.hasStatusAndAcademy(status, academy);
        return projectRepository.findAll(spec);
    }

    //2-8. <프로젝트 모집지역 + 프로젝트 모집역할> 로 필터링
    @GetMapping("/projectsByAcademyAndRoles")
    public List<ProjectEntity> getProjectsByAcademyAndRoles(@RequestParam("academy") String academy, @RequestParam("roles") String... roles) {
        log.info("메서드 getProjectsByAcademyAndRoles 호출");

        Specification<ProjectEntity> spec = ProjectSpecifications.hasAcademyAndRoles(academy, roles);
        return projectRepository.findAll(spec);
    }

    //2-9. <프로젝트 상태 + 프로젝트 모집지역 + 프로젝트 모집역할> 으로 필터링
    @GetMapping("/projectsByStatusAndAcademyAndRoles")
    public List<ProjectEntity> getProjectsByStatusAndAcademyAndRoles(@RequestParam("status") boolean status, @RequestParam("academy") String academy, @RequestParam("roles") String... roles) {
        log.info("메서드 getProjectsByStatusAndAcademyAndRoles 호출");

        Specification<ProjectEntity> spec = ProjectSpecifications.hasStatusAndAcademyAndRoles(status, academy, roles);
        return projectRepository.findAll(spec);
    }


    //3. UPDATE
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


    //4. DELETE
    @DeleteMapping("/project/{id}")
    public String deleteProject(@PathVariable Long id) {
        projectRepository.deleteById(id);
        return "success";
    }

    @GetMapping("/callProjectDetail/{id}")
    public void callProjectDetailIdParam(@PathVariable String id) {
        log.info("Request Detail Number : " + id);
        log.info("Call Project Detail Id");
    }

}
