package com.projecttycoon.demo.domain.Entity;

import org.springframework.data.jpa.domain.Specification;

import javax.persistence.criteria.Predicate;


public class MemberSpecifications {
    //memberAcademy 로 필터 걸 때,
    public static Specification<MemberEntity> hasMemberAcademy(String academy) {
        return (root, query, criteriaBuilder) -> {
            return criteriaBuilder.equal(root.get("memberAcademy"), academy);
        };
    }


    //memberRole 로 필터
    public static Specification<MemberEntity> hasMemberRole(String memberRole) {
        return (root, query, criteriaBuilder) -> {
            return criteriaBuilder.equal(root.get("memberRole"), memberRole);
        };
    }


    //memberAcademy+memberRole로 필터
    public static Specification<MemberEntity> hasMemberAcademyAndMemberRole(String academy, String memberRole) {
        return (root, query, criteriaBuilder) -> {
            Predicate memberAcademyPredicate = criteriaBuilder.equal(root.get("memberAcademy"), academy);
            Predicate memberRolePredicate = criteriaBuilder.equal(root.get("memberRole"), memberRole);

            // 상태와 모든 역할 조건을 AND 연산으로 결합
            return criteriaBuilder.and(memberAcademyPredicate, memberRolePredicate);
        };
    }
}
