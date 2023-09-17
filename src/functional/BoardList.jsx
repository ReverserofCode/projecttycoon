import axios from "axios";

/** 프로젝트 리스트 가져오기 */
export const BoardListGet = async () => {
  const List = await axios.get("/api/projectAllRequest").then((res) => {
    return res.data;
  });
  return await List;
};
