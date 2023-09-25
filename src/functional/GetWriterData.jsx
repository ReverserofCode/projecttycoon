import axios from "axios";

export const GetWriterData = async (id) => {
  let data = await axios
    .get(`/api/memberPage/${id}`)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      console.log(err);
    });
  return await data;
};
