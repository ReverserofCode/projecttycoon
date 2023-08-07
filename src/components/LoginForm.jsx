import styled from "@emotion/styled";
import React, { useState } from "react";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";
import { SubmitButton } from "./Buttons";

const LoginFormContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
  width: 100%;
  box-sizing: border-box;
`;
const InputModel = styled.input`
  box-sizing: border-box;
  font-size: 20px;
  height: 50px;
  width: 100%;
  padding: 0 10px;
  border-radius: 5px;
  border-color: 0.5px solid #d9d9d9;
`;
const PasswordZone = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  width: 100%;
`;
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
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [view, setView] = useState("password");
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
        ></InputModel>
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
      <SubmitButton>로그인</SubmitButton>
    </LoginFormContainer>
  );
}

export default LoginForm;
