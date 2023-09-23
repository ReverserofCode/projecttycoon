import axios from "axios";

// 백엔드 API로부터 필터링된 데이터를 가져오는 데 사용
export const GetFilterList = async (projectRoles, place) => {
  try {
    let targetUrl = "/api/callAllMemberRequest"; // Default target URL

    // projectRoles 배열을 URL 매개변수로 추가
    if (projectRoles.length !== 0) {
      targetUrl = `/api/projectsByRoles?roles=${projectRoles.join(",")}`;
    }

    // place 값을 URL 매개변수로 추가
    if (place) {
      if (targetUrl.includes("?")) {
        targetUrl += `&place=${place}`;
      } else {
        targetUrl += `?place=${place}`;
      }
    }

    // axios.get(targetUrl)를 사용하여 생성된 URL로 GET 요청을 보내고, 서버에서 반환된 데이터를 받아옵니다.
    const response = await axios.get(targetUrl);
    return response.data;
  } catch (error) {
    console.error("Error in GetFilterList:", error);
    throw error;
  }
};
