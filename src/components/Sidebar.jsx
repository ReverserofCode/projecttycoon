import styled from "@emotion/styled";
import { useCallback } from "react";
const Base = styled.div`
  display: flex;
  box-sizing: border-box;
  justify-content: center;
  align-items: flex-start;
  flex-direction: column;
  padding: 20px 13px;
  box-shadow: 4px 4px 4px 0px rgba(0, 0, 0, 0.25);
  border: 1px solid var(--main-color-main-color-2, #0b666a);
  min-width: 250px;
  gap: 15px;
  border-radius: 10px;
`;
const Header = styled.span`
  color: #0b666a;
  font-size: 25px;
  white-space: nowrap;
`;
const PosterContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
`;
const Poster = styled.img`
  height: 100px;
`;
const Contents = styled.div`
  display: flex;
  box-sizing: border-box;
  justify-content: flex-start;
  align-items: flex-start;
  width: 100%;
  border-top: 1px solid #75c2f6;
  gap: 10px;
  padding: 10px 0;
`;
const Title = styled.div`
  width: fit-content;
  white-space: nowrap;
  font-size: 15px;
  font-weight: 600;
  width: 80px;
`;
const Info = styled.div`
  width: 130px;
  font-size: 12px;
`;
const RecruitContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 10px;
`;
const Recruit = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  gap: 10px;
`;
const RecruitIcon = styled.span`
  height: 30px;
  width: 80px;
`;
const RecruitNumbers = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 30px;
`;
const RecruitNow = styled.span``;
const RecruitDone = styled.span``;
function Sidebar({ value }) {
  const handleRecruit = useCallback(() => {
    let contents = [];
    for (let i = 0; i < value?.projectWantedRole.length; i++) {
      contents.push(
        <Recruit key={`Recruit ${i}`}>
          <RecruitIcon>
            {String(value?.projectWantedRole[i].role).toUpperCase()}
          </RecruitIcon>
          <RecruitNumbers>
            <RecruitNow>{value?.projectWantedRole[i].complete}</RecruitNow>/
            <RecruitDone>{value?.projectWantedRole[i].personnel}</RecruitDone>
          </RecruitNumbers>
        </Recruit>
      );
    }
    return contents;
  }, [value]);
  return (
    <Base>
      <Header>프로젝트 정보</Header>
      <PosterContainer>
        <Poster src={"http://projecttycoon.com" + value?.projectFilePath} />
      </PosterContainer>
      <Contents>
        <Title>프로젝트 명</Title>
        <Info>{value?.projectTitle}</Info>
      </Contents>
      <Contents>
        <Title>모집 분야</Title>
        <RecruitContainer>{handleRecruit()}</RecruitContainer>
      </Contents>
      <Contents>
        <Title>작성자</Title>
      </Contents>
      <Contents></Contents>
    </Base>
  );
}

export default Sidebar;
