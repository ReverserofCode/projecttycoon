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
public class MemberService  {

    private final MemberRepository memberRepository;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;


    public void registerMember(MemberRequestDTO requestDTO) {
        log.info("requestDTO check MemberPw : "+requestDTO.getMemberPw());
        requestDTO.setMemberPw(bCryptPasswordEncoder.encode(requestDTO.getMemberPw()));
        MemberEntity memberEntity = new MemberEntity(requestDTO);
        memberEntity.addMemberRole(MemberRoleEntity.USER);
        memberRepository.save(memberEntity);
    }

    public void memberUpdate(String memberId, MemberRequestDTO requestDTO) {
        Optional<MemberEntity> result = memberRepository.findById(memberId);
        if (result.isPresent()) {
            MemberEntity memberEntity;
            memberEntity = result.get();

            requestDTO.setMemberPw(bCryptPasswordEncoder.encode(requestDTO.getMemberPw()));

            memberEntity.memberUpdate(requestDTO);
            memberRepository.save(memberEntity);
        }
    }
    public List<MemberRequestDTO> memberList(){
        List<MemberEntity> entityList = memberRepository.findAllByOrderByCreatedAtDesc();
        List<MemberRequestDTO> list = new ArrayList<>();
        for(int i = 0; i < entityList.size(); i++){
            MemberRequestDTO dto = new MemberRequestDTO(entityList.get(i));
            list.add(dto);
        }
        return list;
    }
    public void memberDelete(String memberId) {
        memberRepository.deleteById(memberId);
    }
    public String createIcon(){
        String[] icons = new String[21];
        icons[0] = "1_shark.png";
        icons[1] = "2_shark.png";
        icons[2] = "3_shark.png";
        icons[3] = "4_shark.png";
        icons[4] = "5_cat.png";
        icons[5] = "6_cat.png";
        icons[6] = "7_dog.png";
        icons[7] = "8_dog.png";
        icons[8] = "9_alpaca.png";
        icons[9] = "10_alpaca.png";
        icons[10] = "11_alpaca.png";
        icons[11] = "12_alpaca.png";
        icons[12] = "13_axolotl.png";
        icons[13] = "14_axolotl.png";
        icons[14] = "15_tuttle.png";
        icons[15] = "16_tuttle.png";
        icons[16] = "17_penguin.png";
        icons[17] = "18_penguin.png";
        icons[18] = "19_penguin.png";
        icons[19] = "20_raccoon.png";
        icons[20] = "21_raccoon.png";
        int randomNum = (int)(Math.random()*21);
        String icon =icons[randomNum];
        return icon;
    }

}