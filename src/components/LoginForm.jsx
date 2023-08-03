import styled from "@emotion/styled";
import React, { useState } from "react";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";

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
const SubmitButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  font-weight: bold;
  width: 100%;
  height: 50px;
  color: white;
  background-color: #0b666a;
  border-radius: 10px;
  cursor: pointer;
  user-select: none;
  :hover {
    background-color: #08838a;
  }
  :active {
    scale: 0.98;
  }
`;

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
