import styled from "@emotion/styled";
import React, { useEffect } from "react";
import "./Navbar.css";
import { LoginCheck } from "../functional/LoginCheck";
import { Logout } from "../functional/Logout";
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
/** 네비게이션 바의 로고 태그 */
const NavHeader = styled.img`
  width: 55px;
  height: 55px;
  :hover {
    scale: 1.11;
  }
`;
/** 네비게이션 바의 페이지를 담고잇는 콘테이너 리스트 태그 */
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
/** 네비게이션 바의 페이지를 담당하는 리스트 아이템 태그 */
const Items = styled.li`
  font-size: 20px;
  user-select: none;
  cursor: pointer;
  padding: 5px 0;
  :hover {
    font-weight: 600;
  }
`;
/** 네비게이션 바의 페이지 이동 태그 */
const Link = styled.a`
  text-decoration: none;
`;
/** 네비게이션 바의 width를 제한하는 태그 */
const Wrap = styled.div`
  width: 1400px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

function Navbar({ userData, handleSetUserData }) {
  useEffect(() => {
    LoginCheck().then((res) => {
      handleSetUserData(res);
    });
  }, [handleSetUserData]);
  return (
    <Container>
      <Wrap>
        <NavHeader src="http://projecttycoon.com/static/images/Logo Test.png" />
        <Lists gap={"30px"}>
          <Link className="menu" href="http://projecttycoon.com">
            <Items>홈</Items>
          </Link>
          <Link className="menu" href="http://projecttycoon.com/projects">
            <Items>프로젝트 팀</Items>
          </Link>
          <Link className="menu" href="http://projecttycoon.com/members">
            <Items>멤버리스트</Items>
          </Link>
          <Link className="menu" href="http://projecttycoon.com/myPage">
            <Items>내 페이지</Items>
          </Link>
          <Link
            className="menu"
            href="http://www.projecttycoon.com/callPageNewProject"
          >
            <Items>새로운 글쓰기</Items>
          </Link>
        </Lists>
        {userData === "" ? (
          <Lists gap={"47px"} color="#35A29F">
            <Link className="user" href="http://projecttycoon.com/api/login">
              <Items>로그인</Items>
            </Link>
            <Link className="user" href="http://projecttycoon.com/api/signup">
              <Items>회원가입</Items>
            </Link>
          </Lists>
        ) : (
          <Lists
            gap={"20px"}
            color="#35A29F"
            onClick={() => {
              Logout();
              handleSetUserData("");
            }}
          >
            <UserIcon src={userData?.memberFilePath} />
            <Items>로그아웃</Items>
          </Lists>
        )}
      </Wrap>
    </Container>
  );
}

export default Navbar;
