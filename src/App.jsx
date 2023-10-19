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
    memberId: "sift",
    memberPw: "$2a$10$unl/kpsWN9lFX5ax34J1VueoVQCrp.p2PT/.gVWWf8.kkNG7AfJ/G",
    memberRole: "front",
    memberIntroduce: "asdfasdf",
    memberLink: '[{"option":"Git","value":"asdfasdf@"}]',
    memberAcademy: "노원",
    memberNickname: "정성민",
    memberFilePath: "/static/icons/",
    memberFileName: "9_alpaca.png",
    memberStack: '["HTML"]',
    myProjectlist: [],
    myCommentlist: [],
    myScraplist: [
      {
        createdAt: "2023-10-18T07:18:08.827+00:00",
        modifiedAt: "2023-10-18T07:23:21.814+00:00",
        projectId: 3,
        projectTitle: "헷",
        projectContent: "<p>헷</p>",
        projectWantedRole: '[{"role": "back", "complete": 0, "personnel": 1}]',
        projectDue: "2023-11-11T00:00:00.000+00:00",
        projectAcademy: "노원",
        projectStatus: true,
        projectWriterId: null,
        projectWriterNick: null,
        projectFilePath:
          "/webapp/b0b176b3-e77d-4e1d-aee0-ef1644d4b6bb_Black.png",
        projectFileName: "projectImage",
        projectScrapNum: 2,
        parsedProjectWantedRole: [
          {
            role: "back",
            complete: 0,
            personnel: 1,
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
