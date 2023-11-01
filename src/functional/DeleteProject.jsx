import axios from "axios";

export const DeleteProject = async (id) => {
  let data = await axios
    .delete(`/api/project/${id}`)
    .then(() => {
      console.log("프로젝트 삭제! ヾ(•ω•`)o");
    })
    .catch((err) => {
      err;
    });
};
