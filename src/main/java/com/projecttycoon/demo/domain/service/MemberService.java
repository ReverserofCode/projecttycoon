package com.projecttycoon.demo.domain.service;

import com.projecttycoon.demo.domain.Entity.MemberRoleEntity;
import com.projecttycoon.demo.domain.dto.MemberRequestDTO;
import com.projecttycoon.demo.domain.Entity.MemberEntity;
import com.projecttycoon.demo.domain.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;


//실제 프로그램의 서비스로직을 정의한 클래스
@Log4j2
@Service
@RequiredArgsConstructor
public class MemberService {

    private final MemberRepository memberRepository;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;




    public void registerMember(MemberRequestDTO requestDTO) {
        log.info("requestDTO check MemberPw : " + requestDTO.getMemberPw());
        requestDTO.setMemberPw(bCryptPasswordEncoder.encode(requestDTO.getMemberPw()));
        MemberEntity memberEntity = new MemberEntity(requestDTO);
        memberEntity.addMemberRole(MemberRoleEntity.USER);
        memberRepository.save(memberEntity);
    }

    public void memberUpdate(String memberId, MemberRequestDTO requestDTO) {
        Optional<MemberEntity> result = memberRepository.findById(memberId);
        if (result.isPresent()) {
            requestDTO.setMemberPw(bCryptPasswordEncoder.encode(requestDTO.getMemberPw()));
            MemberEntity memberEntity;
            memberEntity = result.get();
            memberEntity.memberUpdate(requestDTO);
            memberRepository.save(memberEntity);
        }
        else{
            log.info("can not found ID");
        }
    }
    public void memberUpdateEcPw(String memberId, MemberRequestDTO requestDTO) {
        Optional<MemberEntity> result = memberRepository.findById(memberId);
        if (result.isPresent()) {
            MemberEntity memberEntity;
            memberEntity = result.get();
            requestDTO.setMemberPw(memberEntity.getMemberPw());
            memberEntity.memberUpdate(requestDTO);
            memberRepository.save(memberEntity);
        }
        else{
            log.info("can not found ID");
        }
    }

    public List<MemberRequestDTO> memberList() {
        List<MemberEntity> entityList = memberRepository.findAllByOrderByCreatedAtDesc();
        List<MemberRequestDTO> list = new ArrayList<>();
        for (int i = 0; i < entityList.size(); i++) {
            MemberRequestDTO dto = new MemberRequestDTO(entityList.get(i));
            list.add(dto);
        }
        return list;
    }

    public void memberDelete(String memberId) {
        memberRepository.deleteById(memberId);
    }

    public String createIcon() {
        String[] icons = {
                "1_shark.png",
                "2_shark.png",
                "3_shark.png",
                "4_shark.png",
                "5_cat.png",
                "6_cat.png",
                "7_dog.png",
                "8_dog.png",
                "9_alpaca.png",
                "10_alpaca.png",
                "11_alpaca.png",
                "12_alpaca.png",
                "13_axolotl.png",
                "14_axolotl.png",
                "15_turtle.png",
                "16_turtle.png",
                "17_penguin.png",
                "18_penguin.png",
                "19_penguin.png",
                "20_raccoon.png",
                "21_raccoon.png",
        };

        int randomNum = (int) (Math.random() * 21);
        return icons[randomNum];
    }
}