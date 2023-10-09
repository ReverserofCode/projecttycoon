package com.projecttycoon.demo.domain.service;

import com.projecttycoon.demo.domain.Entity.DMEntity;
import com.projecttycoon.demo.domain.Entity.DMroomEntity;
import com.projecttycoon.demo.domain.Entity.MemberEntity;
import com.projecttycoon.demo.domain.dto.DMRequestDTO;
import com.projecttycoon.demo.domain.dto.DMroompostRequestDTO;
import com.projecttycoon.demo.domain.repository.DMRepository;
import com.projecttycoon.demo.domain.repository.DMroomRepository;
import com.projecttycoon.demo.domain.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class DMService {

    private final MemberRepository memberRepository;
    private final DMRepository dmRepository;
    private final DMroomRepository dmroomRepository;


    // 두 사용자의 DM방 리턴 (없으면 생성)
    @Transactional
    public DMroomEntity openDMroom(String DMFromId, String DMToId) {
        MemberEntity DMFrom = memberRepository.findByMemberId(DMFromId).get();
        MemberEntity DMTo = memberRepository.findByMemberId(DMToId).get();
        if (dmroomRepository.findDMroomIdByUserId(DMFrom, DMTo) == null) {
            System.out.println("DMroom 생성");
            DMroompostRequestDTO dmroompostDTO = new DMroompostRequestDTO(DMFrom, DMTo);
            DMroomEntity dmroomEntity = new DMroomEntity(dmroompostDTO);
            dmroomRepository.save(dmroomEntity);
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

        } else {
            System.out.println("DMFrom: " + optionalDMFrom.isPresent());
            System.out.println("DMTo: " + optionalDMTo.isPresent());
            System.out.println("멤버 불러오기 실패");
            return null;
        }

    }

    // 현재 사용자의 모든 DM방 불러오기
    @Transactional(readOnly = true)
    public List<DMEntity> readDMroomList(String memberId) {

        MemberEntity user = memberRepository.findByMemberId(memberId).get();

        System.out.println(user);


        List<DMroomEntity> response_roomList = dmroomRepository.findDMroomList(user);
        List<DMEntity> response_lastDMList = new ArrayList<DMEntity>() ;
        for (DMroomEntity dmroom : response_roomList) {
            List<DMEntity> DMList = dmRepository.findAllByDMroom(dmroom);
            if(DMList.size() != 0) {
                response_lastDMList.add(DMList.get(DMList.size()-1));
            }
        }

//        List<DMEntity> response_lastDMList = dmRepository.findLastDMList(response_roomList);


        return response_lastDMList;
    }

    // DM 대화창 가져오기
    public List<DMEntity> readDMroom(Long DMroomId,  MemberEntity loggedInUser) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String loggedInUsername = authentication.getName();

        System.out.println("DMroomID: " + DMroomId);
        System.out.println("Authentication: " + loggedInUsername);


        DMroomEntity dmroom = dmroomRepository.findByDMroomId(DMroomId);
        List<DMEntity> DMList = dmRepository.findAllByDMroom(dmroom);

        boolean dmreadExecute = false;
        if(DMList != null && DMList.get(DMList.size()-1).getDMTo().equals(loggedInUser)) {
            dmreadExecute = true;
        }

        // 메시지를 읽음표시(false->true) - 받는 사람(DMTo)가 현재 사용자와 같을 경우에만 변경
        if (dmreadExecute) {
            dmRepository.DMreadCheck(dmroom,loggedInUser);
        }

        return DMList;
    }
    
}

