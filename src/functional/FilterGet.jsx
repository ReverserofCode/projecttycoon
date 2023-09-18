import axios from "axios";

export const GetFilterList = async (projectStatus, projectRoles, place) => {
  try {
    let targetUrl = "/api/callAllMemberRequest"; // Default target URL

    // Check if both projectStatus and projectRoles are provided
    if (projectStatus.length === 1 && projectRoles.length !== 0) {
      targetUrl = `/api/projectsByStatusAndAllRoles?status=${
        projectStatus[0]
      }&roles=${projectRoles.join(",")}`;
    }
    // Check if only projectStatus is provided
    else if (projectStatus.length !== 0 && projectRoles.length === 0) {
      targetUrl = `/api/projectsByStatus?status=${projectStatus[0]}`;
    }
    // Check if only projectRoles are provided
    else if (projectStatus.length === 0 && projectRoles.length !== 0) {
      targetUrl = `/api/projectsByRoles?roles=${projectRoles.join(",")}`;
    }

    // Optional: Add filtering by place (assuming you want to filter by place)
    if (place) {
      targetUrl += `&place=${place}`;
    }

    // Fetch data from the target URL
    const response = await axios.get(targetUrl);
    return response.data;
  } catch (error) {
    console.error("Error in GetFilterList:", error);
    throw error; // You can handle the error in the calling component
  }
};
