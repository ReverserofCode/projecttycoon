import { PixelText40 } from "../components/Pixel";
import Image from "../img/monitor.png";
import ButtonIcon from "../img/ButtonMember 1.png";
import styled from "@emotion/styled";
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
`;
const TextZone = styled.div`
/* border: 1px red solid; */
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
margin-top: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  :active {
    scale: 0.98;
  }
`;
function Page2({ target }) {
  return (
    <Wrap ref={target}>
      <Container>
        <ImgBox>
          <Img src={Image} />
        </ImgBox>
        <TextZone>
          <PixelText40>사람들과 DM으로 소통하며</PixelText40>
          <PixelText40>프로젝트를 만들어보세요.</PixelText40>
          <Button>
            <Img src={ButtonIcon} />
          </Button>
        </TextZone>
      </Container>
    </Wrap>
  );
}

export default Page2;
