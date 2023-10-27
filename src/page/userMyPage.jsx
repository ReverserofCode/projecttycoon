import axios from "axios";
import UserInfo from "../components/userInfo";
import UserWrite from "../components/userWrite";
import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import { PostAxios } from "../functional/PostAxios";

const NavWrap = styled.div`
  cursor: pointer;
  display: flex;
  margin-bottom: 40px;
  margin-left: 10px;
`;
const Nav = styled.a`
  font-size: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 30px;
  width: 160px;
  height: 40px;
  border-bottom: 2px gray solid;
  @media screen and (max-width: 670px) {
    width: 100px;
  }
`;
const Wrap = styled.div`
  max-width: 1100px;
  width: 100%;
  margin: 0 auto;
  margin-top: 80px;
  @media screen and (max-width: 370px) {
    width: 360px;
  }
`;
const Point = styled.div`
  border-bottom: 2px red solid;
`;
function UserMypage() {
  const info = {
    //   "memberId": "kkk123",
    // "memberPw": "$2a$10$FEXNWIOSk8Gzslcn4qczde4m.A4ykKt4ixZbXj6C3OOMiAYxLK4ke",
    // "memberRole": "front",
    // "memberIntroduce": "gd",
    // "memberLink": "[{\"option\":\"Blog\",\"value\":\"dddd\"}]",
    // "memberAcademy": "노원",
    // "memberNickname": "nay",
    // "memberFilePath": "/static/icons/",
    // "memberFileName": "7_dog.png",
    // "memberStack": "[\"HTML\",\"C++\",\"C\"]",
    // "myProjectlist": [],
    // "myCommentlist": [],
    // "myScraplist": []
  };

  const [memberInfo, setMemberInfo] = useState(info);
  //유저-프로젝트개설-이미지
  // const [projectMainImg,setProjectMainImg]=useState("http://projecttycoon.com"+memberInfo?.mylist?.projectFilePath)
  //유저-프로젝트개설-제목
  // const [projectMainTitle,setProjectMainTitle]=useState(memberInfo?.mylist?.projectTitle)

  //네브 스위치
  const [on, setoff] = useState(true);
  const HandleModal1 = (e) => {
    setoff(true);
  };
  const handleGet = async () => {
    await axios
      .get("/api/mypage")
      .then((response) => {
        setMemberInfo(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const HandleModal2 = (e) => {
    setoff(false);
  };
  useEffect(() => {
    handleGet();
  }, []);
  return (
    <Wrap>
      <NavWrap>
        <Nav onClick={HandleModal1}>내프로필</Nav>
        <Nav onClick={HandleModal2}>활동관리</Nav>
      </NavWrap>
      {on ? (
        <UserInfo on={on}></UserInfo>
      ) : (
        <UserWrite on={on} memberInfo={memberInfo}></UserWrite>
      )}
    </Wrap>
  );
}
export default UserMypage;
