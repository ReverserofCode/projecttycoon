import axios from "axios";

export const PostAxios = async (
  MemberId,
  MemberNickname,
  MemberAcademy,
  MemberRole,
  MemberIntroduce,
  MemberFileName,
  SelectedLanguages,
  SelectLink,
) => {
  const Params = {
    // memberPw: 'Content', // 비밀번호
    memberNickname: MemberNickname, //닉네임 
    memberAcademy: MemberAcademy, // 지점
    memberRole: MemberRole, //역할
    memberIntroduce: MemberIntroduce, //한줄소개
    memberFilePath: "/static/icons/",  //고정값
    memberFileName: MemberFileName,
    memberStack: JSON.stringify(SelectedLanguages), //언어
    memberLink:JSON.stringify(SelectLink), //링크
  };



axios
.put (`/api/memberUpdate/${MemberId}`,JSON.stringify(Params))
.then((response) => {
  console.log(JSON.stringify(response.data));
})
.catch((error) => {
  console.log(error);
});


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

  // axios
  //   .post("/api/projectRegister", data, {
  //     headers: { "Content-Type": "multipart/form-data" },
  //   })
  //   .then(() => {
  //     console.log("프로젝트 등록 완료!ヾ(•ω•`)o");
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //     alert("등록 실패, 콘솔에서 error확인");
  //   });
};

