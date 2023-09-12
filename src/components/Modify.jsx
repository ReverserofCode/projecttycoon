import { useCallback, useState } from "react";
import styled from "@emotion/styled";
import QuillTestPage from "./QuillTest";
import { FiFilePlus } from "react-icons/fi";
import { PostAction } from "../functional/PostAction";
import { default1, default2, default3 } from "../img/Images";

let today = new Date();
let todayYear = today.getFullYear();
let todayMonth = today.getMonth() + 1;
let todayDate = today.getDate();
todayMonth = todayMonth < 10 ? "0" + todayMonth : todayMonth;
todayDate = todayDate < 10 ? "0" + todayDate : todayDate;

const But = styled.button`
  border: none;
  outline: none;
  width: ${(props) => props.width || "420px"};
  height: ${(props) => props.width || "30px"};
  background-color: ${(props) => props.background_color || "#0B666A"};
  color: white;
`;
const WriteWrap = styled.div`
  margin: 0 auto;
  max-width: 1000px;
  /* border: 1px red solid; */
`;
const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  /* border: 1px gray solid; */
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
const SubSelect = styled.select`
  width: 80px;
  padding: 12px 4px;
  font-size: 14px;
  color: gray;
  font-weight: 600;
  margin-right: 20px;
  margin-left: 4px;
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
  overflow: hidden;
`;
const Ji = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.65);
  opacity: 0;
  &:hover {
    opacity: 0.8;
  }
`;
const SubImg = styled.img`
  width: 100%;
  height: 100%;
`;
const SubImgBox = styled.div`
  position: relative;
  width: 230px;
  height: 120px;
`;
const Bot = styled.div`
  width: 100%;
  display: flex;
`;
const PulsBut = styled.button`
  width: 100px;
`;
const Right = styled.div`
  /* width: 100%; */
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  cursor: pointer;
  /* margin-left: 8px; */
`;
const ImgWrap = styled.div`
  max-width: 950px;
  display: flex;
  /* border: 1px green solid; */
  justify-content: space-between;
`;
const TT = styled.div`
  /* max-width: 1000px; */
  /* width: 100%; */
  /* border: 1px red solid; */
  display: flex;
  flex-direction: column;
`;
const Top = styled.div`
  /* width: 100%; */
  display: flex;
  flex-direction: column;
`;
const DateInput = styled.input`
  width: 400px;
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
  /* left: 50%;  */
  /* width: 70px;
    height: 50px;
    border-radius: 50%;*/
`;
const Txt = styled.div`
  font-size: 20px;
  font-weight: 800;
  color: white;
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

function Modify() {
  //제목
  const [title, setTitle] = useState("");
  //프로젝트 내용
  const [contents, setContents] = useState("");
  //날짜
  const [date, setDate] = useState(`${todayYear}-${todayMonth}-${todayDate}`);
  //모집분야
  const [Field, setField] = useState(["back"]);
  //모집분야-인원
  const [Personnel, setPersonnel] = useState(["1"]);
  //모집분야-추가버튼의 카운트
  const [Count, setCount] = useState(1);
  //프젝 기본 이미지들
  const [Img, setImg] = useState(default1);
  /**이미지 저장 */
  const [imgFile, setImgFile] = useState();
  /**이미지 디폴트 = false 이미지 input = true */
  const [imageMod, setImageMod] = useState(false);

  /**학원지점 */
  const [academy, setAcademy] = useState("감남");

  const handleSetContents = useCallback((data) => {
    setContents(data);
  }, []);

  const fieldHandling = (e, index) => {
    let buf = [...Field];
    buf[index] = e.target.value;
    setField(buf);
  };
  const personnelHandling = (e, index) => {
    let buf = [...Personnel];
    buf[index] = e.target.value;
    setPersonnel(buf);
  };
  const PulsButton = () => {
    setCount(Count + 1);
    let bufField = [...Field, "back"];
    setField(bufField);
    let bufPersonnel = [...Personnel, "1"];
    setPersonnel(bufPersonnel);
  };

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
  function list() {
    let arr = [];
    for (let i = 0; i < Count; i++) {
      arr.push(
        <>
          <Select
            width="700px"
            onChange={(e) => fieldHandling(e, i)}
            key={`Role list ${i}`}
          >
            <option value="back">백엔드</option>
            <option value="front">프론트엔드</option>
            <option value="ai">AI</option>
            <option value="bigData">빅데이터</option>
            <option value="server">서버관리자</option>
            <option value="security">정보보안</option>
            <option value="netWork">네트워크 관리자</option>
          </Select>
          <SubSelect
            onChange={(e) => personnelHandling(e, i)}
            key={`Personnel list ${i}`}
          >
            <option value="1">1명</option>
            <option value="2">2명</option>
            <option value="3">3명</option>
            <option value="4">4명</option>
            <option value="5">5명 이상</option>
          </SubSelect>
        </>
      );
    }
    return arr;
  }
  return (
    <WriteWrap>
      <Wrap>
        <Title>📌 프로젝트에 대해 소개해주세요.</Title>
        <Subtitle>제목</Subtitle>
        <InputTitle
          placeholder="제목을 작성해주세요."
          onChange={(e) => {
            e.preventDefault();
            setTitle(e.target.value);
          }}
          value={title}
        />
        <Subtitle>사진</Subtitle>
        <ImgWrap>
          {/* 메인 프로젝트 기본이미지 바뀌는 코드 */}
          <MainImgWrap>
            {Img === default1 ? (
              <MainImg src={"http://projecttycoon.com" + default1} />
            ) : Img === default2 ? (
              <MainImg src={"http://projecttycoon.com" + default2} />
            ) : Img === default3 ? (
              <MainImg src={"http://projecttycoon.com" + default3} />
            ) : (
              <MainImg src={Img} />
            )}
            <FileLabel for="file">
              <FiFilePlus size={40} color="white" />
            </FileLabel>
            <ImgInput
              type="file"
              id="file"
              onChange={(e) => {
                e.preventDefault();
                saveFileImg(e.currentTarget.files[0]);
              }}
            ></ImgInput>
          </MainImgWrap>
          {/* 마지막인덱스값 가져와야함 or 3 */}
          <Right>
            <SubImgBox
              onClick={() => {
                setImg(default1);
                setImageMod(false);
              }}
            >
              <SubImg src={"http://projecttycoon.com" + default1} />
              <Ji>
                <Txt>기본 이미지 입니다.</Txt>
                <Txt>클릭 해주세요.</Txt>
              </Ji>
            </SubImgBox>
            <SubImgBox
              onClick={() => {
                setImg(default2);
                setImageMod(false);
              }}
            >
              <SubImg src={"http://projecttycoon.com" + default2} />
              <Ji>
                <Txt>기본 이미지 입니다.</Txt>
                <Txt>클릭 해주세요.</Txt>
              </Ji>
            </SubImgBox>
            <SubImgBox
              onClick={() => {
                setImg(default3);
                setImageMod(false);
              }}
            >
              <SubImg src={"http://projecttycoon.com" + default3} />
              <Ji>
                <Txt>기본 이미지 입니다.</Txt>
                <Txt>클릭 해주세요.</Txt>
              </Ji>
            </SubImgBox>
          </Right>
        </ImgWrap>
        <QuillTestPage handleSetContents={handleSetContents} />
        <Title>📌 프로젝트 기본 정보를 입력해주세요.</Title>
        <Bot>
          <Top>
            <div>
              <Subtitle>모집 지역</Subtitle>
              <Select
                width="405px"
                onChange={(e) => {
                  e.preventDefault();
                  setAcademy(e.currentTarget.value);
                }}
              >
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
                dateFormat="yyyy년 MM월 dd일"
                value={date}
                min={`${todayYear}-${todayMonth}-${todayDate}`}
                onChange={(e) => {
                  e.preventDefault();
                  let select = new Date(e.target.value);
                  let selectYear = select.getFullYear();
                  let selectMonth = select.getMonth() + 1;
                  let selectDate = select.getDate();
                  selectMonth =
                    selectMonth < 10 ? "0" + selectMonth : selectMonth;
                  selectDate = selectDate < 10 ? "0" + selectDate : selectDate;
                  setDate(`${selectYear}-${selectMonth}-${selectDate}`);
                }}
              />
            </div>
          </Top>
          <div>
            <Subtitle>모집 분야</Subtitle>
            <TT>{list()}</TT>
            <PulsBut onClick={PulsButton}>+</PulsBut>
          </div>
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
            let buf = [];
            for (let i = 0; i < Field.length; i++) {
              buf.push({
                role: Field[i],
                complete: 0,
                personnel: Number(Personnel[i]),
              });
            }
            PostAction(
              title,
              contents,
              buf,
              date,
              academy,
              imageMod,
              imgFile,
              Img
            );
          }}
        >
          수정
        </But>
      </ButBox>
    </WriteWrap>
  );
}
export default Modify;
