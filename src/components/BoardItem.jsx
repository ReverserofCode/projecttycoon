import styled from "@emotion/styled";
import React, { useCallback } from "react";
import { BsClipboard2Check } from "react-icons/bs";
import { BiStopwatch } from "react-icons/bi";
import { TbSchool } from "react-icons/tb";
const BoardBase = styled.div`
  transition: 300ms ease-in-out;
  display: flex;
  box-sizing: border-box;
  justify-content: center;
  align-items: flex-start;
  flex-direction: column;
  padding: 0 20px;
  width: 270px;
  height: 335px;
  border-radius: 15px;
  border: 1px solid rgba(0, 0, 0, 0.25);
  box-shadow: 0px 6px 6px 0px rgba(0, 0, 0, 0.25);
  :hover {
    scale: 1.03;
  }
`;
const TagContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 10px;
  width: 100%;
  height: 27px;
`;
const TagItem = styled.div`
  display: flex;
  box-sizing: border-box;
  justify-content: center;
  align-items: center;
  padding: 4px 14px;
  font-size: 12px;
  white-space: nowrap;
  background-color: #fbeeac;
  border: 2px solid #f4d160;
  border-radius: 15px;
`;
const PosterContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin: 20px 0;
  overflow: hidden;
  box-shadow: 2px 4px 4px 0px rgba(0, 0, 0, 0.25);
`;
const Poster = styled.img`
  height: 100px;
`;
const ProjectInfo = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-direction: column;
  width: 100%;
  gap: 10px;
`;
const Date = styled.span`
  font-size: 16px;
  color: rgba(148, 148, 148, 0.67);
`;
const Title = styled.span`
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  font-size: 20px;
  text-overflow: ellipsis;
  overflow: hidden;
  word-break: break-word;
  font-weight: bold;
`;
const Recruits = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  border-top: 1px solid rgba(148, 148, 148, 0.67);
  width: 100%;
  gap: 10px;
  padding: 10px 5px 0;
  box-sizing: border-box;
`;
const FilterIcon = styled.img`
  width: 35px;
`;

function BoardItem({
  title,
  createDate,
  DeadLine,
  status,
  filter,
  academy,
  image,
}) {
  const FilterIcons = useCallback(() => {
    let contents = [];
    for (let i = 0; i < filter.length; i++) {
      switch (filter[i]) {
        case "back":
          contents.push(
            <FilterIcon
              src="http://projecttycoon.com/static/images/BackEnd.png"
              key={`Filter Icon ${i}`}
            />
          );
          break;
        case "front":
          contents.push(
            <FilterIcon
              src="http://projecttycoon.com/static/images/FrontEnd.png"
              key={`Filter Icon ${i}`}
            />
          );
          break;
        case "bigData":
          contents.push(
            <FilterIcon
              src="http://projecttycoon.com/static/images/BigData.png"
              key={`Filter Icon ${i}`}
            />
          );
          break;
        case "AI":
          contents.push(
            <FilterIcon
              src="http://projecttycoon.com/static/images/AI.png"
              key={`Filter Icon ${i}`}
            />
          );
          break;
        case "server":
          contents.push(
            <FilterIcon
              src="http://projecttycoon.com/static/images/ServerAdmin.png"
              key={`Filter Icon ${i}`}
            />
          );
          break;
        case "security":
          contents.push(
            <FilterIcon
              src="http://projecttycoon.com/static/images/Security.png"
              key={`Filter Icon ${i}`}
            />
          );
          break;
        case "network":
          contents.push(
            <FilterIcon
              src="http://projecttycoon.com/static/images/Network.png"
              key={`Filter Icon ${i}`}
            />
          );
          break;
      }
    }
    return contents;
  }, [filter]);
  return (
    <BoardBase>
      <TagContainer>
        {status ? (
          <TagItem>
            <BsClipboard2Check
              color={"#35A29F"}
              fontSize={"13px"}
              style={{ marginRight: "5px" }}
            />{" "}
            모집중
          </TagItem>
        ) : (
          <TagItem>
            <BiStopwatch
              color={"#FF5151"}
              fontSize={"13px"}
              style={{ marginRight: "5px" }}
            />{" "}
            모집완료
          </TagItem>
        )}
        <TagItem>
          <TbSchool
            color={"#75C2F6"}
            fontSize={"15px"}
            style={{ marginRight: "5px" }}
          />
          {academy}
        </TagItem>
      </TagContainer>
      <PosterContainer>
        <Poster src={"http://projecttycoon.com" + image} />
      </PosterContainer>
      <ProjectInfo>
        <Date>
          {createDate} ~ {DeadLine}
        </Date>
        <Title>{title}</Title>
        <Recruits>{FilterIcons()}</Recruits>
      </ProjectInfo>
    </BoardBase>
  );
}

export default BoardItem;
