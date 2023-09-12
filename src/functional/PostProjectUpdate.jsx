import axios from "axios";

export const RoleUpdate = async (origin, role) => {
  let roleStatus = origin.projectStatus;
  let count = 0;
  for (let i = 0; i < role.length; i++) {
    if (role[i].complete === role[i].personnel) count += 1;
    else break;
  }
  if (count === role.length) roleStatus = false;
  else roleStatus = true;
  let data = JSON.stringify({
    projectWantedRole: JSON.stringify(role),
    projectStatus: roleStatus,
  });

  let config = {
    method: "put",
    maxBodyLength: Infinity,
    url: `http://projecttycoon.com/api/project/${origin.projectId}`,
    headers: {
      "Content-Type": "application/json",
    },
    data: data,
  };
  console.log(data);
  axios
    .request(config)
    .then((response) => {
      console.log(JSON.stringify(response.data));
    })
    .catch((error) => {
      console.log(error);
    });
};
