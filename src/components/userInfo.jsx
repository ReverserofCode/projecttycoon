import { useEffect, useRef, useState, useCallback } from "react";
import styled from "@emotion/styled";

const Box=styled.div`
    max-width: 500px;
    width:100%;
    border:1px solid red;
    display: flex;
    height: 50px;
    align-items: center;
`
const SmallBox=styled.div`
    width: 100px;
    height: 100%;
    border: 1px gray solid;
    display: flex;
    justify-content: center;
    align-items: center;
`
const XsmallBox=styled.div`
    padding: 8px;
    box-sizing: border-box;
    max-width: 360px;
    width: 100%;
    display: flex;
    border: 1px yellow solid;
    height: 100%;
    align-items: center;
    justify-content: space-between;
`
const But=styled.button`
`
function UserInfo(){
    useEffect(()=>{
        console.log(memberInfo)
    })
    //유저-수정 시 /input 관리
    const handleInputChange = (event, info) => {
        const updatedMemberInfo = { ...memberInfo, [info]: event.target.value };
        setMemberInfo(updatedMemberInfo);
      };
    // const handleCloseClick = () => {
    //     setIsEditing(true);
    //   };
    // const handleSaveClick = () => {
    //     setIsEditing(false);
    //   };
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
        {label:"git",value:"git"},
        {label:"blog",value:"blog"},
        {label:"another",value:"another"},
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
        memberLink: null,
        memberAcademy: "부산",
        memberNickname: "haha",
        memberStack: ["NodeJs"]
      };
      //
    //   const newInfo={
    //     memberId,
    //     memberPw,
    //     memberRole,
    //     memberIntroduce,
    //     memberLink,
    //     memberAcademy,
    //     memberNickname,
    //     memberStack
    //   }
//유저-처음 가져온 정보
    const [memberInfo, setMemberInfo] = useState(info);
//유저-수정된 정보
    // const[memberNewInfo,setMemberNewInfo]=useState(newInfo);
//유저-아카데미
    const [selectLocation,setSelectLocation] =useState(memberInfo.memberAcademy)
//유저-역할
    const [selectField,setSelectField]=useState(memberInfo.memberRole)
    const [isEditing, setIsEditing] = useState(false);
    return(
        <>
        <Box>
            <SmallBox>아이디</SmallBox>
            <XsmallBox>
                <div>{memberInfo.memberId}</div>
            </XsmallBox>
        </Box>
        <Box>
            <SmallBox>닉네임</SmallBox>
            {/* isEditing===ture  */}
            <input
                    type="text"
                    value={memberInfo.memberNickname}
                    onChange={(event)=>handleInputChange(event, 'memberNickname')}/>
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
            <input />
        </Box>
        <Box>
            <XsmallBox>
                <input/>
                <But onClick={handleCloseClick}>수정</But>
            </XsmallBox>
        </Box>
        <Box>
            <SmallBox>한줄소개</SmallBox>
            <XsmallBox>
                <input
                    type="text"
                    value={memberInfo.memberIntroduce}
                    onChange={(event)=>handleInputChange(event, 'memberIntroduce')}/>
            </XsmallBox>
        </Box>
        <Box>
            <SmallBox>역할</SmallBox>
            <XsmallBox>
                <select value={memberInfo.memberRole} onChange={(event)=>handleInputChange(event, 'memberRole')}>
                    {fields.map((field, fieldIndex) => (
                        <option key={fieldIndex} value={field.value}>
                            {field.label}
                        </option>
                    ))} 
                </select>
                {/* <div>{memberInfo.memberRole}</div> */}
            </XsmallBox>
        </Box>
        <Box>
            <SmallBox>언어</SmallBox>
            <XsmallBox>
                <select value={memberInfo.memberStack} onChange={(event)=>handleInputChange(event, 'memberStack')}>
                    {stacks.map((stack, stackIndex) => (
                        <option key={stackIndex} value={stack.value}>
                            {stack.label}
                        </option>
                    ))} 
                </select>
                {/* <div>{memberInfo.memberStack}</div> */}
            </XsmallBox>
        </Box>
        <Box>
            <SmallBox>개인링크</SmallBox>
            <XsmallBox>
                <select>
                    {links.map((link, linkIndex) => (
                        <option key={linkIndex} value={link.value}>
                            {link.label}
                        </option>
                    ))} 
                </select>
                <input></input>
                <div>{memberInfo.memberLink}</div>
            </XsmallBox>
        </Box>
        <button>취소</button>
        <button>완료</button>
        </>
    )
                    }
export default UserInfo;

 {/* {
                isEditing?(
                    <XsmallBox>
                        <input
                        type="text"
                        value={memberInfo.memberNickname}
                        onChange={(event)=>handleInputChange(event, 'memberNickname')}/>
                        <button onClick={handleSaveClick}>
                            저장
                        </button>
                    </XsmallBox>
                ) :
                  <XsmallBox>
                    <div>{memberInfo.memberNickname}</div>
                    <But onClick={handleCloseClick}>수정</But>
                  </XsmallBox>
            } */}
        //     <option value="Java">Java</option>
        //   <option value="Python">Python</option>
        //   <option value="C/C++">C/C++</option>
        //   <option value="C#">C#</option>
        //   <option value="PHP">PHP</option>
        //   <option value="SQL">SQL</option>
        //   <option value="Kotlin">Kotlin</option>
        //   <option value="Go">Go</option>
        //   <option value="R">R</option>
        //   <option value="HTML">HTML</option>
        //   <option value="CSS">CSS</option>
        //   <option value="JavaScript">JavaScript</option>
        //   <option value="TypeScript">TypeScript</option>
        //   <option value="NodeJs">Node.js</option>
        //   <option value="JQuery">JQuery</option>
        //   <option value="React">React</option>
        //   <option value="Vue">Vue</option>