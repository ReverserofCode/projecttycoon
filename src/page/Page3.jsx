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
  box-sizing: border-box;
  width: 100%;
`;
const TextZone = styled.div`
margin-left: 4px;
  min-width: 500px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  width: 60%;
  @media (max-width: 920px) {
    width: 55%;
    min-width: 410px;
  }
  @media (max-width: 820px) {
    width: 50%;
  }
  @media (max-width: 760px) {
    width: 50%;
    min-width: 330px;
  }
  @media (max-width: 720px) {
    width: 45%;
  }
  @media (max-width: 660px) {
    width: 40%;
  }
  @media (max-width: 650px) {
    width: 40%;
    min-width: 250px;
  }
  @media (max-width: 550px) {
    min-width: 200px;
  }
  @media (max-width: 580px) {
    width: 35%;
  }
  @media (max-width: 510px) {
    width: 30%;
  }
  @media (max-width: 375px) {
    width: 10%;
    min-width: 180px;
  }
`;
const ImgBox = styled.div`
  position: relative;
  display: flex;
  max-width: 400px;
  /* min-width: 150px; */
  width: 100%;
  /* justify-content: ; */

`;
const Img1 = styled.img`
  position: absolute;
  margin-left:8px ;
  top: 20%;
  right: 1%;
  width: 50%;
  animation: ${loadEffect1} 1s ease-in-out;
  @media (max-width: 680px) {
      width: 50%;
      /* right: -33px; */
  }
  @media (max-width: 650px) {
      width: 45%;
      left: 160px;
  }
  @media (max-width: 600px) {
      left: 137px;
  }
  @media (max-width: 563px) {
      /* left: 110px; */
  }
  @media (max-width: 555px) {
      width: 50%;
      left: 90;
  }
  @media (max-width: 550px) {
      width: 45%;
  }
  @media (max-width: 514px) {
    left: 120px;
  }
  @media (max-width: 500px) {
      /* width: 63%;
      min-width: 90px; */
  }
  @media (max-width: 490px) {
    left: 108px;
  }
  @media (max-width: 454px) {
    left: 96px;
  }
  @media (max-width: 432px) {
    left: 88px;
  }
  @media (max-width: 420px) {
    width: 40%;
    left: 73px;
  }
  @media (max-width: 385px) {
    width: 80px;
    left: 65px;
  }
  
`;
const Img2 = styled.img`
  width: 50%;
  @media (max-width: 680px) {
      width: 50%;
  }
  @media (max-width: 650px) {
    width: 45%;
  }
  @media (max-width: 555px) {
    width: 50%;
  }
  @media (max-width: 550px) {
      width: 45%;
  }
  @media (max-width: 420px) {
    width: 40%;
  }
  @media (max-width: 385px) {
    width: 80px;
  }
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
const W =styled.div`
/* width: 100%; */
 display: flex;
  align-items: center;
  justify-content: space-evenly;
  @media (max-width: 485px) {
    width: 100%;
      display: flex;
      justify-content: space-between;
  }
`
function Page3({ target, setOff }) {
  return (
    <Wrap ref={target}>
      <Container>
        <W>
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
        </W>
      </Container>
    </Wrap>
  );
}

export default Page3;
