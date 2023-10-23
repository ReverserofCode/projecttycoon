import styled from "@emotion/styled";
import React, { useRef, useCallback, useEffect, useState } from "react";
import { CheckSide } from "../components/Sidebar/SidebarComponent";
import { MainHeader, SubmitButton } from "../components/Sidebar/SidebarStyle";
import MemberPage from "../components/MemberPage";
import { Place, Recruit } from "../Filter.json";
import { BoardListGet } from "../functional/BoardList";
import { FilterCall } from "../functional/FilterGet";
import Scroll from "../functional/ScrollButton";
import { DMListCall } from "../DMSet/DM";
import DMmodal from "../DMSet/DMmodal";
import { AiOutlinePlus } from "react-icons/ai";
import { HoverIcon } from "../DMSet/Components";
/** 프로젝트 페이지의 컴포넌트를 담고있는 콘테이너 태그 */
const PageContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  width: 100%;
  height: fit-content;
  margin-top: 50px;
  margin-bottom: 100px;
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
  top: 10px;
  left: 10px;
  gap: 15px;
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
/** 스크롤 up 버튼 생성*/
const ScrollButton = styled.div`
  display: flex;
  position: fixed;
  bottom: 60px;
  right: 120px;
  width: 45px;
  @media (max-width: 360px) {
    right: 5px;
    bottom: 40px;
  }
  @media (max-width: 420px) {
    right: 5px;
  }
  @media (max-width: 520px) {
    right: 5px;
  }
`;
/** 프로젝트 페이지 */
function ProjectPage({ userData }) {
  // 로딩 시점 확인용 ref
  const loader = useRef(null);
  //프로젝트 로딩 길이 제한 state
  const [loadingLength, setLoadingLength] = useState(0);
  // 필터 선택 상태를 관리할 useState 훅
  const [boardList, setBoardList] = useState([]); // boardList를 초기화하고 데이터를 저장할 상태
  const [placeSelect, setPlaceSelect] = useState("");
  const [RecruitSelect, setRecruitSelect] = useState("");
  /** 자신의 DM 리스트 state */
  const [DMList, setDMList] = useState();
  /** DM 창이 열려있는지 확인하는 state */
  const [DMOpen, setDMOpen] = useState(false);
  /** DM창의 모드를 확인하는 state */
  const [sendMod, setSendMod] = useState("chatlist");
  /** DM 창 오픈 */
  const handleSetOpen = useCallback(() => {
    setDMOpen(true);
    if (userData !== "" && userData !== undefined) {
      DMListCall(userData?.memberId).then((res) => {
        setDMList(res);
      });
    }
  }, [userData]);
  /** DM창의 모드를 변경하는 function */
  const handleSetMod = useCallback((value) => {
    setSendMod(value);
  }, []);
  /** 자신의 ID를 통해 자신의 DM 리스트를 가져오는 funtion */
  const handleGetList = useCallback(() => {
    if (userData !== "" && userData !== undefined) {
      DMListCall(userData?.memberId).then((res) => {
        setDMList(res);
      });
    }
  }, [userData]);

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
    for (let i = 0; i < loadingLength; i++) {
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
          stack={JSON.parse(boardList[i]?.memberStack)}
          handleSetOpen={handleSetOpen}
          userData={userData}
        />
      );
    }
    if (loadingLength !== boardList?.length)
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
    });
  }, []);

  //인터섹션이 들어간 길이 조정 로딩
  useEffect(() => {
    let observer;
    if (loader.current) {
      observer = new IntersectionObserver(([e]) => {
        if (e.isIntersecting) {
          let buf = loadingLength + 12;
          if (buf >= boardList?.length) {
            buf = boardList?.length;
            setLoadingLength(buf);
          } else setLoadingLength(buf);
        }
      }, {});
      observer.observe(loader.current);
    }
    return () => observer && observer.disconnect();
  }, [boardList?.length, loader, loadingLength]);
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
              setLoadingLength(0);
            });
          }}
        >
          검 색
        </SubmitButton>
      </SideContents>
      <MainContents>
        <Board key="board">{handleBoardItemGen()}</Board>
      </MainContents>
      <ScrollButton>
        <Scroll></Scroll>
      </ScrollButton>
      <DMmodal
        status={DMOpen}
        DMList={DMList}
        Mod={sendMod}
        myId={userData?.memberId}
        handleSetMod={handleSetMod}
        handleGetList={handleGetList}
      />
      <HoverIcon
        onClick={() => {
          setDMOpen(!DMOpen);
          setSendMod("chatlist");
          if (!DMOpen) {
            handleGetList();
          }
        }}
        status={DMOpen}
      >
        <AiOutlinePlus />
      </HoverIcon>
    </PageContainer>
  );
}

export default ProjectPage;
