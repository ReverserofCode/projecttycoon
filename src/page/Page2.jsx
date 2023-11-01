import { PixelText40 } from "../components/Pixel";
import Image from "../img/monitor.png";
import Image1 from "../img/memberList.png";
import ButtonIcon from "../img/ButtonMember 1.png";
import styled from "@emotion/styled";
import "./Page2.css";
const Wrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
`;
const Container = styled.div`
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 0 140px;
  box-sizing: border-box;
  @media (min-width: 1200px) {
    padding: 0 140px;
  }
  @media (max-width: 1200px) {
    padding: 0 140px;
  }
  @media (max-width: 960px) {
    padding: 0;
    padding: 0;
  }
  @media (max-width: 820px) {
    padding: 0;
  }
  @media (max-width: 720px) {
    padding: 0;
  }
  @media (max-width: 660px) {
    padding: 0;
  }
  @media (max-width: 580px) {
    padding: 0;
  }
  @media (max-width: 510px) {
    padding: 0;
  }
  @media (max-width: 420px) {
    padding: 0;
  }
  @media (max-width: 360px) {
    padding: 0;
  }
  @media (max-width: 320px) {
    padding: 0;
  }
`;
const Link = styled.a`
  text-decoration: none;
`;
const TextZone = styled.div`
  /* border: 1px red solid; */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  width: 60%;
  @media (min-width: 1200px) {
    padding-right: 30px;
  }
  @media (max-width: 1200px) {
    padding-right: 30px;
  }
  @media (max-width: 960px) {
    padding-right: 30px;
  }
  @media (max-width: 820px) {
    padding-right: 30px;
  }
  @media (max-width: 720px) {
    padding-right: 30px;
  }
  @media (max-width: 660px) {
    padding-right: 30px;
  }
  @media (max-width: 580px) {
    padding-right: 30px;
  }
  @media (max-width: 510px) {
    padding-right: 30px;
  }
  @media (max-width: 420px) {
    padding-right: 30px;
  }
  @media (max-width: 360px) {
    padding-right: 30px;
  }
  @media (max-width: 320px) {
    padding-right: 30px;
  }
`;

const ImgBox = styled.div`
  max-width: 600px;
  width: 100%;
`;
const Img = styled.img`
  width: 100%;
  /* z-index: 0; */
  position: relative;
`;
const Img2 = styled.img`
  width: 55%;
  height: auto;
  position: absolute;
  left: 22%;
  top: 20%;
`;
const Button = styled.div`
  margin-top: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  :active,
  :hover {
    scale: 0.98;
    cursor: pointer;
  }
`;
function Page2({ target }) {
  return (
    <Wrap ref={target}>
      <Container>
        <ImgBox>
          <div className="imgMember">
            <Img2 src="http://projecttycoon.com/static/images/memberList.png" />
            <Img src="http://projecttycoon.com/static/images/monitor.png" />
          </div>
        </ImgBox>
        <TextZone>
          <PixelText40 className="Text2">사람들과 DM으로 소통하며</PixelText40>
          <PixelText40 className="Text2">프로젝트를 만들어보세요.</PixelText40>
          <Button className="btn">
            <Link href="http://projecttycoon.com/members">
              <Img src="http://projecttycoon.com/static/images/ButtonMember 1.png" />
            </Link>
          </Button>
        </TextZone>
      </Container>
    </Wrap>
  );
}

export default Page2;