import React, { useCallback, useState } from "react";
import styled from "@emotion/styled";
import { Header30 } from "../components/TextFormat";
import LoginForm from "../components/LoginForm";
import SocialLogin from "../components/SocialLogin";
import { SubmitButton } from "../components/Buttons";
import { DMListCall } from "../DMSet/DM";
import DMmodal from "../DMSet/DMmodal";
import { AiOutlinePlus } from "react-icons/ai";
import { HoverIcon } from "../DMSet/Components";
/** 로그인 페이지의 컴포넌트를 담고있는 콘테이너 태그 */
const LoginPage = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 15px;
  width: 100%;
  margin-top: 100px;
`;
/** 메인 로그인을 담고있는 콘테이너 태그 */
const LoginBase = styled.div`
  display: flex;
  box-sizing: border-box;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  gap: 40px;
  max-width: 450px;
  box-shadow: 0 0 6px rgba(0, 0, 0, 25%);
  padding: 30px 55px;
  @media screen and (max-width: 400px) {
    padding: 30px 20px;
  }
`;
/** 하단에 위치해 분할해주는 표기 태그 */
const Devider = styled.div`
  width: 100%;
  height: 1px;
  background-color: #d9d9d9;
`;

function LoginProcess({ userData }) {
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
  return (
    <LoginPage>
      <LoginBase>
        <Header30 color="#0B666A">타이쿤</Header30>
        <LoginForm />
        <Devider />
        <SocialLogin />
      </LoginBase>
      <SubmitButton
        onClick={() => {
          window.location.href = "http://projecttycoon.com/api/signup";
        }}
      >
        SignUp
      </SubmitButton>
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
    </LoginPage>
  );
}

export default LoginProcess;
