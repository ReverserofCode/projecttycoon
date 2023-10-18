import styled from "@emotion/styled";
import React, { useEffect, useRef, useState } from "react";
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
  background-color: white;
  border-bottom: 1px solid #071952;
  position: fixed;
  top: 0;
  @media screen and (max-width: 700px) {
    height: 64px;
  }
  @media screen and (max-width: 715px) {
    height: 45px;
    padding: 5px 10px;
  }
  @media screen and (max-width: 360px) {
    height: 40px;
  }
  z-index: 2;
`;
/** 네비게이션 바의 로고 태그 */
const NavHeader = styled.img`
  width: 55px;
  height: 55px;
  :hover {
    scale: 1.11;
  }
  @media screen and (max-width: 800px) {
    width: 40px;
    height: 40px;
  }
  @media screen and (max-width: 360px) {
    width: 30px;
    height: 30px;
  }
  z-index: 3;
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
  @media screen and (max-width: 800px) {
    gap: 20px;
  }
  @media screen and (max-width: 715px) {
    display: none;
  }
  z-index: 4;
`;
/** 네비게이션 바의 페이지 이동 태그 */
const Link = styled.a`
  text-decoration: none;
  z-index: 5;
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
  @media screen and (max-width: 950px) {
    font-size: 15px;
  }

  z-index: 6;
`;
/** 네비게이션 바의 width를 제한하는 태그 */
const Wrap = styled.div`
  width: 1400px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 2;
`;
const UserIcon = styled.image`
  height: 50px;
  z-index: 7;
`;
const MenuMinimize = styled.div`
  display: none;
  justify-content: center;
  align-items: center;
  position: relative;
  @media screen and (max-width: 715px) {
    display: flex;
  }
`;
const MenuButton = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  font-size: 40px;
  position: relative;
  span {
    transition: 300ms;
    position: absolute;
    width: 100%;
    border: 1px solid black;
    z-index: 100;
  }
  span.top {
    top: 0px;
  }
  span.middle {
  }
  span.bottom {
    bottom: 0;
  }
  &.open span.middle.first {
    transform: rotate(45deg);
  }
  &.open span.middle.sec {
    transform: rotate(-45deg);
  }
  &.open span.top {
    opacity: 0;
  }
  &.open span.bottom {
    opacity: 0;
  }
  z-index: 100;
  @media screen and (max-width: 715px) {
    width: 30px;
    height: 24px;
  }
  @media screen and (max-width: 360px) {
    width: 20px;
    height: 16px;
  }
`;
const MenuList = styled.div`
  transform: 1000ms;
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  box-sizing: border-box;
  padding: 50px;
  width: 200px;
  height: 100vh;
  background-color: #c0c0c0;
  top: -13px;
  right: -10;
  p {
    white-space: nowrap;
  }
  animation: ${(props) => {
      return props.opened ? "OpenMenu" : "CloseMenu";
    }}
    300ms ease-in-out both;
  @keyframes OpenMenu {
    from {
      transform: translate(-70px);
    }
    to {
      transform: translate(150px);
    }
  }
  @keyframes CloseMenu {
    from {
      transform: translate(150px);
    }
    to {
      transform: translate(-70px);
    }
  }
  z-index: 2;
`;
function Navbar({ userData, handleSetUserData }) {
  const [minimizeMenu, setMinimizeMenu] = useState(true);
  const MenuItem = useRef(null);
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
            href="http://projecttycoon.com/callPageNewProject"
          >
            <Items>새로운 글쓰기</Items>
          </Link>
        </Lists>
        <MenuMinimize>
          <MenuButton
            ref={MenuItem}
            onClick={() => {
              MenuItem.current.classList.toggle("open");
              setMinimizeMenu(!minimizeMenu);
            }}
          >
            <span className="top"></span>
            <span className="middle first"></span>
            <span className="middle sec"></span>
            <span className="bottom"></span>
          </MenuButton>
          <MenuList opened={minimizeMenu}>
            <Link className="menu" href="http://projecttycoon.com">
              <p>홈</p>
            </Link>
            <Link className="menu" href="http://projecttycoon.com/projects">
              <p>프로젝트 팀</p>
            </Link>
            <Link className="menu" href="http://projecttycoon.com/members">
              <p>멤버리스트</p>
            </Link>
            <Link className="menu" href="http://projecttycoon.com/myPage">
              <p>내 페이지</p>
            </Link>
            <Link
              className="menu"
              href="http://www.projecttycoon.com/callPageNewProject"
            >
              <p>새로운 글쓰기</p>
            </Link>
          </MenuList>
        </MenuMinimize>
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
