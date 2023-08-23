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
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class DMService {

    @Autowired
    private final MemberRepository memberRepository;
    @Autowired
    private final DMRepository dmRepository;
    @Autowired
    private final DMroomRepository dmroomRepository;

    // 두 사용자의 DM방 리턴 (없으면 생성)
    @Transactional
    public DMroomEntity openDMroom(String DMFromId, String DMToId) {
        MemberEntity DMFrom = memberRepository.findByMemberId(DMFromId).get();
        MemberEntity DMTo = memberRepository.findByMemberId(DMToId).get();
        if (dmroomRepository.findDMroomIdByUserId(DMFrom, DMTo) == null) {
            System.out.println("DMroom 생성");
            dmroomRepository.createDMroom(DMFrom, DMTo);
        }
        return dmroomRepository.findDMroomIdByUserId(DMFrom, DMTo);
    }

    // 메세지 보내기
    @Transactional
    public Long sendDM(DMRequestDTO dmRequestDTO) {
        Optional<MemberEntity> optionalDMFrom = memberRepository.findByMemberId(dmRequestDTO.getDMFromId());
        Optional<MemberEntity> optionalDMTo = memberRepository.findByMemberId(dmRequestDTO.getDMToId());
//        System.out.println(dmRequestDTO);
        if (optionalDMFrom.isPresent() && optionalDMTo.isPresent()) {
            MemberEntity DMFrom = optionalDMFrom.get();
            MemberEntity DMTo = optionalDMTo.get();
            DMroomEntity DMroom = dmroomRepository.findByDMroomId(dmRequestDTO.getDMroomId());
            DMEntity dmEntity = new DMEntity(DMFrom, DMTo, DMroom, dmRequestDTO.getDMContent(), false);

            dmRepository.save(dmEntity);
            return dmEntity.getDMId();

            // Your logic here with DMFrom and DMTo
        } else {
            System.out.println("DMFrom: " + optionalDMFrom.isPresent());
            System.out.println("DMTo: " + optionalDMTo.isPresent());
            System.out.println("멤버 불러오기 실패");
            return null;
        }
//        MemberEntity DMFrom = memberRepository.findByMemberId(dmRequestDTO.getDMFromId()).get();
//        MemberEntity DMTo = memberRepository.findByMemberId(dmRequestDTO.getDMToId()).get();

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

