package demo.domain.project;


import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;


//데이터를 실제로 이동시키는 클래스이다.
@Getter
@ToString
@NoArgsConstructor
public class ProjectDto {

    private String projectTitle;
    private String projectContent;
    private String projectImage;
    private String projectRequired;
    private String projectIsEnd;
    private String projectWriterId;

}
