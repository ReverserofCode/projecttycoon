import axios from "axios";

export const ScrapDataGet = async () => {
  let data = await axios
    .get("/api/mypage")
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      console.log(err);
    });
  return await data;
};
