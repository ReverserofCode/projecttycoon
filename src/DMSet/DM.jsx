import axios from "axios";
/** DM 리스트를 가져오는 function */
export const DMListCall = async (id) => {
  let data = await axios
    .get(`/api/dmroomList/${id}`)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      console.log(err);
    });
  return await data;
};
/** DM방을 생성하는 function */
export const DMRoomGen = async (myId, targetId) => {
  let data = await axios
    .post(
      "/api/openDMroomDirectly",
      JSON.stringify({
        DMFromId: myId,
        DMToId: targetId,
      }),
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
    .then((res) => {
      alert("DM 방이 개설 되었습니다.");
      return res.data;
    })
    .catch((err) => {
      console.log(err);
    });
  return await data;
};
/** DM방의 메세지를 가져오는 function */
export const DMGetMessage = async (id) => {
  let data = await axios
    .get(`/api/getMessages/${id}`)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      console.log(err);
    });
  return await data;
};
/** DM방에 메세지를 보내는 function */
export const DMSend = async (message, targetId, myId, dmId) => {
  let data = JSON.stringify({
    DMFromId: myId,
    DMToId: targetId,
    DMContent: message,
    DMroomId: dmId,
    DMRead: false,
  });

  let config = {
    method: "post",
    maxBodyLength: Infinity,
    url: "/api/dmsend",
    headers: {
      "Content-Type": "application/json",
    },
    data: data,
  };

  await axios
    .request(config)
    .then((response) => {
      console.log(JSON.stringify(response.data));
    })
    .catch((error) => {
      console.log(error);
    });
};
