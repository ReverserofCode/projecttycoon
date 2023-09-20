import styled from "@emotion/styled";
import React, { useCallback, useEffect, useState } from "react";
import { CheckSide } from "../components/Sidebar/SidebarComponent";
import { MainHeader, SubmitButton } from "../components/Sidebar/SidebarStyle";
import MemberPage from "../components/MemberPage";
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
  margin-top: 50px;
  margin-bottom: 100px;
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
  // 필터 선택 상태를 관리할 useState 훅
  const [boardList, setBoardList] = useState([]); // boardList를 초기화하고 데이터를 저장할 상태

  const [placeSelect, setPlaceSelect] = useState("");
  const [RecruitSelect, setRecruitSelect] = useState([]);
  const [statusSelect, setStatusSelect] = useState([]);

  // 필터 선택 시 호출되는 함수
  const handleSetPlace = useCallback((e) => {
    setPlaceSelect(e);
  }, []);

  const handleSetRecruit = useCallback((e) => {
    setRecruitSelect(e);
  }, []);

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
      const memberRole = boardList[i]?.memberRole;
      // console.log("Member Role for item", i, ":", memberRole);
      let bufRole = JSON.parse(
        boardList[i]?.projectWantedRole?.replace(/'/g, '"') || "[]"
      );
      let bufRoleValue = [];
      if (Array.isArray(bufRole)) {
        // Check if bufRole is an array
        for (let j = 0; j < bufRole.length; j++) {
          bufRoleValue.push(bufRole[j].role);
        }
      }
      contents.push(
        <MemberPage
          key={`board item ${i}`}
          icon={boardList[i]?.memberFilePath}
          nick={boardList[i]?.memberNickname}
          academy={boardList[i]?.memberAcademy}
          filter={boardList[i]?.memberRole}
          introduce={boardList[i]?.memberIntroduce}
          stack={boardList[i]?.memberStack}
          postId={boardList[i]?.memberId}
        />
      );
    }
    return contents;
  }, [boardList]);
  useEffect(() => {
    BoardListGet().then((res) => {
      console.log("boardList:", res); // Log boardList to inspect its structure
      setBoardList(res);
    });
  }, []);
  return (
    <PageContainer>
      <SideContents>
        <MainHeader></MainHeader>
        <CheckSide
          contents={Place}
          header={"지역"}
          selected={placeSelect}
          handleSet={handleSetPlace}
        />
        <CheckSide
          contents={Recruit}
          header={"모집 분야"}
          selected={RecruitSelect}
          handleSet={handleSetRecruit}
        />
        <SubmitButton
          onClick={() => {
            GetFilterList(statusSelect, RecruitSelect, placeSelect).then(
              (res) => {
                setBoardList(res);
              }
            );
          }}
        >
          검 색
        </SubmitButton>
      </SideContents>
      <MainContents>
        <Board>{handleBoardItemGen()}</Board>
      </MainContents>
    </PageContainer>
  );
}

export default ProjectPage;
