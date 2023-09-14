//해야할거
//1.버튼css바꾸기
//2.파일선택 input css
//3.전체적인 배치 (padding,magin) 다시주기
//4.모집분야 재배치
<<<<<<< HEAD
//기능구현
//기본이미지 마지막으로 할 수 있게끔 마지막인덱스값
//
import { useEffect, useRef, useState, useCallback } from "react";
=======
//삭제버튼
import { useEffect, useRef, useState,useCallback } from "react"
>>>>>>> 057e94b003c0c2bc1758a46a63b3593240f67e91
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styled from "@emotion/styled";

import QuillTestPage from "../TestCode/QuillTest";
import { default1, default2, default3 } from "../img/images";

import { FiFilePlus } from "react-icons/fi";

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
  align-items: center;
  width: 620px;
  height: 400px;
  position: relative;
`;
const MainImg = styled.img`
  width: 95%;
  height: 90%;
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
<<<<<<< HEAD
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
=======
`
const SubImg=styled.img`
    width: 100%;
    height: 100%;
`
const SubImgBox=styled.div`
position: relative;
    width: 230px;
    height: 120px;
`
const Bot=styled.div`
    width: 100%;
    display: flex;
    justify-content: space-around;
    /* border: 1px gray solid; */
`
const DeleteBtn=styled.button`
  width: 35px;
`
const Right=styled.div`
    /* width: 100%; */
    display: flex;
    flex-direction:column;
    justify-content: space-around;
    cursor: pointer;
    /* margin-left: 8px; */
`
const ImgWrap=styled.div`
max-width: 950px;
    display: flex;
    /* border: 1px green solid; */
    justify-content: space-between;
`
const TT =styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%;
    margin-bottom: 4px;
`
const Top=styled.div`
    /* border: 1px solid blue; */
    max-width: 400px;
    width: 100%;
    display: flex;
    flex-direction: column;
`
const DateInput=styled.input`
    width: 100%;
    max-width: 385px;
    height: 40px;
`
const ImgInput=styled.input`
position: absolute;
>>>>>>> 057e94b003c0c2bc1758a46a63b3593240f67e91
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
<<<<<<< HEAD
`;
const ButBox = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: space-around;
`;
function Write({ userData }) {
  useEffect(() => {
    console.log(JSON.stringify(Params));
    console.log(selectFields);
  });
  //test
  // const [test,setTest]=useState({
  //     fieldd:"",
  //     person:""
  // })
  // const {fieldd,person}=test;
  // const onChange=e=>{
  //     const {name,value}=e.target;
  //     setTest({
  //         ...test,
  //         [name]: value
  //     })
  // }
  // const [user,setUser]=useState([{
  //     fieldd:"back",
  //     complete:0,
  //     person:"1"
  // },
  // ])
  // const userID=useRef(1);
  // const onCreate=()=>{
  //     const role={
  //         fieldd,
  //         complete:userID.current,
  //         person
  //     };
  //     setUser([...user,role])
  // setTest({
  //     fieldd:"",
  //     person:""
  // });
  //     userID.current+=1;
  //     setCount(Count+1);
  //     console.log(user)
  // }
  //제목
  const [title, setTitle] = useState("");
  //프로젝트 내용
  const [contents, setContents] = useState("");
  //모집 마감일
  const [Deadline, setDeadline] = useState("");
  /**이미지 저장 */
  const [imgFile, setImgFile] = useState();
  //프젝 기본 이미지들
  const [Img, setImg] = useState(default1);
  //이미지 디폴트 = false이미지 input = true
  const [imageMod, setImageMod] = useState(false);
  //모집지역
  const [academy, setAcademy] = useState("");
  //모집분야-초기값
  const [selectFields, setSelectFields] = useState([
    { role: "back", complete: 0, personnel: 1 },
  ]);
  const fields = [
=======
`
const ButBox=styled.div`
margin-top: 20px;
    display: flex;
    justify-content: space-around;
`
const PlusBtn=styled.button`
    width: 44px;
    font-size: 12px;
    border-radius: 50%;
`
const SubTitleWrap=styled.div`
    align-items: center;
    display: flex;
    justify-content: space-between;
`
function Write (){
    useEffect(()=>{
        console.log(JSON.stringify(Params));
        console.log(selectFields)
    })
//test
// const [test,setTest]=useState({
//     fieldd:"",
//     person:""
// })
// const {fieldd,person}=test;
// const onChange=e=>{
//     const {name,value}=e.target;
//     setTest({
//         ...test,
//         [name]: value
//     })
// }
// const [user,setUser]=useState([{
//     fieldd:"back",
//     complete:0,
//     person:"1"
// },
// ])
// const userID=useRef(1);
// const onCreate=()=>{
//     const role={
//         fieldd,
//         complete:userID.current,
//         person
//     };
//     setUser([...user,role])
    // setTest({
    //     fieldd:"",
    //     person:""
    // });
//     userID.current+=1;
//     setCount(Count+1);
//     console.log(user)
// }
//제목
const [title,setTitle]=useState('') 
//프로젝트 내용
const [contents, setContents] = useState("");
//모집 마감일
const [Deadline,setDeadline]=useState('')
/**이미지 저장 */
const [imgFile, setImgFile] = useState();
//프젝 기본 이미지들
const [Img,setImg]=useState(default1)
//이미지 디폴트 = false이미지 input = true
const [imageMod, setImageMod] = useState(false);
//모집지역
const [academy, setAcademy] = useState("");
//모집분야-초기값
const [selectFields, setSelectFields] = useState([{ role: 'back',complete:0,personnel: 1 }]);
//현재날짜
const currentDate = new Date().toISOString().split('T')[0];
const fields = [
>>>>>>> 057e94b003c0c2bc1758a46a63b3593240f67e91
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
    // console.log(Deadline)
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
<<<<<<< HEAD
      setImg(path.currentTarget.result);
    };
  };
  // const ar=[{Role:"back",complete:0,personnel:"1"}]
  const Params = {
=======
        setImg(path.currentTarget.result);
      };
}
const Params = {
>>>>>>> 057e94b003c0c2bc1758a46a63b3593240f67e91
    projectTitle: title,
    projectContent: contents,
    projectWantedRole: JSON.stringify(selectFields),
    projectStatus: true,
    projectDue: Deadline,
    projectAcademy: academy,
    projectWriterId: userData?.memberId,
    projectWriterNick: userData?.memberNickName,
    projectScarpNum: 10,
  };
  //But
  const handleAddButton = () => {
    if (selectFields.length < 7) {
<<<<<<< HEAD
      setSelectFields([
        ...selectFields,
        { role: "back", complete: 0, personnel: 1 },
      ]); // 추가 시 초기 선택 항목을 'back'으로 설정
=======
      setSelectFields([...selectFields, { role: 'back', complete:0,personnel: 1  }]); // 추가 시 초기 선택 항목을 'back'으로 설정
>>>>>>> 057e94b003c0c2bc1758a46a63b3593240f67e91
    }
    // 삭제버튼(true)
  };
<<<<<<< HEAD
  const handleDeleteButton = (index) => {
    const updatedSelectFields = [...selectFields];
    updatedSelectFields.splice(index, 1);
    setSelectFields(updatedSelectFields);
  };
  const Submit = async () => {
    if (Deadline == "") {
      alert("마감 날짜를 선택해주세요");
      return false;
=======
  
    const handleDeleteButton = (indexDelete) => {
        if (indexDelete === 0) {
            // 첫 번째 요소는 삭제하지 않도록 예외 처리
            return;
          }
        const updatedSelectFields = selectFields.filter((list, index)=> index!== indexDelete);
        setSelectFields(updatedSelectFields);
    }
//   const handleDeleteButton = (index) => {
//     if(selectFields.length===0){
//         삭제버튼(false)
//     }
//     else if(selectFields.length<1){
//         삭제버튼(true)
//     }
//     const updatedSelectFields = [...selectFields];
//     updatedSelectFields.splice(index, 1);
//     setSelectFields(updatedSelectFields);
//     console.log(index)
//   };
const Submit=async()=>{
     if(Deadline == ''){
         alert("마감 날짜를 선택해주세요");
        return false;
>>>>>>> 057e94b003c0c2bc1758a46a63b3593240f67e91
    }
    let data = new FormData();
    if (imageMod) data.append("file", imgFile);
    data.append(
      "projectRequestDTO",
      new Blob([JSON.stringify(Params)], { type: "application/json" }),
      {
        contentType: "application/json",
      }
    );
    axios
<<<<<<< HEAD
      .post("/api/projectRegister", data, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((res) => {
        alert(res);
        window.location.href = "http://projecttycoon.com/";
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
        ></InputTitle>
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
              <MainImg src={Img}></MainImg>
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
              }}
            >
              <SubImg src={"http://projecttycoon.com" + default1}></SubImg>
              <Ji>
                <Txt>기본 이미지 입니다.</Txt>
                <Txt>클릭 해주세요.</Txt>
              </Ji>
            </SubImgBox>
            <SubImgBox
              onClick={() => {
                setImg(default2);
              }}
            >
              <SubImg src={"http://projecttycoon.com" + default2}></SubImg>
              <Ji>
                <Txt>기본 이미지 입니다.</Txt>
                <Txt>클릭 해주세요.</Txt>
              </Ji>
            </SubImgBox>
            <SubImgBox
              onClick={() => {
                setImg(default3);
              }}
            >
              <SubImg src={"http://projecttycoon.com" + default3}></SubImg>
              <Ji>
                <Txt>기본 이미지 입니다.</Txt>
                <Txt>클릭 해주세요.</Txt>
              </Ji>
            </SubImgBox>
            {/* {
=======
    .post("/api/projectRegister", data, {
      headers: { "Content-Type": "multipart/form-data" 
      },
    })
    .then((res) => {
      alert(res);
    })
    .catch((err) => {
      console.log(err);
      alert("등록 실패, 콘솔에서 error확인");
    });
}
    return(
        <WriteWrap>
         <Wrap>
            <Title>📌 프로젝트에 대해 소개해주세요.</Title>
            <Subtitle>제목</Subtitle>
            <InputTitle onChange={handleNewtitle}placeholder="제목을 작성해주세요."></InputTitle>
            <Subtitle>사진</Subtitle>
            <ImgWrap>
            {/* 메인 프로젝트 기본이미지 바뀌는 코드 */}
            <MainImgWrap>
                {
                Img===default1 ?(
                    <MainImg
                    src={"http://projecttycoon.com" + default1}
                    />
                    ): Img===default2 ?(
                    <MainImg
                    src={"http://projecttycoon.com" + default2}
                    />
                    ):Img===default3 ? (
                    <MainImg
                    src={"http://projecttycoon.com" + default3}
                    />
                    ):<MainImg src={Img}></MainImg>
                }
                <FileLabel for="file"><FiFilePlus size={40} color="white"/></FileLabel>
                <ImgInput type="file" id="file" onChange={(e)=>{
                    e.preventDefault();
                    saveFileImg(e.currentTarget.files[0]);
                    }}></ImgInput>
                </MainImgWrap>
                <Right>
                <SubImgBox onClick={()=>{setImg(default1)}}>
                    <SubImg src={"http://projecttycoon.com" + default1}></SubImg>
                    <Ji><Txt>기본 이미지 입니다.</Txt><Txt>클릭 해주세요.</Txt></Ji>
                </SubImgBox>
                <SubImgBox onClick={()=>{setImg(default2)}}>
                    <SubImg src={"http://projecttycoon.com" + default2}></SubImg>
                    <Ji><Txt>기본 이미지 입니다.</Txt><Txt>클릭 해주세요.</Txt></Ji>
                </SubImgBox>
                <SubImgBox onClick={()=>{setImg(default3)}}>
                    <SubImg src={"http://projecttycoon.com" + default3}></SubImg>
                    <Ji><Txt>기본 이미지 입니다.</Txt><Txt>클릭 해주세요.</Txt></Ji>
                </SubImgBox>
                    {/* {
>>>>>>> 057e94b003c0c2bc1758a46a63b3593240f67e91
                        Img.map((list,index)=>(
                            <SubImg src={Img[index]}></SubImg>
                        ))
                    } */}
<<<<<<< HEAD
            {/* <input type="file" onChange={saveFileImg}></input> */}
          </Right>
        </ImgWrap>
        <QuillTestPage handleNewcontents={handleNewcontents} />
        <Title>📌 프로젝트 기본 정보를 입력해주세요.</Title>
        <Bot>
          <Top>
            <div>
              <Subtitle>모집 지역</Subtitle>
              <Select onChange={handleNewacademy} width="405px">
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
              ></DateInput>
            </div>
          </Top>
          <div>
            <Subtitle>모집 분야</Subtitle>
            <TT>
              {selectFields.map((selectField, index) => (
                <div key={index}>
                  <label>
                    과목:
                    <select
                      defaultValue={selectField.field}
                      onChange={(event) => handleNewFieldChange(event, index)}
                    >
                      {fields.map((field, fieldIndex) => (
                        <option key={fieldIndex} value={field.value}>
                          {field.label}
                        </option>
                      ))}
                    </select>
                  </label>
                  <label>
                    인원:
                    <select
                      value={selectField.personnel}
                      onChange={(event) =>
                        handleNewPersonnelChange(event, index)
                      }
                    >
                      {peopleLabels.map((label, labelIndex) => (
                        <option key={labelIndex} value={labelIndex + 1}>
                          {label}
                        </option>
                      ))}
                    </select>
                  </label>
                  <button onClick={() => handleDeleteButton(index)}>
                    삭제
                  </button>
                </div>
              ))}
            </TT>
            <PulsBut onClick={handleAddButton}>+</PulsBut>
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
            Submit();
          }}
        >
          수정
        </But>
      </ButBox>
    </WriteWrap>
  );
=======
                    {/* <input type="file" onChange={saveFileImg}></input> */}
                </Right>
            </ImgWrap>
            <QuillTestPage handleNewcontents={handleNewcontents}/>
            <Title>📌 프로젝트 기본 정보를 입력해주세요.</Title>
            <Bot>
                <Top>
                    <div>
                        <Subtitle>모집 지역</Subtitle>
                        <Select onChange={handleNewacademy} width="390px">
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
                        <DateInput type="date" onChange={handleNewdeadline} value={Deadline} min={currentDate}></DateInput>
                    </div>
                </Top>
                <Top>
                    <SubTitleWrap>
                        <Subtitle>모집 분야</Subtitle>
                        <PlusBtn onClick={handleAddButton}>추가</PlusBtn>
                    </SubTitleWrap>
                         {selectFields.map((selectField, index) => (
                            <div key={index}>
                                <TT>
                                    <Select width="270px" defaultValue={selectField.field} onChange={(event) => handleNewFieldChange(event, index)}>
                                    {fields.map((field, fieldIndex) => (
                                        <option key={fieldIndex} value={field.value}>
                                        {field.label}
                                        </option>
                                    ))}
                                    </Select>
                                    <Select width="80px" value={selectField.personnel} onChange={(event) => handleNewPersonnelChange(event, index)}>
                                    {peopleLabels.map((label, labelIndex) => (
                                        <option key={labelIndex} value={labelIndex + 1}>
                                        {label}
                                        </option>
                                    ))}
                                    </Select>
                                    {
                                        index>0&&(
                                            <DeleteBtn onClick={() => handleDeleteButton(index)}>-</DeleteBtn>
                                        )
                                    }
                                </TT>
                            </div>
                        ))}
                </Top>
            </Bot>
         </Wrap>
         <ButBox>
            <But background_color="gray" onClick={()=>{
                                 window.history.back();
                            }}>취소</But>
            <But onClick={()=>{
                                Submit();
                            }}>작성</But>
        </ButBox>
        </WriteWrap>
    )
>>>>>>> 057e94b003c0c2bc1758a46a63b3593240f67e91
}
export default Write;
