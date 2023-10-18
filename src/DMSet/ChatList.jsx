import styled from "@emotion/styled";
import React, { useCallback } from "react";
import { DMGetMessage } from "./DM";
/** 자신의 DM리스트를 담고있는 콘테이너 태그 */
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
/** 자신의 DM 아이템 태그 */
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
/** 자신의 DM 아이템 프로필 사진 태그 */
const DMProfileIcon = styled.img`
  width: 46px;
  height: 46px;
  border-radius: 16px;
  overflow: hidden;
`;
/** 자신의 DM 아이템 상세내용을 담고있는 콘테이너  태그 */
const DMInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 10px;
  overflow: hidden;
  width: 125px;
`;
/** 자신의 DM 아이템 상세내용중 상대의 이름 태그 */
const DMInfoName = styled.span`
  font-size: 12px;
  font-weight: bold;
`;
/** 자신의 DM 아이템 상세내용중 최근 대화내용 태그 */
const DMInfoContents = styled.span`
  font-size: 12px;
  width: 100%;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
`;
/** 자신의 DM 아이템 현재 상태 태그 */
const DMStatus = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 9px;
`;
/** 자신의 DM 아이템 최근 메세지 시간 확인 태그 */
const DMStatusTime = styled.span`
  color: #999;
  font-size: 10px;
`;
/** 자신의 DM 아이템 최근 메세지 확인 태그 */
const DMStatusNow = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2px 5px;
  font-size: 5px;
  border-radius: 50%;
  background-color: var(--sub-color-sub-color-3, #f4d160);
`;

function ChatList({
  DMList,
  handleSetMod,
  myId,
  handleSetTargetId,
  handlesetChatTarget,
  handleSetData,
}) {
  /** DM 리스트를 DM 아이템으로 바꾸는 function */
  const handleDMListGen = useCallback(() => {
    let contents = [];
    for (let i = DMList?.length - 1; i >= 0; i--) {
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
            handlesetChatTarget(DMList[i]);
            handleSetTargetId(
              DMList[i]?.dmroom.dmto.memberId === myId
                ? DMList[i]?.dmroom.dmfrom.memberId
                : DMList[i]?.dmroom.dmto.memberId
            );
            DMGetMessage(DMList[i]?.dmroom.dmroomId).then((res) => {
              handleSetData(res);
            });
          }}
        >
          <DMProfileIcon
            src={
              DMList[i]?.dmroom.dmto.memberId === myId
                ? "http://projecttycoon.com/static/icons/" +
                  DMList[i]?.dmroom.dmfrom.memberFileName
                : "http://projecttycoon.com/static/icons/" +
                  DMList[i]?.dmroom.dmto.memberFileName
            }
          />
          <DMInfo>
            <DMInfoName>
              {DMList[i]?.dmroom.dmto.memberId === myId
                ? DMList[i]?.dmroom.dmfrom.memberNickname
                : DMList[i]?.dmroom.dmto.memberNickname}
            </DMInfoName>
            <DMInfoContents>{DMList[i]?.dmcontent}</DMInfoContents>
          </DMInfo>
          <DMStatus>
            <DMStatusTime>{time}</DMStatusTime>
            {DMList[i]?.dmto?.memberId === myId ? (
              DMList[i]?.dmread ? (
                <DMStatusTime />
              ) : (
                <DMStatusNow>N</DMStatusNow>
              )
            ) : (
              <DMStatusTime />
            )}
          </DMStatus>
        </DMItem>
      );
    }
    return contents;
  }, [
    DMList,
    handleSetData,
    handleSetMod,
    handleSetTargetId,
    handlesetChatTarget,
    myId,
  ]);
  return <DMLists>{handleDMListGen()}</DMLists>;
}

export default ChatList;
