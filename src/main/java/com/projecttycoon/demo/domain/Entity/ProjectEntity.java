package com.projecttycoon.demo.domain.Entity;

import com.projecttycoon.demo.domain.TimeStamp;
import com.projecttycoon.demo.domain.dto.ProjectRequestDTO;
import lombok.*;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;
import org.springframework.lang.Nullable;

import javax.persistence.*;
import java.util.Date;


//사용자에게 노출되는 프로젝트들의 상세 내역의 데이터를 담을 DB 설계
@Entity
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "ProjectData")
@EntityListeners(AuditingEntityListener.class)
public class ProjectEntity extends TimeStamp {

    @Id
    @Column
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long projectId;

    @Column
    private String projectTitle;
    @Column
    private String projectContent;
    @Column
    private String projectWantedRole;
    @Column(nullable = true)
    private Date projectDue;
    @Column
    private String projectAcademy;
    @Column
    private Boolean projectStatus;
    @Column
    private String projectWriterId;
    @Column
    private String projectWriterNick;
    @Column(nullable = true)
    private String projectFilePath;
    @Column(nullable = true)
    private String projectFileName;
    @Column
    private int projectScrapNum;

    public ProjectEntity(ProjectRequestDTO projectDto) {
        this.projectTitle = projectDto.getProjectTitle();
        this.projectContent = projectDto.getProjectContent();
        this.projectWantedRole = projectDto.getProjectWantedRole();
        this.projectStatus = projectDto.getProjectStatus();
        this.projectDue = projectDto.getProjectDue();
        this.projectAcademy = projectDto.getProjectAcademy();
        this.projectWriterId = projectDto.getProjectWriterId();
        this.projectWriterNick = projectDto.getProjectWriterNick();
        this.projectFilePath = projectDto.getProjectFilePath();
        this.projectFileName = projectDto.getProjectFileName();
        this.projectScrapNum = projectDto.getProjectScarpNum();
    }
}