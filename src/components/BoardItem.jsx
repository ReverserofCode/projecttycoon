import styled from "@emotion/styled";
import React, { useCallback } from "react";
import { BsClipboard2Check } from "react-icons/bs";
import { BiStopwatch } from "react-icons/bi";
import { TbSchool } from "react-icons/tb";
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
  padding: 16px 20px;
  overflow: hidden;
`;
const MainContents = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 35px;
  font-size: 20px;
`;
const TagContainer = styled.ul`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0;
  padding: 0;
  user-select: none;
  gap: 10px;
`;
const TagItem = styled.div`
  display: flex;
  box-sizing: border-box;
  justify-content: center;
  align-items: center;
  border: 2px solid #f4d160;
  font-size: 15px;
  padding: 4px 14px;
  background-color: #fbeeac;
  border-radius: 20px;
  white-space: nowrap;
`;
const TitleZone = styled.p`
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  width: 100px;
  overflow: hidden;
  margin: 0;
  font-weight: 400;
  width: 220px;
  text-overflow: ellipsis;
  word-break: break-word;
  height: 54px;
`;
const DateZone = styled.p`
  margin: 10px 0;
  color: rgba(170, 170, 170, 0.67);
  font-weight: 400;
  user-select: none;
`;
const FilterIconContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 15px;
  user-select: none;
  height: 45px;
`;
const FilterIcon = styled.img`
  width: 35px;
`;

function BoardItem({ title, createDate, DeadLine, status, filter, academy }) {
  const FilterIcons = useCallback(() => {
    let contents = [];
    for (let i = 0; i < filter.length; i++) {
      switch (filter[i]) {
        case "Back":
          contents.push(
            <FilterIcon src="./BackEnd.png" key={`Filter Icon ${i}`} />
          );
          break;
        case "Front":
          contents.push(
            <FilterIcon src="./FrontEnd.png" key={`Filter Icon ${i}`} />
          );
          break;
        case "Bigdata":
          contents.push(
            <FilterIcon src="./BigData.png" key={`Filter Icon ${i}`} />
          );
          break;
        case "AI":
          contents.push(<FilterIcon src="./AI.png" key={`Filter Icon ${i}`} />);
          break;
        case "Server":
          contents.push(
            <FilterIcon src="./ServerAdmin.png" key={`Filter Icon ${i}`} />
          );
          break;
        case "Security":
          contents.push(
            <FilterIcon src="./Security.png" key={`Filter Icon ${i}`} />
          );
          break;
        case "Network":
          contents.push(
            <FilterIcon src="./Network.png" key={`Filter Icon ${i}`} />
          );
          break;
      }
    }
    return contents;
  }, [filter]);
  return (
    <BoardItemBase>
      <MainContents>
        <TagContainer>
          {status ? (
            <TagItem>
              <BsClipboard2Check color={"#35A29F"} /> 모집중
            </TagItem>
          ) : (
            <TagItem>
              <BiStopwatch color={"#FF5151"} /> 모집완료
            </TagItem>
          )}
          <TagItem>
            <TbSchool color={"#75C2F6"} />
            {academy}
          </TagItem>
        </TagContainer>
        <TitleZone>{title}</TitleZone>
        <DateZone>{`${createDate}~${DeadLine}`}</DateZone>
      </MainContents>
      <FilterIconContainer>{FilterIcons()}</FilterIconContainer>
    </BoardItemBase>
  );
}

export default BoardItem;
