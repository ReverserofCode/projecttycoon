package com.projecttycoon.demo.domain.project;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@EnableJpaAuditing
@EnableJpaRepositories
public interface ProjectRepository extends JpaRepository<ProjectEntity, Long> {


}
