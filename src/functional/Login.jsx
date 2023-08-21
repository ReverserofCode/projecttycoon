import axios from "axios";

export const LoginSubmit = async (id, password) => {
  const data = await axios
    .post(`/api/loginProcess?memberId=${id}&memberPw=${password}`)
    .then((res) => {
      return res;
    })
    .catch((error) => {
      console.log(error);
    });
  return await data;
};
