import React, { useCallback, useState } from "react";
import styled from "@emotion/styled";
import { AiOutlinePlus } from "react-icons/ai";
import DMmodal from "../components/DMmodal";
import { DMListCall, DMRoomGen } from "../functional/DM";
const Container = styled.div`
  transition: 200ms;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100%;
  position: relative;
`;
const HoverIcon = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
  color: white;
  border-radius: 50%;
  background-color: black;
  user-select: none;
  font-size: 25px;
  :active {
    background-color: #3b3b3b;
  }
  position: fixed;
  bottom: 10px;
  right: 20px;
  animation: ${(props) => {
      return props.status ? "trueRotate" : "falseRotate";
    }}
    300ms ease-in-out both;
  @keyframes trueRotate {
    from {
      rotate: 0deg;
    }
    to {
      rotate: 45deg;
      background-color: #3b3b3b;
    }
  }
  @keyframes falseRotate {
    from {
      rotate: 45deg;
    }
    to {
      rotate: 0deg;
    }
  }
`;
const DMTester = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border: 2px dashed black;
  padding: 5px;
`;
const DMTestInput = styled.input`
  height: 30px;
  width: 100px;
  margin-right: 10px;
  outline: none;
  border: none;
  border-bottom: 1px solid black;
  padding: 0 10px;
`;
const SubmitButton = styled.div`
  display: flex;
  padding: 5px 10px;
  justify-content: center;
  align-items: center;
  border: 1px solid black;
  user-select: none;
  :hover {
    background-color: #c9c9c9;
  }
  :active {
    background-color: white;
  }
`;

function DMRoom({ userData }) {
  const [DMList, setDMList] = useState([
    {
      createdAt: "2023-09-07T08:03:18.073+00:00",
      modifiedAt: "2023-09-07T08:03:18.073+00:00",
      dmcontent: "리ㄹㅇㄴㄹㄴㅇㄹ얼서버!!",
      dmread: false,
      dmroom: {
        dmroomId: 1,
        dmfrom: {
          createdAt: "2023-09-07T07:37:28.735+00:00",
          modifiedAt: "2023-09-07T07:37:28.735+00:00",
          memberId: "test10",
          memberPw:
            "$2a$10$d3YuOWKdU/ATN.nyPTFpR.CcZoNjjjalizZytETqc1SIIevW0aL9K",
          memberNickname: "test10",
          memberAcademy: "test",
          memberRole: "test",
          memberIntroduce: "test",
          memberLink: "test",
          memberFilePath: null,
          memberFileName: null,
          memberStack: null,
          memberAuthority: ["USER"],
        },
        dmto: {
          createdAt: "2023-09-07T07:37:54.786+00:00",
          modifiedAt: "2023-09-07T07:37:54.786+00:00",
          memberId: "test11",
          memberPw:
            "$2a$10$.FKxV5AFhJcJU81dfJwZ7elIuzYjt14qQwvsDS6.UNKlX92sBXWhi",
          memberNickname: "test11",
          memberAcademy: "test",
          memberRole: "test",
          memberIntroduce: "test",
          memberLink: "test",
          memberFilePath: null,
          memberFileName: null,
          memberStack: null,
          memberAuthority: ["USER"],
        },
      },
      dmid: 32,
    },
  ]);
  const [DMOpen, setDMOpen] = useState(false);
  const [sendMod, setSendMod] = useState("chatlist");
  const handleSetMod = useCallback((value) => {
    setSendMod(value);
  }, []);
  const handleGetList = useCallback(() => {
    DMListCall(userData?.memberId).then((res) => {
      setDMList(res);
    });
  }, [userData?.memberId]);
  return (
    <Container>
      <DMmodal
        status={DMOpen}
        DMList={DMList}
        Mod={sendMod}
        myId={userData?.memberId}
        handleSetMod={handleSetMod}
      />
      <HoverIcon
        onClick={() => {
          setDMOpen(!DMOpen);
          if (!DMOpen) {
            handleGetList();
          }
        }}
        status={DMOpen}
      >
        <AiOutlinePlus />
      </HoverIcon>
    </Container>
  );
}

export default DMRoom;
