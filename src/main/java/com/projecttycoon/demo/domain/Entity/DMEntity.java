package com.projecttycoon.demo.domain.Entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.projecttycoon.demo.domain.TimeStamp;
import com.projecttycoon.demo.domain.dto.DMRequestDTO;
import lombok.*;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;


//채팅 각각의 DB 설계
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
@Table(name="DMData")
@EntityListeners(AuditingEntityListener.class)
public class DMEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column
    private Long DMId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "DMFrom")
    @OnDelete(action = OnDeleteAction.NO_ACTION)
    @JsonIgnore
    private MemberEntity DMFrom;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "DMTo")
    @OnDelete(action = OnDeleteAction.NO_ACTION)
    @JsonIgnore
    private MemberEntity DMTo;

    @Column
    private String DMContent;

    @Column
    private boolean DMRead;

    @ManyToOne
    @JoinColumn(name = "DMroom")
    private DMroomEntity DMroom;

    public DMEntity(MemberEntity DMFrom, MemberEntity DMTo, DMroomEntity DMroom, String DMContent, boolean DMRead) {
        this.DMFrom = DMFrom;
        this.DMTo = DMTo;
        this.DMroom = DMroom;
        this.DMContent = DMContent;
        this.DMRead = DMRead;
    }
}

