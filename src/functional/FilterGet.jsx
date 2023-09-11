import axios from "axios";

export const GetFilterList = async (projectStatus = true, projectRoles) => {
  let data = await axios
    .get(
      `/api/projectsByStatusAndAllRoles?status=${projectStatus}&roles=${projectRoles.join(
        ","
      )}`
    )
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      console.log(err);
    });

  return await data;
};
