package com.projecttycoon.demo.domain.Entity;


import com.projecttycoon.demo.domain.TimeStamp;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;

@Entity
@Getter
@Builder(toBuilder = true)
@AllArgsConstructor
@NoArgsConstructor
@Table(name="CommentData")
@EntityListeners(AuditingEntityListener.class)
public class CommentEntity extends TimeStamp {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column
    private Long commentId;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "commentProject")
    @OnDelete(action = OnDeleteAction.CASCADE) // 프로젝트 삭제되면 같이 삭제됨.
    private ProjectEntity commentProject;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "commentWriter")
    @OnDelete(action = OnDeleteAction.NO_ACTION)
    private MemberEntity commentWriter;

    @Column
    private String commentContent;

}
