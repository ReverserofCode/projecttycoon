import axios from "axios";

export const BoardListGet = async () => {
  const List = await axios.get("/api/projectAllRequest").then((res) => {
    return res.data;
  });
  return await List;
};
