import axios from "axios";

/** 메인 로그인으로 요청을 보내는 fnction */
export const LoginSubmit = async (id, password) => {
  const DataFormat = new FormData();
  DataFormat.append("memberId", id);
  DataFormat.append("memberPw", password);
  const data = await axios
    .post("/login", DataFormat)
    .then(() => {
      window.location.href = "http://projecttycoon.com";
    })
    .catch((error) => {
      alert(
        "로그인이 정상적으로 처리되지 않았습니다.\n아이디, 비밀번호를 확인해주세요"
      );
    });
  return await data;
};
