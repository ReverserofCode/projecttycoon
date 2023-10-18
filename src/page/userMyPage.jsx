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
        "memberId": "kny1",
        "memberPw": "$2a$10$x2fNQfWUuXMAf/bOYb0Q3O2ypMXwdhfFUvJiArh7R9H9ln7ToLBH6",
        "memberRole": "front",
        "memberIntroduce": "gd",
        "memberLink": "[{\"option\":\"Git\",\"value\":\"kkk@naver.com\"}]",
        "memberAcademy": "노원",
        "memberNickname": "nayoung",
        "memberFilePath": "/static/icons/",
        "memberFileName": "5_cat.png",
        "memberStack": "[\"JavaScript\",\"CSS\",\"HTML\"]",
        "myProjectlist": [],
        "myCommentlist": [
            {
                "createdAt": "2023-10-18T07:36:59.005+00:00",
                "modifiedAt": "2023-10-18T07:36:59.005+00:00",
                "commentId": 25,
                "commentProject": {
                    "createdAt": "2023-10-18T07:27:26.261+00:00",
                    "modifiedAt": "2023-10-18T07:32:59.815+00:00",
                    "projectId": 12,
                    "projectTitle": "디폴트 이미지 지정을 위한 프로젝트 3",
                    "projectContent": "<h1>프로젝트 3</h1>",
                    "projectWantedRole": "[{\"role\": \"bigData\", \"complete\": 0, \"personnel\": \"4\"}, {\"role\": \"network\", \"complete\": 0, \"personnel\": \"3\"}]",
                    "projectDue": "2023-09-20T00:00:00.000+00:00",
                    "projectAcademy": "노원",
                    "projectStatus": true,
                    "projectWriterId": "parksangin",
                    "projectWriterNick": "parksangin",
                    "projectFilePath": "/webapp/dc1010ee-2ece-4905-b5bf-51fe4c3f2cbd_하리그림.jpg",
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
                    "createdAt": "2023-10-18T07:36:41.422+00:00",
                    "modifiedAt": "2023-10-18T07:36:41.423+00:00",
                    "memberId": "kny1",
                    "memberPw": "$2a$10$x2fNQfWUuXMAf/bOYb0Q3O2ypMXwdhfFUvJiArh7R9H9ln7ToLBH6",
                    "memberNickname": "nayoung",
                    "memberAcademy": "노원",
                    "memberRole": "front",
                    "memberIntroduce": "gd",
                    "memberLink": "[{\"option\":\"Git\",\"value\":\"kkk@naver.com\"}]",
                    "memberFilePath": "/static/icons/",
                    "memberFileName": "5_cat.png",
                    "memberStack": "[\"JavaScript\",\"CSS\",\"HTML\"]",
                    "memberAuthority": [
                        "USER"
                    ],
                    "scrappedProjects": []
                },
                "commentContent": "댓글이에요"
            }
        ],
        "myScraplist": []
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