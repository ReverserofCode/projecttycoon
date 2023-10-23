import { PixelText40 } from "../components/Pixel";
import Image from "../img/mobile.png";
import Image2 from "../img/heart.png";
import Image3 from "../img/letter.png"
import ButtonIcon from "../img/ButtonNewProject.png";
import React from "react";
// import styled from "styled-components";
import styled, { keyframes } from "styled-components"; /* 1.keyframes를 import하고 */
const rotate = keyframes` /* 2. css코드를 씀. */
0% {
    transform: scale(1)
  }
  20% {
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
// const bounce = keyframes`
//   0% {
//     transform: scale(1)
//   }
//   50% {
//     transform: scale(0)
//   }
//   100% {
//     transform: scale(1)
//   }
// `;
const Img1= styled.img`
position: absolute;
top: 20%;
right: 1%;
  width: 50%;
`;
const Img2 =styled.img`
/* position: absolute; */
     width: 50%;
     /* top: 10; */
`
const Img3 =styled.img`
position: absolute;
top: -7px;
    width: 27%;
    right: 0px;
    animation: ${rotate} 1s linear infinite; 
`
const Img4 =styled.img`
position: absolute;
top: -17px;
    width: 30%;
    right: 20%;
    animation: ${rotate} 1s linear infinite; 
`
const Button = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  :active {
    scale: 0.98;
  }
`;
function Page3({ target }) {
  return (
    <Wrap ref={target}>
      <Container>
        <TextZone>
          <PixelText40 color="white">언제 어디서나 </PixelText40>
          <PixelText40 color="white">찜과 DM을 확인하실 수 있습니다. !</PixelText40>
        </TextZone>
        <ImgBox>
          <Img1 src={Image} />
          <Img2 src={Image} />
          <Img3 src={Image2}></Img3>
          <Img4 src={Image3}></Img4>
        </ImgBox>
      </Container>
    </Wrap>
  );
}

export default Page3;
