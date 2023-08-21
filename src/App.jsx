import React from "react";
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
`;
const ContentsWrap = styled.div`
  max-width: 1440px;
`;

function App() {
  const value = {
    createdAt: "2023-08-19T06:54:37.741+00:00",
    modifiedAt: "2023-08-19T06:54:37.741+00:00",
    projectId: 26,
    projectTitle: "Test title item length test. how long text viewing",
    projectContent: "testContents",
    projectWantedRole: "testWriter",
    projectDue: "2023-08-16T00:00:00.000+00:00",
    projectAcademy: "강남",
    projectStatus: true,
    projectWriterId: "testWriterId",
    projectWriterNick: "testNickname",
    projectFilePath:
      "/webapp/c40ba566-0f72-4bf1-90ef-904e6d9f3a92_Project image.png",
    projectFileName: "projectImage",
    projectScrapNum: 10,
  };
  return (
    <MainContainer>
      <Navbar />
      <ContentsWrap>
        <DetailPage></DetailPage>
      </ContentsWrap>
    </MainContainer>
  );
}

export default App;
