import axios from "axios";

/** 프로젝트 리스트 가져오기 */
// export const BoardListGet = async () => {
//   try {
//     const response = await axios.get("/api/callAllMemberRequest");
//     const data = response.data;

//     // API 응답 데이터를 콘솔에 출력
//     console.log("API 응답 데이터:", data);

//     return data;
//   } catch (error) {
//     // 오류 처리
//     console.error("API 요청 중 오류 발생:", error);
//     throw error; // 오류를 다시 throw하여 상위 컴포넌트에서 처리할 수 있도록 합니다.
//   }
// };
export const BoardListGet = async () => {
  const data = await axios
    .get("/api/callAllMemberRequest")
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      console.log(err);
    });
  return await data;
  // try {
  //   const response = await axios.get("/api/callAllMemberRequest");
  //   const data = response.data;
  //   return data;
  // } catch (error) {
  //   console.error("API 요청 중 오류 발생:", error);
  //   throw error;
  // }
};
