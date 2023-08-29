import axios from "axios";

export const LoginSubmit = async (id, password) => {
  const DataFormat = new FormData();
  DataFormat.append("memberId", id);
  DataFormat.append("memberPw", password);
  const data = await axios
    .post(`/login`, { data: DataFormat })
    .then((res) => {
      return res;
    })
    .catch((error) => {
      console.log(error);
    });
  return await data;
};
