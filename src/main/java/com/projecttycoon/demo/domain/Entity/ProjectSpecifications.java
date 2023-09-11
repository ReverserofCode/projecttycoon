package com.projecttycoon.demo.domain.Entity;
import org.springframework.data.jpa.domain.Specification;
import javax.persistence.criteria.Expression;
import javax.persistence.criteria.Predicate;
import java.util.ArrayList;
import java.util.List;


public class ProjectSpecifications {


    //projectStatus 로 필터 걸 때,
    public static Specification<ProjectEntity> hasStatus(boolean status) {
        return (root, query, criteriaBuilder) -> {
            return criteriaBuilder.equal(root.get("projectStatus"), status);
        };
    }

    //projectWantedRole 로 필터
    public static Specification<ProjectEntity> hasRoles(String... roles) {
        return (root, query, criteriaBuilder) -> {
            Expression<String> projectWantedRoleExpression = root.get("projectWantedRole");

            List<Predicate> rolePredicates = new ArrayList<>();
            for (String role : roles) {
                Predicate rolePredicate = criteriaBuilder.like(projectWantedRoleExpression, "%" + role + "%");
                rolePredicates.add(rolePredicate);
            }

            // 모든 역할을 포함하는 데이터를 필터링
            // /api/projectsByRoles?roles=
            return criteriaBuilder.and(rolePredicates.toArray(new Predicate[0]));
        };
    }


    //projectStatus+projectWantedRole로 필터
    public static Specification<ProjectEntity> hasStatusAndAllRoles(boolean status, String... roles) {
        return (root, query, criteriaBuilder) -> {
            Predicate statusPredicate = criteriaBuilder.equal(root.get("projectStatus"), status);

            Expression<String> projectWantedRoleExpression = root.get("projectWantedRole");

            List<Predicate> rolePredicates = new ArrayList<>();
            for (String role : roles) {
                Predicate rolePredicate = criteriaBuilder.like(projectWantedRoleExpression, "%" + role + "%");
                rolePredicates.add(rolePredicate);
            }

            // 모든 역할 조건을 AND 연산으로 결합
            Predicate allRolesPredicate = criteriaBuilder.and(rolePredicates.toArray(new Predicate[0]));

            // 상태와 모든 역할 조건을 AND 연산으로 결합
            return criteriaBuilder.and(statusPredicate, allRolesPredicate);
        };
    }



}
