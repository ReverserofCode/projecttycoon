//해야할거
//1.버튼css바꾸기
//2.파일선택 input css
//3.전체적인 배치 (padding,magin) 다시주기
//4.모집분야 재배치
import { useState } from "react"
import axios from "axios";
import styled from "@emotion/styled";

import QuillTestPage from "../TestCode/QuillTest";
import DefaultImg from '../img/default.png';
import TwoImg from '../img/two.png';
import ThreeImg from '../img/three.png'
import TestImg from '../img/test.png'

const But=styled.button`
    width: ${(props)=>props.width|| "420px"};
    height: ${(props)=>props.width|| "30px"};
    background-color: ${(props)=>props.background_color|| "#0B666A"};
    color: white;
`
const WriteWrap=styled.div`
    margin: 0 auto;
    max-width: 1000px;
    border: 1px red solid;
`
const Wrap=styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    border: 1px gray solid;
    padding: 4px;
`
const Title=styled.h2`
    width: 100%;
    border-bottom:3px gray solid;
    padding: 12px;
`
const Subtitle=styled.h4`
    max-width: 910px;
    width: 100%;
    margin: 0;
    padding: 8px 0;
`
const Select=styled.select`
   max-width: ${(props)=>props.width|| "319px"};
   width: 100%;
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
    margin-left: 4px;
`
const InputTitle=styled.input`
    max-width: 843px;
    width: 100%;
    padding :12px 4px;
    font-size: 14px;
    color: gray;
    font-weight: 600;
    margin-bottom:20px;
`
const MainImg=styled.img`
    max-width:600px;
    height: 400px;
`
const Dark=styled.div`
  /* position:absolute; */
  /* top:0;
  left:0; */
  width:100%;
  height:100%;
  background:rgba(0, 0, 0, 0.65);

  opacity:1;
  transition:all .2s linear;
`
const A=styled.a`
    ${Dark}:hover {
    /* background:rgba(0, 0, 0, 0.65);  */
    opacity:0.8;
    cursor: pointer;
}
`
const SubImg=styled.img`
    width: 230px;
    height: 120px;
`
const Bot=styled.div`
    border: 1px red solid;
    width: 100%;
    display: flex;
`
const PulsBut=styled.button`
    width: 100px;
`
const Right=styled.div`
    width: 100%;
    display: flex;
    flex-direction:column;
    justify-content: space-around;
    /* margin-left: 8px; */
`
const ImgWrap=styled.div`
    display: flex;
`
const TT =styled.div`
    /* max-width: 1000px; */
    /* width: 100%; */
    /* border: 1px red solid; */
    display: flex;
    flex-direction: column;
`
const Top=styled.div`
border: 1px red solid;
    /* width: 100%; */
    display: flex;
    flex-direction: column;
`
const DateInput=styled.input`
    width: 400px;
`
const ImgInput=styled.input`
    position: absolute;
    left: 50%;
    /* width: 70px;
    height: 50px;
    border-radius: 50%; */
`

function Write (){
//모집분야
const [Field,setField]=useState('');
//모집분야-인원
const [Personnel,setPersonnel]=useState('');
//모집분야-추가버튼의 카운트
const [Count,setCount]=useState(1);
//프젝 기본 이미지들
const [Img,setImg]=useState([DefaultImg,TwoImg,ThreeImg,])
//프젝 기본 이미지-탭
const [Tab,setTab]=useState(0);


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

//유저-파일change
const saveFileImg=(e)=>{ 
    let arr = [...Img,URL.createObjectURL(e.target.files[0])];
    setImg(arr);
    console.log(e.target.files[0]);
    console.log(arr);
}
function list(){
    let arr=[];
    for(let i=0; i<Count;i++){
        arr.push(
            <>
             <Select  width="700px"onChange={fieldHandling}>
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
         <Wrap>
            <Title>📌 프로젝트에 대해 소개해주세요.</Title>
            <Subtitle>제목</Subtitle>
            <InputTitle placeholder="제목을 작성해주세요."></InputTitle>
            <Subtitle>사진</Subtitle>
            <ImgWrap>
            {/* 메인 프로젝트 기본이미지 바뀌는 코드 */}
                {
                Tab===0 ?(
                    <MainImg
                    src={Img[Tab]}
                    />
                    )
                    :(Tab===1)?(
                        <MainImg
                    src={Img[Tab]}
                    />
                    ):(Tab===2)?(<MainImg
                    src={Img[Tab]}
                    />
                    ):(Tab===3)?(
                        <MainImg
                        src={Img[3]}
                        />  
                    ):<MainImg
                    src={Img[0]}
                    />
                }
                {/* 마지막인덱스값 가져와야함 or 3 */}
                <ImgInput type="file" onChange={saveFileImg} onClick={()=>{setTab(Tab.length-1)}}></ImgInput>
                <Right>
                <a onClick={()=>{setTab(0)}}><SubImg src={Img[0]}></SubImg></a>
                <a onClick={()=>{setTab(1)}}><SubImg src={Img[1]}></SubImg></a>
                <a onClick={()=>{setTab(2)}}><SubImg src={Img[2]}></SubImg></a>
                    {/* {
                        Img.map((list,index)=>(
                            <SubImg src={Img[index]}></SubImg>
                        ))
                    } */}
                    {/* <input type="file" onChange={saveFileImg}></input> */}
                </Right>
            </ImgWrap>
            <QuillTestPage/>
            <Title>📌 프로젝트 기본 정보를 입력해주세요.</Title>
            <Bot>
                <Top>
                    <div>
                        <Subtitle>모집 지역</Subtitle>
                        <Select width="405px">
                            <option value="">강남</option>
                            <option value="">신촌/홍대</option>
                            <option value="">노원</option>
                            <option value="">인천</option>
                            <option value="">대전</option>
                            <option value="">대구</option>
                            <option value="">부산</option>
                        </Select>
                    </div>
                    <div>
                        <Subtitle>모집 마감일</Subtitle>
                        <DateInput type="date"></DateInput>
                    </div>
                </Top>
                <div>
                    <Subtitle>모집 분야</Subtitle>
                        <TT>
                            {
                            list()
                            }
                        </TT>
                    <PulsBut onClick={PulsButton}>+</PulsBut>
                </div>
            </Bot>
         </Wrap>
         <But background_color="gray" onClick={()=>{
                            Submit();
                        }}>취소</But>
        <But onClick={()=>{
                            Submit();
                        }}>수정</But>
        </WriteWrap>
    )
}
export default Write