import axios from "axios";

/** 프로젝트 ID를 통해 프로젝트르 불러오는 function */
export const GetProjectFromID = async (id) => {
  const data = await axios
    .get(`/api/project/${id}`)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      alert(`${id} 프로젝트는 현재 존재하지 않는 프로젝트 입니다.\n${err}`);
    });
  return data;
};
