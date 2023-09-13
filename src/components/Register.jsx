import styled from "@emotion/styled";
import axios from "axios";
import "./Register.css";
import React, { useCallback, useState } from "react";
import { BiLogoReact, BiDownArrow, BiLogoGithub } from "react-icons/bi";
import { FaMicroblog } from "react-icons/fa";
import { SiRabbitmq } from "react-icons/si";
import { BsPlusSquareDotted } from "react-icons/bs";
import { TiMessageTyping, TiDelete } from "react-icons/ti";

// 전체틀 , 공통
const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 500px;
`;
const Title = styled.h2`
  padding-top: 50px;
  padding-bottom: 30px;
  .rabbit {
    margin-left: 10px;
    color: #efa1ae;
  }
`;
const ContentsTitle = styled.h3`
  margin: 0 auto;
  margin-left: 10px;
  padding-bottom: 10px;
`;
const InputForm = styled.input`
  width: 100%;
  padding-left: 15px;
  font-family: "맑은고딕";
  font-size: 1em;
  font-weight: 500;
  color: #2d2a2a;
`;

// 링크
const LinkArea = styled.div`
  margin-bottom: 10px;
  margin-left: 60px;
`;
const CustomOption = styled.div`
  display: flex;
  box-sizing: border-box;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 140px;
  border-radius: 10px;
  border: 1px solid black;
  height: 100px;
  margin: 0 auto;
  position: absolute;
  background-color: #ffffff;
  border-color: #d0d0d0;
  top: 55px;
`;
const Options = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  gap: 10px;
  z-index: 100;
  padding-bottom: 5px;
  color: #252423ba;
  &:hover {
    background-color: #fbeeac;
    border-radius: 7px;
    transform: scale(1.1);
    color: #2d2a2a;
  }
`;
const CustomSelect = styled.div`
  display: flex;
  box-sizing: border-box;
  justify-content: center;
  align-items: center;
  gap: 10px;
  padding-top: 20px;
  padding-bottom: 20px;
  padding-right: 10px;
  border: 1px solid #d0d0d0;
  border-radius: 10px;
  width: 140px;
  height: 53px;
  position: relative;
  margin: 0 auto;
  margin-bottom: 22px;
  font-family: "맑은고딕";
  font-size: 1em;
  font-weight: 600;
  background-color: #ffffff;
  color: #141212b9;
`;

const LinkForm = styled.input`
  resize: none;
  width: 370px;
  height: 50px;
  margin-top: 5px;
  border-radius: 10px;
  border-width: 1px;
  border-style: solid;
  border-color: #d0d0d0;
  background-color: #ffffff;
  font-family: "맑은고딕";
  font-size: 1em;
  font-weight: 600;
  color: #2d2a2a;
  padding-left: 20px;
`;

// 제출 버튼
const Button = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px 40px;
  font-size: 1.2em;
  font-weight: 700;
  background-color: #71717145;
  border-radius: 5px;
  margin: 0 auto;
  margin-top: 100px;
  margin-bottom: 100px;
  &:hover {
    border-color: #fbeeac;
    background-color: #fbeeac;
    transition: 0.5s;
    color: #4743439c;
    font-size: 1.1em;
    font-weight: 700;
    cursor: pointer;
  }
`;

// 기술스택
const Stacks = styled.div`
  display: flex;
  box-sizing: border-box;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: center;
  width: 520px;
  position: relative;
  padding-top: 10px;
  padding-left: 5px;
  border: 1px solid #d0d0d0;
  border-radius: 10px;
  margin-bottom: 30px;
  background-color: #ffffff;
  height: fit-content;
  min-height: 60px;
  /* overflow-y: scroll; */
`;
const Select = styled.select`
  width: 100%;
  outline: none;
  border: none;
  text-indent: -9999px;
  position: absolute;
  bottom: 0px;
  right: 0;
  margin-top: 0px;
  margin-bottom: 0px;
  height: fit-content;
`;
const StackItem = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px 10px;
  background-color: #b3b3b3;
  border-radius: 10px;
  z-index: 100;
  margin-left: 5px;
  margin-bottom: 10px;
  font-weight: 600;
  font-size: 1em;
  color: #2d2a2a;
  font-family: "맑은고딕";
`;

// 한 줄 소개
const TextMany = styled.textarea`
  resize: none;
  width: 500px;
  height: 200px;
  padding: 20px 20px;
  line-height: 30px;
  text-decoration: none;
  border-radius: 10px;
  outline: none;
  border-style: solid;
  border-color: #d0d0d0;
  background-color: #ffffff;
  margin-bottom: 27px;
  font-size: 1em;
  color: #2d2a2a;
  font-family: "맑은고딕";
`;

// 에러메세지
const ErrorMessage = styled.span`
  font-size: 1em;
  color: #b3b3b3;
  margin-bottom: 20px;
`;

function Register() {
  // 링크
  const [selected, setSelected] = useState("Git");
  const [click, setClick] = useState(false);
  const [linkInput, setLinkInput] = useState(""); // 입력값 따로 관리
  const [linkInputs, setLinkInputs] = useState([""]);
  const handleAddLinkInput = () => {
    const newLinkInputs = [...linkInputs, ""];
    setLinkInputs(newLinkInputs);
  };
  // 링크삭제
  const handleDeleteLinkInput = (indexToDelete) => {
    if (linkInputs.length === 1) {
      // 입력란이 1개만 남았을 때는 삭제하지 않고 값을 비웁니다.
      setLinkInputs([""]);
    } else {
      const newLinkInputs = linkInputs.filter(
        (_, index) => index !== indexToDelete
      );
      setLinkInputs(newLinkInputs);
    }
  };

  // 비밀번호
  const passwordRegex =
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,30}$/;
  const [pw, setPw] = useState("");
  const [pwError, setPwError] = useState("");
  const [pwConfirm, setPwConfirm] = useState(""); // Separate state for password confirmation
  const [pwConfirmError, setPwConfirmError] = useState(""); // Separate error state for password confirmation
  // 닉넴, 아이디
  const [nick, setNick] = useState("");
  const [id, setId] = useState("");
  const [idError, setIdError] = useState("");
  const [nickError, setNickError] = useState("");
  const idRegex = /^[a-zA-Z0-9_-]{4,15}$/; // 아이디 형식 검증 정규식
  const nickRegex = /^[a-zA-Z0-9가-힣_-]{2,12}$/;
  // 한 줄 소개
  const [introduce, setIntroduce] = useState("");

  // 기술스택
  const [stack, setStack] = useState([]);
  const [selectedJob, setSelectedJob] = useState(""); // State for selected job
  const [selectedPlace, setSelectedPlace] = useState(""); // State for selected Place
  const [stackError, setStackError] =
    useState("1개 이상의 스택을 선택해 주세요");
  // const [selectedLink, setSelectedLink] = useState("Link"); // State for selected Link

  const stackItemGen = useCallback(() => {
    let contents = [];
    for (let i = 0; i < stack.length; i++) {
      contents.push(
        <StackItem
          key={i} // 고유한 key 값으로 index를 사용합니다.
          onClick={() => {
            let buf = [...stack];
            buf.splice(i, 1); /** splice 선택된 buf를 분리 */
            setStack(buf);
          }}
        >
          {stack[i]}
        </StackItem>
      );
    }
    return contents;
  }, [stack]);
  const handleSubmit = async () => {
    if (
      !id ||
      !nick ||
      !pw ||
      !pwConfirm ||
      !selectedJob ||
      !selectedPlace ||
      stack.length === 0
    ) {
      alert("모든 필수 항목을 입력해주세요.");
      return; // 필수 입력 항목 중 하나라도 비어있으면 함수 종료
    }
    if (!idRegex.test(id)) {
      setIdError("아이디는 4~12자의 영문 대소문자와 숫자로 이루어져야 합니다.");
      return; // 아이디 형식이 맞지 않으면 함수 종료
    }

    // 닉네임 형식 검증
    if (!nickRegex.test(nick)) {
      setNickError(
        "닉네임은 2~10자의 영문 대소문자, 숫자, 한글로 이루어져야 합니다."
      );
      return; // 닉네임 형식이 맞지 않으면 함수 종료
    }
    if (!passwordRegex.test(pw)) {
      setPwError(
        "비밀번호는 8자 이상, 영문 대소문자, 숫자, 특수문자를 포함해야 합니다."
      );
      return; // 비밀번호 형식이 맞지 않으면 제출 중단
    }

    if (pw !== pwConfirm) {
      alert("비밀번호가 일치하지 않습니다.");
      return; // 비밀번호와 비밀번호 확인이 일치하지 않으면 함수 종료
    }

    const userData = JSON.stringify({
      memberNickname: nick,
      memberId: id,
      memberPw: pw,
      memberRole: selectedJob,
      memberAcademy: selectedPlace,
      memberStack: JSON.stringify(stack),
      memberLink: linkInput,
      memberIntroduce: introduce,
      // memberFilePath: "http://projecttycoon.com/static/images/Logo%20Test.png",
      // memberFileName: "test",
    });
    console.log(userData);

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "/api/memberRegister",
      headers: {
        "Content-Type": "application/json",
      },
      data: userData,
    };
    axios
      .request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <Container>
      <Title>
        Tycoon에 오신 걸 환영합니다 !
        <SiRabbitmq size="34" className="rabbit" />
      </Title>

      <ContentsTitle>
        <span>*</span>닉네임
      </ContentsTitle>
      <InputForm
        placeholder="사용하실 닉네임을 작성해주세요"
        value={nick}
        onChange={(e) => {
          e.preventDefault();
          const newNick = e.target.value;
          setNick(newNick);

          if (!nickRegex.test(newNick)) {
            setNickError(
              "2~12글자의 한글, 영문, 숫자, '_', '-'만 사용할 수 있습니다."
            );
          } else {
            setNickError("");
          }
        }}
      />
      {nickError && <ErrorMessage>{nickError}</ErrorMessage>}

      <ContentsTitle>
        <span>*</span>아이디
      </ContentsTitle>
      <InputForm
        placeholder="사용하실 아이디를 작성해 주세요"
        value={id}
        onChange={(e) => {
          e.preventDefault();
          const newId = e.target.value;
          setId(newId);
          if (!idRegex.test(newId)) {
            setIdError("4~15글자의 영문, 숫자, '_', '-'만 사용할 수 있습니다.");
          } else {
            setIdError("");
          }
        }}
      />
      {idError && <ErrorMessage>{idError}</ErrorMessage>}

      <ContentsTitle>
        <span>*</span>비밀번호
      </ContentsTitle>
      <InputForm
        type="password"
        placeholder="영문, 숫자, 특수문자 포함 8자리 이상 입력해 주세요"
        value={pw}
        onChange={(e) => {
          const newPassword = e.target.value;
          setPw(newPassword);

          if (!passwordRegex.test(newPassword)) {
            console.log("Password does not meet criteria");
            setPwError(
              "비밀번호는 8자 이상, 영문 대소문자, 숫자, 특수문자를 포함해야 합니다."
            );
          } else {
            console.log("Password meets criteria");
            setPwError(""); // Clear error message if conditions are met.
          }
        }}
      />
      {pwError && <ErrorMessage>{pwError}</ErrorMessage>}

      <ContentsTitle>
        <span>*</span>비밀번호 확인
      </ContentsTitle>
      <InputForm
        type="password"
        placeholder="비밀번호를 한번 더 입력해 주세요"
        value={pwConfirm}
        onChange={(e) => {
          e.preventDefault();
          const newPasswordConfirm = e.target.value;
          setPwConfirm(newPasswordConfirm);

          if (newPasswordConfirm !== pw) {
            setPwConfirmError("비밀번호가 일치하지 않습니다.");
          } else {
            setPwConfirmError(""); // 일치하면 에러 메시지 제거
          }
        }}
      />
      {pwConfirmError && <ErrorMessage>{pwConfirmError}</ErrorMessage>}

      <ContentsTitle>
        <span>*</span>직무
      </ContentsTitle>
      <select
        value={selectedJob}
        onChange={(e) => setSelectedJob(e.target.value)} // Update selectedJob state
      >
        <option value="">선택</option>
        <option value="백엔드">백엔드</option>
        <option value="프론트엔드">프론트엔드</option>
        <option value="빅데이터">빅데이터</option>
        <option value="AI">AI</option>
        <option value="서버관리자">서버관리자</option>
        <option value="정보보안">정보보안</option>
        <option value="네트워크관리자">네트워크관리자</option>
      </select>
      {!selectedJob && <ErrorMessage>직무를 선택해 주세요.</ErrorMessage>}

      <ContentsTitle>
        <span>*</span>학원지점
      </ContentsTitle>
      <select
        value={selectedPlace}
        onChange={(e) => setSelectedPlace(e.target.value)} // Update selectedPlace state
      >
        <option value="">선택</option>
        <option value="강남">강남</option>
        <option value="신촌/홍대">신촌/홍대</option>
        <option value="노원">노원</option>
        <option value="대전">대전</option>
        <option value="대구">대구</option>
        <option value="인천">인천</option>
      </select>
      {!selectedPlace && <ErrorMessage>학원지점을 선택해 주세요.</ErrorMessage>}
      {/* Display the selected job in an InputForm */}

      <ContentsTitle>
        <span>*</span>기술스택
      </ContentsTitle>
      <Stacks>
        {stackItemGen()}
        <Select
          onChange={(e) => {
            e.preventDefault();
            let buf = [...stack, e.target.value];
            setStack(buf);
            setStackError("");
          }}
        >
          <option value="Java">Java</option>
          <option value="Python">Python</option>
          <option value="C/C++">C/C++</option>
          <option value="C#">C#</option>
          <option value="PHP">PHP</option>
          <option value="SQL">SQL</option>
          <option value="Kotlin">Kotlin</option>
          <option value="Go">Go</option>
          <option value="R">R</option>
          <option value="HTML">HTML</option>
          <option value="CSS">CSS</option>
          <option value="JavaScript">JavaScript</option>
          <option value="TypeScript">TypeScript</option>
          <option value="NodeJs">Node.js</option>
          <option value="JQuery">JQuery</option>
          <option value="React">React</option>
          <option value="Vue">Vue</option>
        </Select>
      </Stacks>
      {stackError && <ErrorMessage>{stackError}</ErrorMessage>}
      <ContentsTitle>한 줄 소개</ContentsTitle>

      <TextMany
        value={introduce}
        onChange={(e) => {
          e.preventDefault();
          setIntroduce(e.currentTarget.value);
        }}
        spellCheck="false"
        placeholder="본인을 소개해주세요!"
      ></TextMany>

      <ContentsTitle>Link</ContentsTitle>
      {linkInputs.map((linkInput, index) => (
        <LinkArea
          key={index}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <div className="LinkForm">
            <CustomSelect onClick={() => setClick(!click)}>
              {selected}
              <BiDownArrow style={{ position: "absolute", right: "5px" }} />
            </CustomSelect>

            {click ? (
              <CustomOption style={{ display: "flex", flexDirection: "col" }}>
                <div className="LinkInput">
                  <Options
                    onClick={(e) => {
                      e.preventDefault();
                      const selectedValue = e.currentTarget.innerText;
                      setSelected(selectedValue);
                      setClick(!click);
                    }}
                  >
                    Git <BiLogoGithub />
                  </Options>
                  <Options
                    onClick={(e) => {
                      e.preventDefault();
                      const selectedValue = e.currentTarget.innerText;
                      setSelected(selectedValue);
                      setClick(!click);
                    }}
                  >
                    Blog <FaMicroblog />
                  </Options>
                  <Options
                    onClick={(e) => {
                      e.preventDefault();
                      const selectedValue = e.currentTarget.innerText;
                      setSelected(selectedValue);
                      setClick(!click);
                    }}
                  >
                    그 외 <TiMessageTyping />
                  </Options>
                </div>
              </CustomOption>
            ) : (
              ""
            )}
          </div>

          <LinkForm
            placeholder={selected + " " + " " + "주소를 모두 입력해주세요."} // 선택된 값으로 placeholder 설정
            value={linkInput} // linkInput 값을 입력 값으로 설정
            // onChange={(e) => setLinkInput(e.target.value)} // 입력 시 linkInput 값 업데이트
            onChange={(e) => {
              e.preventDefault();
              const newLinkInputs = [...linkInputs];
              newLinkInputs[index] = e.target.value; // 현재 input 값을 업데이트
              setLinkInputs(newLinkInputs);
            }}
          />

          <div
            className="delete-button"
            onClick={() => handleDeleteLinkInput(index)}
          >
            <TiDelete size="45" className="deleteBtn"></TiDelete>
          </div>
        </LinkArea>
      ))}
      <div className="plus-button" onClick={handleAddLinkInput}>
        <BsPlusSquareDotted size="45" className="PlusBtn"></BsPlusSquareDotted>
      </div>
      <Button onClick={handleSubmit}>SignUp</Button>
    </Container>
  );
}

export default Register;
