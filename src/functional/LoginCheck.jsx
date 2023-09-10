import axios from "axios";
/** 현재 로그인 상태를 확인하는 function */
export const LoginCheck = async () => {
  let data = await axios
    .get("/sessionObject")
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      console.log(err);
    });
  return await data;
};
