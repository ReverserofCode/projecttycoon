import styled from "@emotion/styled";
import React, { useCallback, useEffect, useRef } from "react";
import { Base, FilterHeader } from "./SidebarStyle";
import { AiOutlineCheckCircle, AiFillCheckCircle } from "react-icons/ai";
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
const Select = styled.select`
  min-width: 100px;
  font-size: 15px;
  padding: 5px 10px;
  width: 80%;
`;
/** Slect 태그를 이용하는 Side Bar형태 */
export function SelectSide({ header, contents, handleSelect }) {
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
  const Reference = useRef([]);
  const handleContain = useCallback(() => {
    let refArray = [];
    for (let i = 0; i < Reference.current.length; i++) {
      Reference.current[i].classList.length === 2
        ? refArray.push(Reference.current[i].innerText)
        : "";
    }
    handleSet(refArray);
  }, [handleSet]);
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
        >
          <AiOutlineCheckCircle />
          {contents[i]}
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
