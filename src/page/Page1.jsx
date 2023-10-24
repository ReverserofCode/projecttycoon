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
  overflow: hidden;
`;
const Container = styled.div`
  background-color: #0b666a;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 0 140px;
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
  max-width: 500px;
  width: 100%;
`;
const Img = styled.img`
  width: 100%;
`;
const Button = styled.div`
  max-width: 300px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  :active {
    scale: 0.98;
  }
`;
const Width = styled.div`
  width: 100%;
  background-color: #0b666a;
  display: flex;
  justify-content: center;
  align-items: center;
`;
function Page1({ target }) {
  return (
    <Wrap ref={target}>
      <Width>
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
      </Width>
    </Wrap>
  );
}

export default Page1;
