import React, { useCallback, useRef, useState } from "react";
import styled from "@emotion/styled";
import { BsChatText, BsSend } from "react-icons/bs";
import { AiOutlineStar } from "react-icons/ai";
import { DMGetMessage, DMListCall, DMSend } from "../functional/DM";
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
`;
const HeaderZone = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 20px;
  width: 100%;
  font-weight: bold;
`;
const IconButtons = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
`;
const IconButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  :hover {
    color: #f4d160;
  }
`;
const DMLists = styled.ul`
  display: flex;
  box-sizing: border-box;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: fit-content;
  list-style: none;
  padding: 0;
  gap: 10px;
`;
const DMItem = styled.li`
  display: flex;
  box-sizing: border-box;
  justify-content: space-between;
  align-items: center;
  height: 70px;
  width: 100%;
  border-radius: 10px;
  border: 1px solid var(--main-color-main-color-2, #0b666a);
  background: #fff;
  padding: 10px;
`;
const DMProfileIcon = styled.img`
  width: 46px;
  height: 46px;
  border-radius: 16px;
  overflow: hidden;
`;
const DMInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 10px;
  overflow: hidden;
  width: 125px;
`;
const DMInfoName = styled.span`
  font-size: 12px;
  font-weight: bold;
`;
const DMInfoContents = styled.span`
  font-size: 12px;
  width: 100%;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
`;
const DMStatus = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 9px;
`;
const DMStatusTime = styled.span`
  color: #999;
  font-size: 10px;
`;
const DMStatusNow = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2px 5px;
  font-size: 5px;
  border-radius: 50%;
  background-color: var(--sub-color-sub-color-3, #f4d160);
`;
const ChatBase = styled.div`
  display: flex;
  box-sizing: border-box;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  width: 100%;
  height: 100%;
  border-radius: 10px;
  border: 1px solid var(--main-color-main-color-2, #0b666a);
  margin-top: 10px;
`;
const ChatHeaderZone = styled.div`
  display: flex;
  box-sizing: border-box;
  padding: 5px 10px;
  justify-content: flex-start;
  align-items: center;
  gap: 8px;
  width: 100%;
  border-bottom: 1px solid #8c8c8c;
`;
const ChatListUp = styled.div`
  display: flex;
  box-sizing: border-box;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding: 5px;
  width: 100%;
  height: 100%;
  overflow-y: scroll;
  gap: 10px;
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
`;
const ChatDateZone = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
`;
const ChatDate = styled.span`
  color: #999;
  font-size: 10px;
`;
const ChatSend = styled.div`
  display: flex;
  box-sizing: border-box;
  justify-content: flex-start;
  align-items: flex-end;
  width: 100%;
  gap: 5px;
`;
const SendContents = styled.div`
  padding: 5px 10px;
  white-space: break-spaces;
  word-break: break-all;
  font-size: 12px;
  background: #d9d9d9;
  border-radius: 5px;
  max-width: 70%;
`;
const ChatGet = styled.div`
  display: flex;
  box-sizing: border-box;
  justify-content: flex-end;
  align-items: flex-end;
  width: 100%;
  gap: 5px;
`;
const GetContents = styled.div`
  padding: 5px 10px;
  white-space: break-spaces;
  word-break: break-all;
  font-size: 12px;
  background: var(--main-color-main-color-2, #0b666a);
  border-radius: 5px;
  color: white;
  max-width: 70%;
`;
const ChatInputZone = styled.div`
  display: flex;
  box-sizing: border-box;
  justify-content: center;
  align-items: center;
  height: 40px;
  width: 100%;
`;
const ChatInput = styled.textarea`
  box-sizing: border-box;
  height: 40px;
  width: 214px;
  resize: none;
  padding: 0;
  border: none;
  border-top: 1px solid black;
  border-radius: 0 0 0 10px;
  outline: none;
  padding: 5px;
  ::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    background-color: #f5f5f5;
  }
  ::-webkit-scrollbar {
    width: 3px;
    background-color: #f5f5f5;
  }
  ::-webkit-scrollbar-thumb {
    background-color: #f90;
    background-image: #d9d9d9;
  }
`;
const ChatSendButton = styled.div`
  display: flex;
  box-sizing: border-box;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  background-color: var(--sub-color-sub-color-3, #f4d160);
  border-radius: 0 0 10px 0;
  color: #1a0808;
  border-left: 1px solid black;
  border-top: 1px solid black;
  :hover {
    background-color: #ffe812;
  }
  :active {
    background-color: var(--sub-color-sub-color-3, #f4d160);
  }
`;

function DMmodal({ status, DMList, Mod, handleSetMod, myId, handleGetList }) {
  const [targetId, setTargetId] = useState("");
  const [chatTarget, setChatTarget] = useState([]);
  const [chatData, setChatData] = useState([]);
  const ChatRef = useRef(null);
  const [chatInput, setChatInput] = useState("");
  const handleSend = useCallback(() => {
    DMSend(
      chatInput,
      chatTarget.dmroom.dmto.memberId,
      myId,
      chatTarget.dmroom.dmroomId
    ).then(() => {
      setChatInput("");
      DMGetMessage(chatTarget.dmroom.dmroomId).then((res) => {
        setChatData(res);
      });
    });
  }, [chatInput, chatTarget, myId]);
  const handleChatGen = useCallback(() => {
    let contents = [];
    for (let i = 0; i < chatData.length; i++) {
      const date = new Date(chatData[i].createdAt);
      let month = date.getMonth() + 1;
      let day = date.getDate();
      let hour = date.getHours();
      let min = date.getMinutes();
      hour = hour < 10 ? "0" + hour : hour;
      min = min < 10 ? "0" + min : min;
      const time = hour + ":" + min;
      if (chatData[i].dmroom.dmfrom.memberId === targetId) {
        contents.push(
          <ChatGet key={`Chat ${i}`}>
            <ChatDateZone>
              <ChatDate>
                {month}월{day}일
              </ChatDate>
              <ChatDate>{time}</ChatDate>
            </ChatDateZone>
            <GetContents>{chatData[i].dmcontent}</GetContents>
          </ChatGet>
        );
      } else {
        contents.push(
          <ChatSend key={`Chat ${i}`}>
            <SendContents>{chatData[i].dmcontent}</SendContents>
            <ChatDateZone>
              <ChatDate>
                {month}월{day}일
              </ChatDate>
              <ChatDate>{time}</ChatDate>
            </ChatDateZone>
          </ChatSend>
        );
      }
    }
    return contents;
  }, [chatData, targetId]);
  const handleDMListGen = useCallback(() => {
    let contents = [];
    for (let i = 0; i < DMList.length; i++) {
      const date = new Date(DMList[i]?.modifiedAt);
      let hour = date.getHours();
      let min = date.getMinutes();
      hour = hour < 10 ? "0" + hour : hour;
      min = min < 10 ? "0" + min : min;
      const time = hour + ":" + min;
      contents.push(
        <DMItem
          key={`DM List Item ${i}`}
          onClick={() => {
            handleSetMod("chat");
            setChatTarget(DMList[i]);
            setTargetId(
              DMList[i]?.dmroom.dmto.memberId === myId
                ? DMList[i]?.dmroom.dmfrom.memberId
                : DMList[i]?.dmroom.dmto.memberId
            );
            DMGetMessage(DMList[i]?.dmroom.dmroomId).then((res) => {
              setChatData(res);
            });
          }}
        >
          <DMProfileIcon src={DMList[i]?.dmroom.dmto.memberFilePath} />
          <DMInfo>
            <DMInfoName>{DMList[i]?.dmroom.dmto.memberNickname}</DMInfoName>
            <DMInfoContents>{DMList[i]?.dmcontent}</DMInfoContents>
          </DMInfo>
          <DMStatus>
            <DMStatusTime>{time}</DMStatusTime>
            {DMList[i]?.dmread ? (
              <DMStatusTime />
            ) : (
              <DMStatusNow>N</DMStatusNow>
            )}
          </DMStatus>
        </DMItem>
      );
    }
    return contents;
  }, [DMList, handleSetMod, myId]);
  return (
    <Container status={status}>
      <HeaderZone>
        <span>쪽지</span>
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
        <DMLists>{handleDMListGen()}</DMLists>
      ) : Mod === "chat" ? (
        <ChatBase>
          <ChatHeaderZone>
            <DMProfileIcon
              src={
                chatTarget.dmroom.dmto.memberId === targetId
                  ? chatTarget.dmroom.dmto.memberFilePath
                  : chatTarget.dmroom.dmfrom.memberFilePath
              }
            />
            <DMInfoName>
              {" "}
              {chatTarget.dmroom.dmto.memberId === targetId
                ? chatTarget.dmroom.dmto.memberNickname
                : chatTarget.dmroom.dmfrom.memberNickname}
            </DMInfoName>
          </ChatHeaderZone>
          <ChatListUp
            ref={ChatRef}
            onLoad={() => {
              let Height = ChatRef.current.scrollHeight;
              ChatRef.current.scrollTop = Height;
            }}
          >
            {handleChatGen()}
          </ChatListUp>
          <ChatInputZone>
            <ChatInput
              value={chatInput}
              onChange={(e) => {
                e.preventDefault();
                setChatInput(e.currentTarget.value);
              }}
            />
            <ChatSendButton
              onClick={() => {
                handleSend();
              }}
            >
              <BsSend />
            </ChatSendButton>
          </ChatInputZone>
        </ChatBase>
      ) : (
        "none"
      )}
    </Container>
  );
}

export default DMmodal;
