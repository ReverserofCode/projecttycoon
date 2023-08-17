package com.projecttycoon.demo.domain.Entity;

import com.projecttycoon.demo.domain.TimeStamp;
import com.projecttycoon.demo.domain.dto.DMRequestDTO;
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
@Table(name="DMData")
@EntityListeners(AuditingEntityListener.class)
public class DMEntity extends TimeStamp {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column
    private Long DMId;

    @Column
    private String DMFromId;

    @Column
    private String DMToId;

    @Column
    private String DMContent;

    @Column
    private Boolean DMRead;

    @ManyToOne
    @JoinColumn(name = "DMroomId", referencedColumnName = "DMroomId")
    private DMroomEntity DMroomId;


    public DMEntity(DMRequestDTO DMDTO, DMroomEntity DMroomEntity) {
        this.DMFromId = DMDTO.getDMFromId();
        this.DMToId = DMDTO.getDMToId();
        this.DMContent =DMDTO.getDMToId();
        this.DMRead = DMDTO.getDMRead();
        this.DMroomId =DMroomEntity;
    }
}

