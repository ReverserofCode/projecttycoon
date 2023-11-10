import { PixelText40 } from "../components/Pixel";
import Image from "../img/Laptop.png";
import ButtonIcon from "../img/ButtonNewProject.png";
import styled from "@emotion/styled";
import Img1 from "../img/page1img.png"

const Wrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
`;
const Container = styled.div`
  background-color: #0b666a;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  box-sizing: border-box;
  max-width: 1100px;
`;
const TextZone = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  width: 60%;
`;
const ImgBox = styled.div`
  max-width: 450px;
  width: 100%;
  @media (max-width: 830px) {
    width: 100%;
    max-width: 400px;
  }
  @media (max-width: 750px) {
    width: 100%;
    max-width: 350px;
  }
   @media (max-width: 650px) {
    width: 100%;
    max-width: 300px;
  }
  @media (max-width: 550px) {
    width: 100%;
    max-width: 240px;
    margin-right: 12px;
  }
  @media (max-width: 460px) {
    width: 100%;
    max-width: 200px;
    margin-right: 12px;
  }
  @media (max-width: 370px) {
    width: 100%;
    max-width: 170px;
    margin-right: 12px;
  }
`;
const Img = styled.img`
  width: 100%;
`;
const Button = styled.div`
  max-width: 300px;
  width: 100%;
  margin-top: 20px;
  :hover {
    scale: 0.98;
    cursor: pointer;
  }
  @media (max-width: 760px) {
    max-width: 250px;
    width: 100%;
    font-size: 25px;
  }
  @media (max-width: 650px) {
    max-width: 210px;
    width: 100%;
    font-size: 17px;
  }
  @media (max-width: 550px) {
    max-width: 180px;
    width: 100%;
    font-size: 13px;
  }
  @media (max-width: 460px) {
     max-width: 150px;
     width: 100%;
    font-size: 12px;
  }
  @media (max-width: 380px) {
    max-width: 120px;
     width: 100%;
    font-size: 11px;
  }
`;
const Width = styled.div`
  width: 100%;
  background-color: #0b666a;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const W =styled.div`
margin-left: 12px;
width: 100%;
align-items: center;
  display: flex;
  justify-content: space-around;
  @media (max-width: 550px) {
    justify-content: space-around;
  }
`
const Link = styled.a`
  text-decoration: none;
`;

function Page1({ target, userData }) {
  return (
    <Wrap ref={target}>
      <Width>
        <Container>
          <W>
          <TextZone>
            <PixelText40 >전국에 있는 코리아IT학원</PixelText40>
            <PixelText40>사람들과 함께하는</PixelText40>
            <PixelText40 >프로젝트를 개설해보세요.</PixelText40>
            <Button>
              <Link href={
              userData === "" || userData === undefined
                ? "http://projecttycoon.com/api/login"
                : "http://projecttycoon.com/callPageNewProject"
            }>
              <Img src="http://projecttycoon.com/static/images/ButtonNewProject.png" />
              </Link>
            </Button>
          </TextZone>
          <ImgBox>
            <Img src="http://projecttycoon.com/static/images/page1.png" />
          </ImgBox>
          </W>
        </Container>
      </Width>
    </Wrap>
  );
}

export default Page1;
