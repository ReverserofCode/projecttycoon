package com.projecttycoon.demo.domain.repository;


import com.projecttycoon.demo.domain.Entity.Project;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@EnableJpaAuditing
@EnableJpaRepositories
public interface ProjectRepository extends JpaRepository<Project, Long> {

    Page<Project> findByProjectIsEnd(String projectIsEnd, PageRequest pageRequest);
    Page<Project> findByProjectTitleContainingIgnoreCaseOrProjectContentContainingIgnoreCase
            (String projectTitle, String projectContent, String projectRequired, PageRequest pageRequest);

}
