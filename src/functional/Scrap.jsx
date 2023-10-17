import axios from "axios";

export const ScrapPost = async (projectId, myId) => {
  let data = await axios
    .post(`/api/project/${projectId}/${myId}`)
    .then(() => {
      console.log("좋아요! o(*￣▽￣*)ブ");
    })
    .catch((err) => {
      console.log(err);
    });
};
export const ScrapDelete = async (projectId, myId) => {
  let data = await axios
    .delete(`/api/project/${projectId}/${myId}`)
    .then(() => {
      console.log("안좋아요! o(*￣▽￣*)ブ");
    })
    .catch((err) => {
      console.log(err);
    });
};
