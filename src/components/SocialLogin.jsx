import React from "react";
import styled from "@emotion/styled";
import { RiKakaoTalkFill } from "react-icons/ri";
import { SiNaver } from "react-icons/si";
import { BsArrowRight } from "react-icons/bs";

const SocialLoginContainer = styled.div`
  display: flex;
  box-sizing: border-box;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
  width: 100%;
`;
const ButtonBase = styled.div`
  display: flex;
  box-sizing: border-box;
  justify-content: space-between;
  align-items: center;
  padding: 10px 15px;
  color: ${(props) => props.color};
  background-color: ${(props) => props.bgColor};
  border-radius: 5px;
  width: 100%;
  font-size: 30px;
  user-select: none;
  cursor: pointer;
  :hover {
    scale: 1.01;
  }
  :active {
    scale: 0.99;
  }
`;
const LogoBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
const TextInfo = styled.span`
  font-size: 20px;
`;

function SocialLogin() {
  return (
    <SocialLoginContainer>
      <ButtonBase bgColor="#2DB400" color="#ffffff">
        <LogoBox>
          <SiNaver fontSize={"25px"} />
        </LogoBox>
        <TextInfo>Log in with Naver</TextInfo>
        <BsArrowRight />
      </ButtonBase>
      <ButtonBase bgColor="#FFE812" color="#000000">
        <LogoBox>
          <RiKakaoTalkFill fontSize={"30px"} />
        </LogoBox>
        <TextInfo>Log in with Kakao</TextInfo>
        <BsArrowRight />
      </ButtonBase>
    </SocialLoginContainer>
  );
}

export default SocialLogin;
