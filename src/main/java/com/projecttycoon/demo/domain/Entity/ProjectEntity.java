package com.projecttycoon.demo.domain.Entity;

import com.projecttycoon.demo.domain.TimeStamp;
import com.projecttycoon.demo.domain.dto.ProjectRequestDTO;
import lombok.*;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;


//사용자에게 노출되는 프로젝트들의 상세 내역의 데이터를 담을 DB 설계
@Entity
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Table(name="ProjectData")
@EntityListeners(AuditingEntityListener.class)
public class ProjectEntity extends TimeStamp {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column
    private Long projectId;

    @Column
    private String projectTitle;

    @Column
    private String projectContent;

    @Column
    private String projectImage;

    @Column
    private String projectRequired;

    @Column
    private String projectAcademy;

    @Column
    private String projectIsEnd;

    @Column
    private String projectWriterId;

    @Column
    private String projectNickName;

    public ProjectEntity(ProjectRequestDTO projectDto) {
        this.projectTitle = projectDto.getProjectTitle();
        this.projectContent = projectDto.getProjectContent();
        this.projectImage = projectDto.getProjectImage();
        this.projectRequired = projectDto.getProjectRequired();
        this.projectIsEnd = projectDto.getProjectIsEnd();
        this.projectAcademy = projectDto.getProjectAcademy();
        this.projectWriterId = projectDto.getProjectWriterId();
        this.projectNickName = projectDto.getProjectNickName();
    }
}