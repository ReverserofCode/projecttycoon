import axios from "axios";

export const GetFilterList = async (
  projectStatus,
  projectRoles,
  projectPlace
) => {
  let targetUrl = "/api/projectAllRequest";
  const filterAll =
    projectPlace !== "전체" &&
    projectRoles?.length !== 0 &&
    projectStatus?.length === 1;
  const statusFilter =
    projectStatus?.length === 1 &&
    projectPlace === "전체" &&
    projectRoles?.length === 0;
  const rolesFilter =
    projectStatus?.length !== 1 &&
    projectPlace === "전체" &&
    projectRoles?.length !== 0;
  const placeFilter =
    projectPlace !== "전체" &&
    projectRoles?.length === 0 &&
    projectStatus?.length !== 1;
  const statusAndPlaceFilter =
    projectStatus?.length === 1 &&
    projectPlace !== "전체" &&
    projectRoles?.length === 0;
  const statusAndRolesFilter =
    projectStatus?.length === 1 &&
    projectPlace === "전체" &&
    projectRoles?.length !== 0;
  const placeAndRolesFilter =
    projectStatus?.length !== 1 &&
    projectPlace !== "전체" &&
    projectRoles?.length !== 0;
  if (statusFilter) {
    targetUrl = `/api/projectsByStatus?status=${projectStatus}`;
  }
  if (placeFilter) {
    targetUrl = `/api/projectsByAcademy?academy=${projectPlace}`;
  }
  if (rolesFilter) {
    targetUrl = `/api/projectsByRoles?roles=${projectRoles?.join(",")}`;
  }
  if (statusAndPlaceFilter) {
    targetUrl = `/api/projectsByStatusAndAcademy?status=${projectStatus}&academy=${projectPlace}`;
  }
  if (statusAndRolesFilter) {
    targetUrl = `/api/projectsByStatusAndRoles?status=${projectStatus}&roles=${projectRoles?.join(
      ","
    )}`;
  }
  if (placeAndRolesFilter) {
    targetUrl = `/api/projectsByAcademyAndRoles?academy=${projectPlace}&roles=${projectRoles?.join(
      ","
    )}`;
  }
  if (filterAll) {
    targetUrl = `/api/projectsByStatusAndAcademyAndRoles?status=${projectStatus}&academy=${projectPlace}&roles=${projectRoles?.join(
      ","
    )}`;
  }
  // const filterAll = projectStatus?.length === 1 && projectRoles?.length !== 0;
  // const statusFilter =
  //   projectStatus?.length !== 2 &&
  //   projectStatus?.length !== 0 &&
  //   projectRoles?.length === 0;
  // const recruitsFilter =
  //   (projectStatus?.length === 2 || projectStatus?.length === 0) &&
  //   projectRoles?.length !== 0;
  // let targetUrl = "";
  // if (filterAll) {
  //   targetUrl = `/api/projectsByStatusAndAllRoles?status=${projectStatus}&roles=${projectRoles.join(
  //     ","
  //   )}`;
  // } else if (statusFilter) {
  //   targetUrl = `/api/projects?status=${projectStatus[0]}`;
  // } else if (recruitsFilter) {
  //   targetUrl = `/api/projectsByRoles?roles=${projectRoles.join(",")}`;
  // } else {
  //   targetUrl = `/api/projectAllRequest`;
  // }
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
