package com.projecttycoon.demo.domain.Entity;

import com.projecttycoon.demo.domain.TimeStamp;
import com.projecttycoon.demo.domain.dto.ProjectRequestDTO;
import lombok.*;
import org.hibernate.annotations.DynamicInsert;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;


//사용자에게 노출되는 프로젝트들의 상세 내역의 데이터를 담을 DB 설계
@Data
@Entity
@Getter
@RequiredArgsConstructor
public class Project extends TimeStamp {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="projectId", unique = true)
    private Long id;
    @Column(name="projectTitle")
    private String projectTitle;
    @Column(name="projectContent")
    private String projectContent;
    @Column(name="projectRequired")
    private String projectRequired;
    @Column(name="projectIsEnd")
    private String projectIsEnd;
    @Column(name="projectWriterId")
    private String projectWriterId;
    @Column(name="projectNickName")
    private String projectNickName;

    private String projectFileName;
    private String projectFilePath;

    public Project(ProjectRequestDTO projectRequestDTO) {
        this.projectTitle = projectRequestDTO.getProjectTitle();
        this.projectContent = projectRequestDTO.getProjectContent();
        this.projectRequired = projectRequestDTO.getProjectRequired();
        this.projectIsEnd = projectRequestDTO.getProjectIsEnd();
        this.projectWriterId = projectRequestDTO.getProjectWriterId();
        this.projectNickName = projectRequestDTO.getProjectNickName();
        this.projectFileName = projectRequestDTO.getProjectImage().getName();
        this.projectFilePath = "/static/images/" + projectRequestDTO.getProjectImage().getOriginalFilename();
    }

    public void ProjectUpdate(ProjectRequestDTO projectRequestDTO) {
        this.projectTitle = projectRequestDTO.getProjectTitle();
        this.projectContent = projectRequestDTO.getProjectContent();
        this.projectRequired = projectRequestDTO.getProjectRequired();
        this.projectIsEnd = projectRequestDTO.getProjectIsEnd();
        this.projectWriterId = projectRequestDTO.getProjectWriterId();
        this.projectNickName = projectRequestDTO.getProjectNickName();
        this.projectFileName = projectRequestDTO.getProjectImage().getName();
        this.projectFilePath = "/static/images/" + projectRequestDTO.getProjectImage().getOriginalFilename();

    }




}
