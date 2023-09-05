package com.projecttycoon.demo.controller;

import com.projecttycoon.demo.domain.Entity.ProjectEntity;
import com.projecttycoon.demo.domain.repository.ProjectRepository;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.servlet.ModelAndView;

import javax.swing.text.html.Option;
import javax.websocket.server.PathParam;
import java.util.Optional;


//웹 사이트 내에서 다른 사이트에 대한 요청을 처리하는 컨르롤러
@Log4j2
@Controller
public class WebController {

   ProjectRepository projectRepository;
   @Autowired
   public WebController(ProjectRepository projectRepository){
       this.projectRepository = projectRepository;
   }


    @RequestMapping("/api/login")
    public String initiatingLogin() {
        return "/static/PageLogin/index.html";
    }

    @GetMapping("/")
    public String callMain() {
        return "/static/PageProjectBoard/index.html";
    }

    @GetMapping("/PageLogin")
    public String callPageLogin() {
        return "/static/PageLogin/index.html";
    }

    @GetMapping("/PageProjectBoard")
    public String callPageProjectBoard() {
        return "/static/PageProjectBoard/index.html";
    }

    @GetMapping("/loginProcess")
    public String callLoginProcess() {
        return "/static/loginProcess/index.html";
    }

    @GetMapping("/callPageNewProject")
    public String callPageNewProject() {
        return "/static/PageNewProject/index.html";
    }

    @GetMapping("/callPageProjectBoardDetail")
    public String callPageBoardDetail(){
       return "/static/PageProjectBoardDetail/index.html";
    }

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


}
