import axios from "axios";
import UserInfo from "../components/userInfo";
import UserWrite from "../components/userWrite";
import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import { PostAxios } from "../functional/PostAxios";

const NavWrap = styled.div`
  cursor: pointer;
  display: flex;
  margin-bottom: 40px;
  margin-left: 10px;
`;
const Nav = styled.a`
  font-size: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 30px;
  width: 160px;
  height: 40px;
  border-bottom: 2px gray solid;
`;
const Wrap = styled.div`
  max-width: 1100px;
  width: 100%;
  margin: 0 auto;
  margin-top: 80px;
  @media screen and (max-width: 370px) {
    width: 360px;
  }
`;
const Point = styled.div`
  border-bottom: 2px red solid;
`;
function UserMypage() {
  const info = {
    memberId: "sift",
    memberPw: "$2a$10$unl/kpsWN9lFX5ax34J1VueoVQCrp.p2PT/.gVWWf8.kkNG7AfJ/G",
    memberRole: "front",
    memberIntroduce: "asdfasdf",
    memberLink: '[{"option":"Git","value":"asdfasdf@"}]',
    memberAcademy: "노원",
    memberNickname: "정성민",
    memberFilePath: "/static/icons/",
    memberFileName: "9_alpaca.png",
    memberStack: '["HTML"]',
    myProjectlist: [
      {
        createdAt: "2023-10-18T08:06:13.852+00:00",
        modifiedAt: "2023-10-18T08:37:47.509+00:00",
        projectId: 35,
        projectTitle: "asdfasdf",
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
        modifiedAt: "2023-10-19T11:18:36.369+00:00",
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
        projectScrapNum: 0,
        parsedProjectWantedRole: [
          {
            role: "front",
            complete: 0,
            personnel: 3,
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
          modifiedAt: "2023-10-18T07:13:57.244+00:00",
          memberId: "sift",
          memberPw:
            "$2a$10$unl/kpsWN9lFX5ax34J1VueoVQCrp.p2PT/.gVWWf8.kkNG7AfJ/G",
          memberNickname: "정성민",
          memberAcademy: "노원",
          memberRole: "front",
          memberIntroduce: "asdfasdf",
          memberLink: '[{"option":"Git","value":"asdfasdf@"}]',
          memberFilePath: "/static/icons/",
          memberFileName: "9_alpaca.png",
          memberStack: '["HTML"]',
          memberAuthority: ["USER"],
          scrappedProjects: [
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
          modifiedAt: "2023-10-18T07:13:57.244+00:00",
          memberId: "sift",
          memberPw:
            "$2a$10$unl/kpsWN9lFX5ax34J1VueoVQCrp.p2PT/.gVWWf8.kkNG7AfJ/G",
          memberNickname: "정성민",
          memberAcademy: "노원",
          memberRole: "front",
          memberIntroduce: "asdfasdf",
          memberLink: '[{"option":"Git","value":"asdfasdf@"}]',
          memberFilePath: "/static/icons/",
          memberFileName: "9_alpaca.png",
          memberStack: '["HTML"]',
          memberAuthority: ["USER"],
          scrappedProjects: [
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
          ],
        },
        commentContent: "나도 댓글",
      },
      {
        createdAt: "2023-10-18T08:08:21.599+00:00",
        modifiedAt: "2023-10-18T08:08:21.599+00:00",
        commentId: 38,
        commentProject: {
          createdAt: "2023-10-18T08:06:13.852+00:00",
          modifiedAt: "2023-10-18T08:37:47.509+00:00",
          projectId: 35,
          projectTitle: "asdfasdf",
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
          modifiedAt: "2023-10-18T07:13:57.244+00:00",
          memberId: "sift",
          memberPw:
            "$2a$10$unl/kpsWN9lFX5ax34J1VueoVQCrp.p2PT/.gVWWf8.kkNG7AfJ/G",
          memberNickname: "정성민",
          memberAcademy: "노원",
          memberRole: "front",
          memberIntroduce: "asdfasdf",
          memberLink: '[{"option":"Git","value":"asdfasdf@"}]',
          memberFilePath: "/static/icons/",
          memberFileName: "9_alpaca.png",
          memberStack: '["HTML"]',
          memberAuthority: ["USER"],
          scrappedProjects: [
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
          ],
        },
        commentContent: "asdfasdf",
      },
      {
        createdAt: "2023-10-18T08:08:23.747+00:00",
        modifiedAt: "2023-10-18T08:08:23.747+00:00",
        commentId: 39,
        commentProject: {
          createdAt: "2023-10-18T08:06:13.852+00:00",
          modifiedAt: "2023-10-18T08:37:47.509+00:00",
          projectId: 35,
          projectTitle: "asdfasdf",
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
          modifiedAt: "2023-10-18T07:13:57.244+00:00",
          memberId: "sift",
          memberPw:
            "$2a$10$unl/kpsWN9lFX5ax34J1VueoVQCrp.p2PT/.gVWWf8.kkNG7AfJ/G",
          memberNickname: "정성민",
          memberAcademy: "노원",
          memberRole: "front",
          memberIntroduce: "asdfasdf",
          memberLink: '[{"option":"Git","value":"asdfasdf@"}]',
          memberFilePath: "/static/icons/",
          memberFileName: "9_alpaca.png",
          memberStack: '["HTML"]',
          memberAuthority: ["USER"],
          scrappedProjects: [
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
          modifiedAt: "2023-10-19T11:18:36.369+00:00",
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
          projectScrapNum: 0,
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
          modifiedAt: "2023-10-18T07:13:57.244+00:00",
          memberId: "sift",
          memberPw:
            "$2a$10$unl/kpsWN9lFX5ax34J1VueoVQCrp.p2PT/.gVWWf8.kkNG7AfJ/G",
          memberNickname: "정성민",
          memberAcademy: "노원",
          memberRole: "front",
          memberIntroduce: "asdfasdf",
          memberLink: '[{"option":"Git","value":"asdfasdf@"}]',
          memberFilePath: "/static/icons/",
          memberFileName: "9_alpaca.png",
          memberStack: '["HTML"]',
          memberAuthority: ["USER"],
          scrappedProjects: [
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
          modifiedAt: "2023-10-19T11:18:36.369+00:00",
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
          projectScrapNum: 0,
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
          modifiedAt: "2023-10-18T07:13:57.244+00:00",
          memberId: "sift",
          memberPw:
            "$2a$10$unl/kpsWN9lFX5ax34J1VueoVQCrp.p2PT/.gVWWf8.kkNG7AfJ/G",
          memberNickname: "정성민",
          memberAcademy: "노원",
          memberRole: "front",
          memberIntroduce: "asdfasdf",
          memberLink: '[{"option":"Git","value":"asdfasdf@"}]',
          memberFilePath: "/static/icons/",
          memberFileName: "9_alpaca.png",
          memberStack: '["HTML"]',
          memberAuthority: ["USER"],
          scrappedProjects: [
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
          ],
        },
        commentContent: "오늘 모기 엄청 많네요\n방충망에 모기가 어후",
      },
    ],
    myScraplist: [
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
    ],
  };
  const [memberInfo, setMemberInfo] = useState(info);
  //유저-프로젝트개설-이미지
  // const [projectMainImg,setProjectMainImg]=useState("http://projecttycoon.com"+memberInfo?.mylist?.projectFilePath)
  //유저-프로젝트개설-제목
  // const [projectMainTitle,setProjectMainTitle]=useState(memberInfo?.mylist?.projectTitle)

  //네브 스위치
  const [on, setoff] = useState(true);
  const HandleModal1 = (e) => {
    setoff(true);
  };
  const handleGet = async () => {
    await axios
      .get("/api/mypage")
      .then((response) => {
        setMemberInfo(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const HandleModal2 = (e) => {
    setoff(false);
  };
  useEffect(() => {
    handleGet();
  }, []);
  return (
    <Wrap>
      <NavWrap>
        <Nav onClick={HandleModal1}>내프로필</Nav>
        <Nav onClick={HandleModal2}>활동관리</Nav>
      </NavWrap>
      {on ? (
        <UserInfo on={on}></UserInfo>
      ) : (
        <UserWrite on={on} memberInfo={memberInfo}></UserWrite>
      )}
    </Wrap>
  );
}
export default UserMypage;
