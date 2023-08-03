package com.projecttycoon.demo.domain;


import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.EntityListeners;
import javax.persistence.MappedSuperclass;
import java.util.Date;

//시간처리 클래스 수정,생성 시각을 기록한다.
@Getter
@MappedSuperclass
@NoArgsConstructor
@EntityListeners(AuditingEntityListener.class)
public class TimeStamp {

    @CreatedDate
    private Date createAt;

    @LastModifiedDate
    private Date modifiedAt;
}
