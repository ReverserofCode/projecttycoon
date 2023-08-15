import React from "react";
import styled from "@emotion/styled";
import Navbar from "./components/Navbar";
import ProjectPage from "./pages/ProjectPage";
const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  min-height: 100%;
`;

function App() {
  return (
    <MainContainer>
      <Navbar />
      <ProjectPage />
    </MainContainer>
  );
}

export default App;
