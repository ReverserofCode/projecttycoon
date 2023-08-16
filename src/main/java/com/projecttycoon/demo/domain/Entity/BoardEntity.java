package com.projecttycoon.demo.domain.Entity;

import com.projecttycoon.demo.domain.TimeStamp;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;

@Entity
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Table(name="BoardData")
@EntityListeners(AuditingEntityListener.class)
public class BoardEntity extends TimeStamp {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column
    private Long boardId;

    @Column
    private String boardNickname; //게시판작성자닉네임

    @Column
    private String boardTitle;  //게시판제목

    @Column
    private String boardContent;    //게시판내용

    @Column
    private String boardImage;      //게시판이미지

    @Column
    private int boardReadcount;     //게시판조회수

    @Column
    private String boardCategory;   //게시판카테고리

    @ManyToOne
    @JoinColumn(name = "commentId", referencedColumnName = "commentId")
    private CommentEntity commentId;

    //여기에 생성자 적기

}
