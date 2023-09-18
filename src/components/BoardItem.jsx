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
    color: #000000;
    font-weight: bold;
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
  margin-bottom: 20px;
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
`;
/** 보드아이템의 모집분야를 icon으로 표기하는 태그 */
// const FilterIcon = styled.img`
//   width: 35px;
// `;
const FilterIcon = styled.p`
  font-size: 15px;
`;

function BoardItem({
  icon,
  nick,
  introduce,
  memberRole = [], // Rename the prop for clarity
  academy,
  handleBoardItemGen,
}) {
  const FilterIcons = useCallback(() => {
    let contents = [];
    for (let i = 0; i < memberRole.length; i++) {
      // 모집분야에 따라 아이콘과 텍스트를 생성
      switch (memberRole[i]) {
        case "BackEnd":
          contents.push(
            <FilterIcon key={`Filter Icon ${i}`}>{memberRole[i]}</FilterIcon>
          );
          break;
        case "FrontEnd":
          contents.push(
            <FilterIcon key={`Filter Icon ${i}`}>{memberRole[i]}</FilterIcon>
          );
          break;
        case "BigData":
          contents.push(
            <FilterIcon key={`Filter Icon ${i}`}>{memberRole[i]}</FilterIcon>
          );
          break;
        case "AI":
          contents.push(
            <FilterIcon key={`Filter Icon ${i}`}>{memberRole[i]}</FilterIcon>
          );
          break;
        case "Server":
          contents.push(
            <FilterIcon key={`Filter Icon ${i}`}>{memberRole[i]}</FilterIcon>
          );
          break;
        case "Security":
          contents.push(
            <FilterIcon key={`Filter Icon ${i}`}>{memberRole[i]}</FilterIcon>
          );
          break;
        case "Network":
          contents.push(
            <FilterIcon key={`Filter Icon ${i}`}>{memberRole[i]}</FilterIcon>
          );
          break;
        default:
          // 기타 모집분야 처리
          contents.push(
            <FilterIcon key={`Filter Icon ${i}`}>{memberRole[i]}</FilterIcon>
          );
          break;
      }
    }
    return contents;
  }, [memberRole]);

  return (
    <BoardBase>
      <TagContainer>
        <TagItem>
          <TbSchool
            color={"#75C2F6"}
            fontSize={"15px"}
            style={{ marginRight: "5px" }}
          />
          {academy}
        </TagItem>
      </TagContainer>
      <TagContainer>
        <TagItem>
          <Recruits>{FilterIcons()}</Recruits>
        </TagItem>
      </TagContainer>
    </BoardBase>
  );
}

export default BoardItem;
