import React, { useCallback, useState } from "react";
import styled from "@emotion/styled";
import Navbar from "./components/Navbar";
import Register from "./components/Register";
const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  height: 200vh;
  min-height: 100%;
  position: relative;
  margin-top: 64px;
  @media screen and (max-width: 715px) {
    margin-top: 45px;
  }
  @media screen and (max-width: 360px) {
    margin-top: 40px;
  }
  @media (min-width: 320px) {
    width: 100%;
  }
  @media (min-width: 360px) {
    width: 100%;
  }
  @media (min-width: 420px) {
    width: 100%;
  }
  @media (min-width: 540px) {
    width: 100%;
  }
  @media (min-width: 720px) {
    width: 100%;
  }
  @media (min-width: 960px) {
    width: 100%;
  }
  @media (min-width: 1200px) {
    width: 100%;
  }
`;
/** 메인 콘텐츠가 담기는 사이즈 제한 콘테이너 태그 */
const Wrap = styled.div`
  max-width: 1440px;
`;

function App() {
  const [userData, setUserData] = useState("");
  const handleSetUserData = useCallback((value) => {
    setUserData(value);
  }, []);
  return (
    <MainContainer>
      <Navbar userData={userData} handleSetUserData={handleSetUserData} />
      <Wrap>
        <Register userData={userData} />
      </Wrap>
    </MainContainer>
  );
}

export default App;
