import styled from "@emotion/styled";
import React, { useCallback, useRef } from "react";
import { Base, FilterHeader } from "./SidebarStyle";
import { AiOutlineCheckCircle } from "react-icons/ai";
/** 체크 형태의 아이템을 담고있는 컨테이너  태그*/
const CheckContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5px;
  font-size: 20px;
  user-select: none;
  :hover {
    color: #4fb8ff;
  }
  &.select {
    color: #4fb8ff;
  }
`;
/** 셀렉트 형태의 아이템을 담고있는 컨테이너 태그 */
const Select = styled.select`
  min-width: 100px;
  font-size: 15px;
  padding: 5px 10px;
  width: 80%;
`;
/** Slect 태그를 이용하는 Side Bar형태 */
export function SelectSide({ header, contents, handleSelect }) {
  /** 콘텐츠를 받아와 option태그로 생성하는 function */
  const Options = useCallback(() => {
    let option = [];
    for (let i = 0; i < contents.length; i++) {
      option.push(<option key={`option item ${i}`}>{contents[i]}</option>);
    }
    return option;
  }, [contents]);
  return (
    <Base>
      <FilterHeader>{header}</FilterHeader>
      <Select
        onChange={(e) => {
          e.preventDefault();
          handleSelect(e.currentTarget.value);
        }}
      >
        {Options()}
      </Select>
    </Base>
  );
}

/** Check 태그를 이용하는 Side Bar형태 */
export function CheckSide({ header, contents, handleSet }) {
  /** 콘텐츠별로 각각의 reference 를 지정하는 ref */
  const Reference = useRef([]);
  /** 체크 콘텐츠를 클릭시 실행되어 state를 변경시키는 function */
  const handleContain = useCallback(() => {
    let refArray = [];
    for (let i = 0; i < Reference.current.length; i++) {
      Reference.current[i].classList.length === 3
        ? refArray.push(Reference.current[i].classList[0])
        : "";
    }
    handleSet(refArray);
  }, [handleSet]);
  /** 콘텐츠를 받아와 체크 콘텐츠로 변환하고 ref를 지정해주는 function */
  const CheckLists = useCallback(() => {
    let lists = [];
    for (let i = 0; i < contents.length; i++) {
      lists.push(
        <CheckContainer
          ref={(el) => {
            Reference.current[i] = el;
          }}
          key={`check contents ${i}`}
          onClick={() => {
            Reference.current[i].classList.toggle("select");
            handleContain();
          }}
          className={contents[i].value}
        >
          <AiOutlineCheckCircle />
          {contents[i].content}
        </CheckContainer>
      );
    }
    return lists;
  }, [contents, handleContain]);
  return (
    <Base>
      <FilterHeader>{header}</FilterHeader>
      {CheckLists()}
    </Base>
  );
}
