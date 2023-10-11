import axios from "axios"
import UserInfo from "../components/userInfo"
import UserWrite from "../components/userWrite"
import styled from "@emotion/styled";
import {useState} from "react";
import {  PostAxios } from "../functional/PostAxios";

const NavWrap=styled.div`
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
    //네브 스위치
    const [on,setoff]=useState(true);
    const HandleModal1=(e)=>{
        setoff(true);
        console.log(e.currentTarget)
    }
    const HandleModal2=(e)=>{
        setoff(false);
        
    }
    axios.get
    return(
        <Wrap>
            <button onClick={PostAxios()}>ddddddddddddd</button>
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
                    on===false?(<UserWrite on={on} ></UserWrite>):(<UserInfo on={on} ></UserInfo>)
                }
        </Wrap>
    )
}
export default UserMypage