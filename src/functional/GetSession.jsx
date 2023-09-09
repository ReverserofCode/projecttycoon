import axios from "axios";

/** 로그인 세션 데이터로 부터 자신의 ID를 받아오는 function */
export const SessionIdCall = async () => {
  let data = await axios
    .get(`/sessionObject`)
    .then((res) => {
      return res.data.memberId;
    })
    .catch((err) => {
      console.log(err);
    });
  return await data;
};
