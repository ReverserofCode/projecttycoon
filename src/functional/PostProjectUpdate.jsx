import axios from "axios";

export const RoleUpdate = async (origin, role) => {
  let roleStatus = origin.projectStatus;
  let ComPer = role.length;
  for (let i = 0; i < role.length; i++) {
    if (!roleStatus) break;
    if (role[i].complete === role[i].personnel) ComPer += 1;
  }
  if (ComPer === role.length) roleStatus = false;
  let buf = {
    projectId: 69,
    projectTitle: origin.projectTitle,
    projectContent: origin.projectContent,
    projectWantedRole: role,
    projectDue: origin.projectDue,
    projectAcademy: origin.projectAcademy,
    projectStatus: roleStatus,
    projectWriterId: origin.projectWriterId,
    projectWriterNick: origin.projectWriterNick,
    projectFilePath: origin.projectFilePath,
    projectFileName: origin.projectFileName,
    projectScrapNum: origin.projectScrapNum,
  };
  let data = new FormData();
  data.append("projectRequestDTO", new Blob[JSON.stringify(buf)](), {
    contentType: "application/json",
  });
  await axios
    .post(``)
    .then(() => {})
    .catch((err) => {
      console.log(err);
    });
};
