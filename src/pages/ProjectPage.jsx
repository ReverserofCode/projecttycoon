import styled from "@emotion/styled";
import React, { useCallback, useState } from "react";
import { SelectSide, CheckSide } from "../components/Sidebar/SidebarComponent";
import { MainHeader } from "../components/Sidebar/SidebarStyle";
const PageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: max-content;
  gap: 20px;
  padding: 0 30px;
`;
const SideContents = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  position: fixed;
  top: 128px;
  left: 30px;
  gap: 15px;
`;
const MainContents = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
`;
/** 프로젝트 페이지 */
function ProjectPage() {
  const place = [
    "전체",
    "강남",
    "신촌/홍대",
    "노원",
    "인천",
    "대전",
    "대구",
    "부산",
  ];
  const recruitment = [
    "백엔드",
    "프론트엔드",
    "빅데이터",
    "AI",
    "서버관리자",
    "정보보안",
    "네트워크 관리자",
  ];
  const [placeSelect, setPlaceSelect] = useState("");
  const PlaceSet = useCallback((value) => {
    setPlaceSelect(value);
  }, []);
  return (
    <PageContainer>
      <SideContents>
        <MainHeader>프로젝트 필터</MainHeader>
        <SelectSide header={"지역"} contents={place} handleSelect={PlaceSet} />
        <CheckSide contents={recruitment} header={"모집 분야"}></CheckSide>
      </SideContents>
      <MainContents></MainContents>
    </PageContainer>
  );
}

export default ProjectPage;
