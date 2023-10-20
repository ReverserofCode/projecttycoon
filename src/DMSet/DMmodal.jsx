import React, { useCallback, useState } from "react";
import styled from "@emotion/styled";
import { BsChatText } from "react-icons/bs";
import { AiOutlineStar } from "react-icons/ai";
import ChatRoom from "./ChatRoom";
import ChatList from "./ChatList";
/** DM 모달의 콘테이너 태그 */
const Container = styled.div`
  transition: 200ms;
  box-sizing: border-box;
  ${(props) => {
    return props.status ? { display: "flex" } : { display: "none" };
  }}
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 300px;
  height: 600px;
  box-shadow: 3px 3px 3px 3px rgba(0, 0, 0, 0.25);
  position: fixed;
  bottom: 10px;
  right: 90px;
  padding: 20px;
  overflow-y: scroll;
  ::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    background-color: #f5f5f5;
  }
  ::-webkit-scrollbar {
    width: 6px;
    background-color: #f5f5f5;
  }
  ::-webkit-scrollbar-thumb {
    background-color: #f90;
    background-image: -webkit-linear-gradient(
      45deg,
      rgba(255, 255, 255, 0.2) 25%,
      transparent 25%,
      transparent 50%,
      rgba(255, 255, 255, 0.2) 50%,
      rgba(255, 255, 255, 0.2) 75%,
      transparent 75%,
      transparent
    );
  }
  background-color: white;
  @media screen and (max-width: 370px) {
    right: 50px;
  }
`;
/** DM 모달의 메인 제목과 창이동 icon을 담고있는 콘테이너 태그 */
const HeaderZone = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 20px;
  width: 100%;
  font-weight: bold;
`;
/** DM 모달의 창이동 icon들을 담고있는 콘테이너 태그 */
const IconButtons = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
`;
/** DM 모달의 창이동 icon 태그 */
const IconButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  :hover {
    color: #f4d160;
  }
`;

function DMmodal({ status, DMList, Mod, handleSetMod, myId, handleGetList }) {
  /** 상대방의 id를 담고있는 state */
  const [targetId, setTargetId] = useState("");
  /** 상대방의 정보를 담고있는 state */
  const [chatTarget, setChatTarget] = useState([]);
  /** 채팅의 리스트 state */
  const [chatData, setChatData] = useState([]);
  /** 채팅 리스트 set function */
  const handleSetData = useCallback((e) => {
    setChatData(e);
  }, []);
  const handleSetTargetId = useCallback((e) => {
    setTargetId(e);
  }, []);
  const handlesetChatTarget = useCallback((e) => {
    setChatTarget(e);
  }, []);
  return (
    <Container status={status}>
      <HeaderZone>
        <span style={{ color: "black" }}>쪽지</span>
        <IconButtons>
          <IconButton>
            <AiOutlineStar fontSize={"25px"}></AiOutlineStar>
          </IconButton>
          <IconButton
            onClick={() => {
              handleSetMod("chatlist");
              handleGetList();
            }}
          >
            <BsChatText />
          </IconButton>
        </IconButtons>
      </HeaderZone>
      {Mod === "chatlist" ? (
        <ChatList
          DMList={DMList}
          handleSetMod={handleSetMod}
          myId={myId}
          handleSetTargetId={handleSetTargetId}
          handlesetChatTarget={handlesetChatTarget}
          handleSetData={handleSetData}
          key={`chat list ${myId}`}
        />
      ) : Mod === "chat" ? (
        <ChatRoom
          chatData={chatData}
          chatTarget={chatTarget}
          myId={myId}
          targetId={targetId}
          handleSetData={handleSetData}
          key={`chat room ${targetId}`}
        />
      ) : (
        "none"
      )}
    </Container>
  );
}

export default DMmodal;
