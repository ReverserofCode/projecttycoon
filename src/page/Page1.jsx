import desktop from "../img/monitor.png";
import styled from "@emotion/styled";
const Wrap = styled.div`
  background-color: #0b666a;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const PageOne = styled.div`
  max-width: 1300px;
  height: 500px;
  width: 100%;
`;
const ImgBox = styled.div`
  max-width: 600px;
  width: 100%;
`;
const Img = styled.img`
  width: 100%;
`;
function Page1() {
  return (
    <Wrap>
      <PageOne>
        <ImgBox>
          <Img src={desktop}></Img>
        </ImgBox>
        <div>사람들과 DM으로 소통하며 프로젝트를 만들어보세요.</div>
      </PageOne>
    </Wrap>
  );
}

export default Page1;
