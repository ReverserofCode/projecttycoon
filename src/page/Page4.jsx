import { PixelText40 } from "../components/Pixel";
import Image from "../img/monitor.png";
import ButtonIcon from "../img/ButtonMember 1.png";
import styled from "@emotion/styled";
import "./Page4.css";
const Wrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
`;
const Container = styled.div`
  /* background-color: white; */
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 0 140px;
  box-sizing: border-box;
`;
const TextZone = styled.div`
  /* border: 1px red solid; */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  margin-bottom: 20px;
  /* width: 100%; */
`;
const ImgBox = styled.div`
  max-width: 600px;
  width: 100%;
`;
const Img = styled.img`
  width: 100%;
`;
// 애니메이션 이미지
const ShootingImg = styled.img``;
const BearImg = styled.img``;
const FightImg = styled.img``;
// 화살표
const Arrow = styled.div`
  position: relative;
  height: 50vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Button = styled.div`
  margin-top: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  :active {
    scale: 0.98;
  }
`;
function Page4({ target }) {
  return (
    <Wrap ref={target}>
      <Container className="Home2">
        <TextZone>
          <h1 className="First">
            <span>"</span>
            <span className="Color">PROJECT</span>
          </h1>
          <h1>
            <span className="Color2">TYCOON</span>
            <span>"</span>
          </h1>
          <div className="imgArea">
            <ShootingImg
              className="Shoot"
              src="./src/img/shoot.png"
            ></ShootingImg>
            <BearImg className="Bear" src="./src/img/bear.gif"></BearImg>
            <FightImg className="Fight" src="./src/img/fight.gif"></FightImg>
          </div>
        </TextZone>
      </Container>
      <Arrow className="arrowArea">
        <div className="arrowSliding">
          <div className="arrow"></div>
        </div>
        <div className="arrowSliding delay1">
          <div className="arrow"></div>
        </div>
        <div className="arrowSliding delay2">
          <div className="arrow"></div>
        </div>
      </Arrow>
    </Wrap>
  );
}

export default Page4;
