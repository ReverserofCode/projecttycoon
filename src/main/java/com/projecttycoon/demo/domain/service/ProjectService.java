package com.projecttycoon.demo.domain.service;


import com.projecttycoon.demo.domain.Entity.ProjectEntity;
import com.projecttycoon.demo.domain.dto.ProjectRequestDTO;
import com.projecttycoon.demo.domain.repository.ProjectRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.util.UUID;

@Service
public class ProjectService {

    private final ProjectRepository projectRepository;
    @Autowired
    public ProjectService(ProjectRepository projectRepository){
        this.projectRepository = projectRepository;
    }

    // 글 작성 처리
    public void createProject(ProjectRequestDTO projectRequestDTO, MultipartFile file) throws Exception {
        // 파일 업로드 처리 시작
        String filePath = System.getProperty("user.dir") // 프로젝트 경로를 가져옴
                + "/src/main/webapp/"; // 파일이 저장될 폴더의 경로

        UUID uuid = UUID.randomUUID(); // 랜덤으로 식별자를 생성
        String fileName = uuid + "_" + file.getOriginalFilename(); // UUID와 파일이름을 포함된 파일 이름으로 저장
        File saveFile = new File(filePath, fileName); // projectPath는 위에서 작성한 경로, name은 전달받을 이름

        file.transferTo(saveFile);

        projectRequestDTO.setProjectFileName("projectImage");
        projectRequestDTO.setProjectFilePath("/webapp/" + fileName); // static 아래부분의 파일 경로로만으로도 접근이 가능
        // 파일 업로드 처리 끝

        ProjectEntity projectEntity = new ProjectEntity(projectRequestDTO);
        projectRepository.save(projectEntity);
    }

    public ProjectEntity oneProject(Long id) {
        return projectRepository.findById(id).orElseThrow(() -> new NullPointerException("찾으시는 아이디가 없습니다."));
    }

    public Page<ProjectEntity> allProject(int page) {
        PageRequest pageRequest = PageRequest.of(page, 8);
        return projectRepository.findAll(pageRequest);
    }

    public void isEndProject(String projectIsEnd, int page){
        PageRequest pageRequest = PageRequest.of(page,8);
    }

    public void updateProject(ProjectRequestDTO projectRequestDTO) {
        ProjectEntity projectEntity = new ProjectEntity(projectRequestDTO);
        projectRepository.save(projectEntity);
    }

    public Long deleteProject(Long id) {
        projectRepository.deleteById(id);
        return id;
    }

    public void searchProject(String projectName, int page) {
        PageRequest pageRequest = PageRequest.of(page, 8);
    }



}