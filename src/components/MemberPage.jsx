import styled from "@emotion/styled";
import axios from "axios";
import ReactDOM from "react-dom/client";
import React, { useEffect, useState, useCallback } from "react";
import { BsCircleFill } from "react-icons/bs";
import { BiStopwatch } from "react-icons/bi";
import { TbSchool } from "react-icons/tb";
import { AiFillMail } from "react-icons/ai";
import { BoardListGet } from "../functional/BoardList";

/** 보드아이템을 담고있는 컨테이너 태그 */
const Container = styled.div`
  height: 100%;
`;
const BoardBase = styled.div`
  transition: 300ms ease-in-out;
  display: flex;
  box-sizing: border-box;
  justify-content: center;
  align-items: flex-start;
  flex-direction: column;
  padding: 10px 10px;
  width: 270px;
  height: 335px;
  border-radius: 15px;
  border: 1px solid #60636b28;
  box-shadow: 0px 6px 6px 0px rgba(0, 0, 0, 0.25);
  :hover {
    transform: scale(1.04);
    transition: 0.2s;
    color: #1e1c1c;
    font-weight: 800;
  }
`;
/** 보드아이템의 태그들을 담고있는 콘테이너 태그 */
const TagContainer = styled.div`
  position: relative;
  box-sizing: border-box;
  justify-content: center;
  align-items: flex-start;
  gap: 10px;
  width: 100%;
  height: 22px;
  margin-bottom: 7px;
`;

/** 보드아이템의 태그 */
const TagItem = styled.div`
  display: flex;
  float: left;
  box-sizing: border-box;
  justify-content: center;
  align-items: center;
  width: 100%;
  /* width: 160px; */
  padding: 6px 16px;
  /* margin-left: 20px;
  margin-right: 10px; */
  font-size: 0.9em;
  white-space: nowrap;
  background-color: #fbeeac;
  border: 2px solid #f4d160;
  border-radius: 10px;
  font-weight: bold;
  :hover {
    cursor: pointer;
  }
`;

/** 보드아이템의 메인이미지를 담고있는 콘테이너 태그 */
const PosterContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 120px;
  height: 120px;
  overflow: hidden;
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
  border-top-right-radius: 20px;
  border-top-left-radius: 20px;
  margin: 0 auto;
  margin-bottom: 20px;
  margin-left: 5px;
  box-shadow: 2px 4px 4px 0px rgba(0, 0, 0, 0.25);
`;
/** 멤버프로필 */
const MyProfile = styled.img`
  /* height: 100px; */
  margin: 0 auto;
  width: 100%;
  box-sizing: border-box;
`;
const ProfileArea = styled.div`
  position: relative;
  width: 100px;
`;
// 멤버닉네임
const MemberNick = styled.p`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  box-sizing: border-box;
  position: absolute;
  left: 140px;
  bottom: 90px;
  width: 100%;
  font-size: 18px;
  font-weight: 800;
  color: #1d5d9b;
`;
/** 멤버직무 */
// 모집분야
const FilterIcon = styled.span`
  padding: 2px 5px;
`;
const TextRole = styled.span`
  font-size: 10px;
  color: #464242;
  position: absolute;
  left: 130px;
  bottom: 100px;
  font-weight: 600;
  margin-left: 10px;
`;
/** 멤버지점 */
const TextPlace = styled.span`
  font-size: 10px;
  color: #464242;
  position: absolute;
  left: 130px;
  bottom: 100px;
  font-weight: 600;
  margin-left: 10px;
`;

// 멤버 한줄 소개
const IntroduceArea = styled.div`
  position: relative;
  box-sizing: border-box;
  padding-top: 20px;
  padding-bottom: 20px;
  margin-bottom: 20px;
  width: 100%;
  max-height: 40px; /* Adjust this value to your desired maximum height */
`;
const MemberIntroduce = styled.span`
  /* white-space: nowrap; */
  max-height: 40px;
  overflow: hidden;
  text-overflow: ellipsis;
  box-sizing: border-box;
  position: absolute;
  left: 0;
  bottom: 50px;
  padding-left: 10px;
  padding-right: 10px;
  font-size: 0.9em;
`;
//멤버스택
const StackContainer = styled.div`
  position: absolute;
  bottom: 0px;
  left: 5px;
  box-sizing: border-box;
  justify-content: center;
  align-items: flex-start;
  gap: 10px;
  width: 100%;
`;

function MemberPage({
  memberRole,
  icon,
  nick,
  academy,
  introduce,
  stack,
  postId,
  handleBoardItemGen,
}) {
  // 스택 이미지 정보를 상태로 관리
  const [stackImages, setStackImages] = useState([]);
  // 직무 value
  const generateRoleIcons = useCallback(() => {
    if (memberRole === "front") return "프론트엔드";
    if (memberRole === "back") return "백엔드";
    if (memberRole === "AI") return "AI";
    if (memberRole === "server") return "서버관리자";
    if (memberRole === "network") return "네트워크관리자";
    if (memberRole === "security") return "정보보안";
    if (memberRole === "bigData") return "빅데이터";
  }, [memberRole]);

  const generateStackIcons = useCallback(() => {
    let contents = [];
    for (let i = 0; i < stack?.length; i++) {
      if (stack[i] === "Java") {
        contents.push(
          <FilterIcon key={`Filter Icon ${i}`}>
            <img
              src={"http://projecttycoon.com/static/images/" + "Java.png"}
              style={{ width: "30px" }}
            />
          </FilterIcon>
        );
      } else if (stack[i] === "R") {
        contents.push(
          <FilterIcon key={`Filter Icon ${i}`}>
            <img
              src={"http://projecttycoon.com/static/images/" + "Ruby.png"}
              style={{ width: "25px" }}
            />
          </FilterIcon>
        );
      } else if (stack[i] === "CSS") {
        contents.push(
          <FilterIcon key={`Filter Icon ${i}`}>
            <img
              src={"http://projecttycoon.com/static/images/" + "CSS.png"}
              style={{ width: "23px" }}
            />
          </FilterIcon>
        );
      } else if (stack[i] === "JavaScript") {
        contents.push(
          <FilterIcon key={`Filter Icon ${i}`}>
            <img
              src={"http://projecttycoon.com/static/images/" + "JS.png"}
              style={{ width: "20px" }}
            />
          </FilterIcon>
        );
      } else if (stack[i] === "Vue") {
        contents.push(
          <FilterIcon key={`Filter Icon ${i}`}>
            <img
              src={"http://projecttycoon.com/static/images/" + "Vue.png"}
              style={{ width: "22px" }}
            />
          </FilterIcon>
        );
      } else if (stack[i] === "C") {
        contents.push(
          <FilterIcon key={`Filter Icon ${i}`}>
            <img
              src={"http://projecttycoon.com/static/images/" + "C.png"}
              style={{ width: "22px" }}
            />
          </FilterIcon>
        );
      } else if (stack[i] === "C#") {
        contents.push(
          <FilterIcon key={`Filter Icon ${i}`}>
            <img
              src={"http://projecttycoon.com/static/images/" + "CHash.png"}
              style={{ width: "25px" }}
            />
          </FilterIcon>
        );
      } else if (stack[i] === "C++") {
        contents.push(
          <FilterIcon key={`Filter Icon ${i}`}>
            <img
              src={"http://projecttycoon.com/static/images/" + "Cpp.png"}
              style={{ width: "22px" }}
            />
          </FilterIcon>
        );
      } else if (stack[i] === "Go") {
        contents.push(
          <FilterIcon key={`Filter Icon ${i}`}>
            <img
              src={"http://projecttycoon.com/static/images/" + "GO.png"}
              style={{ width: "32px" }}
            />
          </FilterIcon>
        );
      } else if (stack[i] === "HTML") {
        contents.push(
          <FilterIcon key={`Filter Icon ${i}`}>
            <img
              src={"http://projecttycoon.com/static/images/" + "HTML.png"}
              style={{ width: "20px" }}
            />
          </FilterIcon>
        );
      } else if (stack[i] === "JQuery") {
        contents.push(
          <FilterIcon key={`Filter Icon ${i}`}>
            <img
              src={"http://projecttycoon.com/static/images/" + "JQuery.png"}
              style={{ width: "22px" }}
            />
          </FilterIcon>
        );
      } else if (stack[i] === "Kotlin") {
        contents.push(
          <FilterIcon key={`Filter Icon ${i}`}>
            <img
              src={"http://projecttycoon.com/static/images/" + "Kotlin.png"}
              style={{ width: "30px" }}
            />
          </FilterIcon>
        );
      } else if (stack[i] === "NodeJs") {
        contents.push(
          <FilterIcon key={`Filter Icon ${i}`}>
            <img
              src={"http://projecttycoon.com/static/images/" + "Node.png"}
              style={{ width: "25px" }}
            />
          </FilterIcon>
        );
      } else if (stack[i] === "PHP") {
        contents.push(
          <FilterIcon key={`Filter Icon ${i}`}>
            <img
              src={"http://projecttycoon.com/static/images/" + "PHP.png"}
              style={{ width: "30px" }}
            />
          </FilterIcon>
        );
      } else if (stack[i] === "Python") {
        contents.push(
          <FilterIcon key={`Filter Icon ${i}`}>
            <img
              src={"http://projecttycoon.com/static/images/" + "Python.png"}
              style={{ width: "25px" }}
            />
          </FilterIcon>
        );
      } else if (stack[i] === "React") {
        contents.push(
          <FilterIcon key={`Filter Icon ${i}`}>
            <img
              src={"http://projecttycoon.com/static/images/" + "React.png"}
              style={{ width: "23px" }}
            />
          </FilterIcon>
        );
      } else if (stack[i] === "SQL") {
        contents.push(
          <FilterIcon key={`Filter Icon ${i}`}>
            <img
              src={"http://projecttycoon.com/static/images/" + "SQL.png"}
              style={{ width: "40px" }}
            />
          </FilterIcon>
        );
      } else if (stack[i] === "TypeScript") {
        contents.push(
          <FilterIcon key={`Filter Icon ${i}`}>
            <img
              src={"http://projecttycoon.com/static/images/" + "Ts.png"}
              style={{ width: "30px" }}
            />
          </FilterIcon>
        );
      } else {
        contents.push("");
      }
    }
    return contents;
  }, [stack]);

  return (
    <Container>
      <BoardBase
        onClick={() => {
          window.location.href = `http://projecttycoon.com/api/memberPage/${postId}`;
        }}
      >
        <ProfileArea>
          <PosterContainer>
            <MyProfile
              src={`http://projecttycoon.com/static/icons/${icon}`}
            ></MyProfile>
          </PosterContainer>
          <MemberNick>{nick}</MemberNick>
        </ProfileArea>
        <TagContainer>
          <TextRole>[ 직무 ]{`\n` + generateRoleIcons()}</TextRole>
        </TagContainer>
        <TagContainer>
          <TextPlace>[ 지점 ] {`\n` + academy}</TextPlace>
        </TagContainer>
        <IntroduceArea>
          <MemberIntroduce>{`"\n` + introduce + `\n"`}</MemberIntroduce>
        </IntroduceArea>

        <TagContainer>
          {stack?.length > 0 && (
            <StackContainer>{generateStackIcons()}</StackContainer>
          )}
        </TagContainer>
        <TagContainer>
          <div
            style={{
              display: "flex",
              alignItems: "flex-start",
              marginBottom: "20px",
            }}
          >
            <TagItem>
              <AiFillMail
                color={"#0B666A"}
                fontSize={"20px"}
                style={{ marginRight: "10px" }}
              ></AiFillMail>
              DM
            </TagItem>
          </div>
        </TagContainer>
        <TagContainer></TagContainer>
      </BoardBase>
    </Container>
  );
}

export default MemberPage;
