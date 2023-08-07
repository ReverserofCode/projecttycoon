package com.projecttycoon.demo.domain.Entity;

import com.projecttycoon.demo.domain.TimeStamp;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;


//사용자 두명이 대화하는 채팅방의 DB 설계
@Entity
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Table(name="ChatroomData")
@EntityListeners(AuditingEntityListener.class)
public class ChatroomEntity extends TimeStamp {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column
    private Long chatroomId;

    @ManyToOne
    @JoinColumn(name = "chatFromId", referencedColumnName = "memberid")
    private MemberEntity chatFromId;

    @ManyToOne
    @JoinColumn(name = "chatToId", referencedColumnName = "memberid")
    private MemberEntity chatToId;
}

