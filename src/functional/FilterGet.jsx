import axios from "axios";

export const GetFilterList = async (projectStatus, projectRoles) => {
  const filterAll = projectStatus?.length === 1 && projectRoles?.length !== 0;
  const statusFilter =
    projectStatus?.length !== 2 &&
    projectStatus?.length !== 0 &&
    projectRoles?.length === 0;
  const recruitsFilter =
    (projectStatus?.length === 2 || projectStatus?.length === 0) &&
    projectRoles?.length !== 0;
  let targetUrl = "";
  if (filterAll) {
    targetUrl = `/api/projectsByStatusAndAllRoles?status=${projectStatus}&roles=${projectRoles.join(
      ","
    )}`;
  } else if (statusFilter) {
    targetUrl = `/api/projects?status=${projectStatus[0]}`;
  } else if (recruitsFilter) {
    targetUrl = `/api/projectsByRoles?roles=${projectRoles.join(",")}`;
  } else {
    targetUrl = `/api/projectAllRequest`;
  }
  let data = await axios
    .get(targetUrl)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      console.log(err);
    });

  return await data;
};
