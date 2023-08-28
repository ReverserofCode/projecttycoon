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
  width: 100%;
`;

function App() {
  return (
    <MainContainer>
      <Navbar />
      <ContentsWrap>
        <DetailPage />
      </ContentsWrap>
    </MainContainer>
  );
}

export default App;
