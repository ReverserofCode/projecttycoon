import React, { useCallback, useState } from "react";
import styled from "@emotion/styled";
import Navbar from "./components/Navbar";
import DetailPage from "./pages/DetailPage";
const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  min-height: 100%;
  position: relative;
  margin-top: 64px;
  @media screen and (max-width: 715px) {
    margin-top: 45px;
  }
  @media screen and (max-width: 360px) {
    margin-top: 40px;
  }
`;
/** 메인 콘텐츠가 담기는 사이즈 제한 콘테이너 태그 */
const Wrap = styled.div`
  max-width: 1440px;
  width: 100%;
`;

function App() {
  const [userData, setUserData] = useState({
    password: null,
    username: "sift",
    authorities: [],
    accountNonExpired: true,
    accountNonLocked: true,
    credentialsNonExpired: true,
    enabled: true,
    memberNickName: "정성민2",
    memberAcademy: "노원",
    memberRole: "back",
    memberIntroduce: "Stringddddd",
    memberLink: '[{"option":"Git","value":"asdfasdf1@"}]',
    memberFilePath: "/static/icons/",
    memberFileName: "1_shark.png",
    memberId: "sift",
    memberPw: "$2a$10$o8zMUAbbvNS2FdlAWkEZy.uClM.u/gpTpiZbWYJhShNMHuKqGEEgq",
    memberStack: '["CSS"]',
    memberAuthority: [],
    scrappedProjects: [
      {
        createdAt: "2023-10-13T06:17:47.473+00:00",
        modifiedAt: "2023-10-17T13:52:09.399+00:00",
        projectId: 168,
        projectTitle: "다 드루와",
        projectContent: "<p>다 드루와 다</p>",
        projectWantedRole:
          '[{"role": "back", "complete": 0, "personnel": 1}, {"role": "netWork", "complete": 0, "personnel": 3}]',
        projectDue: "2023-11-11T00:00:00.000+00:00",
        projectAcademy: "대전",
        projectStatus: true,
        projectWriterId: "dale01",
        projectWriterNick: "da_adeyh",
        projectFilePath:
          "/webapp/c7fdda3b-45ee-42e7-a0dc-baa108d692db_Black.png",
        projectFileName: "projectImage",
        projectScrapNum: 2,
        parsedProjectWantedRole: [
          {
            role: "back",
            complete: 0,
            personnel: 1,
          },
          {
            role: "netWork",
            complete: 0,
            personnel: 3,
          },
        ],
      },
    ],
  });
  const handleSetUserData = useCallback((value) => {
    setUserData(value);
  }, []);
  return (
    <MainContainer>
      <Navbar userData={userData} handleSetUserData={handleSetUserData} />
      <Wrap>
        <DetailPage userData={userData} />
      </Wrap>
    </MainContainer>
  );
}

export default App;
