package com.projecttycoon.demo.domain.project;

import com.projecttycoon.demo.domain.TimeStamp;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;


//사용자에게 노출되는 프로젝트들의 상세 내역의 데이터를 담을 DB 설계
@Entity
@Getter
@NoArgsConstructor
@EntityListeners(AuditingEntityListener.class)
public class ProjectEntity extends TimeStamp {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long projectId;
    private String projectTitle;
    private String projectContent;
    private String projectImage;
    private String projectRequired;
    private String projectIsEnd;
    private String projectWriterId;
    private String projectNickName;


   public ProjectEntity(ProjectDto projectDto) {
        this.projectTitle = projectDto.getProjectTitle();
        this.projectContent = projectDto.getProjectContent();
        this.projectImage = projectDto.getProjectImage();
        this.projectRequired = projectDto.getProjectRequired();
        this.projectIsEnd = projectDto.getProjectIsEnd();
        this.projectWriterId = projectDto.getProjectWriterId();
        this.projectNickName = projectDto.getProjectNickName();
    }
}
