package com.projecttycoon.demo.domain.Entity;

import com.projecttycoon.demo.domain.TimeStamp;
import com.projecttycoon.demo.domain.dto.DMroompostRequestDTO;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;


//사용자 두명이 대화하는 채팅방의 DB 설계
@Entity
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Table(name="DMroomData")
@EntityListeners(AuditingEntityListener.class)
public class DMroomEntity{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "DMroomId")
    private Long DMroomId;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "DMFrom")
    @OnDelete(action = OnDeleteAction.NO_ACTION)
    private MemberEntity DMFrom;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "DMTo")
    @OnDelete(action = OnDeleteAction.NO_ACTION)
    private MemberEntity DMTo;

    public DMroomEntity(DMroompostRequestDTO dmroompostDTO) {
        this.DMFrom = dmroompostDTO.getDMFrom();
        this.DMTo = dmroompostDTO.getDMTo();
    }
}

