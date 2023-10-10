import axios from "axios";

export const CommentGet = async (id) => {
  let data = await axios
    .get(`/api/projects/${id}/commentsGet`)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      console.log(err);
    });
  return await data;
};

export const CommentPost = async (projectId, writerId, contents) => {
  let data = await axios
    .post(
      `/api/projects/${projectId}/commentsPost`,
      JSON.stringify(
        {
          commentContent: contents,
          commentWriterId: writerId,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
    )
    .then(() => {
      return "success";
    })
    .catch((err) => {
      console.log(err);
    });
  return await data;
};
