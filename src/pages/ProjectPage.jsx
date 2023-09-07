import styled from "@emotion/styled";
import React, { useCallback, useEffect, useState } from "react";
import { SelectSide, CheckSide } from "../components/Sidebar/SidebarComponent";
import { MainHeader, SubmitButton } from "../components/Sidebar/SidebarStyle";
import BoardItem from "../components/BoardItem";
import { Place, Recruit } from "../Filter.json";
import { BoardListGet } from "../functional/BoardList";
const PageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  width: 100%;
  height: fit-content;
  margin-top: 20px;
`;
const SideContents = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  position: sticky;
  top: 80px;
  left: 10px;
  gap: 15px;
`;
const MainContents = styled.div`
  display: flex;
  box-sizing: border-box;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  margin-left: 50px;
  width: 100%;
`;
const Board = styled.div`
  display: flex;
  flex-wrap: wrap;
  box-sizing: border-box;
  justify-content: flex-start;
  align-items: center;
  gap: 20px;
  width: 100%;
  margin-top: 20px;
  max-width: 1200px;
`;
/** 프로젝트 페이지 */
function ProjectPage() {
  const [boardList, setBoardList] = useState([]);
  const [placeSelect, setPlaceSelect] = useState("");
  const [RecruitSelect, setRecruitSelect] = useState("");
  const handleSet = useCallback((e) => {
    setRecruitSelect(e);
  }, []);
  const PlaceSet = useCallback((value) => {
    setPlaceSelect(value);
  }, []);
  const handleBoardItemGen = useCallback(() => {
    let contents = [];
    for (let i = 0; i < boardList.length; i++) {
      let bufRole = JSON.parse(
        boardList[i]?.projectWantedRole.replace(/'/g, '"')
      );
      let bufRoleValue = [];
      for (let j = 0; j < bufRole.length; j++) {
        bufRoleValue.push(bufRole[j].Role);
      }
      contents.push(
        <BoardItem
          status={boardList[i]?.projectStatus}
          createDate={boardList[i]?.createdAt.split("").slice(2, 10).join("")}
          DeadLine={boardList[i]?.projectDue.split("").slice(2, 10).join("")}
          title={boardList[i]?.projectTitle}
          filter={bufRoleValue}
          academy={boardList[i]?.projectAcademy}
          image={boardList[i]?.projectFilePath}
          id={boardList[i]?.projectId}
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
        <CheckSide
          contents={Recruit}
          header={"모집 분야"}
          handleSet={handleSet}
        />
        <SubmitButton>검색</SubmitButton>
      </SideContents>
      <MainContents>
        <Board>{handleBoardItemGen()}</Board>
      </MainContents>
    </PageContainer>
  );
}

export default ProjectPage;
