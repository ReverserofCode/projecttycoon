package com.projecttycoon.demo.controller;

import com.projecttycoon.demo.domain.dto.ProjectRequestDTO;
import com.projecttycoon.demo.domain.Entity.ProjectEntity;
import com.projecttycoon.demo.domain.repository.ProjectRepository;
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

//   테스트 코드 서비스 로직은 Service 패키지의 Service 클래스를 만들어 사용 할 수 있도록 합니다.
    @GetMapping("/api/projectList")
    public List<ProjectEntity> getProjectList() {
        log.info("call GetMapping findAll");
        projectRepository.findAll();
        return projectRepository.findAll();
    }

}
