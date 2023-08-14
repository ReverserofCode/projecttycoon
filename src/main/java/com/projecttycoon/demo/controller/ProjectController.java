package com.projecttycoon.demo.controller;
import com.projecttycoon.demo.domain.Entity.MemberEntity;
import com.projecttycoon.demo.domain.Entity.Project;
import com.projecttycoon.demo.domain.dto.ProjectRequestDTO;
import com.projecttycoon.demo.domain.repository.ProjectRepository;
import com.projecttycoon.demo.domain.service.ProjectService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;


@Controller
@RequiredArgsConstructor
public class ProjectController {
    private final ProjectService projectService;
    private final ProjectRepository projectRepository;

    @GetMapping("/all/postProject")
    public String postProject(){
        return "postProject";
    }


    @PostMapping("/all/project")
    public String saveProject(Project project, Model model, MultipartFile file) throws Exception { // 데이터가 board에 담겨서 들어옴
        projectService.createProject(project, file);
        return "redirect:/api/projectList/0";
    }

    @GetMapping("/api/projectList/{page}")
    public String listProject(Model model, @PathVariable int page){
        Page<Project> projectList = projectService.allProject(page);
        model.addAttribute("projects",projectList);
        page+=1;
        int totalPage = projectList.getTotalPages();
        int startPage = Math.max(page-4,1);
        int endPage = Math.min(page+4,totalPage);
//        model.addAttribute("totalPage",totalPage);
        model.addAttribute("nowPage",page);
        model.addAttribute("startPage",startPage);
        model.addAttribute("endPage",endPage);
        model.addAttribute("pageType","all");
        return "index";
    }
    @GetMapping("/api/projectList/{projectIsEnd}/{page}")
    public String projectIsEndList(Model model,@PathVariable String projectIsEnd, @PathVariable int page){
        Page<Project> projectList = projectService.isEndProject(projectIsEnd,page);
        model.addAttribute("projects",projectList);
        page+=1;
        int totalPage = projectList.getTotalPages();
        int startPage = Math.max(page-4,1);
        int endPage = Math.min(page+4,totalPage);
//        model.addAttribute("totalPage",totalPage);
        model.addAttribute("nowPage",page);
        model.addAttribute("startPage",startPage);
        model.addAttribute("endPage",endPage);
        model.addAttribute("projectIsEnd",projectIsEnd);
        model.addAttribute("pageType","all");
        return "projectIsEndList";
    }

    @GetMapping("/api/projectOne/{id}")
    public String projectOne(@AuthenticationPrincipal MemberEntity memberEntity, Model model, @PathVariable Long id){
        Project project = projectService.oneProject(id);
        model.addAttribute("member", memberEntity);
        model.addAttribute("project", project);
        return "projectOne";
    }

    @DeleteMapping("/all/project/{id}")
    public Long deleteProject(@PathVariable Long id){
        projectRepository.deleteById(id);
        return id;
    }

    @GetMapping("/api/searchList/{page}")
    public String searchList(Model model,@RequestParam("projectName") String projectName, @PathVariable int page){
        Page<Project> projectList = projectService.searchProject(projectName,page);
        model.addAttribute("projects",projectList);
        page+=1;
        int totalPage = projectList.getTotalPages();
        int startPage = Math.max(page-4,1);
        int endPage = Math.min(page+4,totalPage);
        //아무 결과가 없으면 0페이지만 나오도록 설정
        if(totalPage==0) endPage=0;
        model.addAttribute("nowPage",page);
        model.addAttribute("startPage",startPage);
        model.addAttribute("endPage",endPage);
        model.addAttribute("pageType","search");
        model.addAttribute("projectName",projectName);
        return "index";
    }
}
