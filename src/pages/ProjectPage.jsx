import styled from "@emotion/styled";
import React, { useCallback, useEffect, useRef, useState } from "react";
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
  @media screen and (max-width: 600px) {
    align-items: center;
  }
`;
/** 프로젝트 페이지의 사이드바 콘테이너 태그 */
const SideContents = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  position: sticky;
  top: 80px;
  left: 10px;
  gap: 15px;
  @media screen and (max-width: 700px) {
    top: 64px;
  }
  @media screen and (max-width: 615px) {
    top: 45px;
  }
  @media screen and (max-width: 360px) {
    top: 40px;
  }
  @media screen and (max-width: 600px) {
    display: none;
  }
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
  @media screen and (max-width: 600px) {
    justify-content: center;
    margin-left: 0;
  }
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
  @media screen and (max-width: 560px) {
    justify-content: center;
  }
`;
/** 프로젝트 페이지 업데이트를 위한 loading 콘테이너 태그 */
const Loader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin-bottom: 10px;
`;
/** 프로젝트 페이지 업데이트를 위한 loading 테그 */
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
  /** 로딩 시점 확인용 ref */
  const loader = useRef(null);
  /** 프로젝트 리스트 state */
  const [boardList, setBoardList] = useState([]);
  /** 사이드바의 지역 state */
  const [placeSelect, setPlaceSelect] = useState("전체");
  /** 사이드바의 모집분야 state */
  const [RecruitSelect, setRecruitSelect] = useState([]);
  /** 사이드바의 모집분야 state */
  const [statusSelect, setStatusSelect] = useState([]);
  /** 프로젝트 로딩 길이 제한 state */
  const [loadingLength, setLoadingLength] = useState(0);
  /** 모집분야 설정 */
  const handleSetRecruit = useCallback((e) => {
    setRecruitSelect(e);
  }, []);
  /** 모집분야 설정 */
  const handleSetStatus = useCallback((e) => {
    setStatusSelect(e);
  }, []);
  /** 학원지점 설정 */
  const PlaceSet = useCallback((value) => {
    setPlaceSelect(value);
  }, []);
  /** 프로젝트 아이템 생성 */
  const handleBoardItemGen = useCallback(() => {
    let contents = [];
    for (let i = boardList?.length - 1; i >= loadingLength; i--) {
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
    if (loadingLength !== 0)
      contents.push(
        <Loader ref={loader}>
          <Loading />
        </Loader>
      );
    return contents;
  }, [boardList, loadingLength]);
  /** 프로젝트의 기본 정보를 가져오는 useEffect */
  useEffect(() => {
    BoardListGet().then((res) => {
      setBoardList(res);
      if (res.length >= 12) setLoadingLength(res.length - 12);
      else setLoadingLength(0);
    });
  }, []);
  /** 로딩 감시자를 할당 및 업데이트하는 useEffect */
  useEffect(() => {
    let observer;
    if (loader.current) {
      observer = new IntersectionObserver(([e]) => {
        if (e.isIntersecting) {
          let buf = loadingLength - 12;
          if (buf <= 0) {
            setLoadingLength(0);
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
        <MainHeader>프로젝트 필터</MainHeader>
        <SelectSide header={"지역"} contents={Place} handleSelect={PlaceSet} />
        <CheckSide
          contents={Status}
          header={"모집 현황"}
          handleSet={handleSetStatus}
        />
        <CheckSide
          contents={Recruit}
          header={"모집 분야"}
          handleSet={handleSetRecruit}
        />
        <SubmitButton
          onClick={() => {
            GetFilterList(statusSelect, RecruitSelect, placeSelect).then(
              (res) => {
                window.scrollTo({ top: 0 });
                setBoardList(res);
                let buf = boardList?.length - 12;
                if (buf >= 12) setLoadingLength(res.length - 12);
                else setLoadingLength(0);
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
