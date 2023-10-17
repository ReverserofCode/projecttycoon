import styled from "@emotion/styled";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { BsSend } from "react-icons/bs";
import { DMGetMessage } from "./DM";
/** 자신의 DM 아이템 프로필 사진 태그 */
const DMProfileIcon = styled.img`
  width: 46px;
  height: 46px;
  border-radius: 16px;
  overflow: hidden;
`;
/** 자신의 DM 아이템 상세내용중 상대의 이름 태그 */
const DMInfoName = styled.span`
  font-size: 12px;
  font-weight: bold;
`;
/** DM 모달의 chat 모드시 활성화되는 콘테이너 태그 */
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
/** DM chat 모드 상대의 정보 표시 헤더 콘테이너 태그 */
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
/** DM chat 모드 채팅 내용을 담고있는 콘테이너 태그 */
const ChatListUp = styled.div`
  display: flex;
  box-sizing: border-box;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding: 5px;
  width: 100%;
  height: 424px;
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
/** DM chat 모드 채팅의 날짜를 담고있는 콘테이너 태그 */
const ChatDateZone = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
`;
/** DM chat 모드 채팅의 날짜 태그 */
const ChatDate = styled.span`
  color: #999;
  font-size: 10px;
`;
/** DM chat 자신이 보낸 채팅의 내용을 담고있는 콘테이너 태그 */
const ChatSend = styled.div`
  display: flex;
  box-sizing: border-box;
  justify-content: flex-start;
  align-items: flex-end;
  width: 100%;
  gap: 5px;
`;
/** DM chat 자신이 보낸 채팅의 내용 태그 */
const SendContents = styled.div`
  padding: 5px 10px;
  white-space: break-spaces;
  word-break: break-all;
  font-size: 12px;
  background: #d9d9d9;
  border-radius: 5px;
  max-width: 70%;
`;
/** DM chat 상대방이 보낸 채팅의 내용을 담고있는 콘테이너 태그 */
const ChatGet = styled.div`
  display: flex;
  box-sizing: border-box;
  justify-content: flex-end;
  align-items: flex-end;
  width: 100%;
  gap: 5px;
`;
/** DM chat 상대방이 보낸 채팅의 내용 태그 */
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
/** DM chat 채팅을 입력하고 보내는 버튼을 담고있는 콘테이너 태그 */
const ChatInputZone = styled.div`
  display: flex;
  box-sizing: border-box;
  justify-content: center;
  align-items: center;
  height: 40px;
  width: 100%;
`;
/** DM chat 채팅을 입력하는 태그 */
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
/** DM chat 자신이 입력한 내용을 보내는 버튼 태그 */
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
/** DM chat 스크롤을 이동시키기 위한 자리표시 태그 */
const Loader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  border-bottom: 1px solid black;
`;

function ChatRoom({ chatData, chatTarget, myId, targetId, handleSetData }) {
  /** 채팅의 높이 조절을 위한 ref */
  const ScrollTo = useRef(null);
  const [chatInput, setChatInput] = useState();
  /** 채팅 내용을 보내는 function */
  const handleSend = useCallback(() => {
    DMSend(chatInput, targetId, myId, chatTarget.dmroom.dmroomId).then(() => {
      setChatInput("");
      DMGetMessage(chatTarget.dmroom.dmroomId).then((res) => {
        handleSetData(res);
      });
    });
  }, [chatInput, chatTarget.dmroom.dmroomId, handleSetData, myId, targetId]);
  /** 채팅내용 리스트로부터 채팅 아이템을 생성 하는 function */
  const handleChatGen = useCallback(() => {
    let contents = [];
    let loader = false;
    for (let i = 0; i < chatData.length; i++) {
      const date = new Date(chatData[i].createdAt);
      let month = date.getMonth() + 1;
      let day = date.getDate();
      let hour = date.getHours();
      let min = date.getMinutes();
      hour = hour < 10 ? "0" + hour : hour;
      min = min < 10 ? "0" + min : min;
      const time = hour + ":" + min;
      if (loader === false && chatData[i].dmread === false) {
        loader = true;
        contents.push(
          <Loader ref={ScrollTo} key={`loading`}>
            여기서 부터 확인하세요
          </Loader>
        );
      }
      if (chatData[i].dmfrom.memberId !== targetId) {
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
  /** 해당 item으로 이동 */
  useEffect(() => {
    if (ScrollTo.current) {
      ScrollTo.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
        inline: "center",
      });
    }
  }, [ScrollTo]);
  /** 채팅내용 3초마다 업데이트 하기 */
  useEffect(() => {
    const dataSet = setInterval(() => {
      handleSetData(
        DMGetMessage().then((res) => {
          return res;
        })
      );
    }, 3000);
    return () => {
      clearInterval(dataSet);
    };
  }, [handleSetData]);
  return (
    <ChatBase>
      <ChatHeaderZone>
        <DMProfileIcon
          src={
            chatTarget.dmroom.dmto.memberId === targetId
              ? "http://projecttycoon.com/static/icons/" +
                chatTarget.dmroom.dmto.memberFileName
              : "http://projecttycoon.com/static/icons/" +
                chatTarget.dmroom.dmfrom.memberFileName
          }
        />
        <DMInfoName>
          {" "}
          {chatTarget.dmroom.dmto.memberId === targetId
            ? chatTarget.dmroom.dmto.memberNickname
            : chatTarget.dmroom.dmfrom.memberNickname}
        </DMInfoName>
      </ChatHeaderZone>
      <ChatListUp>{handleChatGen()}</ChatListUp>
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
  );
}

export default ChatRoom;
