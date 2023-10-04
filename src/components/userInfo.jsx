import { useEffect, useRef, useState, useCallback } from "react";
import styled from "@emotion/styled";
import axios from "axios";

//데이터 받고
//비밀번호 수정
//file수정 ,삭제
//비밀번호 수정버튼 없애기.
//http://projecttycoon.com/api/mypage
//memberFilePath + memberFileName = 프로필이미지
//JSON Pa

const Box=styled.div`
padding:4px;
    /* max-width: 500px; */
    width:100%;
    border-bottom:1px solid gray;
    display: flex;
    height: 50px;
    align-items: center;
`
const SmallBox=styled.div`
 width: ${(props) => props.width || "130px"};

    height: 100%;
    border-right:1px gray solid;
    display: flex;
    justify-content: center;
    align-items: center;
`
const XsmallBox=styled.div`
    padding: 8px;
    box-sizing: border-box;
    width: 100%;
    display: flex;
    height: 100%;
    align-items: center;
    justify-content: space-between;
`
const But=styled.button`
`
const Top=styled.div`
    width: 100%;
    display: flex;
    /* border: 1px green solid; */
    padding: 20px;
    box-sizing: border-box;
`
const Right=styled.div`
`
const Left=styled.div`
width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`
const Wrap=styled.div`
font-size: 13px;
    margin: 0 auto;
    max-width: 1200px;
    width: 100%;
    /* border: 1px red solid; */
`
const Content=styled.div`
    padding: 8px;
    max-width: 1000px;
    width: 100%;
    /* border: 1px blue solid; */
    margin: 0 auto;
    display: flex;
    /* align-items: center; */
    flex-direction: column;
`
const LinkButBox=styled.div`
    
`
const Bot =styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    /* border: 1px green solid; */
    padding: 20px;
    box-sizing: border-box;
    justify-content: space-between;
`
const ImgBox=styled.img`
    width: 210px;
    height: 210px;
    border-radius: 50%;
    border: 1px gray solid;
    margin-bottom: 8px;
`
const ImgWrap=styled.div`
    margin-right: 8px;
    display: flex;
    align-items:center;
    justify-content: center;
    width: 345px;
    height: 280px;
    border-right: 1px gray solid;
    padding: 4px;
    flex-direction: column;
`
const ButWrap=styled.div`
    width: 300px;
    display: flex;
    justify-content: space-around;
`
const But1=styled.button`
    width: 90px;
    height: 30px;
`
const IntroduceBox=styled.div`
    width: 100%;
    border-bottom: 1px solid gray;
    display: flex;
    flex-direction: column;
`
const IntroBox=styled.div`
    width: 130px;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 4px;
`
const IntroSubBox=styled.div`
    box-sizing: border-box;
    width: 100%;
    background-color: #e0dede;
    font-size: 12px;
    height: 20px;
    padding-left: 20px;
    margin-bottom: 8px;
`
const InputIntro=styled.input`
    width:100%;
    height: 100px;
    &:focus {
    border-color: blue;
    outline: none; /* 포커스 아웃라인 제거 */
  }
`
const StackSelect=styled.select`
    width: 200px;
    height: 28px;
`
const NavWrap=styled.div`
    display: flex;
`
const But2=styled.button`
border: none;
  outline: none;
    width: ${(props) => props.width || "420px"};
  height: ${(props) => props.width || "30px"};
  background-color: ${(props) => props.background_color || "#0B666A"};
  color: white;
`
const LinkBox=styled.div`
padding:4px;
     width:100%;
    border-bottom:1px solid gray;
    display: flex;
    align-items: center;
`
const LinkSmallBox=styled.div`
    width: 120px;
    height: 50px;
    border-right:1px gray solid;
    display: flex;
    justify-content: center;
    align-items: center;
`
const But2Wrap=styled.div`
margin-top: 40px;
    display: flex;
    justify-content: space-around;
`
const StackBut=styled.button`
    background-color:#0B666A;
    color: white;
    border: none;
    outline: none;
    cursor: pointer;
    border-radius: 15px;
    padding: 8px 12px;
    margin-right: 8px;
`
const StackButWrap=styled.div`
overflow: auto;
overflow-y: hidden;
/* overflow-x: scroll; */
    display: flex;
    /* justify-content: space-around; */
    align-items: center;
    max-width: 500px;
    width: 100%;
    height: 100%;
`
const Nav=styled.div`
font-size: 13px;
/* font-weight: 800; */
    display: flex;
    align-items: center;
    justify-content: center;
    margin-left:4px;
    width: 160px;
    border-bottom: 2px gray solid;
`
const Span=styled.div`
padding: 4px;
    font-size: 10px;
    color: #e63434;
    font-weight: 800;
`
const LinkWrap=styled.div`
padding: 4px;
 margin-left: 4px;
    max-width: 500px;
    width: 100%;
  display: flex;
  flex-direction: column;
  /* border: 1px red solid; */
`
const LinkButWrap=styled.div`
    display: flex;
    justify-content: space-between;
`
const LinkSelect=styled.select`
    width: 80px;
    height: 30px;
    margin-right: 4px;
    margin-bottom: 4px;
`
const LinkInput=styled.input`
    width: 350px;
    height: 23px;
`
const PwBox=styled.div`
    display: flex;
    padding: 8px;
    box-sizing: border-box;
    align-items: center;
    width: 100%;
    justify-content: space-between;
`
const PwInput=styled.input`
    max-width: 500px;
    width: 100%;
    padding: 4px 12px;
`
function UserInfo(){
    function list(){
        return(
            <>
            {
             selectLink.map((list,index)=>(
                <LinkButWrap>
                    <div>
                     <LinkSelect defaultValue={list.option} onChange={(event)=>handleNewLinkChange(event,index)}>
                        {
                        links.map((link, linkIndex)=>(
                            <>
                                <option value={link.value}>
                                    {link.value}
                                </option>
                                
                            </>
                        ))
                        }
                     </LinkSelect>
                     <LinkInput 
                     type="text" value={list.value} onChange={(event)=>handleNewLinkValueChange(event,index)}>
                        {/* onChange={(event)=>handleInputChange(event, 'memberNickname')} */}
                     </LinkInput>
                    </div>
                    {
                        index> 0 &&(
                            <button onClick={() => handleDeleteButton(index)}>
                            -
                            </button>
                            )
                    }
                    </LinkButWrap>
                ))
            }
            </>
        )
    }
    useEffect(()=>{
        // console.log(memberInfo)
        axios
        .get ("/api/mypage")
        .then((response)=>{
        console.log(response.data)
        })  
        .catch((err)=>{
        console.log(err)
        })
    })
    //비밀번호
    const passwordRegex =
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,30}$/;
    const [pw, setPw] = useState("");
    const [pwError, setPwError] = useState("");
    const [pwConfirm, setPwConfirm] = useState(""); // Separate state for password confirmation
    const [pwConfirmError, setPwConfirmError] = useState(""); // Separate error state for password confirmation
    //유저-수정 시 /input 관리
    const handleInputChange = (event, info) => {
        const updatedMemberInfo = { ...memberInfo, [info]: event.target.value };
        setMemberInfo(updatedMemberInfo);
      };
    const handleCloseClick = () => {
        setIsEditing(true);
      };
    const handleSaveClick = () => {
        setIsEditing(false);
      };
    const handleDeleteButton = (indexDelete) => {
        if (indexDelete === 0) {
          // 첫 번째 요소는 삭제하지 않도록 예외 처리
          return ;
        }
        const update=selectLink.filter(
            (list,index)=>index!==indexDelete
        );
        setSelectLink(update);
        // const arr =memberInfo.memberLink
        // const updatedSelectLinks = arr.filter(
        //   (list, index) => index !== indexDelete
        // );
        // setMemberInfo({memberLink:updatedSelectLinks});
      };
     // 언어 버튼을 클릭했을 때 실행되는 핸들러 함수
    const handleLanguageButtonClick = (selectedLanguage) => {
        setSelectedLanguages((prevSelectedLanguages) =>
        prevSelectedLanguages.filter((language) => language !== selectedLanguage)
        );
    };
    // 언어를 선택했을 때 실행되는 핸들러 함수
    const handleLanguageChange = (e) => {
        const ar=[e.target.value]
        setSelectedLanguages([...selectedLanguages,...ar])
        console.log(selectedLanguages)
    };
    // 링크의 옵션 
    const handleNewLinkChange =(event, index) =>{
        const updatedSelectLink = [...selectLink];
        updatedSelectLink[index].option=event.target.value;
        setSelectLink(updatedSelectLink)
    }
    const handleNewLinkValueChange=(event, index)=>{
        const updatedSelectLink = [...selectLink];
        updatedSelectLink[index].value=event.target.value;
        setSelectLink(updatedSelectLink)
    }
    const handleAddButton = () => {
        if (selectLink.length < 5) {
            setSelectLink([
            ...selectLink,
            {label:"Git",value:""},
          ]); // 추가 시 초기 선택 항목을 'Git'으로 설정
        }
      };
    //비밀번호 수정 핸들
    const handleNewPassWord = ()=>{
        if(pw.length===0 || pwConfirm.length===0){
            alert('새로운 비밀번호를 입력해주세요.')
        }
        else if(passwordRegex.test(pw)===false || passwordRegex.test(pwConfirm)===false){
            alert('비밀번호를 다시입력해 주세요')
        }
        //비밀번호 바꿔야함
    }
    const locations=[
        {label:'강남',value:'강남'},
        {label:'신촌/홍대',value:'신촌/홍대'},
        {label:'노원',value:'노원'},
        {label:'인천',value:'인천'},
        {label:'대전',value:'대전'},
        {label:'대구',value:'대구'},
        {label:'부산',value:'부산'},
    ]
    const stacks=[
        {label: "Java", value: "Java"},
        {label: "Python", value: "Python"},
        {label: "C/C++", value: "C/C++"},
        {label: "C#", value: "C#"},
        {label: "PHP", value: "PHP"},
        {label: "SQL", value: "SQL"},
        {label: "Kotlin", value: "Kotlin"},
        {label: "Go", value: "Go"},
        {label: "R", value: "R"},
        {label: "HTML", value: "HTML"},
        {label: "CSS", value: "CSS"},
        {label: "JavaScript", value: "JavaScript"},
        {label: "TypeScript", value: "TypeScript"},
        {label: "NodeJs", value: "NodeJs"},
        {label: "JQuery", value: "JQuery"},
        {label: "React", value: "React"},
        {label: "Vue", value: "Vue"},
    ]
    const links=[
        {label:"Git",value:"Git"},
        {label:"Blog",value:"Blog"},
        {label:"Other",value:"Other"},
    ]
    const fields = [
        { label: "백엔드", value: "back" },
        { label: "프론트엔드", value: "front" },
        { label: "AI", value: "ai" },
        { label: "빅데이터", value: "bigData" },
        { label: "서버관리자", value: "server" },
        { label: "정보보안", value: "security" },
        { label: "네트워크관리자", value: "netWork" },
      ];
    // 가져온 유저정보
    const info = {
        memberId: "kkk123",
        memberPw: "$2a$10$.RgQLsqTWOEea2V36PEWwO296YoasJS5bXorBS0gWKFeBC6toXSty",
        memberRole: "front",
        memberIntroduce: "안녕",
        memberLink: [
            {option:"Git",value:"수정해야해요"},{option:"Blog",value:"수수수정"}
        ],
        memberAcademy: "부산",
        memberNickname: "haha",
        memberStack: ["NodeJs"],
        memberFilePath:"static/icons/",
        memberFileName:"7_dog.png"

      };
    //   const Params ={
    //     memberId:memberInfo.memberId,
    //     memberPw:memberInfo.memberPw,
    //     memberRole:memberInfo.memberRole,
    //     memberIntroduce:memberInfo.memberIntroduce,
    //     memberLink:memberInfo.memberLink,
    //     memberAcademy:memberInfo.memberAcademy,
    //     memberNickname:memberInfo.memberNickname,
    //     memberStack:memberInfo.memberStack
    //   }
//유저-처음 가져온 정보
    const [memberInfo, setMemberInfo] = useState(info);
//유저-수정된 정보
    // const[memberNewInfo,setMemberNewInfo]=useState(newInfo);
//유저-아카데미
    const [selectLocation,setSelectLocation] =useState(memberInfo.memberAcademy)
//유저-역할
    const [selectField,setSelectField]=useState(memberInfo.memberRole)
//유저-개인링크
    const [selectLink,setSelectLink]=useState(memberInfo.memberLink)
    const [isEditing, setIsEditing] = useState(false);
//유저-선택한언어
const [selectedLanguages, setSelectedLanguages] = useState(memberInfo.memberStack);
    return(
        <Wrap>
        <Content>
            <NavWrap>
                <Nav>
                    내프로필
                </Nav>
                <Nav>
                    활동관리
                </Nav>
            </NavWrap>
        <Top>
            <Right>
                <ImgWrap>
                    <ImgBox>
                    </ImgBox>
                    <ButWrap>
                        <But1>수정</But1>
                        <But1>삭제</But1>
                    </ButWrap>
                </ImgWrap>
            </Right>
            <Left>
                <Box>
                    <SmallBox>아이디</SmallBox>
                    <XsmallBox>
                        <div>{memberInfo.memberId}</div>
                    </XsmallBox>
                </Box>
                <Box>
                    <SmallBox>닉네임</SmallBox>
                    {/* isEditing===ture  */}
                    <XsmallBox>
                    <input
                            type="text"
                            value={memberInfo.memberNickname}
                            onChange={(event)=>handleInputChange(event, 'memberNickname')}/>
                    </XsmallBox>
                </Box>
                <Box>
                    <SmallBox>위치</SmallBox>
                    <XsmallBox>
                        <select value={memberInfo.memberAcademy} onChange={(event)=>handleInputChange(event, 'memberAcademy')}>
                                {locations.map((location, locationIndex) => (
                                    <option key={locationIndex} value={location.value}>
                                        {location.label}
                                    </option>
                                ))} 
                        </select>
                    </XsmallBox>
                </Box>
                <Box>
                    <PwBox>
                        <div>
                            <PwInput 
                            placeholder="새로운 비밀번호"
                            type="password"
                            value={pw}
                            onChange={(e)=>{
                                const newPassWord=e.target.value
                                setPw(newPassWord);
                                if(!passwordRegex.test(newPassWord)){
                                    setPwError(
                                        "영문, 숫자, 특수문자 포함 8자리 이상 입력해 주세요."
                                    )
                                }
                            }}/>
                             { passwordRegex.test(pw) === true ?  <Span></Span> :
                             <Span>영문, 숫자, 특수문자 포함 8자리 이상 입력해 주세요.</Span>
                             }
                        </div>
                    </PwBox>
                </Box>
                <Box>
                    <PwBox>
                        <div>
                            <PwInput 
                            placeholder="새로운 비밀번호 재입력"
                            type="password"
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
                              }}/>
                              { pwConfirm  !== pw ?  <Span>비밀번호가 일치하지 않습니다.</Span> : 
                              <Span></Span>}
                        </div>
                        <But onClick={handleNewPassWord}>수정</But>
                    </PwBox>
                </Box>
            </Left>
        </Top>
        <Bot>
            <IntroduceBox>
                <IntroBox>
                    한줄소개
                </IntroBox>
                <IntroSubBox>
                    본인의 업무 경험을 기반으로 핵심역량을 간단하게 작성해주세요!
                </IntroSubBox>
                <XsmallBox>
                    <InputIntro
                        type="text"
                        value={memberInfo.memberIntroduce}
                        onChange={(event)=>handleInputChange(event, 'memberIntroduce')}/>
                </XsmallBox>
            </IntroduceBox>
            <div>
            
            </div>
        <Box>
            <SmallBox width="140px">역할</SmallBox>
            <XsmallBox>
                <StackSelect value={memberInfo.memberRole} onChange={(event)=>handleInputChange(event, 'memberRole')} >
                    {fields.map((field, fieldIndex) => (
                        <option key={fieldIndex} value={field.value}>
                            {field.label}
                        </option>
                    ))} 
                </StackSelect>
                {/* <div>{memberInfo.memberRole}</div> */}
            </XsmallBox>
        </Box>
        <Box>
            <SmallBox width="140px">언어</SmallBox>
            <XsmallBox>
                {selectedLanguages.length > 0 ? (
                <>
                <StackSelect value={selectedLanguages[selectedLanguages.length-1]} onChange={handleLanguageChange} >
                    {stacks.map((stack, stackIndex) => (
                        <option key={stackIndex} value={stack.value}>
                            {stack.label}
                        </option>
                    ))} 
                </StackSelect>
                <Span>중복가능</Span>
                <StackButWrap>
                    {selectedLanguages.map((selectedLanguage) => (
                        <StackBut type="button" key={selectedLanguage} onClick={() => handleLanguageButtonClick(selectedLanguage)}>
                            {stacks.find((option) => option.value === selectedLanguage)?.label}
                        </StackBut>
                    ))}
                </StackButWrap>
                </>
                ) : (
                    <>
                    <StackSelect value={selectedLanguages[selectedLanguages.length-1]} onChange={handleLanguageChange} >
                    {stacks.map((stack, stackIndex) => (
                        <option key={stackIndex} value={stack.value}>
                            {stack.label}
                        </option>
                    ))} 
                </StackSelect>
                    <Span>선택한 언어가 없습니다.</Span></>
                    )}
                {/* <div>{memberInfo.memberStack}</div> */}
            </XsmallBox>
        </Box>
        <LinkBox>
            <LinkSmallBox>개인링크</LinkSmallBox>
            <LinkWrap>
                {list()}
            </LinkWrap>
            <button onClick={handleAddButton}>
                +
            </button>
        </LinkBox>
        </Bot>
        <But2Wrap>
            <But2 background_color="gray">취소</But2>
            <But2>완료</But2>
        </But2Wrap>
        </Content>
        </Wrap>
    )
                    }
                
export default UserInfo;





            