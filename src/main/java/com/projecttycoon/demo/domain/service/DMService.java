package com.projecttycoon.demo.domain.service;

import com.projecttycoon.demo.domain.Entity.DMEntity;
import com.projecttycoon.demo.domain.Entity.DMroomEntity;
import com.projecttycoon.demo.domain.Entity.MemberEntity;
import com.projecttycoon.demo.domain.dto.DMRequestDTO;
import com.projecttycoon.demo.domain.dto.MemberRequestDTO;
import com.projecttycoon.demo.domain.repository.DMRepository;
import com.projecttycoon.demo.domain.repository.DMroomRepository;
import com.projecttycoon.demo.domain.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class DMService {

    @Autowired
    private final MemberRepository memberRepository;
    @Autowired
    private final DMRepository dmRepository;
    @Autowired
    private final DMroomRepository dmroomRepository;

    // DM방 새로 만들기
    @Transactional
    public void newDMroom(String DMFromId, String DMToId) {
        MemberEntity DMFrom = memberRepository.findByMemberId(DMFromId).get();
        MemberEntity DMTo = memberRepository.findByMemberId(DMToId).get();
        if (dmroomRepository.findDMroomId(DMFrom, DMTo) == null) {
            dmroomRepository.createDMroom(DMFrom, DMTo);
        }
    }

    // 메세지 보내기
    @Transactional
    public void sendDM(DMRequestDTO dmRequestDTO) {
        MemberEntity DMFrom = memberRepository.findByMemberId(dmRequestDTO.getDMFromId()).get();
        MemberEntity DMTo = memberRepository.findByMemberId(dmRequestDTO.getDMToId()).get();
        DMroomEntity DMroom = dmroomRepository.findByDMroomId(dmRequestDTO.getDMroomId());
        DMEntity dmEntity = new DMEntity();
        dmEntity.setDMFrom(DMFrom);
        dmEntity.setDMTo(DMTo);
        dmEntity.setDMContent(dmRequestDTO.getDMContent());
        dmEntity.setDMroom(DMroom);
        dmEntity.setDMRead(false);
        dmRepository.save(dmEntity);
    }

    // 현재 사용자의 모든 DM방 불러오기
    @Transactional(readOnly = true)
    public List<DMroomEntity> readDMroomList(String memberId) {
        MemberEntity user = memberRepository.findByMemberId(memberId).get();
        return dmroomRepository.findDMroomList(user);
    }

    // DM 대화창 가져오기
    public List<DMEntity> readDMroom(Long DMroomId) {
        DMroomEntity dmroom = dmroomRepository.findByDMroomId(DMroomId);
        return dmRepository.findAllByDMroom(dmroom);
    }
}

