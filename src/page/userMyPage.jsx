import axios from "axios"
import UserInfo from "../components/userInfo"
import UserWrite from "../components/userWrite"
import styled from "@emotion/styled";
import {useEffect, useState} from "react";
import { PostAxios } from "../functional/PostAxios";

const NavWrap=styled.div`
 cursor: pointer;
    display: flex;
    margin-bottom: 40px;
    margin-left: 10px;
`
const Nav=styled.a`
    font-size: 14px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-left:30px;
    width: 160px;
    height: 40px;
    border-bottom: 2px gray solid;
`
const Wrap=styled.div`
    max-width: 1100px;
    width: 100%;
    margin: 0 auto;
    margin-top: 80px;
`
const Point=styled.div`
    border-bottom: 2px red solid;
`
function UserMypage(){
    // useEffect=()=>{
    //     console.log(memberInfo)
    // }
    const info={
        "memberId": "test1",
        "memberPw": "$2a$10$YST8WdBgYpGAQdR/PDTT4ugDgDDv2he8ItykiNbPrfOVNUTQDLsl.",
        "memberRole": "back",
        "memberIntroduce": "하하",
        "memberLink": "[{\"option\":\"Git\",\"value\":\"\"},{\"option\":\"Git\",\"value\":\"\"}]",
        "memberAcademy": "노원",
        "memberNickname": "test1",
        "memberFilePath": "/static/icons/",
        "memberFileName": "16_turtle.png",
        "memberStack": "[\"Python\",\"C\",\"C++\",\"C#\",\"PHP\",\"SQL\",\"Kotlin\",\"Go\"]",
        "myProjectlist": [
        {
        "createdAt": "2023-10-18T06:21:39.210+00:00",
        "modifiedAt": "2023-10-18T06:21:39.210+00:00",
        "projectId": 2,
        "projectTitle": "디폴트 이미지 지정을 위한 프로젝트 3",
        "projectContent": "<h1>프로젝트 3</h1>",
        "projectWantedRole": "[{\"role\": \"bigData\", \"complete\": 0, \"personnel\": \"4\"}, {\"role\": \"network\", \"complete\": 0, \"personnel\": \"3\"}]",
        "projectDue": "2023-09-20T00:00:00.000+00:00",
        "projectAcademy": "노원",
        "projectStatus": true,
        "projectWriterId": "test1",
        "projectWriterNick": "test1",
        "projectFilePath": "/webapp/34dd8a56-3910-4f3a-89e3-ab24352bb6c1_",
        "projectFileName": "projectImage",
        "projectScrapNum": 1,
        "parsedProjectWantedRole": [
        {
        "role": "bigData",
        "complete": 0,
        "personnel": 4
        },
        {
        "role": "network",
        "complete": 0,
        "personnel": 3
        }
        ]
        }
        ],
        "myCommentlist": [
        {
        "createdAt": "2023-10-18T06:22:09.809+00:00",
        "modifiedAt": "2023-10-18T06:22:09.809+00:00",
        "commentId": 3,
        "commentProject": {
        "createdAt": "2023-10-18T06:19:57.442+00:00",
        "modifiedAt": "2023-10-18T06:43:13.420+00:00",
        "projectId": 1,
        "projectTitle": "디폴트 이미지 지정을 위한 프로젝트 3",
        "projectContent": "<h1>프로젝트 3</h1>",
        "projectWantedRole": "[{\"role\": \"bigData\", \"complete\": 0, \"personnel\": \"4\"}, {\"role\": \"network\", \"complete\": 0, \"personnel\": \"3\"}]",
        "projectDue": "2023-09-20T00:00:00.000+00:00",
        "projectAcademy": "노원",
        "projectStatus": true,
        "projectWriterId": "Tester",
        "projectWriterNick": "I`m Tester",
        "projectFilePath": "/webapp/65a6808d-1cf6-45a3-aecc-4a18f11d959e_",
        "projectFileName": "projectImage",
        "projectScrapNum": 2,
        "parsedProjectWantedRole": [
        {
        "role": "bigData",
        "complete": 0,
        "personnel": 4
        },
        {
        "role": "network",
        "complete": 0,
        "personnel": 3
        }
        ]
        },
        "commentWriter": {
        "createdAt": "2023-10-18T06:18:49.866+00:00",
        "modifiedAt": "2023-10-18T06:18:49.911+00:00",
        "memberId": "test1",
        "memberPw": "$2a$10$YST8WdBgYpGAQdR/PDTT4ugDgDDv2he8ItykiNbPrfOVNUTQDLsl.",
        "memberNickname": "test1",
        "memberAcademy": "노원",
        "memberRole": "back",
        "memberIntroduce": "하하",
        "memberLink": "[{\"option\":\"Git\",\"value\":\"\"},{\"option\":\"Git\",\"value\":\"\"}]",
        "memberFilePath": "/static/icons/",
        "memberFileName": "16_turtle.png",
        "memberStack": "[\"Python\",\"C\",\"C++\",\"C#\",\"PHP\",\"SQL\",\"Kotlin\",\"Go\"]",
        "memberAuthority": [
        "USER"
        ],
        "scrappedProjects": [
        {
        "createdAt": "2023-10-18T06:19:57.442+00:00",
        "modifiedAt": "2023-10-18T06:43:13.420+00:00",
        "projectId": 1,
        "projectTitle": "디폴트 이미지 지정을 위한 프로젝트 3",
        "projectContent": "<h1>프로젝트 3</h1>",
        "projectWantedRole": "[{\"role\": \"bigData\", \"complete\": 0, \"personnel\": \"4\"}, {\"role\": \"network\", \"complete\": 0, \"personnel\": \"3\"}]",
        "projectDue": "2023-09-20T00:00:00.000+00:00",
        "projectAcademy": "노원",
        "projectStatus": true,
        "projectWriterId": "Tester",
        "projectWriterNick": "I`m Tester",
        "projectFilePath": "/webapp/65a6808d-1cf6-45a3-aecc-4a18f11d959e_",
        "projectFileName": "projectImage",
        "projectScrapNum": 2,
        "parsedProjectWantedRole": [
        {
        "role": "bigData",
        "complete": 0,
        "personnel": 4
        },
        {
        "role": "network",
        "complete": 0,
        "personnel": 3
        }
        ]
        }
        ]
        },
        "commentContent": "테스트"
        },
        {
        "createdAt": "2023-10-18T06:25:30.914+00:00",
        "modifiedAt": "2023-10-18T06:25:30.914+00:00",
        "commentId": 4,
        "commentProject": {
        "createdAt": "2023-10-18T06:19:57.442+00:00",
        "modifiedAt": "2023-10-18T06:43:13.420+00:00",
        "projectId": 1,
        "projectTitle": "디폴트 이미지 지정을 위한 프로젝트 3",
        "projectContent": "<h1>프로젝트 3</h1>",
        "projectWantedRole": "[{\"role\": \"bigData\", \"complete\": 0, \"personnel\": \"4\"}, {\"role\": \"network\", \"complete\": 0, \"personnel\": \"3\"}]",
        "projectDue": "2023-09-20T00:00:00.000+00:00",
        "projectAcademy": "노원",
        "projectStatus": true,
        "projectWriterId": "Tester",
        "projectWriterNick": "I`m Tester",
        "projectFilePath": "/webapp/65a6808d-1cf6-45a3-aecc-4a18f11d959e_",
        "projectFileName": "projectImage",
        "projectScrapNum": 2,
        "parsedProjectWantedRole": [
        {
        "role": "bigData",
        "complete": 0,
        "personnel": 4
        },
        {
        "role": "network",
        "complete": 0,
        "personnel": 3
        }
        ]
        },
        "commentWriter": {
        "createdAt": "2023-10-18T06:18:49.866+00:00",
        "modifiedAt": "2023-10-18T06:18:49.911+00:00",
        "memberId": "test1",
        "memberPw": "$2a$10$YST8WdBgYpGAQdR/PDTT4ugDgDDv2he8ItykiNbPrfOVNUTQDLsl.",
        "memberNickname": "test1",
        "memberAcademy": "노원",
        "memberRole": "back",
        "memberIntroduce": "하하",
        "memberLink": "[{\"option\":\"Git\",\"value\":\"\"},{\"option\":\"Git\",\"value\":\"\"}]",
        "memberFilePath": "/static/icons/",
        "memberFileName": "16_turtle.png",
        "memberStack": "[\"Python\",\"C\",\"C++\",\"C#\",\"PHP\",\"SQL\",\"Kotlin\",\"Go\"]",
        "memberAuthority": [
        "USER"
        ],
        "scrappedProjects": [
        {
        "createdAt": "2023-10-18T06:19:57.442+00:00",
        "modifiedAt": "2023-10-18T06:43:13.420+00:00",
        "projectId": 1,
        "projectTitle": "디폴트 이미지 지정을 위한 프로젝트 3",
        "projectContent": "<h1>프로젝트 3</h1>",
        "projectWantedRole": "[{\"role\": \"bigData\", \"complete\": 0, \"personnel\": \"4\"}, {\"role\": \"network\", \"complete\": 0, \"personnel\": \"3\"}]",
        "projectDue": "2023-09-20T00:00:00.000+00:00",
        "projectAcademy": "노원",
        "projectStatus": true,
        "projectWriterId": "Tester",
        "projectWriterNick": "I`m Tester",
        "projectFilePath": "/webapp/65a6808d-1cf6-45a3-aecc-4a18f11d959e_",
        "projectFileName": "projectImage",
        "projectScrapNum": 2,
        "parsedProjectWantedRole": [
        {
        "role": "bigData",
        "complete": 0,
        "personnel": 4
        },
        {
        "role": "network",
        "complete": 0,
        "personnel": 3
        }
        ]
        }
        ]
        },
        "commentContent": "테스트2"
        }
        ],
        "scrappedProjects": [
        {
        "createdAt": "2023-10-18T06:19:57.442+00:00",
        "modifiedAt": "2023-10-18T06:43:13.420+00:00",
        "projectId": 1,
        "projectTitle": "디폴트 이미지 지정을 위한 프로젝트 3",
        "projectContent": "<h1>프로젝트 3</h1>",
        "projectWantedRole": "[{\"role\": \"bigData\", \"complete\": 0, \"personnel\": \"4\"}, {\"role\": \"network\", \"complete\": 0, \"personnel\": \"3\"}]",
        "projectDue": "2023-09-20T00:00:00.000+00:00",
        "projectAcademy": "노원",
        "projectStatus": true,
        "projectWriterId": "Tester",
        "projectWriterNick": "I`m Tester",
        "projectFilePath": "/webapp/65a6808d-1cf6-45a3-aecc-4a18f11d959e_",
        "projectFileName": "projectImage",
        "projectScrapNum": 2,
        "parsedProjectWantedRole": [
        {
        "role": "bigData",
        "complete": 0,
        "personnel": 4
        },
        {
        "role": "network",
        "complete": 0,
        "personnel": 3
        }
        ]
        }
        ]
        }
    const [memberInfo, setMemberInfo] = useState(info);
    //유저-프로젝트개설-이미지
    // const [projectMainImg,setProjectMainImg]=useState("http://projecttycoon.com"+memberInfo?.mylist?.projectFilePath)
    //유저-프로젝트개설-제목
    // const [projectMainTitle,setProjectMainTitle]=useState(memberInfo?.mylist?.projectTitle)

    //네브 스위치
    const [on,setoff]=useState(true);
    const HandleModal1=(e)=>{
        setoff(true);
        console.log(e.currentTarget)
    }
    const handleGet=async()=>{
        await axios
        .get("/api/mypage")
        .then((response)=>{
        setMemberInfo(response.data)
        console.log(memberInfo)
        })  
        .catch((err)=>{
        console.log(err)
        })
    }
    const HandleModal2=(e)=>{
        setoff(false);
        // handleGet
    }
    const cont=()=>{
        console.log(memberInfo)
    }
    return(
        <Wrap>
            {/* <button onClick={cont}>ddddddddddddd</button> */}
            <NavWrap>
                <Nav onClick={HandleModal1}>
                    내프로필
                </Nav>
                <Nav onClick={HandleModal2}>
                    활동관리
                </Nav>
                {/* {
                    on&&(
                        <UserInfo></UserInfo>
                    )
                } */}
            </NavWrap>
            {
                    on===false?(<UserWrite on={on} memberInfo={memberInfo} ></UserWrite>):(<UserInfo on={on} ></UserInfo>)
                }
        </Wrap>
    )
}
export default UserMypage