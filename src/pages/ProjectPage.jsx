import styled from "@emotion/styled";
import React, { useCallback, useState } from "react";
import { SelectSide, CheckSide } from "../components/Sidebar/SidebarComponent";
import { MainHeader } from "../components/Sidebar/SidebarStyle";
import BoardItem from "../components/BoardItem";
const PageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  width: 100%;
  height: fit-content;
  gap: 20px;
  max-width: 1440px;
`;
const SideContents = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  position: sticky;
  top: 80px;
  left: 30px;
  gap: 15px;
`;
const MainContents = styled.div`
  display: flex;
  box-sizing: border-box;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  width: 100%;
  /* height: 200vh; */
`;
const Board = styled.div`
  display: flex;
  flex-wrap: wrap;
  box-sizing: border-box;
  justify-content: center;
  align-items: center;
  gap: 20px;
  margin-top: 20px;
  margin-left: 20px;
  max-width: 1200px;
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
      <MainContents>
        <Board>
          <BoardItem filter={["Back"]} />
          <BoardItem filter={["Front"]} />
          <BoardItem filter={["Bigdata"]} />
          <BoardItem filter={["AI"]} />
          <BoardItem filter={["Server"]} />
          <BoardItem filter={["Security"]} />
          <BoardItem filter={["Network"]} />
          <BoardItem filter={["Front", "Back"]} />
          <BoardItem filter={["Server", "Back"]} />
          <BoardItem filter={["Server", "AI"]} />
          <BoardItem filter={["Server", "Security", "Network"]} />
          <BoardItem filter={["Bigdata", "Security", "Network"]} />
        </Board>
      </MainContents>
    </PageContainer>
  );
}

export default ProjectPage;
