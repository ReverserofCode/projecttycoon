import { useEffect, useRef, useState, useCallback } from "react";
import styled from "@emotion/styled";
import axios from "axios";
import { BsPlusSquareDotted } from "react-icons/bs";
import { BsDashSquareDotted } from "react-icons/bs";
import { PostAxios } from "../functional/PostAxios";
// import {alpaca,dog}from "../Img/images"

//데이터 받고
//file수정 ,삭제
//http://projecttycoon.com/api/mypage
//memberFilePath + memberFileName = 프로필이미지
//post까지
//http://projecttycoon.com/static/icons/8_dog.png

const Box = styled.div`
  padding: 4px;
  /* max-width: 500px; */
  width: 100%;
  border-bottom: 1px solid gray;
  display: flex;
  height: 100%;
  align-items: center;
  @media screen and (max-width: 860px) {
    max-width: 750px;
    width: 100%;
  }
`;
const SmallBox = styled.div`
  width: ${(props) => props.width || "130px"};
  height: 100%;
  min-width: ${(props) => props.minwidth};
  border-right: 1px gray solid;
  display: flex;
  justify-content: center;
  align-items: center;
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
  @media screen and (max-width: 860px) {
    max-width: 770px;
    width: 100%;
  }
`;
const Top = styled.div`
  width: 100%;
  display: flex;
  padding: 20px;
  box-sizing: border-box;
  @media screen and (max-width: 495px) {
    display: flex;
    flex-direction: column;
  }
`;
const Right = styled.div`
  @media screen and (max-width: 720px) {
    width: 280px;
  }
  @media screen and (max-width: 370px) {
  }
`;
const Left = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  @media screen and (max-width: 860px) {
    max-width: 400px;
    width: 100%;
  }
  @media screen and (max-width: 714px) {
    max-width: 320px;
    width: 100%;
  }
  /* @media screen and (max-width: 660px) {
    max-width: 300px;
    width: 100%;
  } */
  @media screen and (max-width: 577px) {
    max-width: 300px;
    width: 100%;
  }
  @media screen and (max-width: 495px) {
    max-width: 500px;
    width: 100%;
  }
`;
const Wrap = styled.div`
  font-size: 13px;
  margin: 0 auto;
  max-width: 1200px;
  width: 100%;
  @media screen and (max-width: 720px) {
    width: 700px;
  }
  @media screen and (max-width: 370px) {
    width: 360px;
  }
`;
const Content = styled.div`
  padding: 8px;
  max-width: 1000px;
  width: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
`;
const PwBox2 = styled.div`
  width: 100%;
`;
const Bot = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 20px;
  box-sizing: border-box;
  justify-content: space-between;
  @media screen and (max-width: 955px) {
    max-width: 850px;
    width: 100%;
  }
  @media screen and (max-width: 715px) {
    max-width: 650px;
    width: 100%;
  }
  @media screen and (max-width: 577px) {
    max-width: 610px;
    width: 100%;
  }
  @media screen and (max-width: 495px) {
    max-width: 550px;
    width: 100%;
  }
`;
const ImgBox = styled.img`
  width: 210px;
  height: 210px;
  border-radius: 50%;
  border: 1px gray solid;
  margin-bottom: 8px;
  @media screen and (max-width: 720px) {
    width: 160px;
    height: 160px;
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
  border-right: 1px gray solid;
  padding: 4px;
  flex-direction: column;
  @media screen and (max-width: 720px) {
    width: 270px;
  }
  @media screen and (max-width: 495px) {
    width: 345px;
    height: 280px;
    border-right: none;
  }
  @media screen and (max-width: 370px) {
    width: 370px;
    border-bottom: 1px gray solid;
    border-right: none;
  }
`;
const ButWrap = styled.div`
  margin-top: 12px;
  width: 300px;
  display: flex;
  justify-content: space-around;
  @media screen and (max-width: 720px) {
    margin-top: 12px;
    width: 240px;
  }
`;
const But1 = styled.button`
  width: 90px;
  height: 30px;
`;
const IntroduceBox = styled.div`
  width: 100%;
  border-bottom: 1px solid gray;
  display: flex;
  flex-direction: column;
  @media screen and (max-width: 860px) {
    max-width: 760px;
    width: 100%;
  }
`;
const IntroBox = styled.div`
  height: 100%;
  margin-bottom: 4px;
`;
const IntroSubBox = styled.div`
  color: gray;
  box-sizing: border-box;
  width: 100%;
  font-size: 12px;
  height: 20px;
`;
const InputIntro = styled.input`
  width: 100%;
  height: 100px;
  &:focus {
    outline: none; /* 포커스 아웃라인 제거 */
  }
  margin-bottom: 20px;
`;
const StackSelect = styled.select`
  width: 200px;
  height: 28px;
`;
const NavWrap = styled.div`
  display: flex;
  margin-bottom: 40px;
`;
const LocationSelect = styled.select`
  width: 100%;
  height: 30px;
  @media screen and (max-width: 720px) {
    max-width: 257px;
    height: 30px;
    width: 100%;
  }
`;
const But2 = styled.button`
  margin-right: 20px;
  border: none;
  outline: none;
  width: ${(props) => props.width || "450px"};
  height: ${(props) => props.width || "30px"};
  background-color: ${(props) => props.background_color || "#0B666A"};
  color: white;
  @media screen and (max-width: 955px) {
    max-width: 410px;
    width: 100%;
  }
  @media screen and (max-width: 910px) {
    max-width: 400px;
    width: 100%;
  }
  @media screen and (max-width: 860px) {
    max-width: 350px;
    width: 100%;
  }
  @media screen and (max-width: 720px) {
    max-width: 330px;
    width: 100%;
  }
  @media screen and (max-width: 714px) {
    max-width: 300px;
    width: 100%;
  }
  @media screen and (max-width: 666px) {
    max-width: 270px;
    width: 100%;
  }
  @media screen and (max-width: 577px) {
    max-width: 240px;
    width: 100%;
    /* justify-content: space-between; */
  }
  @media screen and (max-width: 370px) {
    width: 150px;
  }
`;
const LinkBox = styled.div`
  padding: 4px;
  width: 100%;
  border-bottom: 1px solid gray;
  display: flex;
  align-items: center;
  @media screen and (max-width: 860px) {
    max-width: 760px;
    width: 100%;
  }
`;
const LinkSmallBox = styled.div`
  width: 120px;
  height: 50px;
  border-right: 1px gray solid;
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 110px;
`;
const But2Wrap = styled.div`
  width: 100%;
  margin-top: 40px;
  display: flex;
  justify-content: center;
`;
const StackBut = styled.button`
  background-color: #0b666a;
  color: white;
  border: none;
  outline: none;
  cursor: pointer;
  border-radius: 15px;
  padding: 8px 12px;
  margin-right: 8px;
`;
const StackButWrap = styled.div`
  overflow: auto;
  overflow-y: hidden;
  /* overflow-x: scroll; */
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 700px;
  width: 100%;
  height: 100%;
  /* border: 1px red solid; */
  @media screen and (max-width: 720px) {
    width: 500px;
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
const Nav = styled.div`
  font-size: 13px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 20px;
  width: 160px;
  border-bottom: 2px gray solid;
`;
const Span = styled.div`
  padding: 4px;
  font-size: 10px;
  color: #e63434;
  font-weight: 800;
`;
const LinkWrap = styled.div`
  padding: 4px;
  margin-left: 4px;
  max-width: 800px;
  width: 100%;
  display: flex;
  flex-direction: column;
  @media screen and (max-width: 860px) {
    max-width: 600px;
    width: 100%;
  }
`;
const LinkButWrap = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;
const LinkSelect = styled.select`
  width: 80px;
  height: 30px;
  margin-right: 4px;
  margin-bottom: 4px;
`;
const LinkInput = styled.input`
  width: ${(props) => props.width || "130px"};
  height: 30px;
  margin-bottom: 8px;
  @media screen and (max-width: 720px) {
    max-width: 350px;
    height: 23px;
    width: 100%;
  }
`;
const Profile = styled.select`
  width: 100px;
  padding: 4px;
`;
const PwBox = styled.div`
  display: flex;
  padding: 8px;
  box-sizing: border-box;
  align-items: center;
  width: 100%;
  justify-content: space-between;
`;
const IntroWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  padding: 12px;
`;
const PwInput = styled.input`
  max-width: 400px;
  width: 100%;
  padding: 4px 12px;
  @media screen and (max-width: 870px) {
    max-width: 300px;
    width: 100%;
  }
  @media screen and (max-width: 755px) {
    max-width: 230px;
    width: 100%;
  }
  @media screen and (max-width: 620px) {
    max-width: 200px;
    width: 100%;
  }
`;
const FileInput = styled.input`
  overflow: hidden;
  position: absolute;
  width: 0;
  height: 0;
  padding: 0;
`;
const NickInput = styled.input`
  width: ${(props) => props.width || "130px"};
  height: 30px;
  margin-bottom: 8px;
  @media screen and (max-width: 720px) {
    max-width: 250px;
    height: 23px;
    width: 100%;
  }
`;
const LinkWrap2 = styled.div`
  width: 100%;
  display: flex;
`;
const Wrap360 = styled.div`
  @media screen and (max-width: 370px) {
    display: flex;
    flex-direction: column;
  }
`;

function UserInfo() {
  const handlePost = async () => {
    let data = new FormData();
    data.append("file");
    axios.put(`/api/memberUpdate/${memberId}`);
  };

  // function
  function list() {
    return (
      <>
        {selectLink.map((list, index) => (
          <LinkButWrap>
            <LinkWrap2>
              <LinkSelect
                defaultValue={list.option}
                onChange={(event) => handleNewLinkChange(event, index)}
              >
                {links.map((link, linkIndex) => (
                  <>
                    <option value={link.value}>{link.value}</option>
                  </>
                ))}
              </LinkSelect>
              {index === 0 && (
                <div onClick={handleAddButton}>
                  <BsPlusSquareDotted size={"30px"} />
                </div>
              )}
              {index > 0 && (
                <div onClick={() => handleDeleteButton(index)}>
                  <BsDashSquareDotted size={"30px"} />
                </div>
              )}
            </LinkWrap2>
            <LinkInput
              width={"100%"}
              type="text"
              value={list.value}
              onChange={(event) => handleNewLinkValueChange(event, index)}
            >
              {/* onChange={(event)=>handleInputChange(event, 'memberNickname')} */}
            </LinkInput>
          </LinkButWrap>
        ))}
      </>
    );
  }
  useEffect(() => {
    handleGet();
  }, []);
  //Axios Post & Get
  const handleGet = async () => {
    await axios
      .get("/api/mypage")
      .then((response) => {
        console.log(response.data);
        setMemberInfo(response.data);
        setSelectedLanguages(JSON.parse(response.data.memberStack));
        setSelectLink(JSON.parse(response.data.memberLink));
        setProfile(response.data.memberFileName);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  //핸들 함수
  //유저-input수정  /input 관리
  const handleInputChange = (event, info) => {
    const updatedMemberInfo = { ...memberInfo, [info]: event.target.value };
    setMemberInfo(updatedMemberInfo);
  };
  const handleCloseClick = () => {
    setIsEditing(true);
  };
  const handleSaveClick = () => {
    setIsEditing(false);
  };
  //개인링크-링크 삭제
  const handleDeleteButton = (indexDelete) => {
    if (indexDelete === 0) {
      // 첫 번째 요소는 삭제하지 않도록 예외 처리
      return;
    }
    const update = selectLink.filter((list, index) => index !== indexDelete);
    setSelectLink(update);
  };
  // 개인링크-옵션 변경
  const handleNewLinkChange = (event, index) => {
    const updatedSelectLink = [...selectLink];
    updatedSelectLink[index].option = event.target.value;
    setSelectLink(updatedSelectLink);
  };
  const handleNewLinkValueChange = (event, index) => {
    const updatedSelectLink = [...selectLink];
    updatedSelectLink[index].value = event.target.value;
    setSelectLink(updatedSelectLink);
  };
  //개인링크-링크 추가
  const handleAddButton = () => {
    if (selectLink.length < 5) {
      setSelectLink([...selectLink, { label: "Git", value: "" }]); // 추가 시 초기 선택 항목을 'Git'으로 설정
    }
  };
  //언어-삭제
  const handleLanguageButtonClick = (selectedLanguage) => {
    setSelectedLanguages((prevSelectedLanguages) =>
      prevSelectedLanguages.filter((language) => language !== selectedLanguage)
    );
  };
  //언어-추가
  const handleLanguageChange = (e) => {
    const ar = [e.target.value];
    setSelectedLanguages([...selectedLanguages, ...ar]);
    console.log(selectedLanguages);
  };
  //비밀번호 수정 핸들
  const handleNewPassWord = () => {
    if (pw.length === 0 || pwConfirm.length === 0) {
      alert("새로운 비밀번호를 입력해주세요.");
    } else if (
      passwordRegex.test(pw) === false ||
      passwordRegex.test(pwConfirm) === false
    ) {
      alert("비밀번호를 다시입력해 주세요");
    }
    //비밀번호 바꿔야함
  };
  //select-option-value 관리
  const locations = [
    { label: "강남", value: "강남" },
    { label: "신촌/홍대", value: "신촌/홍대" },
    { label: "노원", value: "노원" },
    { label: "인천", value: "인천" },
    { label: "대전", value: "대전" },
    { label: "대구", value: "대구" },
    { label: "부산", value: "부산" },
  ];
  const stacks = [
    { label: "Java", value: "Java" },
    { label: "Python", value: "Python" },
    { label: "C", value: "C" },
    { label: "C++", value: "C++" },
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
  const links = [
    { label: "Git", value: "Git" },
    { label: "Blog", value: "Blog" },
    { label: "Other", value: "Other" },
  ];
  const fields = [
    { label: "백엔드", value: "back" },
    { label: "프론트엔드", value: "front" },
    { label: "AI", value: "ai" },
    { label: "빅데이터", value: "bigdata" },
    { label: "서버관리자", value: "server" },
    { label: "정보보안", value: "security" },
    { label: "네트워크관리자", value: "network" },
  ];
  const defaultImgName = [
    { label: "강아지", value: "dog" },
    { label: "거북이", value: "turtle" },
    { label: "고양이", value: "cat" },
    // { label: "기린", value: "기린" },
    { label: "라쿤", value: "raccoon" },
    // { label: "돼지", value: "돼지" },
    { label: "알파카", value: "alpaka" },
    { label: "우파루파", value: "axolotl" },
    // { label: "판다", value: "판다" },
    { label: "펭귄", value: "penguin" },
    { label: "상어", value: "shark" },
  ];
  //유저-프로필선택
  const [profile, setProfile] = useState("");
  const defaultImg = {
    dog: "8_dog.png",
    cat: "6_cat.png",
    alpaka: "12_alpaca.png",
    turtle: "16_turtle.png",
    axolotl: "14_axolotl.png",
    penguin: "18_penguin.png",
    raccoon: "21_raccoon.png",
    shark: "2_shark.png",
  };
  const profileimg = {
    "1_shark.png": "shark",
    "2_shark.png": "shark",
    "3_shark.png": "shark",
    "4_shark.png": "shark",
    "5_cat.png": "cat",
    "6_cat.png": "cat",
    "7_dog.png": "dog",
    "8_dog.png": "dog",
    "9_alpaca.png": "alpaca",
    "10_alpaca.png": "alpaca",
    "11_alpaca.png": "alpaca",
    "12_alpaca.png": "alpaca",
    "13_axolotl.png": "axolotl",
    "14_axolotl.png": "axolotl",
    "15_turtle.png": "turtle",
    "16_turtle.png": "turtle",
    "17_penguin.png": "penguin",
    "18_penguin.png": "penguin",
    "19_penguin.png": "penguin",
    "20_raccoon.png": "raccoon",
    "21_raccoon.png": "raccoon",
  };
  // 가져온 유저정보
  const info = {
    memberId: "sift",
    memberPw: "$2a$10$jcvpGxgco1gUUez0f.EEqegL8LtmBfX.7qxbYzW96HDFonI9If9DG",
    memberRole: "front",
    memberIntroduce: "asdfasdf",
    memberLink:
      '[{"option":"Git","value":"asdfasdf@"},{"label":"Git","value":"asdfasdf"}]',
    memberAcademy: "노원",
    memberNickname: "정성민",
    memberFilePath: "/static/icons/",
    memberFileName: "21_raccoon.png",
    memberStack: '["HTML","Kotlin"]',
    myProjectlist: [
      {
        createdAt: "2023-10-18T08:06:13.852+00:00",
        modifiedAt: "2023-10-18T08:37:47.509+00:00",
        projectId: 35,
        projectTitle: "앙큼우리",
        projectContent: "<p>asdfasdf</p>",
        projectWantedRole: '[{"role": "front", "complete": 0, "personnel": 1}]',
        projectDue: "2023-10-20T00:00:00.000+00:00",
        projectAcademy: "강남",
        projectStatus: true,
        projectWriterId: "sift",
        projectWriterNick: "정성민",
        projectFilePath:
          "/webapp/8925a8bb-2165-4863-9b44-2f84b3daccbd_하리그림.jpg",
        projectFileName: "projectImage",
        projectScrapNum: 2,
        parsedProjectWantedRole: [
          {
            role: "front",
            complete: 0,
            personnel: 1,
          },
        ],
      },
      {
        createdAt: "2023-10-19T11:18:36.369+00:00",
        modifiedAt: "2023-10-24T16:32:54.251+00:00",
        projectId: 52,
        projectTitle: "테스트용",
        projectContent: "<p>이예에</p>",
        projectWantedRole: '[{"role": "front", "complete": 0, "personnel": 3}]',
        projectDue: "2023-10-27T00:00:00.000+00:00",
        projectAcademy: "노원",
        projectStatus: true,
        projectWriterId: "sift",
        projectWriterNick: "정성민",
        projectFilePath:
          "/webapp/c3260eec-dbf1-4cf3-bdf8-76917d9e8ec4_낭넴그림.png",
        projectFileName: "projectImage",
        projectScrapNum: 1,
        parsedProjectWantedRole: [
          {
            role: "front",
            complete: 0,
            personnel: 3,
          },
        ],
      },
      {
        createdAt: "2023-10-25T06:39:08.731+00:00",
        modifiedAt: "2023-10-25T07:35:14.281+00:00",
        projectId: 131,
        projectTitle: "ㅁㄴㅇㄻㄴㅇㄹ",
        projectContent: "<p>ㅁㄴㅇㄻㄴㅇㄹ</p>",
        projectWantedRole: '[{"role": "back", "complete": 0, "personnel": 1}]',
        projectDue: "2023-10-27T00:00:00.000+00:00",
        projectAcademy: "강남",
        projectStatus: true,
        projectWriterId: "sift",
        projectWriterNick: "정성민",
        projectFilePath:
          "/webapp/0c207387-d09e-4c75-9440-48e737684545_미누그림 가지.jpg",
        projectFileName: "projectImage",
        projectScrapNum: 1,
        parsedProjectWantedRole: [
          {
            role: "back",
            complete: 0,
            personnel: 1,
          },
        ],
      },
      {
        createdAt: "2023-10-25T08:54:42.955+00:00",
        modifiedAt: "2023-10-26T02:32:10.936+00:00",
        projectId: 161,
        projectTitle: "테스트 테스트",
        projectContent: "<p>테스트 테스트</p>",
        projectWantedRole: '[{"role": "back", "complete": 1, "personnel": 1}]',
        projectDue: "2023-10-27T00:00:00.000+00:00",
        projectAcademy: "강남",
        projectStatus: false,
        projectWriterId: "sift",
        projectWriterNick: "정성민",
        projectFilePath: "/static/images/project_default1.png",
        projectFileName: null,
        projectScrapNum: 1,
        parsedProjectWantedRole: [
          {
            role: "back",
            complete: 1,
            personnel: 1,
          },
        ],
      },
    ],
    myCommentlist: [
      {
        createdAt: "2023-10-18T07:20:07.797+00:00",
        modifiedAt: "2023-10-18T07:20:07.797+00:00",
        commentId: 6,
        commentProject: {
          createdAt: "2023-10-18T07:18:08.827+00:00",
          modifiedAt: "2023-10-18T07:23:21.814+00:00",
          projectId: 3,
          projectTitle: "헷",
          projectContent: "<p>헷</p>",
          projectWantedRole:
            '[{"role": "back", "complete": 0, "personnel": 1}]',
          projectDue: "2023-11-11T00:00:00.000+00:00",
          projectAcademy: "노원",
          projectStatus: true,
          projectWriterId: null,
          projectWriterNick: null,
          projectFilePath:
            "/webapp/b0b176b3-e77d-4e1d-aee0-ef1644d4b6bb_Black.png",
          projectFileName: "projectImage",
          projectScrapNum: 2,
          parsedProjectWantedRole: [
            {
              role: "back",
              complete: 0,
              personnel: 1,
            },
          ],
        },
        commentWriter: {
          createdAt: "2023-10-18T07:13:57.230+00:00",
          modifiedAt: "2023-10-25T04:51:49.608+00:00",
          memberId: "sift",
          memberPw:
            "$2a$10$jcvpGxgco1gUUez0f.EEqegL8LtmBfX.7qxbYzW96HDFonI9If9DG",
          memberNickname: "정성민",
          memberAcademy: "노원",
          memberRole: "front",
          memberIntroduce: "asdfasdf",
          memberLink:
            '[{"option":"Git","value":"asdfasdf@"},{"label":"Git","value":"asdfasdf"}]',
          memberFilePath: "/static/icons/",
          memberFileName: "21_raccoon.png",
          memberStack: '["HTML","Kotlin"]',
          memberAuthority: [],
          scrappedProjects: [
            {
              createdAt: "2023-10-25T04:15:32.747+00:00",
              modifiedAt: "2023-10-25T06:09:21.006+00:00",
              projectId: 84,
              projectTitle: "dfdffd",
              projectContent: "<p>dfdf</p>",
              projectWantedRole:
                '[{"role": "back", "complete": 0, "personnel": 1}]',
              projectDue: "2023-10-27T00:00:00.000+00:00",
              projectAcademy: "강남",
              projectStatus: true,
              projectWriterId: "parksangin",
              projectWriterNick: "stork",
              projectFilePath:
                "/webapp/795650c6-9e1d-4d96-b2b8-e8fc51cd5fc4_test.jpg",
              projectFileName: "projectImage",
              projectScrapNum: 2,
              parsedProjectWantedRole: [
                {
                  role: "back",
                  complete: 0,
                  personnel: 1,
                },
              ],
            },
            {
              createdAt: "2023-10-18T07:18:08.827+00:00",
              modifiedAt: "2023-10-18T07:23:21.814+00:00",
              projectId: 3,
              projectTitle: "헷",
              projectContent: "<p>헷</p>",
              projectWantedRole:
                '[{"role": "back", "complete": 0, "personnel": 1}]',
              projectDue: "2023-11-11T00:00:00.000+00:00",
              projectAcademy: "노원",
              projectStatus: true,
              projectWriterId: null,
              projectWriterNick: null,
              projectFilePath:
                "/webapp/b0b176b3-e77d-4e1d-aee0-ef1644d4b6bb_Black.png",
              projectFileName: "projectImage",
              projectScrapNum: 2,
              parsedProjectWantedRole: [
                {
                  role: "back",
                  complete: 0,
                  personnel: 1,
                },
              ],
            },
            {
              createdAt: "2023-10-25T05:14:42.720+00:00",
              modifiedAt: "2023-10-25T06:10:41.290+00:00",
              projectId: 86,
              projectTitle: "좋아요테스트",
              projectContent: "<p>좋아요테스트</p>",
              projectWantedRole:
                '[{"role": "back", "complete": 1, "personnel": 1}]',
              projectDue: "2023-10-25T00:00:00.000+00:00",
              projectAcademy: "강남",
              projectStatus: false,
              projectWriterId: "parksangin3",
              projectWriterNick: "parksangin3",
              projectFilePath:
                "/webapp/4e1b3f5d-2ec4-4553-a26c-7511304001f8_test.jpg",
              projectFileName: "projectImage",
              projectScrapNum: 3,
              parsedProjectWantedRole: [
                {
                  role: "back",
                  complete: 1,
                  personnel: 1,
                },
              ],
            },
            {
              createdAt: "2023-10-25T06:38:33.244+00:00",
              modifiedAt: "2023-10-25T07:34:34.932+00:00",
              projectId: 130,
              projectTitle: "tttt",
              projectContent: "<p>ttt</p>",
              projectWantedRole:
                '[{"role": "front", "complete": 0, "personnel": 1}]',
              projectDue: "2023-11-08T00:00:00.000+00:00",
              projectAcademy: "신촌/홍대",
              projectStatus: true,
              projectWriterId: "kkk123",
              projectWriterNick: "nay",
              projectFilePath:
                "/webapp/d8154d10-db56-4f29-86a4-dad1e1c75bcc_default3.png",
              projectFileName: "projectImage",
              projectScrapNum: 2,
              parsedProjectWantedRole: [
                {
                  role: "front",
                  complete: 0,
                  personnel: 1,
                },
              ],
            },
          ],
        },
        commentContent: "asdfasdf",
      },
      {
        createdAt: "2023-10-18T07:32:04.917+00:00",
        modifiedAt: "2023-10-18T07:32:04.917+00:00",
        commentId: 23,
        commentProject: {
          createdAt: "2023-10-18T07:27:26.261+00:00",
          modifiedAt: "2023-10-18T07:38:59.521+00:00",
          projectId: 12,
          projectTitle: "디폴트 이미지 지정을 위한 프로젝트 3",
          projectContent: "<h1>프로젝트 3</h1>",
          projectWantedRole:
            '[{"role": "bigData", "complete": 0, "personnel": "4"}, {"role": "network", "complete": 0, "personnel": "3"}]',
          projectDue: "2023-10-18T00:00:00.000+00:00",
          projectAcademy: "노원",
          projectStatus: true,
          projectWriterId: "parksangin",
          projectWriterNick: "parksangin",
          projectFilePath:
            "/webapp/dc1010ee-2ece-4905-b5bf-51fe4c3f2cbd_하리그림.jpg",
          projectFileName: "projectImage",
          projectScrapNum: 2,
          parsedProjectWantedRole: [
            {
              role: "bigData",
              complete: 0,
              personnel: 4,
            },
            {
              role: "network",
              complete: 0,
              personnel: 3,
            },
          ],
        },
        commentWriter: {
          createdAt: "2023-10-18T07:13:57.230+00:00",
          modifiedAt: "2023-10-25T04:51:49.608+00:00",
          memberId: "sift",
          memberPw:
            "$2a$10$jcvpGxgco1gUUez0f.EEqegL8LtmBfX.7qxbYzW96HDFonI9If9DG",
          memberNickname: "정성민",
          memberAcademy: "노원",
          memberRole: "front",
          memberIntroduce: "asdfasdf",
          memberLink:
            '[{"option":"Git","value":"asdfasdf@"},{"label":"Git","value":"asdfasdf"}]',
          memberFilePath: "/static/icons/",
          memberFileName: "21_raccoon.png",
          memberStack: '["HTML","Kotlin"]',
          memberAuthority: [],
          scrappedProjects: [
            {
              createdAt: "2023-10-25T04:15:32.747+00:00",
              modifiedAt: "2023-10-25T06:09:21.006+00:00",
              projectId: 84,
              projectTitle: "dfdffd",
              projectContent: "<p>dfdf</p>",
              projectWantedRole:
                '[{"role": "back", "complete": 0, "personnel": 1}]',
              projectDue: "2023-10-27T00:00:00.000+00:00",
              projectAcademy: "강남",
              projectStatus: true,
              projectWriterId: "parksangin",
              projectWriterNick: "stork",
              projectFilePath:
                "/webapp/795650c6-9e1d-4d96-b2b8-e8fc51cd5fc4_test.jpg",
              projectFileName: "projectImage",
              projectScrapNum: 2,
              parsedProjectWantedRole: [
                {
                  role: "back",
                  complete: 0,
                  personnel: 1,
                },
              ],
            },
            {
              createdAt: "2023-10-18T07:18:08.827+00:00",
              modifiedAt: "2023-10-18T07:23:21.814+00:00",
              projectId: 3,
              projectTitle: "헷",
              projectContent: "<p>헷</p>",
              projectWantedRole:
                '[{"role": "back", "complete": 0, "personnel": 1}]',
              projectDue: "2023-11-11T00:00:00.000+00:00",
              projectAcademy: "노원",
              projectStatus: true,
              projectWriterId: null,
              projectWriterNick: null,
              projectFilePath:
                "/webapp/b0b176b3-e77d-4e1d-aee0-ef1644d4b6bb_Black.png",
              projectFileName: "projectImage",
              projectScrapNum: 2,
              parsedProjectWantedRole: [
                {
                  role: "back",
                  complete: 0,
                  personnel: 1,
                },
              ],
            },
            {
              createdAt: "2023-10-25T05:14:42.720+00:00",
              modifiedAt: "2023-10-25T06:10:41.290+00:00",
              projectId: 86,
              projectTitle: "좋아요테스트",
              projectContent: "<p>좋아요테스트</p>",
              projectWantedRole:
                '[{"role": "back", "complete": 1, "personnel": 1}]',
              projectDue: "2023-10-25T00:00:00.000+00:00",
              projectAcademy: "강남",
              projectStatus: false,
              projectWriterId: "parksangin3",
              projectWriterNick: "parksangin3",
              projectFilePath:
                "/webapp/4e1b3f5d-2ec4-4553-a26c-7511304001f8_test.jpg",
              projectFileName: "projectImage",
              projectScrapNum: 3,
              parsedProjectWantedRole: [
                {
                  role: "back",
                  complete: 1,
                  personnel: 1,
                },
              ],
            },
            {
              createdAt: "2023-10-25T06:38:33.244+00:00",
              modifiedAt: "2023-10-25T07:34:34.932+00:00",
              projectId: 130,
              projectTitle: "tttt",
              projectContent: "<p>ttt</p>",
              projectWantedRole:
                '[{"role": "front", "complete": 0, "personnel": 1}]',
              projectDue: "2023-11-08T00:00:00.000+00:00",
              projectAcademy: "신촌/홍대",
              projectStatus: true,
              projectWriterId: "kkk123",
              projectWriterNick: "nay",
              projectFilePath:
                "/webapp/d8154d10-db56-4f29-86a4-dad1e1c75bcc_default3.png",
              projectFileName: "projectImage",
              projectScrapNum: 2,
              parsedProjectWantedRole: [
                {
                  role: "front",
                  complete: 0,
                  personnel: 1,
                },
              ],
            },
          ],
        },
        commentContent: "나도 댓글",
      },
      {
        createdAt: "2023-10-18T08:08:23.747+00:00",
        modifiedAt: "2023-10-18T08:08:23.747+00:00",
        commentId: 39,
        commentProject: {
          createdAt: "2023-10-18T08:06:13.852+00:00",
          modifiedAt: "2023-10-18T08:37:47.509+00:00",
          projectId: 35,
          projectTitle: "앙큼우리",
          projectContent: "<p>asdfasdf</p>",
          projectWantedRole:
            '[{"role": "front", "complete": 0, "personnel": 1}]',
          projectDue: "2023-10-20T00:00:00.000+00:00",
          projectAcademy: "강남",
          projectStatus: true,
          projectWriterId: "sift",
          projectWriterNick: "정성민",
          projectFilePath:
            "/webapp/8925a8bb-2165-4863-9b44-2f84b3daccbd_하리그림.jpg",
          projectFileName: "projectImage",
          projectScrapNum: 2,
          parsedProjectWantedRole: [
            {
              role: "front",
              complete: 0,
              personnel: 1,
            },
          ],
        },
        commentWriter: {
          createdAt: "2023-10-18T07:13:57.230+00:00",
          modifiedAt: "2023-10-25T04:51:49.608+00:00",
          memberId: "sift",
          memberPw:
            "$2a$10$jcvpGxgco1gUUez0f.EEqegL8LtmBfX.7qxbYzW96HDFonI9If9DG",
          memberNickname: "정성민",
          memberAcademy: "노원",
          memberRole: "front",
          memberIntroduce: "asdfasdf",
          memberLink:
            '[{"option":"Git","value":"asdfasdf@"},{"label":"Git","value":"asdfasdf"}]',
          memberFilePath: "/static/icons/",
          memberFileName: "21_raccoon.png",
          memberStack: '["HTML","Kotlin"]',
          memberAuthority: [],
          scrappedProjects: [
            {
              createdAt: "2023-10-25T04:15:32.747+00:00",
              modifiedAt: "2023-10-25T06:09:21.006+00:00",
              projectId: 84,
              projectTitle: "dfdffd",
              projectContent: "<p>dfdf</p>",
              projectWantedRole:
                '[{"role": "back", "complete": 0, "personnel": 1}]',
              projectDue: "2023-10-27T00:00:00.000+00:00",
              projectAcademy: "강남",
              projectStatus: true,
              projectWriterId: "parksangin",
              projectWriterNick: "stork",
              projectFilePath:
                "/webapp/795650c6-9e1d-4d96-b2b8-e8fc51cd5fc4_test.jpg",
              projectFileName: "projectImage",
              projectScrapNum: 2,
              parsedProjectWantedRole: [
                {
                  role: "back",
                  complete: 0,
                  personnel: 1,
                },
              ],
            },
            {
              createdAt: "2023-10-18T07:18:08.827+00:00",
              modifiedAt: "2023-10-18T07:23:21.814+00:00",
              projectId: 3,
              projectTitle: "헷",
              projectContent: "<p>헷</p>",
              projectWantedRole:
                '[{"role": "back", "complete": 0, "personnel": 1}]',
              projectDue: "2023-11-11T00:00:00.000+00:00",
              projectAcademy: "노원",
              projectStatus: true,
              projectWriterId: null,
              projectWriterNick: null,
              projectFilePath:
                "/webapp/b0b176b3-e77d-4e1d-aee0-ef1644d4b6bb_Black.png",
              projectFileName: "projectImage",
              projectScrapNum: 2,
              parsedProjectWantedRole: [
                {
                  role: "back",
                  complete: 0,
                  personnel: 1,
                },
              ],
            },
            {
              createdAt: "2023-10-25T05:14:42.720+00:00",
              modifiedAt: "2023-10-25T06:10:41.290+00:00",
              projectId: 86,
              projectTitle: "좋아요테스트",
              projectContent: "<p>좋아요테스트</p>",
              projectWantedRole:
                '[{"role": "back", "complete": 1, "personnel": 1}]',
              projectDue: "2023-10-25T00:00:00.000+00:00",
              projectAcademy: "강남",
              projectStatus: false,
              projectWriterId: "parksangin3",
              projectWriterNick: "parksangin3",
              projectFilePath:
                "/webapp/4e1b3f5d-2ec4-4553-a26c-7511304001f8_test.jpg",
              projectFileName: "projectImage",
              projectScrapNum: 3,
              parsedProjectWantedRole: [
                {
                  role: "back",
                  complete: 1,
                  personnel: 1,
                },
              ],
            },
            {
              createdAt: "2023-10-25T06:38:33.244+00:00",
              modifiedAt: "2023-10-25T07:34:34.932+00:00",
              projectId: 130,
              projectTitle: "tttt",
              projectContent: "<p>ttt</p>",
              projectWantedRole:
                '[{"role": "front", "complete": 0, "personnel": 1}]',
              projectDue: "2023-11-08T00:00:00.000+00:00",
              projectAcademy: "신촌/홍대",
              projectStatus: true,
              projectWriterId: "kkk123",
              projectWriterNick: "nay",
              projectFilePath:
                "/webapp/d8154d10-db56-4f29-86a4-dad1e1c75bcc_default3.png",
              projectFileName: "projectImage",
              projectScrapNum: 2,
              parsedProjectWantedRole: [
                {
                  role: "front",
                  complete: 0,
                  personnel: 1,
                },
              ],
            },
          ],
        },
        commentContent: "asdfasdfasdfasdf",
      },
      {
        createdAt: "2023-10-19T11:19:21.340+00:00",
        modifiedAt: "2023-10-19T11:19:21.340+00:00",
        commentId: 55,
        commentProject: {
          createdAt: "2023-10-19T11:18:36.369+00:00",
          modifiedAt: "2023-10-24T16:32:54.251+00:00",
          projectId: 52,
          projectTitle: "테스트용",
          projectContent: "<p>이예에</p>",
          projectWantedRole:
            '[{"role": "front", "complete": 0, "personnel": 3}]',
          projectDue: "2023-10-27T00:00:00.000+00:00",
          projectAcademy: "노원",
          projectStatus: true,
          projectWriterId: "sift",
          projectWriterNick: "정성민",
          projectFilePath:
            "/webapp/c3260eec-dbf1-4cf3-bdf8-76917d9e8ec4_낭넴그림.png",
          projectFileName: "projectImage",
          projectScrapNum: 1,
          parsedProjectWantedRole: [
            {
              role: "front",
              complete: 0,
              personnel: 3,
            },
          ],
        },
        commentWriter: {
          createdAt: "2023-10-18T07:13:57.230+00:00",
          modifiedAt: "2023-10-25T04:51:49.608+00:00",
          memberId: "sift",
          memberPw:
            "$2a$10$jcvpGxgco1gUUez0f.EEqegL8LtmBfX.7qxbYzW96HDFonI9If9DG",
          memberNickname: "정성민",
          memberAcademy: "노원",
          memberRole: "front",
          memberIntroduce: "asdfasdf",
          memberLink:
            '[{"option":"Git","value":"asdfasdf@"},{"label":"Git","value":"asdfasdf"}]',
          memberFilePath: "/static/icons/",
          memberFileName: "21_raccoon.png",
          memberStack: '["HTML","Kotlin"]',
          memberAuthority: [],
          scrappedProjects: [
            {
              createdAt: "2023-10-25T04:15:32.747+00:00",
              modifiedAt: "2023-10-25T06:09:21.006+00:00",
              projectId: 84,
              projectTitle: "dfdffd",
              projectContent: "<p>dfdf</p>",
              projectWantedRole:
                '[{"role": "back", "complete": 0, "personnel": 1}]',
              projectDue: "2023-10-27T00:00:00.000+00:00",
              projectAcademy: "강남",
              projectStatus: true,
              projectWriterId: "parksangin",
              projectWriterNick: "stork",
              projectFilePath:
                "/webapp/795650c6-9e1d-4d96-b2b8-e8fc51cd5fc4_test.jpg",
              projectFileName: "projectImage",
              projectScrapNum: 2,
              parsedProjectWantedRole: [
                {
                  role: "back",
                  complete: 0,
                  personnel: 1,
                },
              ],
            },
            {
              createdAt: "2023-10-18T07:18:08.827+00:00",
              modifiedAt: "2023-10-18T07:23:21.814+00:00",
              projectId: 3,
              projectTitle: "헷",
              projectContent: "<p>헷</p>",
              projectWantedRole:
                '[{"role": "back", "complete": 0, "personnel": 1}]',
              projectDue: "2023-11-11T00:00:00.000+00:00",
              projectAcademy: "노원",
              projectStatus: true,
              projectWriterId: null,
              projectWriterNick: null,
              projectFilePath:
                "/webapp/b0b176b3-e77d-4e1d-aee0-ef1644d4b6bb_Black.png",
              projectFileName: "projectImage",
              projectScrapNum: 2,
              parsedProjectWantedRole: [
                {
                  role: "back",
                  complete: 0,
                  personnel: 1,
                },
              ],
            },
            {
              createdAt: "2023-10-25T05:14:42.720+00:00",
              modifiedAt: "2023-10-25T06:10:41.290+00:00",
              projectId: 86,
              projectTitle: "좋아요테스트",
              projectContent: "<p>좋아요테스트</p>",
              projectWantedRole:
                '[{"role": "back", "complete": 1, "personnel": 1}]',
              projectDue: "2023-10-25T00:00:00.000+00:00",
              projectAcademy: "강남",
              projectStatus: false,
              projectWriterId: "parksangin3",
              projectWriterNick: "parksangin3",
              projectFilePath:
                "/webapp/4e1b3f5d-2ec4-4553-a26c-7511304001f8_test.jpg",
              projectFileName: "projectImage",
              projectScrapNum: 3,
              parsedProjectWantedRole: [
                {
                  role: "back",
                  complete: 1,
                  personnel: 1,
                },
              ],
            },
            {
              createdAt: "2023-10-25T06:38:33.244+00:00",
              modifiedAt: "2023-10-25T07:34:34.932+00:00",
              projectId: 130,
              projectTitle: "tttt",
              projectContent: "<p>ttt</p>",
              projectWantedRole:
                '[{"role": "front", "complete": 0, "personnel": 1}]',
              projectDue: "2023-11-08T00:00:00.000+00:00",
              projectAcademy: "신촌/홍대",
              projectStatus: true,
              projectWriterId: "kkk123",
              projectWriterNick: "nay",
              projectFilePath:
                "/webapp/d8154d10-db56-4f29-86a4-dad1e1c75bcc_default3.png",
              projectFileName: "projectImage",
              projectScrapNum: 2,
              parsedProjectWantedRole: [
                {
                  role: "front",
                  complete: 0,
                  personnel: 1,
                },
              ],
            },
          ],
        },
        commentContent: "테스트용 댓글",
      },
      {
        createdAt: "2023-10-19T11:19:43.328+00:00",
        modifiedAt: "2023-10-19T11:19:43.328+00:00",
        commentId: 56,
        commentProject: {
          createdAt: "2023-10-19T11:18:36.369+00:00",
          modifiedAt: "2023-10-24T16:32:54.251+00:00",
          projectId: 52,
          projectTitle: "테스트용",
          projectContent: "<p>이예에</p>",
          projectWantedRole:
            '[{"role": "front", "complete": 0, "personnel": 3}]',
          projectDue: "2023-10-27T00:00:00.000+00:00",
          projectAcademy: "노원",
          projectStatus: true,
          projectWriterId: "sift",
          projectWriterNick: "정성민",
          projectFilePath:
            "/webapp/c3260eec-dbf1-4cf3-bdf8-76917d9e8ec4_낭넴그림.png",
          projectFileName: "projectImage",
          projectScrapNum: 1,
          parsedProjectWantedRole: [
            {
              role: "front",
              complete: 0,
              personnel: 3,
            },
          ],
        },
        commentWriter: {
          createdAt: "2023-10-18T07:13:57.230+00:00",
          modifiedAt: "2023-10-25T04:51:49.608+00:00",
          memberId: "sift",
          memberPw:
            "$2a$10$jcvpGxgco1gUUez0f.EEqegL8LtmBfX.7qxbYzW96HDFonI9If9DG",
          memberNickname: "정성민",
          memberAcademy: "노원",
          memberRole: "front",
          memberIntroduce: "asdfasdf",
          memberLink:
            '[{"option":"Git","value":"asdfasdf@"},{"label":"Git","value":"asdfasdf"}]',
          memberFilePath: "/static/icons/",
          memberFileName: "21_raccoon.png",
          memberStack: '["HTML","Kotlin"]',
          memberAuthority: [],
          scrappedProjects: [
            {
              createdAt: "2023-10-25T04:15:32.747+00:00",
              modifiedAt: "2023-10-25T06:09:21.006+00:00",
              projectId: 84,
              projectTitle: "dfdffd",
              projectContent: "<p>dfdf</p>",
              projectWantedRole:
                '[{"role": "back", "complete": 0, "personnel": 1}]',
              projectDue: "2023-10-27T00:00:00.000+00:00",
              projectAcademy: "강남",
              projectStatus: true,
              projectWriterId: "parksangin",
              projectWriterNick: "stork",
              projectFilePath:
                "/webapp/795650c6-9e1d-4d96-b2b8-e8fc51cd5fc4_test.jpg",
              projectFileName: "projectImage",
              projectScrapNum: 2,
              parsedProjectWantedRole: [
                {
                  role: "back",
                  complete: 0,
                  personnel: 1,
                },
              ],
            },
            {
              createdAt: "2023-10-18T07:18:08.827+00:00",
              modifiedAt: "2023-10-18T07:23:21.814+00:00",
              projectId: 3,
              projectTitle: "헷",
              projectContent: "<p>헷</p>",
              projectWantedRole:
                '[{"role": "back", "complete": 0, "personnel": 1}]',
              projectDue: "2023-11-11T00:00:00.000+00:00",
              projectAcademy: "노원",
              projectStatus: true,
              projectWriterId: null,
              projectWriterNick: null,
              projectFilePath:
                "/webapp/b0b176b3-e77d-4e1d-aee0-ef1644d4b6bb_Black.png",
              projectFileName: "projectImage",
              projectScrapNum: 2,
              parsedProjectWantedRole: [
                {
                  role: "back",
                  complete: 0,
                  personnel: 1,
                },
              ],
            },
            {
              createdAt: "2023-10-25T05:14:42.720+00:00",
              modifiedAt: "2023-10-25T06:10:41.290+00:00",
              projectId: 86,
              projectTitle: "좋아요테스트",
              projectContent: "<p>좋아요테스트</p>",
              projectWantedRole:
                '[{"role": "back", "complete": 1, "personnel": 1}]',
              projectDue: "2023-10-25T00:00:00.000+00:00",
              projectAcademy: "강남",
              projectStatus: false,
              projectWriterId: "parksangin3",
              projectWriterNick: "parksangin3",
              projectFilePath:
                "/webapp/4e1b3f5d-2ec4-4553-a26c-7511304001f8_test.jpg",
              projectFileName: "projectImage",
              projectScrapNum: 3,
              parsedProjectWantedRole: [
                {
                  role: "back",
                  complete: 1,
                  personnel: 1,
                },
              ],
            },
            {
              createdAt: "2023-10-25T06:38:33.244+00:00",
              modifiedAt: "2023-10-25T07:34:34.932+00:00",
              projectId: 130,
              projectTitle: "tttt",
              projectContent: "<p>ttt</p>",
              projectWantedRole:
                '[{"role": "front", "complete": 0, "personnel": 1}]',
              projectDue: "2023-11-08T00:00:00.000+00:00",
              projectAcademy: "신촌/홍대",
              projectStatus: true,
              projectWriterId: "kkk123",
              projectWriterNick: "nay",
              projectFilePath:
                "/webapp/d8154d10-db56-4f29-86a4-dad1e1c75bcc_default3.png",
              projectFileName: "projectImage",
              projectScrapNum: 2,
              parsedProjectWantedRole: [
                {
                  role: "front",
                  complete: 0,
                  personnel: 1,
                },
              ],
            },
          ],
        },
        commentContent: "오늘 모기 엄청 많네요\n방충망에 모기가 어후",
      },
    ],
    myScraplist: [
      {
        createdAt: "2023-10-25T04:15:32.747+00:00",
        modifiedAt: "2023-10-25T06:09:21.006+00:00",
        projectId: 84,
        projectTitle: "dfdffd",
        projectContent: "<p>dfdf</p>",
        projectWantedRole: '[{"role": "back", "complete": 0, "personnel": 1}]',
        projectDue: "2023-10-27T00:00:00.000+00:00",
        projectAcademy: "강남",
        projectStatus: true,
        projectWriterId: "parksangin",
        projectWriterNick: "stork",
        projectFilePath:
          "/webapp/795650c6-9e1d-4d96-b2b8-e8fc51cd5fc4_test.jpg",
        projectFileName: "projectImage",
        projectScrapNum: 2,
        parsedProjectWantedRole: [
          {
            role: "back",
            complete: 0,
            personnel: 1,
          },
        ],
      },
      {
        createdAt: "2023-10-18T07:18:08.827+00:00",
        modifiedAt: "2023-10-18T07:23:21.814+00:00",
        projectId: 3,
        projectTitle: "헷",
        projectContent: "<p>헷</p>",
        projectWantedRole: '[{"role": "back", "complete": 0, "personnel": 1}]',
        projectDue: "2023-11-11T00:00:00.000+00:00",
        projectAcademy: "노원",
        projectStatus: true,
        projectWriterId: null,
        projectWriterNick: null,
        projectFilePath:
          "/webapp/b0b176b3-e77d-4e1d-aee0-ef1644d4b6bb_Black.png",
        projectFileName: "projectImage",
        projectScrapNum: 2,
        parsedProjectWantedRole: [
          {
            role: "back",
            complete: 0,
            personnel: 1,
          },
        ],
      },
      {
        createdAt: "2023-10-25T05:14:42.720+00:00",
        modifiedAt: "2023-10-25T06:10:41.290+00:00",
        projectId: 86,
        projectTitle: "좋아요테스트",
        projectContent: "<p>좋아요테스트</p>",
        projectWantedRole: '[{"role": "back", "complete": 1, "personnel": 1}]',
        projectDue: "2023-10-25T00:00:00.000+00:00",
        projectAcademy: "강남",
        projectStatus: false,
        projectWriterId: "parksangin3",
        projectWriterNick: "parksangin3",
        projectFilePath:
          "/webapp/4e1b3f5d-2ec4-4553-a26c-7511304001f8_test.jpg",
        projectFileName: "projectImage",
        projectScrapNum: 3,
        parsedProjectWantedRole: [
          {
            role: "back",
            complete: 1,
            personnel: 1,
          },
        ],
      },
      {
        createdAt: "2023-10-25T06:38:33.244+00:00",
        modifiedAt: "2023-10-25T07:34:34.932+00:00",
        projectId: 130,
        projectTitle: "tttt",
        projectContent: "<p>ttt</p>",
        projectWantedRole: '[{"role": "front", "complete": 0, "personnel": 1}]',
        projectDue: "2023-11-08T00:00:00.000+00:00",
        projectAcademy: "신촌/홍대",
        projectStatus: true,
        projectWriterId: "kkk123",
        projectWriterNick: "nay",
        projectFilePath:
          "/webapp/d8154d10-db56-4f29-86a4-dad1e1c75bcc_default3.png",
        projectFileName: "projectImage",
        projectScrapNum: 2,
        parsedProjectWantedRole: [
          {
            role: "front",
            complete: 0,
            personnel: 1,
          },
        ],
      },
    ],
  };

  //비밀번호
  const passwordRegex =
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,30}$/;
  const [pw, setPw] = useState("");
  const [pwError, setPwError] = useState("");
  const [pwConfirm, setPwConfirm] = useState(""); // Separate state for password confirmation
  const [pwConfirmError, setPwConfirmError] = useState(""); // Separate error state for password confirmation
  //유저-처음 가져온 정보
  const [memberInfo, setMemberInfo] = useState(info);
  //유저-수정된 정보
  // const[memberNewInfo,setMemberNewInfo]=useState(newInfo);
  //유저-아카데미
  const [selectLocation, setSelectLocation] = useState(
    memberInfo.memberAcademy
  );
  //유저-역할
  const [selectField, setSelectField] = useState(memberInfo.memberRole);
  //유저-개인링크
  const [selectLink, setSelectLink] = useState(
    JSON.parse(memberInfo.memberLink)
  );
  // const [isEditing, setIsEditing] = useState(false);
  //유저-선택한언어
  const [selectedLanguages, setSelectedLanguages] = useState(
    JSON.parse(memberInfo.memberStack)
  );
  //유저-선택한 프로필사진 7_dog.png
  const [selectFile, setSelectFile] = useState("/" + memberInfo.memberFileName);
  //유저-프로젝트개설-이미지
  const [projectMainImg, setProjectMainImg] = useState(
    "http://projecttycoon.com" + memberInfo.mylist?.projectFilePath
  );
  //유저-프로젝트개설-제목
  const [projectMainTitle, setProjectMainTitle] = useState(
    memberInfo.mylist?.projectTitle
  );

  const handleProfileImg = (e) => {
    setProfile(e.target.value);
    // setSelectFile("/"+defaultImg[profile]);
  };
  // const imageInput = useRef();
  return (
    <Wrap>
      <Content>
        <Top>
          <Right>
            <ImgWrap>
              {defaultImg[profile] === undefined ? (
                <ImgBox
                  src={"http://projecttycoon.com/static/icons/" + profile}
                ></ImgBox>
              ) : (
                <ImgBox
                  src={
                    "http://projecttycoon.com/static/icons/" +
                    defaultImg[profile]
                  }
                ></ImgBox>
              )}
              <ButWrap>
                <Profile
                  value={profileimg[profile]}
                  onChange={handleProfileImg}
                >
                  {defaultImgName.map((image, imageIndex) => (
                    <option key={imageIndex} value={image.value}>
                      {image.label}
                    </option>
                  ))}
                </Profile>
              </ButWrap>
            </ImgWrap>
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
              {/* isEditing===ture  */}
              <XsmallBox>
                <NickInput
                  width={"100%"}
                  type="text"
                  value={memberInfo.memberNickname}
                  onChange={(event) =>
                    handleInputChange(event, "memberNickname")
                  }
                />
              </XsmallBox>
            </Box>
            <Box>
              <SmallBox>위치</SmallBox>
              <XsmallBox>
                <LocationSelect
                  value={memberInfo.memberAcademy}
                  onChange={(event) =>
                    handleInputChange(event, "memberAcademy")
                  }
                >
                  {locations.map((location, locationIndex) => (
                    <option key={locationIndex} value={location.value}>
                      {location.label}
                    </option>
                  ))}
                </LocationSelect>
              </XsmallBox>
            </Box>
            <Box>
              <PwBox>
                <PwBox2>
                  <PwInput
                    placeholder="새로운 비밀번호"
                    type="password"
                    value={pw}
                    onChange={(e) => {
                      const newPassWord = e.target.value;
                      setPw(newPassWord);
                      if (newPassWord.length > 15) {
                        alert("15자 이하로 작성해주세요.");
                      }
                      if (!passwordRegex.test(newPassWord)) {
                        setPwError(
                          "영문, 숫자, 특수문자 포함 8자리 이상 입력해 주세요."
                        );
                      }
                    }}
                  />
                  {passwordRegex.test(pw) === true ? (
                    <Span></Span>
                  ) : (
                    <Span>
                      영문, 숫자, 특수문자 포함 8자리 이상 입력해 주세요.
                    </Span>
                  )}
                </PwBox2>
              </PwBox>
            </Box>
            <Box>
              <PwBox>
                <PwBox2>
                  <PwInput
                    placeholder="새로운 비밀번호 재입력"
                    type="password"
                    value={pwConfirm}
                    onChange={(e) => {
                      e.preventDefault();
                      const newPasswordConfirm = e.target.value;
                      setPwConfirm(newPasswordConfirm);
                      if (newPasswordConfirm !== pw) {
                        setPwConfirmError("비밀번호가 일치하지 않습니다.");
                      } else {
                        setPwConfirmError(""); // 일치하면 에러 메시지 제거
                      }
                    }}
                  />
                  {pwConfirm !== pw ? (
                    <Span>비밀번호가 일치하지 않습니다.</Span>
                  ) : (
                    <Span></Span>
                  )}
                </PwBox2>
              </PwBox>
            </Box>
          </Left>
        </Top>
        <Bot>
          <IntroduceBox>
            <IntroWrap>
              <IntroBox>한줄소개</IntroBox>
              <IntroSubBox>
                본인의 업무 경험을 기반으로 핵심역량을 간단하게 작성해주세요!
              </IntroSubBox>
            </IntroWrap>
            <XsmallBox>
              <InputIntro
                type="text"
                value={memberInfo.memberIntroduce}
                onChange={(event) =>
                  handleInputChange(event, "memberIntroduce")
                }
              />
            </XsmallBox>
          </IntroduceBox>
          <div></div>
          <Box>
            <SmallBox width="140px" minwidth="100px">
              역할
            </SmallBox>
            <XsmallBox>
              <StackSelect
                value={memberInfo.memberRole}
                onChange={(event) => handleInputChange(event, "memberRole")}
              >
                {fields.map((field, fieldIndex) => (
                  <option key={fieldIndex} value={field.value}>
                    {field.label}
                  </option>
                ))}
              </StackSelect>
            </XsmallBox>
          </Box>
          <Box>
            <SmallBox width={"140px"} minwidth={"100px"}>
              언어
            </SmallBox>
            <XsmallBox>
              {selectedLanguages.length > 0 ? (
                <Wrap360>
                  <div>
                    <StackSelect
                      value={selectedLanguages[selectedLanguages.length - 1]}
                      onChange={handleLanguageChange}
                    >
                      {stacks.map((stack, stackIndex) => (
                        <option key={stackIndex} value={stack.value}>
                          {stack.label}
                        </option>
                      ))}
                    </StackSelect>
                    <Span>복수 선택 가능</Span>
                  </div>
                  <StackButWrap>
                    {selectedLanguages.map((selectedLanguage) => (
                      <StackBut
                        type="button"
                        key={selectedLanguage}
                        onClick={() =>
                          handleLanguageButtonClick(selectedLanguage)
                        }
                      >
                        {
                          stacks.find(
                            (option) => option.value === selectedLanguage
                          )?.label
                        }
                      </StackBut>
                    ))}
                  </StackButWrap>
                </Wrap360>
              ) : (
                <>
                  <StackSelect
                    value={selectedLanguages[selectedLanguages.length - 1]}
                    onChange={handleLanguageChange}
                  >
                    {stacks.map((stack, stackIndex) => (
                      <option key={stackIndex} value={stack.value}>
                        {stack.label}
                      </option>
                    ))}
                  </StackSelect>
                  <Span>선택한 언어가 없습니다.</Span>
                </>
              )}
            </XsmallBox>
          </Box>
          <LinkBox>
            <LinkSmallBox>개인링크</LinkSmallBox>
            <LinkWrap>{list()}</LinkWrap>
          </LinkBox>
        </Bot>
        <But2Wrap>
          <But2 background_color="gray">취소</But2>
          <But2
            onClick={() => {
              if (
                window.confirm(
                  "수정시 재로그인이 필요합니다. 수정하시겠습니까?"
                )
              ) {
                if (defaultImg[profile] === undefined) {
                  PostAxios(
                    pw,
                    memberInfo.memberId,
                    memberInfo.memberNickname,
                    memberInfo.memberAcademy,
                    memberInfo.memberRole,
                    memberInfo.memberIntroduce,
                    profile,
                    selectedLanguages,
                    selectLink
                  );
                } else {
                  PostAxios(
                    pw,
                    memberInfo.memberId,
                    memberInfo.memberNickname,
                    memberInfo.memberAcademy,
                    memberInfo.memberRole,
                    memberInfo.memberIntroduce,
                    defaultImg[profile],
                    selectedLanguages,
                    selectLink
                  );
                }
              }
            }}
          >
            완료
          </But2>
        </But2Wrap>
      </Content>
    </Wrap>
  );
}

export default UserInfo;
