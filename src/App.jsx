import React from "react";
import styled from "@emotion/styled";

import Navbar from "./components/Navbar";
import Write from "./page/Write";
import TestWrite from "./TestCode/TestWrite";
// import Input from "./components/Input"s

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
      <Write></Write>
      {/* <TestWrite></TestWrite> */}
    </MainContainer>
  );
}

export default App;
