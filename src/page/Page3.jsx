import { PixelText40 } from "../components/Pixel";
import Image from "../img/Laptop.png";
import ButtonIcon from "../img/ButtonNewProject.png";
import styled from "@emotion/styled";
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
  justify-content: center;
  width: 100%;
  padding: 0 140px;
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
  max-width: 600px;
  width: 100%;
`;
const Img = styled.img`
  width: 100%;
`;
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
          <PixelText40>전국에 있는 코리아IT학원</PixelText40>
          <PixelText40>사람들과 함께하는</PixelText40>
          <PixelText40>프로젝트를 개설해보세요.</PixelText40>
          <Button>
            <Img src={ButtonIcon} />
          </Button>
        </TextZone>
        <ImgBox>
          <Img src={Image} />
        </ImgBox>
      </Container>
    </Wrap>
  );
}

export default Page3;
