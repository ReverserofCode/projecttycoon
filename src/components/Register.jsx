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
import { DMListCall } from "../DMSet/DM";
import DMmodal from "../DMSet/DMmodal";
import { AiOutlinePlus } from "react-icons/ai";
import { HoverIcon } from "../DMSet/Components";
// 전체틀 , 공통
const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 600px;
  position: relative;
  /* border: 5px solid orange; */
  box-sizing: border-box;
  @media (max-width: 320px) and (max-width: 321px) {
    width: 200px;
    transition: 0.5s;
  }
  @media (min-width: 320px) and (max-width: 361px) {
    width: 230px;
    transition: 0.5s;
  }
  @media (min-width: 360px) and (max-width: 421px) {
    width: 280px;
    transition: 0.5s;
  }
  @media (min-width: 420px) and (max-width: 539px) {
    width: 350px;
    transition: 0.5s;
  }
  @media (min-width: 540px) and (max-width: 719px) {
    width: 480px;
    transition: 0.5s;
  }
  @media (min-width: 720px) and (max-width: 959px) {
    width: 600px;
    transition: 0.5s;
  }
  @media (min-width: 960px) and (max-width: 1200px) {
    width: 600px;
    transition: 0.5s;
  }
  @media (min-width: 1200px) {
    width: 600px;
    transition: 0.5s;
  }
`;
const Contents = styled.div`
  max-width: 600px;
  width: 100%;
  /* border: 3px solid rgb(0, 162, 255); */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  position: relative;
  box-sizing: border-box;
  @media (max-width: 320px) {
    width: 75%;
    transition: 0.5s;
  }
  @media (min-width: 320px) {
    width: 75%;
    transition: 0.5s;
  }
  @media (min-width: 360px) {
    width: 85%;
    transition: 0.5s;
  }
  @media (min-width: 420px) {
    width: 90%;
    transition: 0.5s;
  }
  @media (min-width: 520px) {
    width: 95%;
    transition: 0.5s;
  }
  @media (min-width: 720px) {
    width: 100%;
    transition: 0.5s;
  }
  @media (min-width: 960px) {
    width: 100%;
    transition: 0.5s;
  }
  @media (min-width: 1200px) {
    width: 100%;
    transition: 0.5s;
  }
`;
const ScrollButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  bottom: 10px;
  right: 0px;
  margin-bottom: 40px;
  @media screen and (max-width: 370px) {
    margin-bottom: 30px;
  }
`;
const Title = styled.h2`
  padding-top: 50px;
  padding-bottom: 30px;
  font-family: "맑은고딕";
  /* border: 1px solid black; */
  .rabbit {
    margin-left: 10px;
    color: #efa1ae;
  }
  @media (max-width: 320px) {
    padding-top: 20px;
    padding-bottom: 30px;
    font-size: 0.5em;
    transition: 0.3s;
  }
  @media (min-width: 320px) {
    padding-top: 20px;
    padding-bottom: 30px;
    font-size: 0.7em;
    transition: 0.3s;
  }
  @media (min-width: 360px) {
    padding-top: 30px;
    padding-bottom: 30px;
    font-size: 0.9em;
    transition: 0.3s;
  }
  @media (min-width: 420px) {
    padding-top: 40px;
    padding-bottom: 30px;
    font-size: 0.9em;
    transition: 0.3s;
  }
  @media (min-width: 520px) {
    padding-top: 45px;
    padding-bottom: 30px;
    font-size: 1.2em;
    transition: 0.3s;
  }
  @media (min-width: 720px) {
    padding-top: 50px;
    padding-bottom: 30px;
    font-size: 1.3em;
    transition: 0.3s;
  }
  @media (min-width: 960px) {
    padding-top: 50px;
    padding-bottom: 30px;
    font-size: 1.5em;
    transition: 0.3s;
  }
  @media (min-width: 1200px) {
    padding-top: 50px;
    padding-bottom: 30px;
    font-size: 1.5em;
    transition: 0.3s;
  }
`;
const ContentsTitle = styled.h3`
  margin: 0 auto;
  margin-left: 10px;
  padding-bottom: 10px;
  @media screen and (min-width: 1200px) {
    padding-bottom: 20px;
    transition: 0.5s;
  }
  @media (max-width: 1200px) {
    margin-left: 20px;
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
    margin-left: 20px;
    padding-bottom: 7px;
    transition: 0.5s;
    font-size: 1.1em;
  }
  @media (max-width: 520px) {
    margin-left: 10px;
    padding-bottom: 6px;
    transition: 0.5s;
    font-size: 1.1em;
  }
  @media (max-width: 360px) {
    margin-left: 10px;
    padding-bottom: 5px;
    transition: 0.5s;
    font-size: 0.9em;
  }
  @media (max-width: 320px) {
    margin-left: 5px;
    padding-bottom: 5px;
    transition: 0.5s;
    font-size: 0.9em;
  }
`;
const InputForm = styled.input`
  width: 510px;
  height: 50px;
  padding-left: 15px;
  font-family: "맑은고딕";
  font-size: 1em;
  font-weight: 500;
  justify-content: center;
  align-items: center;
  color: #2d2a2a;
  /* border: 3px solid blue; */
  @media screen and (min-width: 1200px) {
    width: 90%;
    transition: 0.5s;
    font-size: 1em;
  }
  @media (max-width: 1200px) {
    width: 90%;
    transition: 0.5s;
    font-size: 1em;
  }
  @media (max-width: 960px) {
    width: 85%;
    transition: 0.5s;
    font-size: 1em;
    padding-left: 10px;
  }
  @media (max-width: 720px) {
    width: 90%;
    transition: 0.5s;
    font-size: 1em;
    padding-left: 10px;
  }
  @media (max-width: 520px) {
    width: 91%;
    transition: 0.5s;
    font-size: 0.9em;
    padding-left: 10px;
  }
  @media (max-width: 420px) {
    width: 90%;
    transition: 0.5s;
    font-size: 14px;
    padding-left: 13px;
  }
  @media (max-width: 360px) {
    width: 90%;
    transition: 0.5s;
    font-size: 12px;
    height: 35px;
    padding-left: 5px;
  }
  @media (max-width: 320px) {
    width: 90%;
    transition: 0.5s;
    font-size: 12px;
    height: 35px;
    padding-left: 5px;
  }
`;
const IdForm = styled.input`
  margin: 0 auto;
  /* border: 1px solid red; */
  justify-content: center;
  align-items: center;
  margin-bottom: 25px;
  margin-top: 8px;
  max-width: 600px;
  width: 100%;
  height: 50px;
  float: left;
  font-family: "맑은고딕";
  font-size: 1em;
  font-weight: 500;
  color: #2d2a2a;
  padding-left: 10px;
  @media screen and (min-width: 1200px) {
    width: 68%;
    transition: 0.5s;
    font-size: 1em;
    margin-left: 20px;
  }
  @media (max-width: 1200px) {
    width: 68%;
    transition: 0.5s;
    font-size: 1em;
    margin-left: 20px;
  }
  @media (max-width: 960px) {
    width: 66%;
    transition: 0.5s;
    margin-left: 35px;
    font-size: 1em;
  }
  @media (max-width: 720px) {
    width: 70%;
    transition: 0.5s;
    margin-left: 15px;
    font-size: 1em;
  }
  @media (max-width: 520px) {
    width: 70%;
    transition: 0.5s;
    font-size: 0.9em;
    margin-left: 7px;
  }
  @media (max-width: 420px) {
    width: 65%;
    transition: 0.5s;
    font-size: 14px;
    margin-left: 5px;
  }
  @media (max-width: 360px) {
    width: 60%;
    transition: 0.5s;
    font-size: 12px;
    margin-left: 5px;
    height: 35px;
    padding-left: 5px;
  }
  @media (max-width: 320px) {
    width: 53%;
    transition: 0.5s;
    font-size: 12px;
    margin-left: 5px;
    height: 35px;
    padding-left: 5px;
  }
`;
const NickForm = styled.input`
  margin: 0 auto;
  justify-content: center;
  align-items: center;
  margin-bottom: 25px;
  margin-top: 8px;
  max-width: 600px;
  width: 100%;
  height: 50px;
  float: left;
  font-family: "맑은고딕";
  font-size: 1em;
  font-weight: 500;
  color: #2d2a2a;
  /* border: 1px solid yellowgreen; */
  @media screen and (min-width: 1200px) {
    width: 68%;
    transition: 0.5s;
    font-size: 1em;
    margin-left: 20px;
    padding-left: 10px;
  }
  @media (max-width: 1200px) {
    width: 68%;
    transition: 0.5s;
    font-size: 1em;
    margin-left: 20px;
    padding-left: 10px;
  }
  @media (max-width: 960px) {
    width: 66%;
    transition: 0.5s;
    margin-left: 35px;
    font-size: 1em;
  }
  @media (max-width: 720px) {
    width: 70%;
    transition: 0.5s;
    margin-left: 15px;
    font-size: 1em;
  }
  @media (max-width: 520px) {
    width: 70%;
    transition: 0.5s;
    font-size: 0.9em;
    margin-left: 7px;
  }
  @media (max-width: 420px) {
    width: 65%;
    transition: 0.5s;
    font-size: 14px;
    margin-left: 5px;
  }
  @media (max-width: 360px) {
    width: 60%;
    transition: 0.5s;
    font-size: 12px;
    margin-left: 5px;
    height: 35px;
    padding-left: 5px;
  }
  @media (max-width: 320px) {
    width: 53%;
    transition: 0.5s;
    font-size: 12px;
    margin-left: 5px;
    height: 35px;
    padding-left: 5px;
  }
`;
// 링크
const LinkArea = styled.div`
  margin-bottom: 10px;
  max-width: 600x;
  width: 100%;

  @media (max-width: 320px) {
    transition: 0.5s;
    width: 100%;
  }
  @media (min-width: 320px) {
    transition: 0.5s;
    width: 97%;
  }
  @media (min-width: 360px) {
    transition: 0.5s;
    width: 97%;
  }
  @media (min-width: 420px) {
    transition: 0.5s;
    width: 96%;
  }
  @media (min-width: 520px) {
    transition: 0.5s;
    width: 96%;
  }
  @media (min-width: 720px) {
    transition: 0.5s;
    width: 90%;
  }
  @media (min-width: 960px) {
    transition: 0.5s;
    width: 95%;
  }
  @media (min-width: 1200px) {
    transition: 0.5s;
    width: 95%;
  }
`;
const CustomOption = styled.div`
  display: flex;
  box-sizing: border-box;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  max-width: 140px;
  width: 100%;
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
  /* border: 1px solid darkcyan; */
  @media (max-width: 360px) {
    height: 70px;
    font-size: 10px;
  }
  @media (max-width: 320px) {
    height: 70px;
    font-size: 10px;
  }
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
  /* border: 1px solid darkcyan; */
  &:hover {
    background-color: #fbeeac;
    border-radius: 7px;
    transform: scale(1.1);
    color: #2d2a2a;
  }
  @media screen and (min-width: 1200px) {
    font-size: 1em;
  }
  @media (max-width: 1200px) {
    font-size: 1em;
  }
  @media (max-width: 960px) {
    font-size: 0.8em;
  }
  @media (max-width: 720px) {
    font-size: 0.8em;
  }
  @media (max-width: 520px) {
    font-size: 0.8em;
  }
  @media (max-width: 420px) {
    font-size: 12px;
  }
  @media (max-width: 360px) {
    font-size: 10px;
    height: 20px;
    font-size: 10px;
    gap: 5px;
  }
  @media (max-width: 320px) {
    height: 20px;
    font-size: 10px;
    gap: 5px;
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
  margin: 0 auto;
  margin-bottom: 22px;
  font-family: "맑은고딕";
  font-size: 1em;
  font-weight: 600;
  background-color: #ffffff;
  color: #141212b9;
  /* border: 1px solid sandybrown; */
  @media (max-width: 320px) {
    width: 50px;
    height: 30px;
    transition: 0.5s;
    gap: 2px;
    font-size: 0.8em;
  }
  @media (min-width: 320px) {
    width: 50px;
    height: 50px;
    transition: 0.5s;
    gap: 2px;
    font-size: 0.8em;
  }
  @media (min-width: 360px) {
    width: 70px;
    height: 50px;
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
  max-width: 420px;
  width: 100%;
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
  /* border: 4px solid rebeccapurple; */
  @media screen and (min-width: 1200px) {
    width: 80%;
    transition: 0.3s;
    padding-left: 10px;
    font-size: 1em;
  }
  @media (max-width: 1200px) {
    width: 80%;
    transition: 0.3s;
    padding-left: 10px;
    font-size: 1em;
  }
  @media (max-width: 960px) {
    width: 100%;
    transition: 0.3s;
    padding-left: 5px;
    font-size: 1em;
  }
  @media (max-width: 720px) {
    width: 100%;
    transition: 0.3s;
    padding-left: 5px;
    font-size: 1em;
  }
  @media (max-width: 520px) {
    width: 100%;
    transition: 0.3s;
    font-size: 0.9em;
    padding-left: 10px;
  }
  @media (max-width: 420px) {
    width: 100%;
    transition: 0.3s;
    font-size: 14px;
    padding-left: 7px;
  }
  @media (max-width: 360px) {
    width: 100%;
    transition: 0.3s;
    height: 35px;
    padding-left: 5px;
    font-size: 12px;
  }
  @media (max-width: 320px) {
    width: 100%;
    transition: 0.3s;
    height: 35px;
    padding-left: 5px;
    font-size: 12px;
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
  @media (min-width: 520px) {
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
  max-width: 600px;
  width: 100%;
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
  /* border: 4px solid darkolivegreen; */
  @media (max-width: 320px) {
    width: 96%;
    transition: 0.5s;
    min-height: 40px;
  }
  @media (min-width: 320px) {
    width: 96%;
    transition: 0.5s;
    min-height: 40px;
  }
  @media (min-width: 360px) {
    width: 97%;
    transition: 0.5s;
    min-height: 40px;
  }
  @media (min-width: 420px) {
    width: 96%;
    transition: 0.5s;
  }
  @media (min-width: 520px) {
    width: 95%;
    transition: 0.5s;
  }
  @media (min-width: 720px) {
    width: 90%;
    transition: 0.5s;
  }
  @media (min-width: 960px) {
    width: 95%;
    transition: 0.5s;
  }
  @media (min-width: 1200px) {
    width: 95%;
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
  /* border: 3px solid salmon; */
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
  @media (max-width: 520px) {
    padding: 7px 10px;
    transition: 0.5s;
    font-size: 0.8em;
  }
  @media (max-width: 360px) {
    padding: 5px 8px;
    transition: 0.5s;
    font-size: 0.8em;
  }
  @media (max-width: 320px) {
    padding: 5px 8px;
    transition: 0.5s;
    font-size: 0.8em;
  }
`;

// 한 줄 소개
const TextMany = styled.textarea`
  resize: none;
  max-width: 600px;
  width: 100%;
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
  /* border: 3px solid salmon; */
  @media screen and (min-width: 1200px) {
    width: 90%;
    transition: 0.5s;
    font-size: 1em;
    height: 170px;
    padding: 10px;
  }
  @media (max-width: 1200px) {
    width: 90%;
    transition: 0.5s;
    font-size: 1em;
    height: 170px;
    padding: 10px;
  }
  @media (max-width: 960px) {
    width: 85%;
    transition: 0.5s;
    font-size: 1em;
    height: 150px;
    padding: 10px;
  }
  @media (max-width: 720px) {
    width: 90%;
    transition: 0.5s;
    font-size: 1em;
    height: 120px;
    padding: 10px;
  }
  @media (max-width: 520px) {
    width: 88%;
    transition: 0.5s;
    font-size: 12px;
    height: 120px;
    padding: 10px;
  }
  @media (max-width: 360px) {
    width: 83%;
    transition: 0.5s;
    font-size: 11px;
    height: 120px;
    padding: 10px;
  }
  @media (max-width: 320px) {
    width: 82%;
    transition: 0.5s;
    font-size: 10px;
    height: 120px;
    padding: 10px;
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
  max-width: 120px;
  font-family: "맑은고딕";
  /* border: 3px solid wheat; */
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
    width: 120px;
    transition: 0.2s;
    border-radius: 5%;
  }
  @media (max-width: 1200px) {
    width: 120px;
    transition: 0.2s;
    border-radius: 5%;
  }

  @media (max-width: 960px) {
    width: 100px;
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
    width: 80px;
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
  @media (max-width: 520px) {
    width: 60px;
    padding: 8px 15px;
    font-size: 0.6em;
    border-radius: 7%;
    font-weight: 500;
    &:hover,
    :active {
      border-color: #fbeeac;
      background-color: #fbeeac;
      transition: 0.2s;
      color: #4743439c;
      font-size: 0.7em;
      cursor: pointer;
    }
  }
  @media (max-width: 420px) {
    width: 60px;
    padding: 8px 15px;
    font-size: 0.6em;
    border-radius: 7%;
    font-weight: 500;
    &:hover {
      border-color: #fbeeac;
      background-color: #fbeeac;
      transition: 0.2s;
      color: #4743439c;
      font-size: 0.7em;
      cursor: pointer;
    }
  }
  @media (max-width: 360px) {
    width: 50px;
    transition: 0.2s;
    padding: 2px 6px;
    font-size: 0.6em;
    border-radius: 10%;
    &:hover {
      border-color: #fbeeac;
      background-color: #fbeeac;
      transition: 0.3s;
      color: #4743439c;
      font-size: 0.6em;
      font-weight: 500;
      cursor: pointer;
    }
  }
  @media (max-width: 320px) {
    width: 50px;
    transition: 0.2s;
    padding: 2px 6px;
    border-radius: 10%;
    font-size: 10px;
    margin-top: 13px;
    &:hover {
      border-color: #fbeeac;
      background-color: #fbeeac;
      transition: 0.3s;
      color: #4743439c;
      font-size: 10px;
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
  /* border: 3px solid teal; */
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
  @media (max-width: 520px) {
    font-size: 0.7em;
    margin-bottom: 16px;
  }
  @media (max-width: 360px) {
    font-size: 0.7em;
    margin-bottom: 15px;
  }
  @media (max-width: 320px) {
    font-size: 10px;
    margin-bottom: 15px;
  }
`;

function Register({ userData }) {
  // 링크
  const [selected, setSelected] = useState("Git");
  const [click, setClick] = useState(false);
  const [linkInput, setLinkInput] = useState(""); // 입력값 따로 관리
  const [linkInputs, setLinkInputs] = useState([
    { option: "Git", value: "", isOpen: false },
  ]);
  /** 자신의 DM 리스트 state */
  const [DMList, setDMList] = useState();
  /** DM 창이 열려있는지 확인하는 state */
  const [DMOpen, setDMOpen] = useState(false);
  /** DM창의 모드를 확인하는 state */
  const [sendMod, setSendMod] = useState("chatlist");
  /** DM 창 오픈 */
  const handleSetOpen = useCallback(() => {
    setDMOpen(true);
    if (userData !== "" && userData !== undefined) {
      DMListCall(userData?.memberId).then((res) => {
        setDMList(res);
      });
    }
  }, [userData]);
  /** DM창의 모드를 변경하는 function */
  const handleSetMod = useCallback((value) => {
    setSendMod(value);
  }, []);
  /** 자신의 ID를 통해 자신의 DM 리스트를 가져오는 funtion */
  const handleGetList = useCallback(() => {
    if (userData !== "" && userData !== undefined) {
      DMListCall(userData?.memberId).then((res) => {
        setDMList(res);
      });
    }
  }, [userData]);
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
    @media screen and (min-width: 1200px) {
      font-size: 1em;
    }
    @media (max-width: 1200px) {
      font-size: 1em;
    }
    @media (max-width: 960px) {
      font-size: 0.9em;
    }
    @media (max-width: 720px) {
      font-size: 0.9em;
    }
    @media (max-width: 520px) {
      font-size: 0.7em;
    }
    @media (max-width: 360px) {
      font-size: 0.7em;
    }
    @media (max-width: 320px) {
      font-size: 10px;
    }
  `;

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
  };

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
  };

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
    <Contents className="Contents">
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
                setIdError(
                  "4~15자의 영문, 숫자, '_', '-'만 사용할 수 있습니다."
                );
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
        {!selectedPlace && (
          <ErrorMessage>학원지점을 선택해 주세요.</ErrorMessage>
        )}
        {/* Display the selected job in an InputForm */}

        <ContentsTitle>
          <span>*</span>기술스택
          <span className="MultipleChoice">※ 복수 선택 가능</span>
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
              marginLeft: index > 0 ? "0px" : "0px",
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
          <BsPlusSquareDotted
            size="45"
            className="PlusBtn"
          ></BsPlusSquareDotted>
        </div>
        <Button onClick={handleSubmit}>SignUp</Button>
        <ScrollButton>
          <Scroll></Scroll>
        </ScrollButton>
        <DMmodal
          status={DMOpen}
          DMList={DMList}
          Mod={sendMod}
          myId={userData?.memberId}
          handleSetMod={handleSetMod}
          handleGetList={handleGetList}
        />
        <HoverIcon
          onClick={() => {
            setDMOpen(!DMOpen);
            setSendMod("chatlist");
            if (!DMOpen) {
              handleGetList();
            }
          }}
          status={DMOpen}
        >
          <AiOutlinePlus />
        </HoverIcon>
      </Container>
    </Contents>
  );
}

export default Register;
