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
    const info = {
        memberId: "kkk123",
        memberPw: "$2a$10$.RgQLsqTWOEea2V36PEWwO296YoasJS5bXorBS0gWKFeBC6toXSty",
        memberRole: "백엔드",
        memberIntroduce: "안녕",
        memberLink: null,
        memberAcademy: "강남",
        memberNickname: "haha",
        memberStack: ["NodeJs"]
      };
    const [memberInfo, setMemberInfo] = useState(info);
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
            {
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
            }
        </Box>
        <Box>
            <SmallBox>위치</SmallBox>
            <XsmallBox>
                <div>{memberInfo.memberAcademy}</div>
                <But onClick={handleCloseClick}>수정</But>
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
                <div>{memberInfo.memberIntroduce}</div>
                <But onClick={handleCloseClick}>수정</But>
            </XsmallBox>
        </Box>
        <Box>
            <SmallBox>역할</SmallBox>
            <XsmallBox>
                <div>{memberInfo.memberRole}</div>
                <But onClick={handleCloseClick}>수정</But>
            </XsmallBox>
        </Box>
        <Box>
            <SmallBox>언어</SmallBox>
            <XsmallBox>
                <div>{memberInfo.memberStack}</div>
                <But onClick={handleCloseClick}>수정</But>
            </XsmallBox>
        </Box>
        <Box>
            <SmallBox>개인링크</SmallBox>
            <XsmallBox>
                <div>{memberInfo.memberLink}</div>
                <But onClick={handleCloseClick}>수정</But>
            </XsmallBox>
        </Box>
        </>
    )
}
export default UserInfo;