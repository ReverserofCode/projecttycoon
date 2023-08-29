import axios from "axios";

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
      console.log(error);
    });
  return await data;
};
