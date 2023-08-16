import { useState } from "react"

function Write (){
const [Field,setField]=useState('');
const [Personnel,setPersonnel]=useState('');

const handling=(e)=>{
    setField(e.target.value);
    console.log(e.target.value);
    console.log(Field);
}
    return(
        <>
        <h3>프로젝트 기본 정보를 입력해주세요.</h3>
        <div>모집분야</div>
        <select value={Field} onChange={handling}>
            <option value="1">백엔드</option>
            <option value="2">프론트엔드</option>
            <option value="3">AI</option>
            <option value="">빅데이터</option>
            <option value="">서버관리자</option>
            <option value="">정보보안</option>
            <option value="">네트워크 관리자</option>
        </select>
        <div>모집인원</div>
        <select>
            <option value="">인원 미정</option>
            <option value="">1명 ~ 5명</option>
            <option value="">5명 ~ 10명</option>
            <option value="">10명 이상</option>
        </select>
        <div>진행방식</div>
        <select>
            <option value="">온라인/오프라인</option>
            <option value="">온라인</option>
            <option value="">오프라인</option>
        </select>
        <div>모집 지역</div>
        <select>
            <option value="">노원구점</option>
            <option value="">신촌점</option>
            <option value="">강남점</option>
            <option value="">강남점</option>
            <option value="">강남점</option>
        </select>
        <div>진행 기간</div>
        <select>
            <option value="">1개월</option>
            <option value="">2개월</option>
            <option value="">3개월</option>
            <option value="">4개월</option>
            <option value="">장기</option>
        </select>
        <div>모집 마감일</div>
        <input type="date"></input>
        <h3>프로젝트에 대해 소개해주세요.</h3>
        <input></input>
        </>
    )
}
export default Write