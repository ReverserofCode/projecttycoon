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
  await axios
    .post(
      `/api/projects/${projectId}/commentsPost`,
      JSON.stringify({
        commentContent: contents,
        commentWriterId: writerId,
      }),
      {
        headers: {
          "Content-Type": `application/json`,
        },
      }
    )
    .then((res) => {
      return res;
    })
    .catch((err) => {
      console.log(err);
    });
};

export const CommentDelete = async (projectId, commentId) => {
  await axios
    .delete(`/api/projects/${projectId}/commentsDelete/${commentId}`)
    .then(() => {
      console.log("댓글이 삭제 되었습니다.");
    })
    .catch((err) => {
      console.log(err);
    });
};
