import styled from "@emotion/styled";
import React, { useCallback, useState } from "react";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";
import { SubmitButton } from "./Buttons";
import { LoginSubmit } from "../functional/Login";
/** 메인 로그인의 콘테이너 태그 */
const LoginFormContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
  width: 100%;
  box-sizing: border-box;
`;
/** 모든 input의 형태를 담당 하는 태그 */
const InputModel = styled.input`
  box-sizing: border-box;
  font-size: 20px;
  height: 50px;
  width: 100%;
  padding: 0 10px;
  border-radius: 5px;
  border-color: 0.5px solid #d9d9d9;
`;
/** 비밀번호의 확인을 위해 input과 type 변환 버튼을 담고있는 콘테이너 태그 */
const PasswordZone = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  width: 100%;
`;
/** 비밀번호 type 변환 버튼을 담고 있는 콘테이너 태그 */
const PasswordViewButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  right: 5px;
  cursor: pointer;
  font-size: 30px;
`;
/** 자체 로그인 Component */
function LoginForm() {
  /** Id를 보관하는 state */
  const [id, setId] = useState("");
  /** Password를 보관하는 state */
  const [password, setPassword] = useState("");
  /** Password의 Type을 담당하는 state */
  const [view, setView] = useState("password");
  /** 메인 로그인 요청을 보내는 function */
  const handleLogin = useCallback(() => {
    LoginSubmit(id, password).then((data) => {
      console.log(data);
    });
  }, [id, password]);
  /** 메인 로그인 요청을 보내는 function */
  const handleEnterLogin = useCallback(
    (e) => {
      if (e.key === "Enter") {
        LoginSubmit(id, password).then((data) => {
          console.log(data);
        });
      }
    },
    [id, password]
  );
  return (
    <LoginFormContainer>
      <InputModel
        placeholder="아이디"
        value={id}
        onChange={(e) => {
          e.preventDefault();
          setId(e.target.value);
        }}
      />
      <PasswordZone>
        <InputModel
          placeholder="비밀번호"
          value={password}
          type={view}
          onChange={(e) => {
            e.preventDefault();
            setPassword(e.target.value);
          }}
          onKeyDown={handleEnterLogin}
        />
        <PasswordViewButton>
          {view === "password" ? (
            <AiOutlineEye
              onClick={() => {
                setView("text");
              }}
            ></AiOutlineEye>
          ) : (
            <AiOutlineEyeInvisible
              onClick={() => {
                setView("password");
              }}
            ></AiOutlineEyeInvisible>
          )}
        </PasswordViewButton>
      </PasswordZone>
      <SubmitButton onClick={handleLogin}>로그인</SubmitButton>
    </LoginFormContainer>
  );
}

export default LoginForm;
