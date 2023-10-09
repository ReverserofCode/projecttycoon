package com.projecttycoon.demo.domain.repository;


import com.projecttycoon.demo.domain.Entity.ProjectEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

import java.util.List;

//@EnableJpaAuditing
@EnableJpaRepositories
public interface ProjectRepository extends JpaRepository<ProjectEntity, Long>, JpaSpecificationExecutor<ProjectEntity> {
    List<ProjectEntity> findAllByProjectWriterId(String projectWriterId);

}



