import { PixelText40 } from "../components/Pixel";
import ProjectDM from "../img/projectDM.png"
import ButtonIcon from "../img/ButtonNewProject.png";
import React from "react";
import styled from "@emotion/styled";
import { keyframes } from "@emotion/react";
import "./Page3.css";
import projectDM1 from "../img/projectDM.png"
import projectDM2 from "../img/projectDM2.png"

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
  display: flex;
  justify-content: center;
  align-items: center;
`;
const TextZone = styled.div`
margin-left: 4px;
  /* min-width: 400px; */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  width: 60%;
`;
const ImgBox = styled.div`
  position: relative;
  display: flex;
  max-width: 400px;
  width: 100%;

`;
const Img1 = styled.img`
  position: absolute;
  /* position: relative; */
  margin-left:8px ;
  top: 20%;
  right: 1%;
  width: 50%;
  animation: ${loadEffect1} 1s ease-in-out;
min-width: 120px;
  @media (max-width: 515px) {
       min-width: 100px;
  }
  @media (max-width: 442px) {
       min-width: 90px;
  }
  @media (max-width: 400px) {
       min-width: 70px;
  }
`;
const Img2 = styled.img`
  width: 50%;
  min-width: 120px;
     @media (max-width: 515px) {
       min-width: 100px;
  }
  @media (max-width: 442px) {
       min-width: 90px;
  }
  @media (max-width: 400px) {
       min-width: 70px;
  }
`;
const Img3 = styled.img`
  position: absolute;
  top: -7px;
  width: 27%;
  right: 20px;
  animation: ${rotate} 2s linear infinite;
  @media (max-width: 660px) {
    right: 5px;
  }
  @media (max-width: 384px) {
   top: -6px;
  }
`;
const Img4 = styled.img`
  position: absolute;
  top: -17px;
  width: 30%;
  right: 20%;
  animation: ${rotate} 2s linear infinite;
@media (max-width: 569px) {
    top: -15px;
  }
  @media (max-width: 500px) {
    top: -13px;
  }
  @media (max-width: 384px) {
    top: -10px;
  }
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
width: 100%;
max-width: 1100px;
/* border: 1px red solid; */
 display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 3px;
`
function Page3({ target, setOff }) {
  return (
    <Wrap ref={target}>
      <Container>
        <W>
        <TextZone>
          <PixelText40  className="Text3" color="white">
            언제 어디서나{" "}
          </PixelText40>
          <PixelText40 className="Text3" color="white">
            찜과 DM을 확인하실 수 있습니다. !
          </PixelText40>
        </TextZone>
        <ImgBox>
          <Img1 src={projectDM2} />
          <Img2 src={projectDM1} />
          <Img3 src="http://projecttycoon.com/static/images/heart.png"></Img3>
          <Img4 src="http://projecttycoon.com/static/images/letter.png"></Img4>
        </ImgBox>
        </W>
      </Container>
    </Wrap>
  );
}

export default Page3;
