package com.projecttycoon.demo.controller;

import com.projecttycoon.demo.domain.Entity.DMEntity;
import com.projecttycoon.demo.domain.dto.DMRequestDTO;
import com.projecttycoon.demo.domain.repository.DMRepository;
import com.projecttycoon.demo.domain.service.DMService;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Log4j2
@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
public class DMController {
    private final DMService dmService;
    private final DMRepository dmRepository;

    @PostMapping("/dmsent")
    public void sendDirectMessage(@RequestBody DMRequestDTO dmRequestDTO) {
        dmService.sendDM(dmRequestDTO);
    }

    @PostMapping("/dmreceive")
    public void receiveDirectMessage(@RequestBody DMRequestDTO dmRequestDTO) {
        dmService.receiveDM(dmRequestDTO);
    }

    @GetMapping("/getMessages")
    public List<DMEntity> getMessages(@RequestParam String DMFromId, @RequestParam String DMToId) {
        log.info("fromId: {}, toId: {}", DMFromId, DMToId);
        List<DMEntity> messages= dmRepository.findAllByDMFromIdAndDMToId(DMFromId, DMToId);
        log.info("Retrieved messages: {}", messages);
        return messages;
    }
}