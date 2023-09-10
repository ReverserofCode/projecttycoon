import React, { useCallback, useEffect, useState } from "react";
import styled from "@emotion/styled";
import { AiOutlineArrowLeft } from "react-icons/ai";
import Sidebar from "../components/Sidebar";
import purify from "dompurify";
import { GetProjectFromID } from "../functional/GetProject";
import "highlight.js/styles/obsidian.css";
import { SessionIdCall } from "../functional/GetSession";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  width: 100%;
  height: fit-content;
  margin-top: 20px;
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
`;
/** DetailPage의 내용이 담기는 핵심 콘테이너 태그 */
const MainContents = styled.div`
  display: flex;
  box-sizing: border-box;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  margin-left: 50px;
  width: 100%;
  max-width: 1000px;
`;
/** 프로젝트 제목 태그 */
const MainTitle = styled.h2`
  width: 100%;
  border-bottom: 5px solid #d9d9d9;
  padding: 10px 0px;
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
  height: 500px;
`;
/** 상세설명창 태그 */
const ProjectInfos = styled.div`
  display: flex;
  box-sizing: border-box;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 20px 15px;
  border-top: 5px solid #d9d9d9;
  border-bottom: 5px solid #d9d9d9;
  margin-top: 20px;
  gap: 200px;
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
  margin-bottom: 100px;
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
function DetailPage({ userData }) {
  const [value, setValue] = useState({
    createdAt: "2023-08-19T06:54:37.741+00:00",
    modifiedAt: "2023-08-19T06:54:37.741+00:00",
    projectId: 26,
    projectTitle: "Test title item length test. how long text viewing",
    projectContent: "testContents",
    projectWantedRole: [
      { Role: "back", complete: 1, personnel: 3 },
      { Role: "front", complete: 0, personnel: 2 },
      { Role: "back", complete: 1, personnel: 3 },
      { Role: "front", complete: 0, personnel: 2 },
    ],
    projectDue: "2023-08-16T00:00:00.000+00:00",
    projectAcademy: "강남",
    projectStatus: true,
    projectWriterId: "testWriterId",
    projectWriterNick: "testNickname",
    projectFilePath:
      "/webapp/c40ba566-0f72-4bf1-90ef-904e6d9f3a92_Project image.png",
    projectFileName: "projectImage",
    projectScrapNum: 10,
  });
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
      case "bigData":
        contents.push(
          <InfoRole
            src="http://projecttycoon.com/static/images/BigData.png"
            key={`Filter Icon `}
          />
        );
        break;
      case "AI":
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
          {handleRoleIcon(value?.projectWantedRole[i].Role)}
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
      handleSetValue(buf);
    });
  }, [handleSetValue]);
  return (
    <Container>
      <SideContents>
        <AiOutlineArrowLeft fontSize={"30px"} />
        <Sidebar
          value={value}
          userData={userData}
          handleSetValue={handleSetValue}
        />
      </SideContents>
      <MainContents>
        <MainTitle>{value?.projectTitle}</MainTitle>
        <PosterContain>
          <Poster src={"http://projecttycoon.com" + value?.projectFilePath} />
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
      </MainContents>
    </Container>
  );
}

export default DetailPage;
