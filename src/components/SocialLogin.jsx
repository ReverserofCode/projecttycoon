import React from "react";
import styled from "@emotion/styled";
import { RiKakaoTalkFill } from "react-icons/ri";
import { SiNaver } from "react-icons/si";
import { BsArrowRight } from "react-icons/bs";
import { KakaoLogin } from "../functional/KakaoLogin";
/** 소셜로그인을 담고 있는 콘테이너 태그 */
const SocialLoginContainer = styled.div`
  display: flex;
  box-sizing: border-box;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
  width: 100%;
`;
/** 소셜로그인 버튼 태그 */
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
/** 소셜로그인 버튼에 들어가는 기본 icon 태그 */
const LogoBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
/** 소셜로그인 버튼에 들어가는 기본 text 태그 */
const TextInfo = styled.span`
  font-size: 20px;
`;
/**카카오 및 네이버 로그인 페이지 */
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
      <ButtonBase
        bgColor="#FFE812"
        color="#000000"
        onClick={() => {
          KakaoLogin();
        }}
      >
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
