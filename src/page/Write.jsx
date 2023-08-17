import { useState } from "react"
import axios from "axios";

function Write (){
const [Field,setField]=useState('');
const [Personnel,setPersonnel]=useState('');

const handling=(e)=>{
    setField(e.target.value);
    console.log(e.target.value);
    console.log(Field);
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
    return(
        <>
        <h3>프로젝트 기본 정보를 입력해주세요.</h3>
        <div>모집 분야</div>
            <div>
                <select value={Field} onChange={handling}>
                    <option value="back">백엔드</option>
                    <option value="front">프론트엔드</option>
                    <option value="ai">AI</option>
                    <option value="bigData">빅데이터</option>
                    <option value="server">서버관리자</option>
                    <option value="security">정보보안</option>
                    <option value="netWork">네트워크 관리자</option>
                </select>
                <select>
                    <option value="back">1명</option>
                </select>
            </div>
        <button>+</button>
        <div>모집분야2</div>
        <select value={Field} onChange={handling}>
            <option value="back">백엔드</option>
            <option value="front">프론트엔드</option>
            <option value="ai">AI</option>
            <option value="bigData">빅데이터</option>
            <option value="server">서버관리자</option>
            <option value="security">정보보안</option>
            <option value="netWork">네트워크 관리자</option>
        </select>
        <div>모집 지역</div>
        <select>
            <option value="">노원구점</option>
            <option value="">신촌점</option>
            <option value="">강남점</option>
            <option value="">강남점</option>
            <option value="">강남점</option>
        </select>
        <div>모집 마감일</div>
        <input type="date"></input>
        <h3>프로젝트에 대해 소개해주세요.</h3>
        <input placeholder="제목을 작성해주세요"></input>
        <input type="file"></input>
        <button onClick={()=>{
            Submit();
        }}>submit</button>
        </>
    )
}
export default Write