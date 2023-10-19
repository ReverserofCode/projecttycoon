import styled from "@emotion/styled";
import React from "react";
import { BiError } from "react-icons/bi";
const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 80%;
  height: 100%;
  margin-top: 100px;
  max-width: 710px;
  @media screen and (max-width: 700px) {
    margin-top: 0;
  }
`;
const Title = styled.p`
  display: flex;
  justify-content: flex-start;
  align-content: center;
  font-size: 50px;
  font-weight: 600;
  color: #ff4e4e;
  margin-bottom: 0;
  @media screen and (max-width: 700px) {
    font-size: 30px;
  }
`;
const Icon = styled.div`
  font-size: 60px;
  animation: glitter 3000ms linear infinite;
  @keyframes glitter {
    0% {
      color: #ff4e4e;
    }
    50% {
      color: #00d4ff;
    }
    100% {
      color: #ff4e4e;
    }
  }
  @media screen and (max-width: 700px) {
    font-size: 40px;
  }
`;
const Info = styled.p`
  font-size: 30px;
  font-weight: 600;
  word-break: keep-all;
  @media screen and (max-width: 700px) {
    font-size: 20px;
  }
  text-align: center;
`;
const GoTo = styled.div`
  box-sizing: border-box;
  font-size: 30px;
  font-weight: 600;
  padding: 5px 10px;
  border: 5px solid #e04343;
  background-color: #ff4e4e;
  border-radius: 10px;
  color: #ffffff;
  box-shadow: 0px 0px 2px 6px #d9d9d9;
  :hover {
    border: 5px solid #ff4e4e;
    background-color: #e04343;
  }
  :active {
    box-shadow: none;
  }
  @media screen and (max-width: 700px) {
    font-size: 25px;
  }
`;

function ErrorPage({ message, goTo, goToMessage }) {
  return (
    <Container>
      <Title>
        <Icon>
          <BiError />
        </Icon>
        ERROR!!
        <Icon>
          <BiError />
        </Icon>
      </Title>
      <Info>{message}</Info>
      <GoTo
        onClick={() => {
          window.location.href = goTo;
        }}
      >
        Click Me!
      </GoTo>
    </Container>
  );
}

export default ErrorPage;
