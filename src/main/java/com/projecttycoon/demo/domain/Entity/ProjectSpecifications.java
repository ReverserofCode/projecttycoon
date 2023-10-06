package com.projecttycoon.demo.domain.Entity;
import org.springframework.data.jpa.domain.Specification;
import javax.persistence.criteria.Expression;
import javax.persistence.criteria.Predicate;
import java.util.ArrayList;
import java.util.List;


public class ProjectSpecifications {

    //1. projectStatus 로 필터 걸 때,
    public static Specification<ProjectEntity> hasStatus(boolean status) {
        return (root, query, criteriaBuilder) -> {
            return criteriaBuilder.equal(root.get("projectStatus"), status);
        };
    }

    //2. projectAcademy 로 필터 걸 때,
    public static Specification<ProjectEntity> hasAcademy(String academy) {
        return (root, query, criteriaBuilder) -> {
            return criteriaBuilder.equal(root.get("projectAcademy"), academy);
        };
    }

    //3. projectWantedRole 로 필터 걸 때,
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


    //4. projectStatus+projectWantedRole로 필터
    public static Specification<ProjectEntity> hasStatusAndRoles(boolean status, String... roles) {
        return (root, query, criteriaBuilder) -> {
            Predicate statusPredicate = criteriaBuilder.equal(root.get("projectStatus"), status);

            Expression<String> projectWantedRoleExpression = root.get("projectWantedRole");

            List<Predicate> rolePredicates = new ArrayList<>();
            for (String role : roles) {
                Predicate rolePredicate = criteriaBuilder.like(projectWantedRoleExpression, "%" + role + "%");
                rolePredicates.add(rolePredicate);
            }
            // roles를 AND 연산으로 결합
            Predicate allRolesPredicate = criteriaBuilder.and(rolePredicates.toArray(new Predicate[0]));


            // status + roles 조건을 AND 연산으로 결합
            return criteriaBuilder.and(statusPredicate, allRolesPredicate);
        };
    }

    //5. projectStatus+projectAcademy로 필터
    public static Specification<ProjectEntity> hasStatusAndAcademy(boolean status, String academy) {
        return (root, query, criteriaBuilder) -> {
            Predicate statusPredicate = criteriaBuilder.equal(root.get("projectStatus"), status);
            Predicate academyPredicate = criteriaBuilder.equal(root.get("projectAcademy"), academy);

            // status + academy 조건을 AND 연산으로 결합
            return criteriaBuilder.and(statusPredicate, academyPredicate);
        };
    }

    //6. projectAcademy+projectWantedRole로 필터
    public static Specification<ProjectEntity> hasAcademyAndRoles(String academy, String... roles) {
        return (root, query, criteriaBuilder) -> {
            Predicate academyPredicate = criteriaBuilder.equal(root.get("projectAcademy"), academy);

            Expression<String> projectWantedRoleExpression = root.get("projectWantedRole");
            List<Predicate> rolePredicates = new ArrayList<>();
            for (String role : roles) {
                Predicate rolePredicate = criteriaBuilder.like(projectWantedRoleExpression, "%" + role + "%");
                rolePredicates.add(rolePredicate);
            }
            // roles를 AND 연산으로 결합
            Predicate allRolesPredicate = criteriaBuilder.and(rolePredicates.toArray(new Predicate[0]));

            // academy + roles 조건을 AND 연산으로 결합
            return criteriaBuilder.and(academyPredicate, allRolesPredicate);
        };
    }

    //7. projectStatus + projectAcademy + projectWantedRole로 필터
    public static Specification<ProjectEntity> hasStatusAndAcademyAndRoles(boolean status, String academy, String... roles) {
        return (root, query, criteriaBuilder) -> {
            Predicate statusPredicate = criteriaBuilder.equal(root.get("projectStatus"), status);
            Predicate academyPredicate = criteriaBuilder.equal(root.get("projectAcademy"), academy);

            Expression<String> projectWantedRoleExpression = root.get("projectWantedRole");

            List<Predicate> rolePredicates = new ArrayList<>();
            for (String role : roles) {
                Predicate rolePredicate = criteriaBuilder.like(projectWantedRoleExpression, "%" + role + "%");
                rolePredicates.add(rolePredicate);
            }

            // roles를 AND 연산으로 결합
            Predicate allRolesPredicate = criteriaBuilder.and(rolePredicates.toArray(new Predicate[0]));

            // status + academy + roles 조건을 AND 연산으로 결합
            return criteriaBuilder.and(statusPredicate, academyPredicate ,allRolesPredicate);
        };
    }


}
