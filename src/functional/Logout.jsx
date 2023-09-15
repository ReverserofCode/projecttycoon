import axios from "axios";
/** 로그아웃 function */
export const Logout = async () => {
  let data = await axios
    .post("/api/logoutProcess")
    .then(() => {})
    .catch((err) => {
      alert(err);
    });
};
