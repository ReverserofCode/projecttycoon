import React, { useCallback, useState, useEffect, useRef } from "react";
import styled from "@emotion/styled";
import Navbar from "./components/Navbar";
import Page1 from "./page/Page1";
import Page2 from "./page/Page2";
import Page3 from "./page/Page3";
import Page4 from "./page/Page4";
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
  overflow: hidden;
`;
/** 메인 콘텐츠가 담기는 사이즈 제한 콘테이너 태그 */
const Wrap = styled.div`
  width: 100%;
`;
const OverContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 50%;
  right: 10px;
  gap: 8px;
`;
const OverButton = styled.div`
  width: 12px;
  height: 12px;
  border: 2px solid #d9d9d9;
  box-sizing: border-box;
  border-radius: 50%;
  background-color: ${(props) => {
    return props.NowPage ? "#ffffff" : "";
  }};
`;

function App() {
  const Eventer = useRef(null);
  const Target = useRef([]);
  const [userData, setUserData] = useState("");
  const [page, setPage] = useState(0);
  const [on, setOff] = useState(false);
  let downUp = 0;
  const handleSetUserData = useCallback((value) => {
    setUserData(value);
  }, []);
  const handleSetPage = useCallback(() => {
    let buf = downUp > 0 ? page - 1 : page + 1;
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
  }, [downUp, page]);

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
          downUp = e.wheelDelta;
        },
        { passive: false }
      );
      window.addEventListener(
        "touchmove",
        (e) => {
          e.preventDefault();
          downUp = e.wheelDelta;
        },
        { passive: false }
      );
      document.addEventListener("wheel", Throatle(handleSetPage, 400));
      document.addEventListener("touchmove", Throatle(handleSetPage, 400));
      return () => {
        document.removeEventListener("wheel", Throatle(handleSetPage, 400));
        document.removeEventListener("touchmove", Throatle(handleSetPage, 400));
      };
    }
  }, [handleSetPage]);
  return (
    <MainContainer ref={Eventer}>
      <Navbar userData={userData} handleSetUserData={handleSetUserData} />
      <Wrap>
        <Page4  target={(el) => (Target.current[0] = el)} />
        <Page1 userData={userData} target={(el) => (Target.current[1] = el)} />
        <Page2 target={(el) => (Target.current[2] = el)} />
        <Page3 target={(el) => (Target.current[3] = el)} />
        {/* <Page2 target={(el) => (Target.current[3] = el)} /> */}
      </Wrap>
      <OverContainer>
        <OverButton
          NowPage={page === 0}
          onClick={() => {
            Target.current[0]?.scrollIntoView({ behavior: "smooth" });
            setPage(0);
          }}
        />
        <OverButton
          NowPage={page === 1}
          onClick={() => {
            Target.current[1]?.scrollIntoView({ behavior: "smooth" });
            setPage(1);
          }}
        />
        <OverButton
          NowPage={page === 2}
          onClick={() => {
            Target.current[2]?.scrollIntoView({ behavior: "smooth" });
            setPage(2);
          }}
        />
        <OverButton
          NowPage={page === 3}
          onClick={() => {
            Target.current[3]?.scrollIntoView({ behavior: "smooth" });
            setPage(3);
          }}
        />
      </OverContainer>
    </MainContainer>
  );
}
export default App;
