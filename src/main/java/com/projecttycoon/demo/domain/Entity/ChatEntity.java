package com.projecttycoon.demo.domain.Entity;

import com.projecttycoon.demo.domain.TimeStamp;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;


//채팅 각각의 DB 설계
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
    private String chatFromId;

    @Column
    private String chatToId;

    @Column
    private String chatContent;

    @Column
    private Boolean chatRead;

    @ManyToOne
    @JoinColumn(name = "chatroomId", referencedColumnName = "chatroomId")
    private ChatroomEntity chatroomId;

}

