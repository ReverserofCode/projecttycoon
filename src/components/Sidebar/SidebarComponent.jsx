import styled from "@emotion/styled";
import React, { useEffect, useCallback, useRef } from "react";
import { Base, FilterHeader } from "./SidebarStyle";
import { AiOutlineCheckCircle } from "react-icons/ai";
/** 체크 형태의 아이템을 담고있는 컨테이너  태그*/
const CheckContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 600;
  gap: 5px;
  font-size: 20px;
  user-select: none;
  :hover {
    color: #6474db;
  }
  &.select {
    color: #6474db;
  }
`;
export function CheckSide({ header, contents, handleSet, selected }) {
  const CheckLists = useCallback(() => {
    return contents.map((item, index) => (
      <CheckContainer
        className={item.value === selected ? "select" : ""}
        key={`check contents ${index}`}
        onClick={() => {
          if (item.value === selected) handleSet("");
          else handleSet(item.value);
        }}
      >
        <AiOutlineCheckCircle />
        {item.content}
      </CheckContainer>
    ));
  }, [contents, handleSet, selected]);

  return (
    <Base>
      <FilterHeader>{header}</FilterHeader>
      {CheckLists()}
    </Base>
  );
}
