package com.projecttycoon.demo.domain.Entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.projecttycoon.demo.domain.TimeStamp;
import com.projecttycoon.demo.domain.dto.ProjectRequestDTO;
import lombok.*;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Set;


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
    @Column(length = 10000)
    private String projectContent;

    @Column(columnDefinition = "JSON")
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

    @JsonIgnore      //무한루프 방지
    @ManyToMany      //다대다 관계
    @JoinTable(
            name = "ProjectScrap",
            joinColumns = @JoinColumn(name = "projectId"),
            inverseJoinColumns = @JoinColumn(name = "memberId")
    )
    //이 프로젝트를 스크랩한 회원
    @Builder.Default
    private Set<MemberEntity> scrappedBy = new HashSet<>();

    // 스크랩 수 증가
    public void increaseScrapCount() {
        this.projectScrapNum++;
    }

    // 스크랩 수 감소
    public void decreaseScrapCount() {
        this.projectScrapNum--;
    }


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
    public void updateFromDTO(ProjectRequestDTO projectDto) {
        if (projectDto.getProjectTitle() != null) {
            this.projectTitle = projectDto.getProjectTitle();
        }
        if (projectDto.getProjectContent() != null) {
            this.projectContent = projectDto.getProjectContent();
        }
        if (projectDto.getProjectWantedRole() != null) {
            this.projectWantedRole = projectDto.getProjectWantedRole();
        }
        if (projectDto.getProjectStatus() != null) {
            this.projectStatus = projectDto.getProjectStatus();
        }
        if (projectDto.getProjectDue() != null) {
            this.projectDue = projectDto.getProjectDue();
        }
        if (projectDto.getProjectAcademy() != null) {
            this.projectAcademy = projectDto.getProjectAcademy();
        }
        if (projectDto.getProjectFilePath() != null) {
            this.projectFilePath = projectDto.getProjectFilePath();
        }
        if (projectDto.getProjectFileName() != null) {
            this.projectFileName = projectDto.getProjectFileName();
        }
        if (projectDto.getProjectScarpNum() != 0) {
            this.projectScrapNum = projectDto.getProjectScarpNum();
        }
        //if문 없는 경우 value=null로 리턴되는 상황이 있어 if문 사용
    }

    //String으로 입력받은 projectWantedRole을 RoleInfo2라는 리스트로 파싱
    public List<ProjectRoleInfo> getParsedProjectWantedRole() {
        ObjectMapper objectMapper = new ObjectMapper();
        try {
            return objectMapper.readValue(this.projectWantedRole, new TypeReference<List<ProjectRoleInfo>>() {});
        } catch (JsonProcessingException e) {
            e.printStackTrace();
            return null;
        }
    }



}