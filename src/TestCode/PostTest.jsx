import axios from "axios";
/** axios post를 통해 프로젝트 생성 테스트 코드 */
export const PostAction = async (file) => {
  const Title = "test title"; //제목
  const Content = "test contents"; //게시글 내용
  const Role = JSON.stringify([
    { role: "front", number: 3 },
    { role: "back", number: 2 },
  ]); //모집분야 및 인원수
  const Status = "true"; //모집 진행 마감 여부 T=진행중 F=마감
  const Academy = "노원"; //학원정보
  const DeadLine = "2023-08-17"; //모집 마감 예정일
  const Id = "test id"; //작성자 ID
  const NickName = "test nick"; //작성자 닉네임
  const Scrap = 10; //?
  const Params = {
    projectTitle: Title,
    projectContent: Content,
    projectWantedRole: Role,
    projectStatus: Status,
    projectDue: DeadLine,
    projectAcademy: Academy,
    projectWriterId: Id,
    projectWriterNick: NickName,
    projectScarpNum: Scrap,
  }; //기존 사용법을 FormData로 변환하기 위한 요소
  let data = new FormData();
  data.append("file", file); //e.curruntTarget.files[0]의 사진데이터를 받아와 데이터 주입
  data.append(
    "projectRequestDTO",
    new Blob([JSON.stringify(Params)], { type: "application/json" }),
    {
      contentType: "application/json",
    }
  );
  axios
    .post("/api/projectRegister", data, {
      headers: { "Content-Type": "multipart/form-data" },
    })
    .then((res) => {
      alert(res);
    })
    .catch((err) => {
      console.log(err);
      alert("등록 실패, 콘솔에서 error확인");
    });
};
