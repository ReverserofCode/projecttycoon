import { useState } from "react"
import axios from "axios";
import styled from "@emotion/styled";

import QuillTestPage from "../TestCode/QuillTest";
import DefaultImg from '../img/default.png'

const WriteWrap=styled.div`
    margin: auto;
    width: 1000px;
    /* border: 1px red solid; */
`
const Title=styled.h2`
    border-bottom:3px gray solid;
    padding: 12px;
`
const Subtitle=styled.h4`
    margin: 0;
    padding: 8px 0;
`
const Select=styled.select`
   width: 350px;
   padding :12px 4px;
   font-size: 14px;
   color: gray;
   font-weight: 600;
`
const SubSelect=styled.select`
    width: 80px;
    padding :12px 4px;
    font-size: 14px;
    color: gray;
    font-weight: 600;
    margin-right: 20px;
`
const InputTitle=styled.input`
    width: 880px;
    padding :12px 4px;
    font-size: 14px;
    color: gray;
    font-weight: 600;
`
const MainImg=styled.img`
    width:600px;
    height: 400px;
`



function Write (){
//모집분야
const [Field,setField]=useState('');
//모집분야-인원
const [Personnel,setPersonnel]=useState('');
//모집분야-추가버튼의 카운트
const [Count,setCount]=useState(1);
//프젝 기본 이미지
const [Img,setImg]=useState(DefaultImg)


const fieldHandling=(e)=>{
    setField(e.target.value);
    console.log(e.target.value);
    console.log(Field);
}
const personnelHandling=(e)=>{
    setPersonnel(e.target.value);
}
const Submit=()=>{
    axios
    .post(`/api/projectRegister`)
    .then((res)=>{console.log(res,'성공')})
    .catch((error)=>{
        if(error){
            console.log('err',error)
        }
    })
}
const PulsButton=()=>{
    setCount(Count+1);
    console.log(Count);
}

//파일change
const saveFileImg=(e)=>{ 
    setImg(URL.createObjectURL(e.target.files[0]));
console.log(e.target.files[0]);
}
function list(){
    let arr=[];
    for(let i=0; i<Count;i++){
        arr.push(
            <>
             <Select  onChange={fieldHandling}>
                <option value="back">백엔드</option>
                <option value="front">프론트엔드</option>
                <option value="ai">AI</option>
                <option value="bigData">빅데이터</option>
                <option value="server">서버관리자</option>
                <option value="security">정보보안</option>
                <option value="netWork">네트워크 관리자</option>
             </Select>
             <SubSelect onChange={personnelHandling}>
                <option value="back">1명</option>
                <option value="back">2명</option>
                <option value="back">3명</option>
                <option value="back">4명</option>
                <option value="back">5명 이상</option>
             </SubSelect>
            </>
        )
    }
    console.log(arr);
    return arr;
}
    return(
        <WriteWrap>
        <Title>📌 프로젝트에 대해 소개해주세요.</Title>
        <Subtitle>제목</Subtitle>
        <InputTitle placeholder="제목을 작성해주세요."></InputTitle>
        <Subtitle>사진</Subtitle>
        {
            Img&& (
                <MainImg
                src={Img}
                />
            )
        }
        <input type="file" onChange={saveFileImg}></input>
        <QuillTestPage/>
        <Title>📌 프로젝트 기본 정보를 입력해주세요.</Title>
        <Subtitle>모집 분야</Subtitle>
            <div>
                {
                list()
                }
            </div>
        <button onClick={PulsButton}>+</button>
        <Subtitle>모집 지역</Subtitle>
        <Select>
            <option value="">노원구점</option>
            <option value="">신촌점</option>
            <option value="">강남점</option>
            <option value="">강남점</option>
            <option value="">강남점</option>
        </Select>
        <Subtitle>모집 마감일</Subtitle>
        <input type="date"></input>
        <button onClick={()=>{
            Submit();
        }}>submit</button>
        </WriteWrap>
    )
}
export default Write