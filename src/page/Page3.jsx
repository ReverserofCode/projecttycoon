import { PixelText40 } from "../components/Pixel";
import Image from "../img/mobile.png";
import Image2 from "../img/heart.png";
import Image3 from "../img/letter.png";
import ButtonIcon from "../img/ButtonNewProject.png";
import React from "react";
import styled from "@emotion/styled";
import { keyframes } from "@emotion/react";
import "./Page3.css";
const rotate = keyframes`
0% {
    transform: scale(1)
  }
  30% {
    transform: scale(0.9)
  }
  50% {
    transform: scale(0.8)
  }
  70% {
    transform: scale(0.9)
  }
  90% {
    transform: scale(1)
  }
`;
const loadEffect1 = keyframes`
    0%{
        opacity: 0;
    }
    100%{
        opacity: 1;
    }
    from {
    transform: translateX(100%);
  }
  to {
    transform: translateX(0);
  }
`;
const Wrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
`;
const Container = styled.div`
  background-color: #071952;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 0 80px;
  box-sizing: border-box;
`;
const TextZone = styled.div`
  border: 1px solid red;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  width: 60%;
  @media (max-width: 920px) {
    width: 55%;
  }
  @media (max-width: 820px) {
    width: 50%;
  }
  @media (max-width: 720px) {
    width: 45%;
  }
  @media (max-width: 660px) {
    width: 40%;
  }
  @media (max-width: 580px) {
    width: 35%;
  }
  @media (max-width: 510px) {
    width: 30%;
  }
  @media (max-width: 420px) {
    width: 30%;
  }
  @media (max-width: 360px) {
    width: 30%;
  }
  @media (max-width: 320px) {
    width: 30%;
  }
`;
const ImgBox = styled.div`
  position: relative;
  display: flex;
  max-width: 400px;
  width: 100%;
`;
const Img1 = styled.img`
  position: absolute;
  top: 20%;
  right: 1%;
  width: 50%;
  animation: ${loadEffect1} 1s ease-in-out;
`;
const Img2 = styled.img`
  width: 50%;
`;
const Img3 = styled.img`
  position: absolute;
  top: -7px;
  width: 27%;
  right: 0px;
  animation: ${rotate} 2s linear infinite;
`;
const Img4 = styled.img`
  position: absolute;
  top: -17px;
  width: 30%;
  right: 20%;
  animation: ${rotate} 2s linear infinite;
`;

const Button = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  :active {
    scale: 0.98;
  }
`;
function Page3({ target, setOff }) {
  return (
    <Wrap ref={target}>
      <Container>
        <TextZone>
          <PixelText40 className="Text3" color="white">
            언제 어디서나{" "}
          </PixelText40>
          <PixelText40 className="Text3" color="white">
            찜과 DM을 확인하실 수 있습니다. !
          </PixelText40>
        </TextZone>
        <ImgBox>
          <Img1 src="http://projecttycoon.com/static/images/mobile.png" />
          <Img2 src="http://projecttycoon.com/static/images/mobile.png" />
          <Img3 src="http://projecttycoon.com/static/images/heart.png"></Img3>
          <Img4 src="http://projecttycoon.com/static/images/letter.png"></Img4>
        </ImgBox>
      </Container>
    </Wrap>
  );
}

export default Page3;
