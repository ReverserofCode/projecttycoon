import React from "react";
import styled from "@emotion/styled";
import Navbar from "./components/Navbar";
import ProjectPage from "./pages/ProjectPage";
const MainContainer = styled.div`
  display: flex;
  box-sizing: border-box;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  min-height: 100%;
`;
const ContentsWrap = styled.div`
  max-width: 1440px;
  width: 100%;
`;

function App() {
  return (
    <MainContainer>
      <Navbar />
      <ContentsWrap>
        <ProjectPage />
      </ContentsWrap>
    </MainContainer>
  );
}

export default App;
