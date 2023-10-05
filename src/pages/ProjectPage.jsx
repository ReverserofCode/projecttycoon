import styled from "@emotion/styled";
import React, { useRef, useCallback, useEffect, useState } from "react";
import { CheckSide } from "../components/Sidebar/SidebarComponent";
import { MainHeader, SubmitButton } from "../components/Sidebar/SidebarStyle";
import MemberPage from "../components/MemberPage";
import { Place, Recruit } from "../Filter.json";
import { BoardListGet } from "../functional/BoardList";
import { FilterCall } from "../functional/FilterGet";
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
/** 프로젝트 페이지 업데이트를 위한 loading 콘테이너 태그 */
const Loader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin-bottom: 10px;
`; /** 프로젝트 페이지 업데이트를 위한 loading 테그 */
const Loading = styled.span`
  width: 48px;
  height: 48px;
  border: 3px solid #fff;
  border-radius: 50%;
  display: inline-block;
  position: relative;
  box-sizing: border-box;
  animation: rotation 1s linear infinite;
  :after {
    content: "";
    box-sizing: border-box;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 40px;
    height: 40px;
    border-radius: 50%;
    border: 3px solid transparent;
    border-bottom-color: #ff3d00;
  }
  @keyframes rotation {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;
/** 프로젝트 페이지 */
function ProjectPage() {
  // 로딩 시점 확인용 ref
  const loader = useRef(null);
  //프로젝트 로딩 길이 제한 state
  const [loadingLength, setLoadingLength] = useState(11);
  // 필터 선택 상태를 관리할 useState 훅
  const [boardList, setBoardList] = useState([]); // boardList를 초기화하고 데이터를 저장할 상태
  const [placeSelect, setPlaceSelect] = useState("");
  const [RecruitSelect, setRecruitSelect] = useState("");

  // 필터 선택 시 호출되는 함수
  const handleSetPlace = useCallback((e) => {
    setPlaceSelect(e);
  }, []);
  /** 모집 분야 설정 */
  const handleSetRecruit = useCallback((e) => {
    setRecruitSelect(e);
  }, []);

  /** 학원지점 설정 */
  const PlaceSet = useCallback((e) => {
    setPlaceSelect(e);
  }, []);

  /** 프로젝트 아이템 생성 */
  const handleBoardItemGen = useCallback(() => {
    let contents = [];
    for (let i = 0; i <= loadingLength; i++) {
      contents.push(
        <MemberPage
          key={`board item ${i}`}
          memberRole={boardList[i]?.memberRole}
          icon={boardList[i]?.memberFileName}
          postId={boardList[i]?.memberId}
          nick={boardList[i]?.memberNickname}
          academy={boardList[i]?.memberAcademy}
          filter={boardList[i]?.memberRole}
          introduce={boardList[i]?.memberIntroduce}
          // stack={JSON.parse(boardList[i]?.memberStack)}
        />
      );
    }
    if (loadingLength !== 0)
      contents.push(
        <Loader key="loader" ref={loader}>
          <Loading />
        </Loader>
      );
    return contents;
  }, [boardList, loadingLength]);

  //기본 길이를 지정하는 부분

  useEffect(() => {
    BoardListGet().then((res) => {
      setBoardList(res);
      // setLoadingLength(res.length - 12);
    });
  }, []);

  //인터섹션이 들어간 길이 조정 로딩
  useEffect(() => {
    let observer;
    if (loader.current) {
      observer = new IntersectionObserver(([e]) => {
        if (e.isIntersecting) {
          let buf = loadingLength + 12;
          if (buf <= boardList.length) {
            setLoadingLength(boardList.length);
          } else setLoadingLength(buf);
        }
      }, {});
      observer.observe(loader.current);
    }
    return () => observer && observer.disconnect();
  }, [loader, loadingLength]);
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
            FilterCall(RecruitSelect, placeSelect).then((res) => {
              setBoardList(res);
            });
          }}
        >
          검 색
        </SubmitButton>
      </SideContents>
      <MainContents>
        <Board key="board">{handleBoardItemGen()}</Board>
      </MainContents>
    </PageContainer>
  );
}

export default ProjectPage;
