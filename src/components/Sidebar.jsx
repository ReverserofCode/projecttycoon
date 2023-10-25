import styled from "@emotion/styled";
import { useCallback, useEffect, useState } from "react";
import { AiOutlinePlusSquare, AiOutlineMinusCircle } from "react-icons/ai";
import { BsChatDots } from "react-icons/bs";
import { RoleUpdate } from "../functional/PostProjectUpdate";
import { GetProjectFromID } from "../functional/GetProject";
import { DMRoomGen, DMSend } from "../DMSet/DM";
/** 배경이 되는 콘테이너 태그 */
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
/** 사이드 바의 제목 태그 */
const Header = styled.span`
  color: #0b666a;
  font-size: 25px;
  white-space: nowrap;
`;
/** 사이드 바의 메인 이미지를 담고잇는 콘테이너 태그 */
const PosterContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
`;
/** 사이드 바의 메인 이미지 태그 */
const Poster = styled.img`
  height: 100px;
`;
/** 사이드 바의 이미지 외의 콘텐츠를 담고있는 콘테이너 태그 */
const Contents = styled.div`
  display: flex;
  box-sizing: border-box;
  justify-content: flex-start;
  align-items: flex-start;
  width: 100%;
  border-top: 1px solid #75c2f6;
  gap: 10px;
  padding: 10px 0;
  position: relative;
`;
/** 사이드 바의 분류를 표기하는 태그 */
const Title = styled.div`
  width: fit-content;
  white-space: nowrap;
  font-size: 15px;
  font-weight: 600;
  width: 80px;
`;
/** 사이드 바의 내용 표기하는 태그 */
const Info = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 130px;
  font-size: 13px;
  white-space: break-spaces;
  word-wrap: break-word;
`;
/** 사이드 바의 내용중 모집내용을 담고있는 콘테이너 태그 */
const RecruitContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 10px;
`;
/** 모집내용을 담고있는 콘테이너 태그 */
const Recruit = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
`;
/** 사이드 바의 내용중 모집내용중 모집분야 태그 */
const RecruitIcon = styled.span`
  height: 30px;
  width: 80px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;
/** 사이드 바의 내용중 모집내용중 모집인원 콘테이너 태그 */
const RecruitNumbers = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 30px;
`;
/** 사이드 바의 내용중 모집내용의 모집인원 현재인원 태그 */
const RecruitNow = styled.span``;
/** 사이드 바의 내용중 모집내용의 모집인원 마감인원 태그 */
const RecruitDone = styled.span``;
/** 모집인원 수정 및 저장 버튼 태그 */
const RecruitSubmitButton = styled.div`
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 5px 10px;
  background-color: #d9d9d9;
  border: 2px solid #b6b6b6;
  border-radius: 5px;
  :hover {
    background-color: #e2e2e2;
  }
  :active {
    background-color: #d9d9d9;
  }
`;
/** 모집인원 수정 모드시 버튼 콘테이너 태그 */
const RecruitModifyContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
/** 모집인원 수정 모드시 인원수 조절 버튼 태그 */
const RecruitModifyButton = styled.div`
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  color: blue;
  :hover {
    color: red;
  }
`;
const Writer = styled.div`
  transition: 300ms;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 65px;
  height: 65px;
  border: 1px solid #d9d9d9;
  border-radius: 10px;
  overflow: hidden;
  user-select: none;
  cursor: pointer;
  :active {
    scale: 0.97;
  }
`;
const WriterImg = styled.img`
  border-radius: 50%;
  height: 60%;
`;
const WriterNick = styled.span``;
const WriterDMButton = styled.div`
  transition: 300ms;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  border: 2px solid #f4d160;
  background: #fbeeac;
  font-family: "Noto Sans KR", sans-serif;
  padding: 5px 20px;
  width: 100%;
  user-select: none;
  :active {
    scale: 0.97;
  }
`;

function Sidebar({ value, userData, writer, handleSetOpen }) {
  /** 모집인원 수정 모드 */
  const [modifyMod, setModifyMod] = useState(false);
  /** 수정하기 위한 복제 projectWantedRole */
  const [Roles, setRoles] = useState([]);
  /** 모집분야 및 모집 인원을 태그를 생성하는 function */
  const handleRecruit = useCallback(() => {
    let contents = [];
    for (let i = 0; i < value?.projectWantedRole.length; i++) {
      contents.push(
        <Recruit key={`Recruit ${i}`}>
          <RecruitIcon>
            {String(value?.projectWantedRole[i].role).toUpperCase()}
          </RecruitIcon>
          <RecruitNumbers>
            <RecruitNow>{Roles[i]?.complete}</RecruitNow>/
            <RecruitDone>{Roles[i]?.personnel}</RecruitDone>
          </RecruitNumbers>
          {value.projectWriterId === userData?.memberId && modifyMod ? (
            <RecruitModifyContainer>
              <RecruitModifyButton
                onClick={() => {
                  if (Roles[i]?.complete !== 0) {
                    let buf = [...Roles];
                    buf[i].complete = buf[i].complete - 1;
                    setRoles(buf);
                  }
                }}
              >
                <AiOutlineMinusCircle />
              </RecruitModifyButton>
              <RecruitModifyButton
                onClick={() => {
                  if (Roles[i]?.complete !== Roles[i]?.personnel) {
                    let buf = [...Roles];
                    buf[i].complete = buf[i].complete + 1;
                    setRoles(buf);
                  }
                }}
              >
                <AiOutlinePlusSquare />
              </RecruitModifyButton>
            </RecruitModifyContainer>
          ) : (
            ""
          )}
        </Recruit>
      );
    }
    return contents;
  }, [
    Roles,
    modifyMod,
    userData?.memberId,
    value?.projectWantedRole,
    value.projectWriterId,
  ]);
  useEffect(() => {
    setRoles(value?.projectWantedRole);
  }, [value?.projectWantedRole]);
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
      {value.projectWriterId === userData?.memberId && !modifyMod ? (
        <RecruitSubmitButton
          onClick={() => {
            setModifyMod(true);
          }}
        >
          수정
        </RecruitSubmitButton>
      ) : (
        ""
      )}
      {value.projectWriterId === userData?.memberId && modifyMod ? (
        <RecruitSubmitButton
          onClick={() => {
            setModifyMod(false);
            RoleUpdate(value, Roles).then(() => {
              const path = window.location.href.split("/");
              GetProjectFromID(path[4]).then(() => {
                window.location.reload();
              });
            });
          }}
        >
          저장
        </RecruitSubmitButton>
      ) : (
        ""
      )}
      <Contents>
        <Title>작성자</Title>
        <Writer>
          <WriterImg
            src={"http://projecttycoon.com" + "/static/images/Logo Test.png"}
          />
          <WriterNick>{writer?.memberNickname}</WriterNick>
        </Writer>
      </Contents>
      <Contents>
        <WriterDMButton
          onClick={() => {
            if (userData !== undefined) {
              DMRoomGen(userData?.memberId, writer?.memberId).then((res) => {
                DMSend(
                  `프로젝트 [${value?.projectTitle}]에 대한 문의사항이 있어 쪽지방이 생성 되었습니다.`,
                  writer?.memberId,
                  userData?.memberId,
                  res?.dmroomId
                );
              });
              handleSetOpen();
            } else alert("DM 생성을 위해서는 로그인 해주세요");
          }}
        >
          <BsChatDots
            color="#35A29F"
            fontSize={"20px"}
            style={{ marginRight: "5px" }}
          />{" "}
          1대1 DM
        </WriterDMButton>
      </Contents>
    </Base>
  );
}

export default Sidebar;