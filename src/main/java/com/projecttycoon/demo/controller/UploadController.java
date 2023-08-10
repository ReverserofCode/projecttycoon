package com.projecttycoon.demo.controller;

import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.UUID;

@RestController
@Log4j2
public class UploadController {


    @PostMapping("/uploadTest")
    public void uploadTest(@RequestParam MultipartFile file) throws Exception {
        final String uploadDir = "/home/UploadTest";

        if (!file.isEmpty()) {
            String filename = file.getOriginalFilename();
            log.info("Origin File Name : " + filename);
            String fullPath = uploadDir + File.separator + filename;
            log.info(fullPath);
//           실제로 파일 저장을 실행하는 부분
            file.transferTo(new File(fullPath));
        }
    }
}
