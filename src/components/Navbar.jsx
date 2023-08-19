import styled from "@emotion/styled";
import React from "react";
import { useParams } from "react-router-dom";
import "./Navbar.css";
const Container = styled.div`
  display: flex;
  box-sizing: border-box;
  justify-content: space-between;
  align-items: center;
  padding: 0 30px;
  width: 100%;
  border-bottom: 1px solid #071952;
  @media screen and (max-width: 700px) {
    height: 64px;
  }
`;
const NavHeader = styled.img`
  width: 55px;
  height: 55px;
  :hover {
    scale: 1.11;
  }
`;
const Lists = styled.ul`
  display: flex;
  justify-content: center;
  align-items: center;
  list-style: none;
  gap: ${(props) => props.gap};
  color: ${(props) => {
    return props.color ? props.color : "#071952";
  }};
`;
const Items = styled.li`
  font-size: 20px;
  user-select: none;
  cursor: pointer;
  padding: 5px 0;
  :hover {
    font-weight: 600;
  }
`;
const Link = styled.a`
  text-decoration: none;
`;
const Wrap = styled.div`
  width: 1400px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

function Navbar() {
  const { params } = useParams();
  return (
    <Container>
      <Wrap>
        <NavHeader src="./Logo Test.png" />
        <Lists gap={"30px"}>
          <Link className="menu" href="http://projecttycoon.com">
            <Items>홈</Items>
          </Link>
          <Link className="menu" href="http://projecttycoon.com">
            <Items>프로젝트 팀</Items>
          </Link>
          <Link className="menu" href="http://projecttycoon.com">
            <Items>멤버리스트</Items>
          </Link>
          <Link className="menu" href="http://projecttycoon.com">
            <Items>내 페이지</Items>
          </Link>
          <Link className="menu" href="http://projecttycoon.com">
            <Items>새로운 글쓰기</Items>
          </Link>
        </Lists>
        <Lists gap={"47px"} color="#35A29F">
          <Link className="user" href="http://projecttycoon.com/api/login">
            <Items>로그인</Items>
          </Link>
          <Link className="user" href="http://projecttycoon.com/api/signup">
            <Items>회원가입</Items>
          </Link>
        </Lists>
      </Wrap>
    </Container>
  );
}

export default Navbar;
