import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import styled from "@emotion/styled";
import QuillTestPage from "./QuillTest";
import { FiFilePlus } from "react-icons/fi";

const But = styled.button`
  border: none;
  outline: none;
  width: ${(props) => props.width || "420px"};
  height: ${(props) => props.width || "30px"};
  background-color: ${(props) => props.background_color || "#0B666A"};
  color: white;
  margin-bottom: 50px;
`;
const WriteWrap = styled.div`
  margin: 0 auto;
  max-width: 1000px;
`;
const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 4px;
`;
const Title = styled.h2`
  width: 100%;
  border-bottom: 3px gray solid;
  padding: 12px;
`;
const Subtitle = styled.h4`
  max-width: 910px;
  width: 100%;
  margin: 0;
  padding: 8px 0;
`;
const Select = styled.select`
  max-width: ${(props) => props.width || "319px"};
  width: 100%;
  padding: 12px 4px;
  font-size: 14px;
  color: gray;
  font-weight: 600;
`;
const InputTitle = styled.input`
  max-width: 843px;
  width: 100%;
  padding: 12px 4px;
  font-size: 14px;
  color: gray;
  font-weight: 600;
  margin-bottom: 20px;
`;
const MainImgWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 620px;
  height: 400px;
  position: relative;
`;
const MainImg = styled.img`
  height: 100%;
`;
const Bot = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-around;
`;
const DeleteBtn = styled.button`
  width: 35px;
`;
const ImgWrap = styled.div`
  max-width: 950px;
  display: flex;
  justify-content: space-between;
`;
const Ty = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 4px;
`;
const Top = styled.div`
  max-width: 400px;
  width: 100%;
  display: flex;
  flex-direction: column;
`;
const DateInput = styled.input`
  width: 100%;
  max-width: 385px;
  height: 40px;
`;
const ImgInput = styled.input`
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  border: 0;
`;
const FileLabel = styled.label`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  right: 0;
  top: 0;
  width: 70px;
  height: 65px;
  background-color: #0b666a;
  cursor: pointer;
  border-radius: 50%;
`;
const ButBox = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: space-around;
`;
const PlusBtn = styled.button`
  width: 44px;
  font-size: 12px;
  border-radius: 50%;
`;
const SubTitleWrap = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
`;
function Modify({ userData, originData }) {
  //제목
  const [title, setTitle] = useState(originData?.projectTitle);
  //프로젝트 내용
  const [contents, setContents] = useState(originData?.projectContent);
  //모집 마감일
  const [Deadline, setDeadline] = useState(originData?.projectDue.slice(0, 10));
  /**이미지 저장 */
  const [imgFile, setImgFile] = useState();
  //프젝 기본 이미지들
  const [Img, setImg] = useState(
    "http://projecttycoon.com" + originData?.projectFilePath
  );
  //이미지 디폴트 = false이미지 input = true
  const [imageMod, setImageMod] = useState(false);
  //모집지역
  const [academy, setAcademy] = useState(originData?.projectAcademy);
  //모집분야-초기값
  const [selectFields, setSelectFields] = useState(
    originData?.projectWantedRole
  );
  //현재날짜
  const currentDate = new Date().toISOString().split("T")[0];
  const fields = [
    { label: "백엔드", value: "back" },
    { label: "프론트엔드", value: "front" },
    { label: "AI", value: "ai" },
    { label: "빅데이터", value: "bigData" },
    { label: "서버관리자", value: "server" },
    { label: "정보보안", value: "security" },
    { label: "네트워크관리자", value: "netWork" },
  ];
  const peopleLabels = ["1명", "2명", "3명", "4명", "5명이상"];
  //role
  const handleNewFieldChange = (event, index) => {
    const updatedSelectFields = [...selectFields];
    updatedSelectFields[index].role = event.target.value;
    setSelectFields(updatedSelectFields);
  };
  //personnel
  const handleNewPersonnelChange = (event, index) => {
    const updatedSelectFields = [...selectFields];
    updatedSelectFields[index].personnel = parseInt(event.target.value);
    setSelectFields(updatedSelectFields);
  };
  const handleNewtitle = (e) => {
    setTitle(e.target.value);
  };
  const handleNewdeadline = (e) => {
    setDeadline(e.target.value);
  };
  const handleNewacademy = (e) => {
    setAcademy(e.target.value);
  };
  const handleNewcontents = useCallback((data) => {
    setContents(data);
  }, []);
  //유저-파일change
  const saveFileImg = (file) => {
    setImgFile(file);
    setImageMod(true);
    let Reader = new FileReader();
    Reader.readAsDataURL(file);
    Reader.onloadend = (path) => {
      setImg(path.currentTarget.result);
    };
  };
  const Params = {
    projectTitle: title,
    projectContent: contents,
    projectWantedRole: JSON.stringify(selectFields),
    projectStatus: true,
    projectDue: Deadline,
    projectAcademy: academy,
    projectWriterId: userData?.memberId,
    projectWriterNick: userData?.memberNickName,
    projectScarpNum: 0,
  };
  //But
  const handleAddButton = () => {
    if (selectFields.length < 7) {
      setSelectFields([
        ...selectFields,
        { role: "back", complete: 0, personnel: 1 },
      ]); // 추가 시 초기 선택 항목을 'back'으로 설정
    }
    // 삭제버튼(true)
  };
  const handleDeleteButton = (indexDelete) => {
    if (indexDelete === 0) {
      // 첫 번째 요소는 삭제하지 않도록 예외 처리
      return;
    }
    const updatedSelectFields = selectFields.filter(
      (list, index) => index !== indexDelete
    );
    setSelectFields(updatedSelectFields);
  };
  const Submit = async () => {
    axios
      .put(`/api/project/${originData?.projectId}`, JSON.stringify(Params), {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((res) => {
        alert("프로젝트가 정상적으로 수정 되었습니다.");
        window.location.href = `http://projecttycoon.com/callPageProjectBoardDetail/${originData?.projectId}`;
      })
      .catch((err) => {
        console.log(err);
        alert("등록 실패, 콘솔에서 error확인");
      });
  };
  return (
    <WriteWrap>
      <Wrap>
        <Title>📌 프로젝트에 대해 소개해주세요.</Title>
        <Subtitle>제목</Subtitle>
        <InputTitle
          onChange={handleNewtitle}
          placeholder="제목을 작성해주세요."
          value={title}
        />
        <Subtitle>사진</Subtitle>
        <ImgWrap>
          <MainImgWrap>
            <MainImg src={Img}></MainImg>
            {/* <FileLabel for="file">
              <FiFilePlus size={40} color="white" />
            </FileLabel> */}
            {/* <ImgInput
              type="file"
              id="file"
              onChange={(e) => {
                e.preventDefault();
                saveFileImg(e.currentTarget.files[0]);
              }}
            /> */}
          </MainImgWrap>
        </ImgWrap>
        <QuillTestPage
          handleSetContents={handleNewcontents}
          originContents={contents}
        />
        <Title>📌 프로젝트 기본 정보를 입력해주세요.</Title>
        <Bot>
          <Top>
            <div>
              <Subtitle>모집 지역</Subtitle>
              <Select onChange={handleNewacademy} width="390px" value={academy}>
                <option value="강남">강남</option>
                <option value="신촌/홍대">신촌/홍대</option>
                <option value="노원">노원</option>
                <option value="인천">인천</option>
                <option value="대전">대전</option>
                <option value="대구">대구</option>
                <option value="부산">부산</option>
              </Select>
            </div>
            <div>
              <Subtitle>모집 마감일</Subtitle>
              <DateInput
                type="date"
                onChange={handleNewdeadline}
                value={Deadline}
                min={currentDate}
              />
            </div>
          </Top>
          <Top>
            <SubTitleWrap>
              <Subtitle>모집 분야</Subtitle>
              <PlusBtn onClick={handleAddButton}>추가</PlusBtn>
            </SubTitleWrap>
            {selectFields.map((selectField, index) => (
              <div key={index}>
                <Ty>
                  <Select
                    width="270px"
                    defaultValue={selectField.role}
                    onChange={(event) => handleNewFieldChange(event, index)}
                  >
                    {fields.map((field, fieldIndex) => (
                      <option key={fieldIndex} value={field.value}>
                        {field.label}
                      </option>
                    ))}
                  </Select>
                  <Select
                    width="80px"
                    value={selectField.personnel}
                    onChange={(event) => handleNewPersonnelChange(event, index)}
                  >
                    {peopleLabels.map((label, labelIndex) => (
                      <option key={labelIndex} value={labelIndex + 1}>
                        {label}
                      </option>
                    ))}
                  </Select>
                  {index > 0 && (
                    <DeleteBtn onClick={() => handleDeleteButton(index)}>
                      -
                    </DeleteBtn>
                  )}
                </Ty>
              </div>
            ))}
          </Top>
        </Bot>
      </Wrap>
      <ButBox>
        <But
          background_color="gray"
          onClick={() => {
            window.history.back();
          }}
        >
          취소
        </But>
        <But
          onClick={() => {
            Submit();
          }}
        >
          수정
        </But>
      </ButBox>
    </WriteWrap>
  );
}
export default Modify;
