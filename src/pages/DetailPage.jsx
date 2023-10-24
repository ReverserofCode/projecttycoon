import React, { useCallback, useEffect, useState } from "react";
import styled from "@emotion/styled";
import { AiOutlineArrowLeft, AiOutlinePlus } from "react-icons/ai";
import Sidebar from "../components/Sidebar";
import purify from "dompurify";
import { GetProjectFromID } from "../functional/GetProject";
import "highlight.js/styles/obsidian.css";
import Modify from "../components/Modify";
import Comment from "../components/Comment";
import Like from "../components/Like";
import { GetWriterData } from "../functional/GetWriterData";
import { HoverIcon } from "../DMSet/Components";
import DMmodal from "../DMSet/DMmodal";
import { DMListCall } from "../DMSet/DM";
import ErrorPage from "./ErrorPage";
import { GetMyData } from "../functional/GetMyData";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  width: 100%;
  height: fit-content;
  margin-top: 20px;
  position: relative;
`;
/** DetailPage의 사이드바를 담는 콘테이너 태그 */
const SideContents = styled.div`
  display: flex;
  width: 260px;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  position: sticky;
  top: 80px;
  left: 10px;
  gap: 15px;
  @media screen and (max-width: 690px) {
    display: none;
  }
`;
/** DetailPage의 내용이 담기는 핵심 콘테이너 태그 */
const MainContents = styled.div`
  display: flex;
  box-sizing: border-box;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  margin-left: 50px;
  @media screen and (max-width: 690px) {
    margin: 10px;
    margin-top: 0;
  }
  width: 100%;
  max-width: 1000px;
  position: relative;
  margin-bottom: 100px;
`;
/** 프로젝트 제목 태그 */
const MainTitle = styled.h2`
  width: 100%;
  border-bottom: 5px solid #d9d9d9;
  padding: 10px 0px;
  position: relative;
`;
/** 메인 이미지 콘테이너 태그 */
const PosterContain = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  border-top: 5px solid #35a29f;
  border-bottom: 5px solid #35a29f;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
`;
/** 메인 이미지 태그 */
const Poster = styled.img`
  width: 80%;
  max-height: 500px;
  object-fit: cover;
`;
/** 상세설명창 태그 */
const ProjectInfos = styled.div`
  display: flex;
  box-sizing: border-box;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 20px 120px;
  border-top: 5px solid #d9d9d9;
  border-bottom: 5px solid #d9d9d9;
  margin-top: 20px;
  @media screen and (max-width: 1050px) {
    padding: 20px 80px;
  }
  @media screen and (max-width: 840px) {
    padding: 20px 20px;
  }
`;
/** 상세설명 창 세로 정렬 */
const InfoColumn = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  width: fit-content;
  gap: 15px;
`;
/** 상세설명 창 가로정렬  */
const InfoRow = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  text-align: center;
  width: 100%;
  font-size: 20px;
  gap: 15px;
  @media screen and (max-width: 1000px) {
    font-size: 15px;
  }
  @media screen and (max-width: 430px) {
    font-size: 12px;
  }
  white-space: nowrap;
`;
/** 상세설명 창 모집분야 및 모집인원 콘테이너 태그 */
const InfoCell = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
`;
/** 상세설명 창 상세 정보 분류 */
const InfoTitle = styled.span``;
/** 상세설명 창 상세 정보 태그 */
const InfoValue = styled.span`
  font-weight: 600;
`;
/** 상세설명 창 모집분야 icon 태그 */
const InfoRole = styled.img`
  height: 30px;
  padding: 3px;
  box-sizing: border-box;
`;
/** 상세설명 창 모집 인원수 태그 */
const InfoPersonnel = styled.span`
  font-weight: 600;
  width: 50px;
`;
/** 상세설명 창 마감일자 태그 */
const InfoDate = styled.span`
  color: #949494;
  white-space: nowrap;
`;
/** ProjectContent내부의 데이터를 불러와 html화 시켜주는 태그 */
const Preview = styled.div`
  margin-top: 20px;
  margin-bottom: 20px;
  display: flex;
  width: 100%;
  box-sizing: border-box;
  flex-direction: column;
  border: 2px solid #c4c4c4;
  box-shadow: rgb(0 0 0 / 20%) 0px 1rem 2rem;
  border-radius: 5px;
  padding: 10px;
  .ql-syntax {
    border: 2px solid #c4c4c4;
    padding: 10px;
    background-color: #ffffebd1;
  }
`;
const ModifyButton = styled.div`
  display: flex;
  box-sizing: border-box;
  justify-content: center;
  align-items: center;
  padding: 5px 10px;
  position: absolute;
  top: 10px;
  right: 0;
  background-color: #d9d9d9;
  border: 1px solid black;
  user-select: none;
  cursor: pointer;
  :hover {
    background-color: #c9c9c9;
  }
  :active {
    background-color: #d9d9d9;
  }
`;
function DetailPage({ userData }) {
  /** 상세 페이지 수정모드 전환 정보를 담는 state */
  const [mod, setMod] = useState("main");
  /** 작성자 정보를 담는 state */
  const [writer, setWriter] = useState({});
  /** 프로젝트 정보를 담는 state */
  const [value, setValue] = useState();
  /** api/mypage의 내용을 담는 state */
  const [myData, setMyData] = useState();
  /** 자신의 DM 리스트 state */
  const [DMList, setDMList] = useState();
  /** DM 창이 열려있는지 확인하는 state */
  const [DMOpen, setDMOpen] = useState(false);
  /** DM창의 모드를 확인하는 state */
  const [sendMod, setSendMod] = useState("chatlist");
  /** DM 창 오픈 */
  const handleSetOpen = useCallback(() => {
    setDMOpen(true);
    if (userData !== "" && userData !== undefined) {
      DMListCall(userData?.memberId).then((res) => {
        setDMList(res);
      });
    }
  }, [userData]);
  /** DM창의 모드를 변경하는 function */
  const handleSetMod = useCallback((value) => {
    setSendMod(value);
  }, []);
  /** 자신의 ID를 통해 자신의 DM 리스트를 가져오는 funtion */
  const handleGetList = useCallback(() => {
    if (userData !== "" && userData !== undefined) {
      DMListCall(userData?.memberId).then((res) => {
        setDMList(res);
      });
    }
  }, [userData]);
  /** 모집분야를 상세 설명란에 Icon으로 표기해주는 function */
  const handleRoleIcon = useCallback((role) => {
    let contents = "";
    switch (role) {
      case "back":
        contents = (
          <InfoRole
            src="http://projecttycoon.com/static/images/BackEnd.png"
            key={`Filter Icon `}
          />
        );
        break;
      case "front":
        contents = (
          <InfoRole
            src="http://projecttycoon.com/static/images/FrontEnd.png"
            key={`Filter Icon `}
          />
        );
        break;
      case "bigdata":
        contents = (
          <InfoRole
            src="http://projecttycoon.com/static/images/BigData.png"
            key={`Filter Icon `}
          />
        );
        break;
      case "ai":
        contents = (
          <InfoRole
            src="http://projecttycoon.com/static/images/AI.png"
            key={`Filter Icon `}
          />
        );
        break;
      case "server":
        contents = (
          <InfoRole
            src="http://projecttycoon.com/static/images/ServerAdmin.png"
            key={`Filter Icon `}
          />
        );
        break;
      case "security":
        contents = (
          <InfoRole
            src="http://projecttycoon.com/static/images/Security.png"
            key={`Filter Icon `}
          />
        );
        break;
      case "network":
        contents = (
          <InfoRole
            src="http://projecttycoon.com/static/images/Network.png"
            key={`Filter Icon `}
          />
        );
        break;
      default:
        contents = (
          <InfoRole
            src="http://projecttycoon.com/static/images/Network.png"
            key={`Filter Icon `}
          />
        );
    }
    return contents;
  }, []);
  /** 모집분야와 인원수의 데이터를 html로 변환해 적용해주는 function */
  const handleRecruits = useCallback(() => {
    let contents = [];
    for (let i = 0; i < value?.projectWantedRole.length; i++) {
      contents.push(
        <InfoRow key={`Recruits ${i}`}>
          {handleRoleIcon(value?.projectWantedRole[i].role)}
          <InfoPersonnel>
            {value?.projectWantedRole[i].personnel}명
          </InfoPersonnel>
        </InfoRow>
      );
    }
    return contents;
  }, [handleRoleIcon, value?.projectWantedRole]);
  const handleSetValue = useCallback((buf) => {
    setValue(buf);
  }, []);
  useEffect(() => {
    const path = window.location.href.split("/");
    GetProjectFromID(path[4]).then((res) => {
      let buf = {
        createdAt: res.createdAt,
        modifiedAt: res.modifiedAt,
        projectId: res.projectId,
        projectTitle: res.projectTitle,
        projectContent: res.projectContent,
        projectWantedRole: JSON.parse(res.projectWantedRole.replace(/'/g, '"')),
        projectDue: res.projectDue,
        projectAcademy: res.projectAcademy,
        projectStatus: res.projectStatus,
        projectWriterId: res.projectWriterId,
        projectWriterNick: res.projectWriterNick,
        projectFilePath: res.projectFilePath,
        projectFileName: res.projectFileName,
        projectScrapNum: res.projectScrapNum,
      };
      GetWriterData(res.projectWriterId).then((res) => {
        setWriter(res);
      });
      handleSetValue(buf);
      if (userData !== undefined)
        GetMyData().then((res) => {
          setMyData(res);
        });
    });
  }, [handleSetValue, userData]);
  return (
    <>
      {value === undefined ? (
        <Container></Container>
      ) : mod === "main" ? (
        <Container>
          <SideContents>
            <AiOutlineArrowLeft
              fontSize={"30px"}
              onClick={() => {
                window.history.back();
              }}
            />
            <Sidebar
              value={value}
              userData={userData}
              writer={writer}
              handleSetOpen={handleSetOpen}
            />
          </SideContents>
          <MainContents>
            {value.projectWriterId === userData?.memberId ? (
              <ModifyButton
                onClick={() => {
                  setMod("modify");
                }}
              >
                수정
              </ModifyButton>
            ) : (
              ""
            )}
            <MainTitle>
              {value?.projectTitle}
              {userData?.memberId === value?.projectWriterId ? (
                ""
              ) : (
                <Like myData={myData} />
              )}
            </MainTitle>
            <PosterContain>
              <Poster
                src={"http://projecttycoon.com" + value?.projectFilePath}
              />
            </PosterContain>
            <ProjectInfos>
              <InfoColumn>
                <InfoRow>
                  <InfoTitle>{value?.projectWriterNick}</InfoTitle>
                  <InfoDate>{value?.createdAt.slice(0, 10)}</InfoDate>
                </InfoRow>
                <InfoRow>
                  <InfoTitle>모집인원</InfoTitle>
                  <InfoCell>{handleRecruits()}</InfoCell>
                </InfoRow>
              </InfoColumn>
              <InfoColumn>
                <InfoRow>
                  <InfoTitle>모집 마감일</InfoTitle>
                  <InfoValue>{value?.projectDue.slice(0, 10)}</InfoValue>
                </InfoRow>
                <InfoRow>
                  <InfoTitle>진행학원</InfoTitle>
                  <InfoValue>{value?.projectAcademy} 아카데미</InfoValue>
                </InfoRow>
              </InfoColumn>
            </ProjectInfos>
            <Preview
              dangerouslySetInnerHTML={{
                __html: purify.sanitize(value?.projectContent),
              }}
            />
            <Comment userData={userData}></Comment>
          </MainContents>
          <DMmodal
            status={DMOpen}
            DMList={DMList}
            Mod={sendMod}
            myId={userData?.memberId}
            handleSetMod={handleSetMod}
            handleGetList={handleGetList}
          />
          <HoverIcon
            onClick={() => {
              setDMOpen(!DMOpen);
              setSendMod("chatlist");
              if (!DMOpen) {
                handleGetList();
              }
            }}
            status={DMOpen}
          >
            <AiOutlinePlus />
          </HoverIcon>
        </Container>
      ) : (
        <Modify userData={userData} originData={value}></Modify>
      )}
    </>
  );
}

export default DetailPage;
