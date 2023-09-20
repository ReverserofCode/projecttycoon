import styled from "@emotion/styled";
import axios from "axios";
import "../components/MemberPage.css";
// import { BoardListGet } from "../functional/BoardList";
import React, { useEffect, useState, useCallback } from "react";
import {
  BsClipboard2Check,
  BsFillSuitHeartFill,
  BsCircleFill,
} from "react-icons/bs";
import { BiStopwatch } from "react-icons/bi";
import { GoHeartFill } from "react-icons/go";
import { TbSchool } from "react-icons/tb";
import { AiFillMail } from "react-icons/ai";
import RubyIcon from "../imge/Ruby.png";
import JavaIcon from "../imge/Java.png";
import CSSIcon from "../imge/CSS.png";
import JavaScriptIcon from "../imge/JS.png";
import PythonIcon from "../imge/Python.png";
import CIcon from "../imge/C.png";
import CIcon2 from "../imge/CHash.png";
import PHPIcon from "../imge/PHP.png";
import GoIcon from "../imge/GO.png";
import HTMLIcon from "../imge/HTML.png";
import KotlinIcon from "../imge/Kotlin.png";
import SQLIcon from "../imge/SQL.png";
import NodeIcon from "../imge/Node.png";
import TypeScriptIcon from "../imge/Ts.png";
import JQueryIcon from "../imge/JQuery.png";
import ReactIcon from "../imge/React.png";
import VueIcon from "../imge/Vue.png";
import DefaultIcon from "../imge/default.png";

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
  padding: 0 10px;
  width: 270px;
  height: 335px;
  border-radius: 15px;
  border: 1px solid #071952;
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
  width: 160px;
  padding: 6px 16px;
  margin-left: 20px;
  margin-right: 10px;
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
  height: 100px;
  margin: 0 auto;
  box-sizing: border-box;
`;
const ProfileArea = styled.div`
  position: relative;
  width: 100px;
`;
// 멤버닉네임
const MemberNick = styled.p`
  white-space: nowrap; /* Prevent text from wrapping to the next line */
  overflow: hidden; /* Hide any overflowing text */
  text-overflow: ellipsis; /* Display an ellipsis (...) for overflowed text */
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
const FilterIcon = styled.p`
  font-size: 15px;
`;
const TextRole = styled.span`
  font-size: 13px;
  color: #464242;
  position: absolute;
  left: 130px;
  bottom: 100px;
  font-weight: 600;
  margin-left: 10px;
`;
/** 멤버지점 */
const TextPlace = styled.span`
  font-size: 13px;
  color: #464242;
  position: absolute;
  left: 130px;
  bottom: 100px;
  font-weight: 600;
  margin-left: 10px;
`;

// 멤버 한줄 소개
const IntroduceArea = styled.div`
  margin: 0 auto;
  margin-top: 20px;
  position: relative;
  width: 100%;
`;
const MemberIntroduce = styled.span`
  position: absolute;
  left: 0;
  bottom: 50px;
  padding-left: 10px;
  padding-right: 10px;
`;
//멤버스택
const StackContainer = styled.div`
  position: absolute;
  box-sizing: border-box;
  justify-content: center;
  align-items: flex-start;
  gap: 10px;
  width: 100%;
  height: 22px;
  margin-bottom: 7px;
`;
const MemberStack = styled.img`
  width: 20px; /* 이미지의 너비 조정 */
`;
// 찜하기 - 하트아이콘
const CustomHeartIcon = ({ isHeartClicked }) => {
  return (
    <GoHeartFill
      style={{
        fontSize: "22px",
        position: "absolute",
        top: "7px",
        left: "6px",
        color: isHeartClicked ? "#ec0c0cbb" : "#212b2c35",
        cursor: "pointer",
      }}
    />
  );
};
function MemberPage({
  icon,
  nick,
  introduce,
  memberRole = [], // Rename the prop for clarity
  academy,
  stack,
  handleBoardItemGen,
  postId,
}) {
  const generateRoleIcons = useCallback(() => {
    let contents = [];
    for (let i = 0; i < memberRole.length; i++) {
      // 모집분야에 따라 아이콘과 텍스트를 생성
      switch (memberRole[i]) {
        case "BackEnd":
          contents.push(
            <FilterIcon key={`Filter Icon ${i}`}>{memberRole[i]}</FilterIcon>
          );
          break;
        case "FrontEnd":
          contents.push(
            <FilterIcon key={`Filter Icon ${i}`}>{memberRole[i]}</FilterIcon>
          );
          break;
        case "BigData":
          contents.push(
            <FilterIcon key={`Filter Icon ${i}`}>{memberRole[i]}</FilterIcon>
          );
          break;
        case "AI":
          contents.push(
            <FilterIcon key={`Filter Icon ${i}`}>{memberRole[i]}</FilterIcon>
          );
          break;
        case "Server":
          contents.push(
            <FilterIcon key={`Filter Icon ${i}`}>{memberRole[i]}</FilterIcon>
          );
          break;
        case "Security":
          contents.push(
            <FilterIcon key={`Filter Icon ${i}`}>{memberRole[i]}</FilterIcon>
          );
          break;
        case "Network":
          contents.push(
            <FilterIcon key={`Filter Icon ${i}`}>{memberRole[i]}</FilterIcon>
          );
          break;
        default:
          // 기타 모집분야 처리
          contents.push(
            <FilterIcon key={`Filter Icon ${i}`}>{memberRole[i]}</FilterIcon>
          );
          break;
      }
    }
    return contents;
  }, [memberRole]);

  // API에서 스택 정보 가져오기
  // 컴포넌트가 마운트될 때 한 번만 실행
  useEffect(() => {
    async function fetchStackImages() {
      try {
        const response = await axios.get("/api/callAllMemberRequest");
        const data = response.data;

        // API로부터 받은 정보 중 스택 정보만 추출하여 상태로 설정
        if (data && Array.isArray(data.stack)) {
          setStackImages(data.stack);
        }
      } catch (error) {
        console.error("API 요청 중 오류 발생:", error);
      }
    }

    fetchStackImages();
  }, []);

  // 스택 이미지 정보를 상태로 관리
  const [stackImages, setStackImages] = useState([]);

  const generateStackIcons = useCallback(() => {
    if (!Array.isArray(stackImages)) {
      return [];
    }

    return stackImages.map((stackItem, i) => {
      let imageUrl;
      let altText;

      // Stack item names can be used to determine the image source and alt text
      switch (stackItem) {
        case "Java":
          imageUrl = JavaIcon;
          altText = "Java";
          break;
        case "R":
          imageUrl = RubyIcon;
          altText = "R";
          break;
        case "CSS":
          imageUrl = CSSIcon;
          altText = "CSS";
          break;
        case "JavaScript":
          imageUrl = JavaScriptIcon;
          altText = "JavaScript";
          break;
        case "Python":
          imageUrl = PythonIcon;
          altText = "Python";
          break;
        case "C/C++":
          imageUrl = CIcon;
          altText = "C/C++";
          break;
        case "Node.js":
          imageUrl = NodeIcon;
          altText = "Node.js";
          break;
        case "C#":
          imageUrl = CIcon2;
          altText = "C#";
          break;
        case "SQL":
          imageUrl = SQLIcon;
          altText = "SQL";
          break;
        case "PHP":
          imageUrl = PHPIcon;
          altText = "PHP";
          break;
        case "HTML":
          imageUrl = HTMLIcon;
          altText = "HTML";
          break;
        case "Kotlin":
          imageUrl = KotlinIcon;
          altText = "Kotlin";
          break;
        case "Go":
          imageUrl = GoIcon;
          altText = "Go";
          break;
        case "TypeScript":
          imageUrl = TypeScriptIcon;
          altText = "TypeScript";
          break;
        case "JQuery":
          imageUrl = JQueryIcon;
          altText = "JQuery";
          break;
        case "React":
          imageUrl = ReactIcon;
          altText = "React";
          break;
        case "Vue":
          imageUrl = VueIcon;
          altText = "Vue";
          break;
        default:
          imageUrl = DefaultIcon; // 기본 이미지 파일 경로
          altText = stackItem;
          break;
      }
      console.log("Image URL:", imageUrl); // 이미지 URL을 로그에 출력
      console.log("Alt Text:", altText); // alt 텍스트를 로그에 출력
      return (
        <FilterIcon key={`Filter Icon ${i}`}>
          <img src={imageUrl} alt={altText} style={{ width: "20px" }} />
        </FilterIcon>
      );
    });
  }, [stackImages]);

  // 하트이미지 color변경
  const [isHeartClicked, setIsHeartClicked] = useState(false);

  const toggleHeartColor = (event) => {
    // console.log("Heart icon clicked");
    // 이벤트 전파를 막음
    event.stopPropagation();
    setIsHeartClicked((prevIsHeartClicked) => !prevIsHeartClicked);
  };

  useEffect(() => {
    // 게시글의 하트 아이콘 클릭 이벤트 핸들러를 게시글마다 등록
    const heartIcon = document.querySelector(`.heart-icon-${postId}`);

    if (heartIcon) {
      heartIcon.addEventListener("click", toggleHeartColor);
    }
    return () => {
      // 컴포넌트가 언마운트되면 이벤트 리스너 제거
      if (heartIcon) {
        heartIcon.removeEventListener("click", toggleHeartColor);
      }
    };
  }, [postId]);

  return (
    <Container>
      <BoardBase>
        <ProfileArea>
          <PosterContainer>
            <MyProfile></MyProfile>
          </PosterContainer>
          <MemberNick>{nick}</MemberNick>
        </ProfileArea>
        <TagContainer>
          <TextRole>[ 직무 ]{`\n` + memberRole}</TextRole>
        </TagContainer>
        <TagContainer>
          <TextPlace>[ 지점 ] {`\n` + academy}</TextPlace>
        </TagContainer>
        <IntroduceArea>
          <MemberIntroduce>{`"\n` + introduce + `\n"`}</MemberIntroduce>
        </IntroduceArea>

        <TagContainer>
          {stackImages.length > 0 && (
            <StackContainer>{generateStackIcons()}</StackContainer>
          )}
        </TagContainer>
        <TagContainer>
          <div style={{ display: "flex", alignItems: "flex-start" }}>
            <TagItem>
              <AiFillMail
                color={"#0B666A"}
                fontSize={"20px"}
                style={{
                  marginRight: "10px",
                }}
              ></AiFillMail>
              DM
            </TagItem>
            <div
              style={{
                position: "relative",
                marginLeft: "7px",
                cursor: "pointer",
              }}
              onClick={(event) => toggleHeartColor(event)}
            >
              <BsCircleFill
                className={`heart-icon heart-icon-${postId}`}
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                }}
                fontSize={"34px"}
                color={"#42404016"}
              ></BsCircleFill>
              <CustomHeartIcon
                isHeartClicked={isHeartClicked}
                // 아이콘의 색상을 isHeartClicked 상태에 따라 변경합니다.
                // style={{
                //   color: isHeartClicked ? "#d42f2fc4" : "#212b2c35",
                // }}
              />
            </div>
          </div>
        </TagContainer>
        <TagContainer></TagContainer>
      </BoardBase>
    </Container>
  );
}

export default MemberPage;
