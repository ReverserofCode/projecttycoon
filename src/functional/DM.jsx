import axios from "axios";
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
export const DMRoomGen = async (myId, targetId) => {
  let data = await axios
    .post(
      "/api/openDMroomDirectly",
      JSON.stringify({
        DMFromId: myId,
        DMToId: targetId,
      })
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
export const DMSend = async (message, targetId, myId, dmId) => {
  let data = await axios
    .post(
      `/api/dmsend`,
      JSON.stringify({
        DMFromId: myId,
        DMToId: targetId,
        DMContent: message,
        DMroomId: dmId,
        DMRead: false,
      })
    )
    .then(() => {
      console.log("message send! o(*￣▽￣*)ブ");
    })
    .catch((err) => {
      console.log(err);
    });
  return await data;
};
