import styled from "@emotion/styled";
import axios from "axios";
import "./Register.css";
import React, { useCallback, useState } from "react";
import { BiLogoReact, BiDownArrow, BiLogoGithub } from "react-icons/bi";
import { FaMicroblog } from "react-icons/fa";
import { SiRabbitmq } from "react-icons/si";
import { BsPlusSquareDotted, BsDashSquareDotted } from "react-icons/bs";
import { TiMessageTyping, TiDelete } from "react-icons/ti";
import Modal from "../functional/Modal";
import Scroll from "../functional/ScrollButton";
// 전체틀 , 공통
const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 500px;
  position: relative;
`;
const ScrollButton = styled.div`
  display: flex;
  position: fixed;
  bottom: 90px;
  right: 120px;
  width: 100px;
  @media (min-width: 320px) {
    bottom: 20px;
    right: -30px;
  }
  @media (min-width: 360px) {
    bottom: 20px;
    right: -30px;
  }
  @media (min-width: 420px) {
    bottom: 20px;
    right: -30px;
  }
  @media (min-width: 520px) {
    bottom: 20px;
    right: -30px;
  }
`;
const Title = styled.h2`
  padding-top: 50px;
  padding-bottom: 30px;
  font-family: "맑은고딕";
  .rabbit {
    margin-left: 10px;
    color: #efa1ae;
  }
  @media (min-width: 320px) {
    padding-top: 50px;
    padding-bottom: 30px;
    font-size: 1em;
    transition: 0.3s;
  }
  @media (min-width: 360px) {
    padding-top: 50px;
    padding-bottom: 30px;
    font-size: 1.1em;
    transition: 0.3s;
  }
  @media (min-width: 420px) {
    padding-top: 50px;
    padding-bottom: 30px;
    font-size: 1.2em;
    transition: 0.3s;
  }
  @media (min-width: 540px) {
    padding-top: 50px;
    padding-bottom: 30px;
    font-size: 1.5em;
    transition: 0.3s;
  }
  @media (min-width: 720px) {
    padding-top: 50px;
    padding-bottom: 30px;
    font-size: 1.7em;
    transition: 0.3s;
  }
  @media (min-width: 960px) {
    padding-top: 50px;
    padding-bottom: 30px;
    font-size: 2em;
    transition: 0.3s;
  }
  @media (min-width: 1200px) {
    padding-top: 50px;
    padding-bottom: 30px;
    font-size: 2em;
    transition: 0.3s;
  }
`;
const ContentsTitle = styled.h3`
  margin: 0 auto;
  margin-left: 10px;
  padding-bottom: 10px;
  @media screen and (min-width: 1200px) {
    margin-left: 10px;
    padding-bottom: 10px;
    transition: 0.5s;
  }
  @media (max-width: 1200px) {
    margin-left: 40px;
    padding-bottom: 10px;
    transition: 0.5s;
  }

  @media (max-width: 960px) {
    margin-left: 40px;
    padding-bottom: 10px;
    transition: 0.5s;
    font-size: 1.2em;
  }
  @media (max-width: 720px) {
    margin-left: 70px;
    padding-bottom: 10px;
    transition: 0.5s;
    font-size: 1.1em;
  }
  @media (max-width: 540px) {
    margin-left: 90px;
    padding-bottom: 10px;
    transition: 0.5s;
    font-size: 1.1em;
  }
  @media (max-width: 360px) {
    margin-left: 110px;
    padding-bottom: 10px;
    transition: 0.5s;
    font-size: 1em;
  }
  @media (max-width: 320px) {
    margin-left: 120px;
    padding-bottom: 10px;
    transition: 0.5s;
    font-size: 1em;
  }
`;
const InputForm = styled.input`
  width: 410px;
  padding-left: 15px;
  font-family: "맑은고딕";
  font-size: 1em;
  font-weight: 500;
  color: #2d2a2a;
  @media screen and (min-width: 1200px) {
    width: 100%;
    transition: 0.5s;
    font-size: 1em;
  }
  @media (max-width: 1200px) {
    width: 90%;
    transition: 0.5s;
    font-size: 1em;
  }
  @media (max-width: 960px) {
    width: 80%;
    transition: 0.5s;
    font-size: 1em;
  }
  @media (max-width: 720px) {
    width: 70%;
    transition: 0.5s;
    font-size: 0.9em;
  }
  @media (max-width: 540px) {
    width: 60%;
    transition: 0.5s;
    font-size: 0.8em;
  }
  @media (max-width: 420px) {
    width: 60%;
    transition: 0.5s;
    font-size: 0.8em;
  }
  @media (max-width: 360px) {
    width: 55%;
    transition: 0.5s;
    font-size: 0.7em;
  }
  @media (max-width: 320px) {
    width: 50%;
    transition: 0.5s;
    font-size: 0.6em;
  }
`;
const IdForm = styled.input`
  margin: 0 auto;
  margin-bottom: 25px;
  margin-top: 8px;
  width: 350px;
  float: left;
  padding-left: 15px;
  font-family: "맑은고딕";
  font-size: 1em;
  font-weight: 500;
  color: #2d2a2a;
  @media screen and (min-width: 1200px) {
    width: 68%;
    /* transition: 0.1s; */
    font-size: 1em;
  }
  @media (max-width: 1200px) {
    width: 60%;
    /* transition: 0.1s; */
    margin-left: 30px;
    font-size: 1em;
  }
  @media (max-width: 960px) {
    width: 50%;
    transition: 0.5s;
    margin-left: 45px;
    font-size: 0.9em;
  }
  @media (max-width: 720px) {
    width: 50%;
    transition: 0.5s;
    margin-left: 70px;
    font-size: 0.9em;
  }
  @media (max-width: 540px) {
    width: 40%;
    transition: 0.5s;
    margin-left: 100px;
    font-size: 0.8em;
  }
  @media (max-width: 420px) {
    width: 40%;
    transition: 0.5s;
    margin-left: 100px;
    font-size: 0.8em;
  }
  @media (max-width: 360px) {
    width: 35%;
    transition: 0.5s;
    margin-left: 120px;
    font-size: 0.7em;
  }
  @media (max-width: 320px) {
    width: 30%;
    transition: 0.5s;
    font-size: 0.6em;
  }
`;
const NickForm = styled.input`
  margin: 0 auto;
  margin-bottom: 25px;
  margin-top: 8px;
  width: 350px;
  float: left;
  padding-left: 15px;
  font-family: "맑은고딕";
  font-size: 1em;
  font-weight: 500;
  color: #2d2a2a;

  @media screen and (min-width: 1200px) {
    width: 68%;
    font-size: 1em;
    /* transition: 0.1s; */
  }
  @media (max-width: 1200px) {
    width: 60%;
    /* transition: 0.1s; */
    margin-left: 30px;
    font-size: 1em;
  }
  @media (max-width: 960px) {
    width: 50%;
    transition: 0.5s;
    margin-left: 45px;
    font-size: 1em;
  }
  @media (max-width: 720px) {
    width: 50%;
    transition: 0.5s;
    margin-left: 70px;
    font-size: 0.9em;
  }
  @media (max-width: 540px) {
    width: 40%;
    transition: 0.5s;
    margin-left: 100px;
    font-size: 0.8em;
  }
  @media (max-width: 420px) {
    width: 40%;
    transition: 0.5s;
    margin-left: 100px;
    font-size: 0.8em;
  }
  @media (max-width: 360px) {
    width: 35%;
    transition: 0.5s;
    margin-left: 120px;
    font-size: 0.7em;
  }
  @media (max-width: 320px) {
    width: 30%;
    transition: 0.5s;
    font-size: 0.6em;
  }
`;
// 링크
const LinkArea = styled.div`
  margin-bottom: 10px;
  margin-left: 60px;

  @media (min-width: 320px) {
    margin-left: 30px;
    transition: 0.5s;
  }
  @media (min-width: 360px) {
    margin-left: 35px;
    transition: 0.5s;
  }
  @media (min-width: 420px) {
    margin-left: 40px;
    transition: 0.5s;
  }
  @media (min-width: 520px) {
    margin-left: 40px;
    transition: 0.5s;
  }
  @media (min-width: 720px) {
    margin-left: 45px;
    transition: 0.5s;
  }
  @media (min-width: 960px) {
    margin-left: 50px;
    transition: 0.5s;
  }
  @media (min-width: 1200px) {
    margin-left: 60px;
    transition: 0.5s;
  }
`;
const CustomOption = styled.div`
  display: flex;
  box-sizing: border-box;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 140px;
  border-radius: 10px;
  border: 1px solid black;
  height: 100px;
  z-index: 1;
  margin: 0 auto;
  position: absolute;
  background-color: #ffffff;
  border-color: #d0d0d0;
  top: 55px;
  font-family: "맑은고딕";
`;
const Options = styled.div`
  font-family: "맑은고딕";
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  gap: 10px;
  z-index: 100;
  padding-bottom: 5px;
  color: #252423ba;
  &:hover {
    background-color: #fbeeac;
    border-radius: 7px;
    transform: scale(1.1);
    color: #2d2a2a;
  }
`;
const CustomSelect = styled.div`
  display: flex;
  box-sizing: border-box;
  justify-content: center;
  align-items: center;
  gap: 10px;
  padding-top: 20px;
  padding-bottom: 20px;
  padding-right: 10px;
  border: 1px solid #d0d0d0;
  border-radius: 10px;
  width: 140px;
  height: 53px;
  position: relative;
  /* margin: 0 auto; */
  margin-bottom: 22px;
  font-family: "맑은고딕";
  font-size: 1em;
  font-weight: 600;
  background-color: #ffffff;
  color: #141212b9;
  @media (max-width: 320px) {
    width: 60px;
    transition: 0.5s;
    gap: 2px;
    font-size: 0.8em;
  }
  @media (min-width: 320px) {
    width: 60px;
    transition: 0.5s;
    gap: 2px;
    font-size: 0.8em;
  }
  @media (min-width: 360px) {
    width: 70px;
    transition: 0.5s;
    gap: 4px;
    font-size: 0.8em;
  }
  @media (min-width: 420px) {
    width: 70px;
    transition: 0.5s;
    font-size: 0.8em;
  }
  @media (min-width: 520px) {
    width: 80px;
    transition: 0.5s;
    font-size: 0.8em;
  }
  @media (min-width: 720px) {
    width: 100px;
    transition: 0.5s;
    font-size: 0.8em;
  }
  @media (min-width: 960px) {
    width: 120px;
    transition: 0.5s;
    font-size: 1em;
  }
  @media (min-width: 1200px) {
    width: 140px;
    transition: 0.5s;
    font-size: 1em;
  }
`;

const LinkForm = styled.input`
  resize: none;
  width: 370px;
  height: 50px;
  margin-top: 5px;
  border-radius: 10px;
  border-width: 1px;
  border-style: solid;
  border-color: #d0d0d0;
  background-color: #ffffff;
  font-family: "맑은고딕";
  font-size: 1em;
  font-weight: 600;
  color: #2d2a2a;
  @media screen and (min-width: 1200px) {
    width: 370px;
    transition: 0.3s;
    padding-left: 20px;
    font-size: 1em;
  }
  @media (max-width: 1200px) {
    width: 370px;
    transition: 0.3s;
    padding-left: 20px;
    font-size: 1em;
  }
  @media (max-width: 960px) {
    width: 330px;
    transition: 0.3s;
    padding-left: 20px;
    font-size: 1em;
  }
  @media (max-width: 720px) and (min-width: 539px) {
    width: 300px;
    transition: 0.3s;
    padding-left: 20px;
    font-size: 0.9em;
  }
  @media (max-width: 540px) and (min-width: 419px) {
    width: 220px;
    transition: 0.3s;
    padding-left: 20px;
    font-size: 0.8em;
  }
  @media (max-width: 420px) and (min-width: 359px) {
    width: 190px;
    transition: 0.3s;
    padding-left: 10px;
    font-size: 0.7em;
  }
  @media (max-width: 360px) and (min-width: 319px) {
    width: 150px;
    transition: 0.3s;
    padding-left: 10px;
    font-size: 0.7em;
  }
  @media (max-width: 320px) {
    width: 120px;
    transition: 0.3s;
    padding-left: 0px;
    font-size: 0.6em;
  }
`;

// 제출 버튼
const Button = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px 40px;
  font-size: 1.2em;
  font-weight: 700;
  font-family: "맑은고딕";
  background-color: #71717145;
  border-radius: 5px;
  margin: 0 auto;
  margin-top: 100px;
  margin-bottom: 100px;
  &:hover {
    border-color: #fbeeac;
    background-color: #fbeeac;
    transition: 0.5s;
    color: #4743439c;
    font-size: 1.1em;
    font-weight: 700;
    cursor: pointer;
  }
  @media (max-width: 320px) {
    padding: 13px 32px;
    font-size: 1em;
    transition: 0.3s;
  }
  @media (min-width: 320px) {
    padding: 13px 32px;
    font-size: 1em;
    transition: 0.3s;
  }
  @media (min-width: 360px) {
    padding: 13px 32px;
    font-size: 1em;
    transition: 0.3s;
  }
  @media (min-width: 420px) {
    padding: 15px 35px;
    font-size: 1em;
    transition: 0.3s;
  }
  @media (min-width: 540px) {
    padding: 17px 37px;
    font-size: 1em;
    transition: 0.3s;
  }
  @media (min-width: 720px) {
    padding: 17px 37px;
    font-size: 1.1em;
    transition: 0.3s;
  }
  @media (min-width: 960px) {
    padding: 20px 40px;
    font-size: 1.2em;
    transition: 0.3s;
  }
  @media (min-width: 1200px) {
    padding: 20px 40px;
    font-size: 1.2em;
    transition: 0.3s;
  }
`;

// 기술스택
const Stacks = styled.div`
  display: flex;
  box-sizing: border-box;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: center;
  width: 520px;
  position: relative;
  padding-top: 10px;
  padding-left: 5px;
  border: 1px solid #d0d0d0;
  border-radius: 10px;
  margin-bottom: 30px;
  background-color: #ffffff;
  height: fit-content;
  min-height: 60px;
  font-family: "맑은고딕";

  /* overflow-y: scroll; */

  @media (min-width: 320px) {
    width: 50%;
    transition: 0.5s;
  }
  @media (min-width: 360px) {
    width: 60%;
    transition: 0.5s;
  }
  @media (min-width: 420px) {
    width: 60%;
    transition: 0.5s;
  }
  @media (min-width: 540px) {
    width: 70%;
    transition: 0.5s;
  }
  @media (min-width: 720px) {
    width: 80%;
    transition: 0.5s;
  }
  @media (min-width: 960px) {
    width: 90%;
    transition: 0.5s;
  }
  @media (min-width: 1200px) {
    width: 100%;
    transition: 0.5s;
  }
`;
const Select = styled.select`
  width: 100%;
  outline: none;
  border: none;
  text-indent: -9999px;
  position: absolute;
  bottom: 0px;
  right: 0;
  margin-top: 0px;
  margin-bottom: 0px;
  height: fit-content;
`;
const StackItem = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px 10px;
  background-color: #b3b3b3;
  border-radius: 10px;
  z-index: 100;
  margin-left: 5px;
  margin-bottom: 10px;
  font-weight: 600;
  font-size: 1em;
  color: #2d2a2a;
  font-family: "맑은고딕";
  @media screen and (min-width: 1200px) {
    padding: 10px 10px;
    transition: 0.5s;
    font-size: 1em;
  }
  @media (max-width: 1200px) {
    padding: 10px 10px;
    transition: 0.5s;
    font-size: 1em;
  }
  @media (max-width: 960px) {
    padding: 10px 10px;
    transition: 0.5s;
    font-size: 1em;
  }
  @media (max-width: 720px) {
    padding: 7px 10px;
    transition: 0.5s;
    font-size: 1em;
  }
  @media (max-width: 540px) {
    padding: 7px 10px;
    transition: 0.5s;
    font-size: 0.8em;
  }
  @media (max-width: 360px) {
    padding: 6px 8px;
    transition: 0.5s;
    font-size: 0.8em;
  }
  @media (max-width: 320px) {
    padding: 6px 8px;
    transition: 0.5s;
    font-size: 0.8em;
  }
`;

// 한 줄 소개
const TextMany = styled.textarea`
  resize: none;
  width: 500px;
  height: 200px;
  padding: 20px 20px;
  line-height: 30px;
  text-decoration: none;
  border-radius: 10px;
  outline: none;
  border-style: solid;
  border-color: #d0d0d0;
  background-color: #ffffff;
  margin-bottom: 27px;
  font-size: 1em;
  color: #2d2a2a;
  font-family: "맑은고딕";
  @media screen and (min-width: 1200px) {
    width: 100%;
    transition: 0.5s;
    font-size: 1em;
  }
  @media (max-width: 1200px) {
    width: 90%;
    transition: 0.5s;
    font-size: 1em;
  }
  @media (max-width: 960px) {
    width: 80%;
    transition: 0.5s;
    font-size: 1em;
  }
  @media (max-width: 720px) {
    width: 70%;
    transition: 0.5s;
    font-size: 1em;
  }
  @media (max-width: 540px) {
    width: 60%;
    transition: 0.5s;
    font-size: 0.8em;
  }
  @media (max-width: 360px) {
    width: 48%;
    transition: 0.5s;
    font-size: 0.8em;
  }
  @media (max-width: 320px) {
    width: 47%;
    transition: 0.5s;
    font-size: 0.8em;
  }
`;

// 중복체크
const CheckId = styled.button`
  float: left;
  margin-top: 10px;
  margin-left: 15px;
  padding: 13px 12px;
  font-size: 0.9em;
  font-weight: 500;
  border: 1px solid #ffffff;
  background-color: #71717145;
  width: 120px;
  font-family: "맑은고딕";

  &:hover {
    border-color: #fbeeac;
    background-color: #fbeeac;
    transition: 0.3s;
    color: #4743439c;
    font-size: 1em;
    font-weight: 500;
    cursor: pointer;
  }
  @media screen and (min-width: 1201px) {
    width: 140px;
    transition: 0.2s;
    border-radius: 5%;
  }
  @media (max-width: 1200px) {
    width: 140px;
    transition: 0.2s;
    border-radius: 5%;
  }

  @media (max-width: 960px) {
    width: 120px;
    transition: 0.2s;
    padding: 14px 10px;
    font-size: 0.8em;
    border-radius: 4%;
    &:hover {
      border-color: #fbeeac;
      background-color: #fbeeac;
      transition: 0.3s;
      color: #4743439c;
      font-size: 1em;
      font-weight: 500;
      cursor: pointer;
    }
  }
  @media (max-width: 720px) {
    width: 100px;
    transition: 0.2s;
    padding: 14px 10px;
    font-size: 0.7em;
    border-radius: 4%;
    &:hover {
      border-color: #fbeeac;
      background-color: #fbeeac;
      transition: 0.3s;
      color: #4743439c;
      font-size: 0.8em;
      font-weight: 500;
      cursor: pointer;
    }
  }
  @media (max-width: 540px) {
    width: 80px;
    transition: 0.2s;
    padding: 14px 10px;
    font-size: 0.8em;
    border-radius: 4%;
    &:hover {
      border-color: #fbeeac;
      background-color: #fbeeac;
      transition: 0.3s;
      color: #4743439c;
      font-size: 0.8em;
      font-weight: 500;
      cursor: pointer;
    }
  }
  @media (max-width: 360px) {
    width: 60px;
    transition: 0.2s;
    padding: 6px 10px;
    font-size: 0.8em;
    border-radius: 10%;
    &:hover {
      border-color: #fbeeac;
      background-color: #fbeeac;
      transition: 0.3s;
      color: #4743439c;
      font-size: 0.8em;
      font-weight: 500;
      cursor: pointer;
    }
  }
  @media (max-width: 320px) {
    width: 60px;
    transition: 0.2s;
    padding: 6px 10px;
    border-radius: 10%;
    font-size: 12px;
    &:hover {
      border-color: #fbeeac;
      background-color: #fbeeac;
      transition: 0.3s;
      color: #4743439c;
      font-size: 12px;
      font-weight: 500;
      cursor: pointer;
    }
  }
`;
// 에러메세지
const ErrorMessage = styled.span`
  font-size: 1em;
  color: #b3b3b3;
  margin-bottom: 20px;
  @media screen and (min-width: 1200px) {
    font-size: 1em;
  }
  @media (max-width: 1200px) {
    font-size: 1em;
  }
  @media (max-width: 960px) {
    font-size: 0.9em;
    margin-bottom: 18px;
  }
  @media (max-width: 720px) {
    font-size: 0.9em;
    margin-bottom: 16px;
  }
  @media (max-width: 540px) {
    font-size: 0.7em;
    margin-bottom: 16px;
  }
  @media (max-width: 360px) {
    font-size: 0.7em;
    margin-bottom: 15px;
  }
  @media (max-width: 320px) {
    font-size: 12px;
    margin-bottom: 15px;
  }
`;

function Register() {
  // 링크
  const [selected, setSelected] = useState("Git");
  const [click, setClick] = useState(false);
  const [linkInput, setLinkInput] = useState(""); // 입력값 따로 관리
  const [linkInputs, setLinkInputs] = useState([
    { option: "Git", value: "", isOpen: false },
  ]);
  // 링크추가
  const handleAddLinkInput = () => {
    if (linkInputs.length < 5) {
      const newLinkInput = { option: "Git", value: "", isOpen: false };
      setLinkInputs([...linkInputs, newLinkInput]);
    } else {
      alert("링크는 최대 5개까지 추가 가능합니다.");
    }
  };

  // 링크삭제
  const handleDeleteLinkInput = (indexToDelete) => {
    if (linkInputs.length > 1) {
      const newLinkInputs = linkInputs.filter(
        (_, index) => index !== indexToDelete
      );
      setLinkInputs(newLinkInputs);
    }
  };

  const handleOptionSelect = (index, selectedOption) => {
    const newLinkInputs = [...linkInputs];
    newLinkInputs[index].option = selectedOption;
    newLinkInputs[index].isOpen = false;
    setLinkInputs(newLinkInputs);
  };

  const handleLinkInputChange = (index, newValue) => {
    const newLinkInputs = [...linkInputs];
    newLinkInputs[index].value = newValue;
    setLinkInputs(newLinkInputs);
  };

  const [linkOptionStates, setLinkOptionStates] = useState(
    linkInputs.map(() => false)
  );
  // 옵션열고 닫기
  const handleLinkInputToggle = (index) => {
    const newLinkInputs = [...linkInputs];
    newLinkInputs[index].isOpen = !newLinkInputs[index].isOpen;
    setLinkInputs(newLinkInputs);
  };
  // 링크 옵션을 열기 위한 함수
  const handleOpenLinkOption = (index) => {
    const updatedStates = linkOptionStates.map((state, i) =>
      i === index ? !state : false
    );
    setLinkOptionStates(updatedStates);
  };

  // 모달
  // 아이디 중복 체크 모달 상태 변수
  const [isIdModalOpen, setIsIdModalOpen] = useState(false);
  // 닉네임 중복 체크 모달 상태 변수
  const [isNickModalOpen, setIsNickModalOpen] = useState(false);
  const [isNickAvailable, setIsNickAvailable] = useState();
  const [isIdAvailable, setIsIdAvailable] = useState();
  // 아이디 중복 체크 모달 열기
  const openIdModal = () => {
    setIsIdModalOpen(true);
  };
  // 중복체크메세지
  const CheckMessage = styled.span`
    font-size: 1em;
    color: #ff0000;
    margin-bottom: 10px;
  `;
  // // 닉네임 중복 체크 모달 열기
  // const openNickModal = () => {
  //   setIsNickModalOpen(true);
  // };

  // // 아이디 중복 체크 모달 닫기
  // const closeIdModal = () => {
  //   setIsIdModalOpen(false);
  // };

  // // 닉네임 중복 체크 모달 닫기
  // const closeNickModal = () => {
  //   setIsNickModalOpen(false);
  // };

  // 중복에러 메세지
  const [isCheckingId, setIsCheckingId] = useState(false);
  const [isCheckingNick, setIsCheckingNick] = useState(false);
  const [idCheckMessage, setIdCheckMessage] = useState("");

  // 비밀번호
  const passwordRegex =
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,30}$/;
  const [pw, setPw] = useState("");
  const [pwError, setPwError] = useState("");
  const [pwConfirm, setPwConfirm] = useState(""); // Separate state for password confirmation
  const [pwConfirmError, setPwConfirmError] = useState(""); // Separate error state for password confirmation
  // 닉넴, 아이디
  const [nick, setNick] = useState("");
  const [id, setId] = useState("");

  const [idError, setIdError] = useState("");
  const [nickError, setNickError] = useState("");
  const idRegex = /^[a-zA-Z0-9_-]{4,15}$/; // 아이디 형식 검증 정규식
  const nickRegex = /^[a-zA-Z0-9가-힣_-]{2,12}$/;

  // 아이디중복
  // 중복 체크 로직
  const handleCheckId = async (id) => {
    // 중복 체크 요청을 서버로 보냄
    await axios
      .get(`/api/checkDuplicateMemberId/${id}`)
      .then((res) => {
        const resMessage = res.data;
        setIdCheckMessage(resMessage);

        if (!resMessage) {
          setIsIdAvailable(true);
        } else {
          setIsIdAvailable(false);
        }
      })
      .catch((error) => {
        console.error("아이디 중복 체크 에러:", error);
      });
    // openIdModal();
  };

  // const handleOpenModal = useCallback(() => {
  //   if (isIdAvailable) {
  //     openIdModal();
  //   }
  // }, [isIdAvailable]);
  // 닉네임중복 체크 로직
  const handleCheckNick = async (nick) => {
    await axios
      .get(`/api/checkDuplicateNickName/${nick}`)
      .then((res) => {
        const resMessage = res.data;
        setIsCheckingNick(resMessage);

        if (!resMessage) {
          setIsNickAvailable(true);
        } else {
          setIsNickAvailable(false);
        }
      })
      .catch((error) => {
        console.error("닉네임 중복 체크 에러:", error);
      });
    // openNickModal(); // 닉네임 중복 체크 모달 열기
  };
  // const handleNickOpenModal = useCallback(() => {
  //   if (isNickAvailable) {
  //     openIdModal();
  //   }
  // }, [isNickAvailable]);
  // 한 줄 소개
  const [introduce, setIntroduce] = useState("");

  // 기술스택
  const [stack, setStack] = useState([]);
  const [selectedJob, setSelectedJob] = useState(""); // State for selected job
  const [selectedPlace, setSelectedPlace] = useState(""); // State for selected Place
  const [stackError, setStackError] =
    useState("1개 이상의 스택을 선택해 주세요");
  // const [selectedLink, setSelectedLink] = useState("Link"); // State for selected Link

  const stackItemGen = useCallback(() => {
    let contents = [];
    for (let i = 0; i < stack.length; i++) {
      contents.push(
        <StackItem
          key={i} // 고유한 key 값으로 index를 사용합니다.
          onClick={() => {
            let buf = [...stack];
            buf.splice(i, 1); /** splice 선택된 buf를 분리 */
            setStack(buf);
          }}
        >
          {stack[i]}
        </StackItem>
      );
    }
    return contents;
  }, [stack]);
  const handleSubmit = async () => {
    if (
      !id ||
      !nick ||
      !pw ||
      !pwConfirm ||
      !selectedJob ||
      !selectedPlace ||
      stack.length === 0
    ) {
      alert("모든 필수 항목을 입력해주세요.");
      return; // 필수 입력 항목 중 하나라도 비어있으면 함수 종료
    }
    let errorMessage = "";

    if (!idRegex.test(id)) {
      errorMessage += "아이디를 형식에 맞게 작성해 주세요.\n";
    }
    if (!nickRegex.test(nick)) {
      errorMessage += "닉네임을 형식에 맞게 작성해 주세요.\n";
    }
    if (!passwordRegex.test(pw)) {
      errorMessage +=
        "비밀번호는 8자 이상, 영문 대소문자, 숫자, 특수문자를 포함해야 합니다.\n";
    }
    if (pw !== pwConfirm) {
      errorMessage += "비밀번호가 일치하지 않습니다.\n";
    }

    // 개별적인 알림 메시지 생성
    if (!idRegex.test(id) && !passwordRegex.test(pw)) {
      errorMessage = "아이디와 비밀번호 형식을 확인해주세요.\n";
    } else if (!idRegex.test(id) && !nickRegex.test(nick)) {
      errorMessage = "아이디와 닉네임 형식을 확인해주세요.\n";
    } else if (!idRegex.test(id) && pw !== pwConfirm) {
      errorMessage = "아이디와 비밀번호 형식을 확인해주세요.\n";
    } else if (!nickRegex.test(nick) && pw !== pwConfirm) {
      errorMessage = "닉네임 형식과 비밀번호를 확인해주세요.\n";
    }
    if (errorMessage !== "") {
      alert(errorMessage.trim());
      return;
    }

    const userData = JSON.stringify({
      memberNickname: nick,
      memberId: id,
      memberPw: pw,
      memberRole: selectedJob,
      memberAcademy: selectedPlace,
      memberStack: JSON.stringify(stack),
      memberLink: JSON.stringify(
        linkInputs.map((input) => ({
          option: input.option,
          value: input.value,
        }))
      ),
      memberIntroduce: introduce,
      // memberFilePath: "http://projecttycoon.com/static/images/Logo%20Test.png",
      // memberFileName: "test",
    });
    console.log(userData);

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "/api/memberRegister",
      headers: {
        "Content-Type": "application/json",
      },
      data: userData,
    };
    axios
      .request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
        window.location.href = "http://projecttycoon.com/api/login";
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <Container>
      <Title>
        Tycoon에 오신 걸 환영합니다 !
        <SiRabbitmq size="34" className="rabbit" />
      </Title>
      <div className="NickArea">
        <ContentsTitle>
          <span>*</span>닉네임
        </ContentsTitle>
        <NickForm
          placeholder="사용하실 닉네임을 작성해 주세요"
          value={nick}
          onChange={(e) => {
            e.preventDefault();
            const newNick = e.target.value;
            setNick(newNick);

            if (!nickRegex.test(newNick)) {
              setNickError(
                "2~12자의 한글, 영문, 숫자, '_', '-'만 사용할 수 있습니다."
              );
            } else {
              setNickError("");
            }
          }}
        />
        <CheckId
          onClick={() => {
            handleCheckNick(nick);
          }}
        >
          중복 체크
        </CheckId>
        {isNickModalOpen && <Modal onClose={closeNickModal}>중복 체크</Modal>}
      </div>
      {nickError && <ErrorMessage>{nickError}</ErrorMessage>}
      {isNickAvailable !== undefined ? (
        isNickAvailable ? (
          // true일 때
          <CheckMessage>사용 가능한 닉네임입니다.</CheckMessage>
        ) : (
          // false일 때
          <CheckMessage>이미 사용중인 닉네임입니다.</CheckMessage>
        )
      ) : (
        // undefined일 때 빈값
        ""
      )}

      <div className="IdArea">
        <ContentsTitle>
          <span>*</span>아이디
        </ContentsTitle>
        <IdForm
          placeholder="사용하실 아이디를 작성해 주세요"
          value={id}
          onChange={(e) => {
            e.preventDefault();
            const newId = e.target.value;
            setId(newId);
            if (!idRegex.test(newId)) {
              setIdError("4~15자의 영문, 숫자, '_', '-'만 사용할 수 있습니다.");
            } else {
              setIdError("");
            }
          }}
        />
        <CheckId
          onClick={() => {
            handleCheckId(id);
          }}
        >
          중복 체크
        </CheckId>
        {isIdModalOpen && <Modal onClose={closeIdModal}>중복 체크</Modal>}
      </div>
      {idError && <ErrorMessage>{idError}</ErrorMessage>}
      {isIdAvailable !== undefined ? (
        isIdAvailable ? (
          <CheckMessage>사용 가능한 아이디입니다.</CheckMessage>
        ) : (
          <CheckMessage>이미 사용중인 아이디입니다.</CheckMessage>
        )
      ) : (
        ""
      )}

      <ContentsTitle>
        <span>*</span>비밀번호
      </ContentsTitle>
      <InputForm
        type="password"
        placeholder="영문, 숫자, 특수문자 포함 8자리 이상 입력해 주세요"
        value={pw}
        onChange={(e) => {
          const newPassword = e.target.value;
          setPw(newPassword);

          if (!passwordRegex.test(newPassword)) {
            console.log("Password does not meet criteria");
            setPwError("영문, 숫자, 특수문자 포함 8자리 이상 입력해 주세요");
          } else {
            console.log("Password meets criteria");
            setPwError(""); // Clear error message if conditions are met.
          }
        }}
      />
      {pwError && <ErrorMessage>{pwError}</ErrorMessage>}

      <ContentsTitle>
        <span>*</span>비밀번호 확인
      </ContentsTitle>
      <InputForm
        type="password"
        placeholder="비밀번호를 한번 더 입력해 주세요"
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
        }}
      />
      {pwConfirmError && <ErrorMessage>{pwConfirmError}</ErrorMessage>}

      <ContentsTitle>
        <span>*</span>직무
      </ContentsTitle>
      <select
        value={selectedJob}
        onChange={(e) => setSelectedJob(e.target.value)} // Update selectedJob state
      >
        <option value="">선택</option>
        <option value="back">백엔드</option>
        <option value="front">프론트엔드</option>
        <option value="bigData">빅데이터</option>
        <option value="AI">AI</option>
        <option value="server">서버관리자</option>
        <option value="security">정보보안</option>
        <option value="network">네트워크관리자</option>
      </select>
      {!selectedJob && <ErrorMessage>직무를 선택해 주세요.</ErrorMessage>}

      <ContentsTitle>
        <span>*</span>학원지점
      </ContentsTitle>
      <select
        value={selectedPlace}
        onChange={(e) => setSelectedPlace(e.target.value)} // Update selectedPlace state
      >
        <option value="">선택</option>
        <option value="강남">강남</option>
        <option value="신촌/홍대">신촌/홍대</option>
        <option value="노원">노원</option>
        <option value="대전">대전</option>
        <option value="대구">대구</option>
        <option value="인천">인천</option>
        <option value="부산">부산</option>
      </select>
      {!selectedPlace && <ErrorMessage>학원지점을 선택해 주세요.</ErrorMessage>}
      {/* Display the selected job in an InputForm */}

      <ContentsTitle>
        <span>*</span>기술스택
        <span className="MultipleChoice">※ 다수 선택 가능합니다.</span>
      </ContentsTitle>
      <Stacks>
        {stackItemGen()}
        <Select
          onChange={(e) => {
            e.preventDefault();
            let buf = [...stack, e.target.value];
            setStack(buf);
            setStackError("");
          }}
        >
          <option value="Java">Java</option>
          <option value="Python">Python</option>
          <option value="C">C</option>
          <option value="C++">C++</option>
          <option value="C#">C#</option>
          <option value="PHP">PHP</option>
          <option value="SQL">SQL</option>
          <option value="Kotlin">Kotlin</option>
          <option value="Go">Go</option>
          <option value="R">R</option>
          <option value="HTML">HTML</option>
          <option value="CSS">CSS</option>
          <option value="JavaScript">JavaScript</option>
          <option value="TypeScript">TypeScript</option>
          <option value="NodeJs">Node.js</option>
          <option value="JQuery">JQuery</option>
          <option value="React">React</option>
          <option value="Vue">Vue</option>
        </Select>
      </Stacks>
      {stackError && <ErrorMessage>{stackError}</ErrorMessage>}
      <ContentsTitle>한 줄 소개</ContentsTitle>

      <TextMany
        value={introduce}
        onChange={(e) => {
          e.preventDefault();
          setIntroduce(e.currentTarget.value);
        }}
        spellCheck="false"
        placeholder="본인을 소개해주세요!"
      ></TextMany>

      <ContentsTitle>Link</ContentsTitle>
      {linkInputs.map((linkInput, index) => (
        <LinkArea
          key={index}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            marginLeft: index > 0 ? "55px" : "0px",
          }}
          onClick={() => handleOpenLinkOption(index)} // 클릭하면 링크 옵션 열기
        >
          <div className="LinkForm">
            <CustomSelect onClick={() => handleLinkInputToggle(index)}>
              {linkInput.option}{" "}
              <BiDownArrow style={{ position: "absolute", right: "5px" }} />
            </CustomSelect>
            {linkInput.isOpen && (
              <CustomOption>
                {/* <div className="LinkInput"> */}
                <Options onClick={() => handleOptionSelect(index, "Git")}>
                  Git <BiLogoGithub />
                </Options>
                <Options onClick={() => handleOptionSelect(index, "Blog")}>
                  Blog <FaMicroblog />
                </Options>
                <Options onClick={() => handleOptionSelect(index, "Other")}>
                  그 외 <TiMessageTyping />
                </Options>
                {/* </div> */}
              </CustomOption>
            )}
          </div>
          <LinkForm
            placeholder={" 주소를 모두 입력해주세요."}
            value={linkInput.value}
            onChange={(e) => handleLinkInputChange(index, e.target.value)}
          />
          {index !== 0 && (
            <div
              className="delete-button"
              onClick={() => handleDeleteLinkInput(index)}
            >
              <BsDashSquareDotted
                // size="35"
                className="deleteBtn"
              ></BsDashSquareDotted>
            </div>
          )}
        </LinkArea>
      ))}

      <div className="plus-button" onClick={handleAddLinkInput}>
        <BsPlusSquareDotted size="45" className="PlusBtn"></BsPlusSquareDotted>
      </div>
      <Button onClick={handleSubmit}>SignUp</Button>
      <ScrollButton>
        <Scroll></Scroll>
      </ScrollButton>
    </Container>
  );
}

export default Register;
