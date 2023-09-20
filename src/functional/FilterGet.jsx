import axios from "axios";

// 백엔드 API로부터 필터링된 데이터를 가져오는 데 사용
export const GetFilterList = async (projectRoles, place) => {
  try {
    let targetUrl = "/api/callAllMemberRequest"; // Default target URL

    /* projectStatus 배열의 길이가 1이고, projectRoles 배열이 비어 있지 않으면,
      "/api/projectsByStatusAndAllRoles"로 요청 URL을 설정
      projectStatus[0]과 projectRoles 배열을 URL 매개변수로 추가 */
    if (projectStatus.length === 1 && projectRoles.length !== 0) {
      targetUrl = `/api/projectsByStatusAndAllRoles?status=${
        projectStatus[0]
      }&roles=${projectRoles.join(",")}`;
      /**projectStatus 배열의 길이가 0이 아니고 projectRoles 배열이 비어 있으면,
       * "/api/projectsByStatus"로 요청 URL을 설정
       *  projectStatus[0]을 URL 매개변수로 추가 */
    } else if (projectStatus.length !== 0 && projectRoles.length === 0) {
      targetUrl = `/api/projectsByStatus?status=${projectStatus[0]}`;
      /*projectStatus 배열의 길이가 0이고 projectRoles 배열이 비어 있지 않으면, 
      "/api/projectsByRoles"로 요청 URL을 설정
      projectRoles 배열을 URL 매개변수로 추가*/
    } else if (projectStatus.length === 0 && projectRoles.length !== 0) {
      targetUrl = `/api/projectsByRoles?roles=${projectRoles.join(",")}`;
    }

    if (place) {
      targetUrl += target`&place=${place}`;
    }

    // axios.get(targetUrl)를 사용하여 생성된 URL로 GET 요청을 보내고, 서버에서 반환된 데이터를 받아온다
    const response = await axios.get(targetUrl);
    return response.data;
  } catch (error) {
    console.error("Error in GetFilterList:", error);
    throw error;
  }
};
