import styled from "@emotion/styled";
import React, { useEffect, useCallback, useRef } from "react";
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
/** Select 태그를 이용하는 Side Bar형태 */
export function SelectSide({ header, contents, handleSelect }) {
  const Options = useCallback(() => {
    return contents.map((item, index) => (
      <option key={`option item ${index}`} value={item.value}>
        {item.content}
      </option>
    ));
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

export function CheckSide({ header, contents, handleSet }) {
  const Reference = useRef([]);

  useEffect(() => {
    // 초기에 선택된 항목들을 설정합니다.
    contents.forEach((item, index) => {
      if (item.selected) {
        Reference.current[index].classList.add("select");
      }
    });
  }, [contents]);

  const handleContain = useCallback(() => {
    let refArray = [];
    for (let i = 0; i < Reference.current.length; i++) {
      if (Reference.current[i].classList.contains("select")) {
        refArray.push(contents[i].value);
      }
    }
    handleSet(refArray);
  }, [contents, handleSet]);

  const CheckLists = useCallback(() => {
    return contents.map((item, index) => (
      <CheckContainer
        ref={(el) => {
          Reference.current[index] = el;
        }}
        key={`check contents ${index}`}
        onClick={() => {
          Reference.current[index].classList.toggle("select");
          handleContain();
        }}
        className={item.selected ? "select" : ""}
      >
        <AiOutlineCheckCircle />
        {item.content}
      </CheckContainer>
    ));
  }, [contents, handleContain]);

  return (
    <Base>
      <FilterHeader>{header}</FilterHeader>
      {CheckLists()}
    </Base>
  );
}
