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
@Table(name="ChatData")
@EntityListeners(AuditingEntityListener.class)
public class ChatEntity extends TimeStamp {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column
    private Long chatId;

    @Column
    private String chatSendId;

    @Column
    private String chatReceiveId;

    @Column
    private String chatText;
}

