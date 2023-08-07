package com.projecttycoon.demo.domain.Entity;

import com.projecttycoon.demo.domain.TimeStamp;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;


//사용자 한명이 대화하는 대화방 List DB 설계
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
    @JoinColumn(name = "chatId")
    private ChatEntity chatEntity;
}

