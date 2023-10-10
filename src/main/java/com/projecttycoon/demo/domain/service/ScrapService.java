package com.projecttycoon.demo.domain.service;

import com.projecttycoon.demo.domain.Entity.MemberEntity;
import com.projecttycoon.demo.domain.Entity.ProjectEntity;
import com.projecttycoon.demo.domain.repository.MemberRepository;
import com.projecttycoon.demo.domain.repository.ProjectRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.persistence.PersistenceContext;
import javax.transaction.Transactional;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional
@PersistenceContext
public class ScrapService {

    private final MemberRepository memberRepository;
    private final ProjectRepository projectRepository;

    // 1. 스크랩
    public void scrapProject(String memberId, Long projectId) {
        Optional<MemberEntity> memberOptional = memberRepository.findByMemberId(memberId);
        Optional<ProjectEntity> projectOptional = projectRepository.findById(projectId);

        if (memberOptional.isPresent() && projectOptional.isPresent()) {
            MemberEntity member = memberOptional.get();
            ProjectEntity project = projectOptional.get();

            // 스크랩 되어 있는지 확인하기
            if (!member.getScrappedProjects().contains(project)) {
                // 되어있지 않다면 스크랩하기
                member.addScrappedProject(project);
                // 스크랩 숫자를 증가
                project.increaseScrapCount();
                //저장
                memberRepository.save(member);
                projectRepository.save(project);
            } else {
                //이미 스크랩되어있는경우, 프로젝트가 이미 스크랩되어있습니다 alert
            }
        }
    }

    // 2. 스크랩삭제
    public void removeScrap(String memberId, Long projectId) {
        Optional<MemberEntity> memberOptional = memberRepository.findByMemberId(memberId);
        Optional<ProjectEntity> projectOptional = projectRepository.findById(projectId);

        if (memberOptional.isPresent() && projectOptional.isPresent()) {
            MemberEntity member = memberOptional.get();
            ProjectEntity project = projectOptional.get();

            // 스크랩 되어 있는지 확인하기
            if (member.getScrappedProjects().contains(project)) {
                // 되어있다면 스크랩 삭제
                member.removeScrappedProject(project);
                // 스크랩 숫자를 감소
                project.decreaseScrapCount();
                //저장
                memberRepository.save(member);
                projectRepository.save(project);
            } else {
                //스크랩되지 않은 항목임
            }
        }
    }

}

