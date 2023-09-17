import styled from "@emotion/styled";
import React, { useCallback, useEffect, useState } from "react";
import { SelectSide, CheckSide } from "../components/Sidebar/SidebarComponent";
import { MainHeader, SubmitButton } from "../components/Sidebar/SidebarStyle";
import BoardItem from "../components/BoardItem";
import { Place, Recruit, Status } from "../Filter.json";
import { BoardListGet } from "../functional/BoardList";
import { GetFilterList } from "../functional/FilterGet";
/** 프로젝트 페이지의 컴포넌트를 담고있는 콘테이너 태그 */
const PageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  width: 100%;
  height: fit-content;
  margin-top: 20px;
`;
/** 프로젝트 페이지의 사이드바 콘테이너 태그 */
const SideContents = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  position: sticky;
  top: 10px;
  left: 10px;
  gap: 15px;
`;
/** 프로젝트 페이지의 메인 내용을 담고 있는 콘테이너 태그 */
const MainContents = styled.div`
  display: flex;
  box-sizing: border-box;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  margin-left: 50px;
  width: 100%;
`;
/** 프로젝트 페이지의 메인 내용중 프로젝트 리스트를 담고있는 콘테이너 태그 */
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
  /** 프로젝트 리스트 state */
  const [boardList, setBoardList] = useState([]);
  /** 사이드바의 지역 state */
  const [placeSelect, setPlaceSelect] = useState("");
  /** 사이드바의 모집분야 state */
  const [RecruitSelect, setRecruitSelect] = useState([]);
  /** 사이드바의 모집분야 state */
  const [statusSelect, setStatusSelect] = useState([]);
  /** 모집분야 설정 */
  const handleSetRecruit = useCallback((e) => {
    setRecruitSelect(e);
  }, []);
  /** 모집분야 설정 */
  const handleSetStatus = useCallback((e) => {
    setStatusSelect(e);
  }, []);
  /** 학원지점 설정 */
  const PlaceSet = useCallback((e) => {
    setPlaceSelect(e);
  }, []);
  /** 프로젝트 아이템 생성 */
  const handleBoardItemGen = useCallback(() => {
    let contents = [];
    for (let i = 0; i < boardList?.length; i++) {
      let bufRole = JSON.parse(
        boardList[i]?.projectWantedRole.replace(/'/g, '"')
      );
      let bufRoleValue = [];
      for (let j = 0; j < bufRole.length; j++) {
        bufRoleValue.push(bufRole[j].role);
      }
      contents.push(
        <BoardItem
          status={boardList[i]?.projectStatus}
          createDate={boardList[i]?.createdAt.split("").slice(0, 10).join("")}
          DeadLine={boardList[i]?.projectDue.split("").slice(0, 10).join("")}
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
        <CheckSide //header={"지역"} contents={Place} handleSelect={PlaceSet}
          contents={Place}
          header={"지역"}
          handleSet={PlaceSet}
        />
        {/* <CheckSide
          contents={Status}
          header={"모집 현황"}
          handleSet={handleSetStatus}
        /> */}
        <CheckSide
          contents={Recruit}
          header={"모집 분야"}
          handleSet={handleSetRecruit}
        />
        <SubmitButton
          onClick={() => {
            GetFilterList(statusSelect, RecruitSelect, setPlaceSelect).then(
              (res) => {
                setBoardList(res);
              }
            );
          }}
        >
          검색
        </SubmitButton>
      </SideContents>
      <MainContents>
        <Board>{handleBoardItemGen()}</Board>
      </MainContents>
    </PageContainer>
  );
}

export default ProjectPage;
