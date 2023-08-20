//package com.projecttycoon.demo.domain.service;
//
//
//import com.projecttycoon.demo.domain.Entity.DMroomEntity;
//import com.projecttycoon.demo.domain.dto.DMroomRequestDTO;
//import com.projecttycoon.demo.domain.repository.DMroomRepository;
//import lombok.RequiredArgsConstructor;
//import org.springframework.stereotype.Service;
//
//@Service
//@RequiredArgsConstructor
//public class DMroomService {
//
//    private final DMroomRepository dmRoomRepository;
//
//    public DMroomEntity getOrCreateDMRoom(DMroomRequestDTO dmroomRequestDTO) {
//        DMroomEntity dmroomEntity = dmRoomRepository.findByDMFromIdAndDMToId(dmroomRequestDTO.getDMFromId(), dmroomRequestDTO.getDMToId());
//
//        if (dmroomEntity == null) {
//            // dmroomRequestDTO를 통해 새로운 DMroomEntity 생성
//            dmroomEntity = DMroomEntity.builder()
//                    .DMFromId(dmroomRequestDTO.getDMFromId())
//                    .DMToId(dmroomRequestDTO.getDMToId())
//                    .build();
//            dmroomEntity = dmRoomRepository.save(dmroomEntity);
//        }
//
//        return dmroomEntity;
//    }
//
//    public DMroomEntity getDMRoomById(Long roomId) {
//        return dmRoomRepository.findById(roomId)
//                .orElseThrow(() -> new IllegalArgumentException("DM Room not found with ID: " + roomId));
//    }
//}