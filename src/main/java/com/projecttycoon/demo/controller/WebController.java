package com.projecttycoon.demo.controller;

import com.projecttycoon.demo.domain.Entity.MemberEntity;
import com.projecttycoon.demo.domain.Entity.ProjectEntity;
import com.projecttycoon.demo.domain.repository.MemberRepository;
import com.projecttycoon.demo.domain.repository.ProjectRepository;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.servlet.ModelAndView;

import java.util.Optional;

//웹 사이트 내에서 다른 사이트에 대한 요청을 처리하는 컨르롤러
@Log4j2
@Controller
public class WebController {

    final ProjectRepository projectRepository;
    final MemberRepository memberRepository;

    @Autowired
    public WebController(ProjectRepository projectRepository, MemberRepository memberRepository) {
        this.projectRepository = projectRepository;
        this.memberRepository = memberRepository;
    }

    @GetMapping("/")
    public String callMain() {
        return "forward:/static/PageHome/index.html";
    }

    @RequestMapping("/api/login")
    public String initiatingLogin() {
        return "forward:/static/PageLogin/index.html";
    }

    @GetMapping("/PageProjectBoard")
    public String callPageProjectBoard() {
        return "forward:/static/PageProjectBoard/index.html";
    }

    @GetMapping("/loginProcess")
    public String callLoginProcess() {
        return "forward:/static/loginProcess/index.html";
    }

    @GetMapping("/callPageNewProject")
    public String callPageNewProject() {
        return "forward:/static/PageNewProject/index.html";
    }

    @GetMapping("/api/signup")
    public String callPageSinUp() { return "forward:/static/PageSignUp/index.html";}

    @GetMapping("/callPageProjectBoardDetail/{id}")
    public ModelAndView callPageProjectBoardDetail(@PathVariable Long id) {
        ModelAndView mav = new ModelAndView();
        Optional<ProjectEntity> object = projectRepository.findById(id);
        if (object.isPresent()) {
            log.info("call Detail Page and target Object detected");
            mav.addObject("projectDTO", object.get());
            mav.setViewName("forward:/static/PageProjectBoardDetail/index.html");
        }

        return mav;
    }

    @GetMapping("/memberPage/{id}")
    public ModelAndView callPageMemberDetail(@PathVariable String id) {
        ModelAndView mav = new ModelAndView();
        Optional<MemberEntity> object = memberRepository.findByMemberId(id);
        if (object.isPresent()) {
            log.info("call MemberPage and send intel");
            mav.addObject("memberDTO", object.get());
            mav.setViewName("forward:/static/MemberPage/index.html");
        }

        return mav;
    }

    @GetMapping("/myPage")
    public String callMyPage() {
        log.info("call MyPage");
        return "forward:/static/MyPage/index.html";
    }

    @GetMapping("/callDmProcess")
    public String callDmProcess() {
        log.info("call DmProcess ");
        return "forward:/static/DMProcess/index.html";
    }

    @GetMapping("/members")
    public String callMemberBoard(){
        log.info("Call MemberBoard");
        return "forward:/static/memberBoard/index.html";
    }

    @GetMapping("/projects")
    public String callProjectList(){
        log.info("Call Projects List ");
        return "forward:/static/PageProjectBoard/index.html";
    }

}
