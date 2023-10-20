import { useEffect, useState, useCallback } from "react";
import styled from "@emotion/styled";
import axios from "axios";
import { AiFillGithub } from "react-icons/ai";
import { SiMicrodotblog } from "react-icons/si";
import { TbMessageDots } from "react-icons/tb";
const stacks = [
  { label: "Java", value: "Java" },
  { label: "Python", value: "Python" },
  { label: "C/C++", value: "C/C++" },
  { label: "C#", value: "C#" },
  { label: "PHP", value: "PHP" },
  { label: "SQL", value: "SQL" },
  { label: "Kotlin", value: "Kotlin" },
  { label: "Go", value: "Go" },
  { label: "R", value: "R" },
  { label: "HTML", value: "HTML" },
  { label: "CSS", value: "CSS" },
  { label: "JavaScript", value: "JavaScript" },
  { label: "TypeScript", value: "TypeScript" },
  { label: "NodeJs", value: "NodeJs" },
  { label: "JQuery", value: "JQuery" },
  { label: "React", value: "React" },
  { label: "Vue", value: "Vue" },
];
// 가져온 유저정보
const info = {
  memberId: "asdfasdf",
  memberPw: "$2a$10$f1SruH64mkHnkGX70Ojesufc9W.kQ1rcHpOIB9Z3nMd8hRX0t3JuK",
  memberRole: "front",
  memberIntroduce: "asdfasdf",
  memberLink:
    '[{"option":"Git","value":"https://github.com/minicastle"},{"option":"Blog","value":"https://github.com/minicastle"},{"option":"Other","value":"https://github.com/minicastle"}]',
  memberAcademy: "노원",
  memberNickname: "asdfasdf",
  memberFilePath: "/static/icons/",
  memberFileName: "1_shark.png",
  memberStack: '["PHP"]',
  myProjectlist: [],
  myCommentlist: [],
  myScraplist: [],
};
const Box = styled.div`
  padding: 4px;
  width: 100%;
  box-sizing: border-box;
  border-bottom: 1px solid gray;
  display: flex;
  height: 100%;
  align-items: center;
`;
const SmallBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${(props) => props.width || "130px"};
  height: 100%;
  border-right: 1px gray solid;
  @media screen and (max-width: 370px) {
    width: 100px;
  }
`;
const XsmallBox = styled.div`
  padding: 8px;
  box-sizing: border-box;
  width: 100%;
  display: flex;
  height: 100%;
  align-items: center;
  justify-content: space-between;
  display: flex;
`;
const Top = styled.div`
  width: 100%;
  display: flex;
  box-sizing: border-box;
  @media screen and (max-width: 575px) {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
`;
const Right = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-right: 1px gray solid;
  width: 100%;
  max-width: 360px;
  @media screen and (max-width: 575px) {
    border-right: none;
    border-bottom: 1px gray solid;
    padding-bottom: 10px;
  }
`;
const Left = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;
const Wrap = styled.div`
  padding: 10px;
  box-sizing: border-box;
  font-size: 13px;
  margin: 0 auto;
  max-width: 1200px;
  width: 80%;
  height: 100%;
  @media screen and (max-width: 370px) {
    width: 343px;
  }
`;
const Content = styled.div`
  max-width: 1000px;
  width: 100%;
  margin: 0 auto;
  height: 100%;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
`;
const Bot = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  justify-content: space-between;
`;
const ImgBox = styled.img`
  width: 210px;
  height: 210px;
  border-radius: 50%;
  border: 1px gray solid;
  margin-bottom: 8px;
  @media screen and (max-width: 720px) {
    width: 180px;
    height: 180px;
  }
  @media screen and (max-width: 370px) {
    width: 200px;
    height: 200px;
  }
`;
const ImgWrap = styled.div`
  margin-right: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 345px;
  height: 280px;
  padding: 4px;
  flex-direction: column;
  @media screen and (max-width: 720px) {
    width: 270px;
  }
  @media screen and (max-width: 370px) {
    width: 300px;
  }
`;
const IntroduceBox = styled.div`
  width: 100%;
  border-bottom: 1px solid gray;
  display: flex;
  flex-direction: column;
`;
const IntroBox = styled.div`
  height: 100%;
  margin-bottom: 4px;
`;
const InputIntro = styled.textarea`
  width: 100%;
  height: 100px;
  box-sizing: border-box;
  padding: 10px;
  &:focus {
    outline: none; /* 포커스 아웃라인 제거 */
  }
  margin-bottom: 20px;
  resize: none;
`;
const LinkBox = styled.div`
  display: flex;
  align-items: center;
  box-sizing: border-box;
  padding: 4px;
  width: 100%;
  border-bottom: 1px solid gray;
`;
const LinkSmallBox = styled.div`
  width: 120px;
  height: 50px;
  border-right: 1px gray solid;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const LinkWrap = styled.div`
  padding: 4px;
  max-width: 800px;
  width: 100%;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 15px;
`;
const StackBut = styled.button`
  background-color: #0b666a;
  color: white;
  border: none;
  outline: none;
  cursor: pointer;
  border-radius: 15px;
  padding: 8px 12px;
`;
const StackButWrap = styled.div`
  overflow: auto;
  overflow-y: hidden;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: center;
  max-width: 700px;
  gap: 10px;
  width: 100%;
  height: 100%;
  @media screen and (max-width: 720px) {
    display: flex;
    overflow: auto;
    overflow-y: hidden;
    justify-content: start;
    align-items: center;
    padding-left: 4px;
    padding-right: 4px;
    box-sizing: border-box;
  }
  @media screen and (max-width: 370px) {
    width: 220px;
    display: flex;
    overflow: auto;
    overflow-y: hidden;
    justify-content: center;
    align-items: center;
    padding-left: 4px;
    padding-right: 4px;
    box-sizing: border-box;
  }
`;
const Span = styled.div`
  padding: 4px;
  font-size: 10px;
  color: #e63434;
  font-weight: 800;
`;
const IntroWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  padding: 12px;
`;
const Button = styled.div`
  display: flex;
  box-sizing: border-box;
  width: fit-content;
  justify-content: center;
  align-items: center;
  padding: 5px 10px;
  background-color: #fbeeac;
  border: 2px solid #f4d160;
  border-radius: 10px;
`;
const IconWrap = styled.div`
  display: flex;
  justify-content: center;
  font-size: 15px;
`;
function UserInfo() {
  //유저-처음 가져온 정보
  const [memberInfo, setMemberInfo] = useState(info);
  //유저-개인링크
  const [selectLink, setSelectLink] = useState(
    JSON.parse(memberInfo?.memberLink)
  );
  //유저-선택한언어
  const [selectedLanguages, setSelectedLanguages] = useState(
    JSON.parse(memberInfo.memberStack)
  );
  // function
  const handlelist = useCallback(() => {
    let contents = [];
    for (let i = 0; i < selectLink.length; i++) {
      contents.push(
        <Button
          onClick={() => {
            console.log(selectLink[i]?.value);
          }}
        >
          {selectLink[i]?.option === "Git" ? (
            <IconWrap>
              <AiFillGithub
                style={{ marginRight: "10px", fontSize: "20px" }}
                color="#4078c0"
              />
              깃허브 링크
            </IconWrap>
          ) : selectLink[i]?.option === "Blog" ? (
            <IconWrap>
              <SiMicrodotblog
                color="#FFA500"
                style={{ marginRight: "10px", fontSize: "20px" }}
              />
              블로그 링크
            </IconWrap>
          ) : (
            <IconWrap>
              <TbMessageDots
                style={{ marginRight: "10px", fontSize: "20px" }}
              />
              사용자 링크
            </IconWrap>
          )}
        </Button>
      );
    }
    return contents;
  }, [selectLink]);
  //Axios Post & Get
  const handleGet = async (id) => {
    let data = await axios
      .get(`/api/memberPage/${id}`)
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        console.log(err);
      });
    return await data;
  };
  useEffect(() => {
    const path = window.location.href.split("/");
    handleGet(path[4]).then((res) => {
      setMemberInfo(res);
      setSelectedLanguages(JSON.parse(res?.memberStack));
      setSelectLink(JSON.parse(res?.memberLink));
    });
  }, []);
  return (
    <Wrap>
      <Content>
        <Top>
          <Right>
            <ImgWrap>
              <ImgBox
                src={
                  "http://projecttycoon.com/static/icons/" +
                  memberInfo.memberFileName
                }
              />
            </ImgWrap>
            <Button>1대1 대화하기</Button>
          </Right>
          <Left>
            <Box>
              <SmallBox>아이디</SmallBox>
              <XsmallBox>
                <div>{memberInfo.memberId}</div>
              </XsmallBox>
            </Box>
            <Box>
              <SmallBox>닉네임</SmallBox>
              <XsmallBox>
                <div>{memberInfo.memberNickname}</div>
              </XsmallBox>
            </Box>
            <Box>
              <SmallBox>위치</SmallBox>
              <XsmallBox>
                <div>{memberInfo.memberAcademy} 아카데미</div>
              </XsmallBox>
            </Box>
            <Box>
              <SmallBox>역할</SmallBox>
              <XsmallBox>
                <div>{memberInfo.memberRole}</div>
              </XsmallBox>
            </Box>
          </Left>
        </Top>
        <Bot>
          <IntroduceBox>
            <IntroWrap>
              <IntroBox>한줄소개</IntroBox>
            </IntroWrap>
            <XsmallBox>
              <InputIntro
                type="text"
                value={memberInfo.memberIntroduce}
                readOnly={true}
              />
            </XsmallBox>
          </IntroduceBox>
          <Box>
            <SmallBox width={"140px"}>언어</SmallBox>
            <XsmallBox>
              {selectedLanguages.length > 0 ? (
                <StackButWrap>
                  {selectedLanguages.map((selectedLanguage) => (
                    <StackBut type="button" key={selectedLanguage}>
                      {
                        stacks.find(
                          (option) => option.value === selectedLanguage
                        )?.label
                      }
                    </StackBut>
                  ))}
                </StackButWrap>
              ) : (
                <Span>선택한 언어가 없습니다.</Span>
              )}
            </XsmallBox>
          </Box>
          <LinkBox>
            <LinkSmallBox>개인링크</LinkSmallBox>
            <LinkWrap>{handlelist()}</LinkWrap>
          </LinkBox>
        </Bot>
      </Content>
    </Wrap>
  );
}

export default UserInfo;
