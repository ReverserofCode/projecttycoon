package com.projecttycoon.demo.domain.Entity;
import org.springframework.data.jpa.domain.Specification;

import javax.persistence.criteria.Predicate;


public class ProjectSpecifications {
    public static Specification<ProjectEntity> hasStatus(boolean status) {
        return (root, query, criteriaBuilder) -> {
            return criteriaBuilder.equal(root.get("projectStatus"), status);
        };
    }


}


//projectWantedRole로 필터걸때
//    public static Specification<ProjectEntity> hasWantedRole(String[] wantedRoles) {
//        return (root, query, criteriaBuilder) -> {
//            return root.get("projectWantedRole").in(wantedRoles);
//        };
//    }


//프로젝트상태로만 찾을때
//    public static Specification<ProjectEntity> hasStatus(boolean status) {
//        return new Specification<ProjectEntity>() {
//            @Override
//            public Predicate toPredicate(Root<ProjectEntity> root, CriteriaQuery<?> query, CriteriaBuilder criteriaBuilder) {
//                return criteriaBuilder.equal(root.get("projectStatus"), status);
//            }
//        };
//    }
//}
