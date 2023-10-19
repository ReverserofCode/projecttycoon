import React, { useCallback, useState } from "react";
import { DMListCall } from "./DM";
import DMmodal from "./DMmodal";
import { AiOutlinePlus } from "react-icons/ai";
import { HoverIcon } from "./Components";

function Sample({ userData }) {
  /** 자신의 DM 리스트 state */
  const [DMList, setDMList] = useState([]);
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
  return (
    <>
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
    </>
  );
}

export default Sample;
