import styled from "@emotion/styled";
import React, { useCallback } from "react";
import { BsClipboard2Check } from "react-icons/bs";
import { BiStopwatch } from "react-icons/bi";
import { TbSchool } from "react-icons/tb";
/** 보드아이템을 담고있는 컨테이너 태그 */
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
/** 보드아이템의 태그들을 담고있는 콘테이너 태그 */
const TagContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 10px;
  width: 100%;
  height: 27px;
`;
/** 보드아이템의 태그 */
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
/** 보드아이템의 메인이미지를 담고있는 콘테이너 태그 */
const PosterContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin: 20px 0;
  overflow: hidden;
  box-shadow: 2px 4px 4px 0px rgba(0, 0, 0, 0.25);
`;
/** 보드아이템의 메인이미지 태그 */
const Poster = styled.img`
  height: 100px;
`;
/** 보드아이템의 프로젝트 제목 및 날짜를 담고있는 콘테이너 태그 */
const ProjectInfo = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-direction: column;
  width: 100%;
  gap: 10px;
`;
/** 보드아이템의 프로젝트 날짜 태그 */
const Date = styled.span`
  font-size: 16px;
  color: rgba(148, 148, 148, 0.67);
`;
/** 보드아이템의 프로젝트 제목 태그 */
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
/** 보드아이템의 모집분야를 담고있는 콘테이너 태그 */
const Recruits = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  border-top: 1px solid rgba(148, 148, 148, 0.67);
  width: 100%;
  gap: 10px;
  padding: 10px 5px 0;
  box-sizing: border-box;
  overflow: hidden;
`;
/** 보드아이템의 모집분야를 icon으로 표기하는 태그 */
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
  id,
}) {
  /** 보드아이템의 콘텐츠로부터 모집분야를 icon으로 표기해주는 function */
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
        case "bigdata":
          contents.push(
            <FilterIcon
              src="http://projecttycoon.com/static/images/BigData.png"
              key={`Filter Icon ${i}`}
            />
          );
          break;
        case "ai":
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
    <BoardBase
      onClick={() => {
        window.location.href = `http://projecttycoon.com/callPageProjectBoardDetail/${id}`;
      }}
    >
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
