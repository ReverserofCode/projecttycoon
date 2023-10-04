import axios from "axios";

/** 프로젝트 리스트 가져오기 */

export const BoardListGet = async () => {
  const data = await axios
    .get("/api/memberList")
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      console.log(err);
    });
  return await data;
};
