import styled from "@emotion/styled";
import React, { useCallback, useEffect, useState } from "react";
import { SelectSide, CheckSide } from "../components/Sidebar/SidebarComponent";
import { MainHeader } from "../components/Sidebar/SidebarStyle";
import BoardItem from "../components/BoardItem";
import { Place, Recruit } from "../Filter.json";
import { BoardListGet } from "../functional/BoardList";
const PageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  width: 100%;
  height: fit-content;
  gap: 20px;
  max-width: 1440px;
  margin-top: 20px;
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
  justify-content: flex-start;
  align-items: flex-start;
  width: 100%;
  height: 200vh;
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
  const [boardList, setBoardList] = useState([]);
  const [placeSelect, setPlaceSelect] = useState("");
  const PlaceSet = useCallback((value) => {
    setPlaceSelect(value);
  }, []);
  const handleBoardItemGen = useCallback(() => {
    let contents = [];
    for (let i = 0; i < boardList.length; i++) {
      contents.push(
        <BoardItem
          status={boardList[i]?.projectStatus}
          createDate={boardList[i]?.createdAt.split("").slice(0, 10).join("")}
          DeadLine={boardList[i]?.projectDue.split("").slice(0, 10).join("")}
          title={boardList[i]?.projectTitle}
          filter={boardList[i]?.projectWantedRole}
          key={`board item ${i}`}
        />
      );
    }
    return contents;
  }, [boardList]);
  useEffect(() => {
    BoardListGet().then((res) => {
      setBoardList(res);
    });
  }, []);
  return (
    <PageContainer>
      <SideContents>
        <MainHeader>프로젝트 필터</MainHeader>
        <SelectSide header={"지역"} contents={Place} handleSelect={PlaceSet} />
        <CheckSide contents={Recruit} header={"모집 분야"}></CheckSide>
      </SideContents>
      <MainContents>
        <Board>{handleBoardItemGen()}</Board>
      </MainContents>
    </PageContainer>
  );
}

export default ProjectPage;
