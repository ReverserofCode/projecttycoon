import styled from "@emotion/styled";
import React, { useCallback } from "react";
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
    color: #9ed8ff;
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
  });
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
export function CheckSide({ header, contents, handleSelect }) {
  const CheckLists = useCallback(() => {
    let lists = [];
    for (let i = 0; i < contents.length; i++) {
      lists.push(
        <CheckContainer
          key={`check contents ${i}`}
          // onClick={handleSelect(contents[i])}
        >
          <AiOutlineCheckCircle></AiOutlineCheckCircle>
          {/* <AiFillCheckCircle color="#9ED8FF"></AiFillCheckCircle> */}
          {contents[i]}
        </CheckContainer>
      );
    }
    return lists;
  });
  return (
    <Base>
      <FilterHeader>{header}</FilterHeader>
      {CheckLists()}
    </Base>
  );
}
// export default SelectSide;
