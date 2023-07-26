package demo.domain.project;

import com.projecttycoon.demo.domain.TimeStamp;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.Date;


//사용자에게 노출되는 프로젝트들의 상세 내역의 데이터를 담을 DB 설계
@Entity
@NoArgsConstructor
public class ProjectEntity extends TimeStamp {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long projectId;

    @Column(nullable = false)
    private String projectTitle;
    @Column(nullable = false)
    private String projectContent;
    @Column(nullable = false)
    private String projectImage;
    @Column(nullable = false)
    private String projectRequired;
    @Column(nullable = false)
    private String projectIsEnd;
    @Column(nullable = false)
    private String projectWriterId;
    @Column(nullable = false)
    private Date projectCreatedAt;
    @Column(nullable = false)
    private Date projectModifiedAt;

    ProjectEntity(ProjectDto projectDto) {
        this.projectTitle = projectDto.getProjectTitle();
        this.projectContent = projectDto.getProjectContent();
        this.projectImage = projectDto.getProjectImage();
        this.projectRequired = projectDto.getProjectRequired();
        this.projectIsEnd = projectDto.getProjectIsEnd();
        this.projectWriterId = projectDto.getProjectWriterId();
    }
}
