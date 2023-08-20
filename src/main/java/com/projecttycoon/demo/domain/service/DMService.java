package com.projecttycoon.demo.domain.service;

import com.projecttycoon.demo.domain.Entity.DMEntity;
import com.projecttycoon.demo.domain.Entity.DMroomEntity;
import com.projecttycoon.demo.domain.dto.DMRequestDTO;
import com.projecttycoon.demo.domain.repository.DMRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class DMService {

    private final DMRepository dmRepository;

    public void sendDM(DMRequestDTO dmRequestDTO) {
        DMEntity dmEntity = new DMEntity(dmRequestDTO);
        dmRepository.save(dmEntity);
    }

    public void receiveDM(DMRequestDTO dmRequestDTO) {
        DMEntity dmEntity = new DMEntity(dmRequestDTO);
        dmRepository.save(dmEntity);
    }
}

