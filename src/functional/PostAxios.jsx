import axios from "axios";
import { Logout } from "./Logout";

export const PostAxios = async (
  MemberPw,
  MemberId,
  MemberNickname,
  MemberAcademy,
  MemberRole,
  MemberIntroduce,
  MemberFileName,
  SelectedLanguages,
  SelectLink
) => {
  let Params = {};
  if (MemberPw.length === 0) {
    Params = {
      memberNickname: MemberNickname, //닉네임
      memberAcademy: MemberAcademy, //지점
      memberRole: MemberRole, //역할
      memberIntroduce: MemberIntroduce, //한줄소개
      memberFilePath: "/static/icons/", //이미지 고정값
      memberFileName: MemberFileName, //이미지
      memberStack: JSON.stringify(SelectedLanguages), //언어
      memberLink: JSON.stringify(SelectLink), //링크
    };
    axios
      .put(`/api/memberUpdateEcPw/${MemberId}`, JSON.stringify(Params), {
        headers: { "Content-Type": "application/json" },
      })
      .then(() => {
        Logout();
        window.location.href = "http://projecttycoon.com/api/login";
      })
      .catch((error) => {
        console.log(error);
      });
  } else {
    Params = {
      memberPw: MemberPw, //비밀번호
      memberNickname: MemberNickname, //닉네임
      memberAcademy: MemberAcademy, //지점
      memberRole: MemberRole, //역할
      memberIntroduce: MemberIntroduce, //한줄소개
      memberFilePath: "/static/icons/", //이미지 고정값
      memberFileName: MemberFileName, //이미지
      memberStack: JSON.stringify(SelectedLanguages), //언어
      memberLink: JSON.stringify(SelectLink), //링크
    };
    axios
      .put(`/api/memberUpdate/${MemberId}`, JSON.stringify(Params), {
        headers: { "Content-Type": "application/json" },
      })
      .then(() => {
        Logout();
        window.location.href = "http://projecttycoon.com/api/login";
      })
      .catch((error) => {
        console.log(error);
      });
  }

  //기존 사용법을 FormData로 변환하기 위한 요소
  // let data = new FormData();
  // if (imageMod) data.append("file", file);
  // data.append(
  //   "projectRequestDTO",
  //   new Blob([JSON.stringify(Params)], { type: "application/json" }),
  //   {
  //     contentType: "application/json",
  //   }
  // );
  console.log(Params);
};
