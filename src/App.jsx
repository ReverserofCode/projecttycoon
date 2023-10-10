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
`;
/** 메인 콘텐츠가 담기는 사이즈 제한 콘테이너 태그 */
const Wrap = styled.div`
  max-width: 1440px;
  width: 100%;
`;

function App() {
  const [userData, setUserData] = useState({
    password: null,
    username: "sift0419",
    authorities: [
      {
        authority: "ROLE_USER",
      },
    ],
    accountNonExpired: true,
    accountNonLocked: true,
    credentialsNonExpired: true,
    enabled: true,
    memberNickName: "정성민",
    memberAcademy: "노원",
    memberRole: "프론트엔드",
    memberIntroduce: "asdfasdf@1",
    memberLink: null,
    memberFilePath: null,
    memberFileName: null,
    memberId: "sift0419",
    memberPw: "$2a$10$.S.lSdOlaptMz7j.5BJAkuq76sAoEYxJ7SOPFfb3m.tGk2wxq9Gk6",
    memberStack:
      '["HTML","CSS","JavaScript","TypeScript","React","NodeJs","SQL"]',
    memberAuthority: [
      {
        authority: "ROLE_USER",
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
