import React from "react";
import styled from "@emotion/styled";
import { Header30 } from "./components/TextFormat";
import LoginForm from "./components/LoginForm";
import SocialLogin from "./components/SocialLogin";

const LoginPage = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 15px;
  max-width: 450px;
`;
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
const Devider = styled.div`
  width: 100%;
  height: 1px;
  background-color: #d9d9d9;
`;
const SignupButton = styled.div`
  display: flex;
  max-width: 450px;
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

function App() {
  return (
    <LoginPage>
      <LoginBase>
        <Header30 color="#0B666A">타이쿤</Header30>
        <LoginForm />
        <Devider />
        <SocialLogin></SocialLogin>
      </LoginBase>
      <SignupButton>SignUp</SignupButton>
    </LoginPage>
  );
}

export default App;
