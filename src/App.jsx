import React, { useCallback, useState, useEffect, useRef } from "react";
import styled from "@emotion/styled";
import Navbar from "./components/Navbar";
import Page1 from "./page/Page1";
import Page2 from "./page/Page2";
import Page3 from "./page/Page3";
import { Throatle } from "./functional/Throatle";

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  height: 100vh;
  min-height: 100%;
  position: relative;
  margin-top: 64px;
  overflow: hidden;
  @media screen and (max-width: 715px) {
    margin-top: 45px;
  }
  @media screen and (max-width: 360px) {
    margin-top: 40px;
  }
`;
/** 메인 콘텐츠가 담기는 사이즈 제한 콘테이너 태그 */
const Wrap = styled.div`
  /* 밖에 background color:초록색이 다깔릴려면 max-width 설정을 지워야 함 */
  /* max-width: 1440px; */
  width: 100%;
`;

function App() {
  const Eventer = useRef(null);
  const Target = useRef([]);
  const [userData, setUserData] = useState("");
  const [page, setPage] = useState(0);
  const handleSetUserData = useCallback((value) => {
    setUserData(value);
  }, []);
  const handleSetPage = useCallback(() => {
    // let buf = e.wheelDelta < 0 ? page + 1 : page - 1;
    let buf = page + 1;
    if (buf > 3) {
      Target.current[0]?.scrollIntoView({ behavior: "smooth" });
      setPage(0);
    } else if (buf < 0) {
      Target.current[3]?.scrollIntoView({ behavior: "smooth" });
      setPage(3);
    } else {
      Target.current[buf]?.scrollIntoView({ behavior: "smooth" });
      setPage(buf);
    }
  }, [page]);
  /** 스크롤 이벤트 */
  useEffect(() => {
    if (Eventer.current) {
      window.addEventListener(
        "DOMMouseScroll",
        (e) => {
          e.preventDefault();
        },
        { passive: false }
      );
      window.addEventListener(
        "wheel",
        (e) => {
          e.preventDefault();
        },
        { passive: false }
      );
      document.addEventListener("wheel", Throatle(handleSetPage, 1000));
      return () => {
        document.removeEventListener("wheel", Throatle(handleSetPage, 1000));
      };
    }
  }, [handleSetPage]);
  return (
    <MainContainer ref={Eventer}>
      <Navbar userData={userData} handleSetUserData={handleSetUserData} />
      <Wrap>
        <Page1 target={(el) => (Target.current[0] = el)} />
        <Page2 target={(el) => (Target.current[1] = el)} />
        <Page1 target={(el) => (Target.current[2] = el)} />
        <Page2 target={(el) => (Target.current[3] = el)} />
      </Wrap>
    </MainContainer>
  );
}

export default App;
