import styled from "@emotion/styled";
import React, { useCallback } from "react";
const BoardItemBase = styled.div`
  display: flex;
  box-sizing: border-box;
  justify-content: center;
  align-items: flex-start;
  flex-direction: column;
  border: 1px solid black;
  border-radius: 10px;
  width: 270px;
  height: 270px;
  box-shadow: 0px 6px 6px 0px rgba(0, 0, 0, 0.25);
  padding: 20px 20px;
  overflow: hidden;
`;
const MainContents = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 45px;
  font-size: 20px;
`;
const TagContainer = styled.ul`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  font-size: 12px;
`;
const TitleZone = styled.p`
  padding: 0;
  font-weight: 400;
`;
const DateZone = styled.p`
  padding: 0;
  color: rgba(170, 170, 170, 0.67);
  font-weight: 400;
`;
const FilterIconContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 15px;
`;
const FilterIcon = styled.img`
  width: 40px;
`;

function BoardItem({ title, createDate, DeadLine, status, filter }) {
  const FilterIcons = useCallback(() => {
    let contents = [];
    for (let i = 0; i < filter.length; i++) {
      if (filter[i] === "Back")
        contents.push(
          <FilterIcon src="./BackEnd.png" key={`Filter Icon ${i}`} />
        );
      if (filter[i] === "Front")
        contents.push(
          <FilterIcon src="./FrontEnd.png" key={`Filter Icon ${i}`} />
        );
      if (filter[i] === "Bigdata")
        contents.push(
          <FilterIcon src="./BigData.png" key={`Filter Icon ${i}`} />
        );
      if (filter[i] === "AI")
        contents.push(<FilterIcon src="./AI.png" key={`Filter Icon ${i}`} />);
      if (filter[i] === "Server")
        contents.push(
          <FilterIcon src="./ServerAdmin.png" key={`Filter Icon ${i}`} />
        );
      if (filter[i] === "Security")
        contents.push(
          <FilterIcon src="./Security.png" key={`Filter Icon ${i}`} />
        );
      if (filter[i] === "Network")
        contents.push(
          <FilterIcon src="./Network.png" key={`Filter Icon ${i}`} />
        );
    }
    return contents;
  }, [filter]);
  return (
    <BoardItemBase>
      <MainContents>
        <TagContainer>{status}</TagContainer>
        <TitleZone>{title}</TitleZone>
        <DateZone>{`${createDate}~${DeadLine}`}</DateZone>
      </MainContents>
      <FilterIconContainer>{FilterIcons()}</FilterIconContainer>
    </BoardItemBase>
  );
}

export default BoardItem;
