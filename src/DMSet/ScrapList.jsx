import React, { useCallback, useEffect, useState } from "react";
import { ScrapDataGet } from "./ScrapGet";
import styled from "@emotion/styled";

/** 스크랩 콘테이너 태그 */
const Container = styled.div`
  display: flex;
  box-sizing: border-box;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding-top: 10px;
  gap: 10px;
`;
/** 스크랩 아이템 콘테이너 태그 */
const ScrapItemBase = styled.div`
  transition: 200ms;
  display: flex;
  box-sizing: border-box;
  justify-content: center;
  align-items: center;
  height: 140px;
  width: 100%;
  padding: 10px;
  border: 1px solid #0b666a;
  border-radius: 10px;
  :hover {
    scale: 1.02;
  }
  :active {
    scale: 1;
  }
`;
/** 메인 이미지 콘테이너 태그 */
const PosterContain = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 50%;
  border-top: 5px solid #35a29f;
  border-bottom: 5px solid #35a29f;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
`;
/** 메인 이미지 태그 */
const Poster = styled.img`
  width: 80%;
  max-height: 500px;
  object-fit: cover;
`;
/** 스크랩 아이템 콘테이너 태그 */
const ScrapItemTextZone = styled.div`
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  justify-content: space-between;
  align-items: flex-start;
  height: 100%;
  width: 50%;
  padding: 0 10px;
  overflow: hidden;
`;
const ScrapItemTextTitle = styled.span`
  font-size: 12px;
  font-weight: 600;
  max-lines: 2;
`;
const ScrapItemTextName = styled.span`
  font-size: 11px;
`;
const ScrapItemContents = styled.div`
  display: flex;
  box-sizing: border-box;
  font-size: 12px;
  padding: 5px;
  background-color: rgba(217, 217, 217, 0.21);
  border-radius: 10px;
  width: 100%;
  height: 55px;
  overflow: hidden;
`;
const ScrapItemDate = styled.span`
  font-size: 10px;
  color: #898989;
  word-break: keep-all;
  white-space: nowrap;
`;

function ScrapList() {
  const [scrapData, setScrapData] = useState([]);
  useEffect(() => {
    ScrapDataGet().then((res) => {
      setScrapData(res?.myScraplist);
    });
  }, []);
  const handleScrapGen = useCallback(() => {
    let contents = [];
    if (scrapData?.length === 0) contents = "스크랩한 프로젝트가 없습니다.";
    else {
      for (let i = 0; i < scrapData?.length; i++) {
        contents.push(
          <ScrapItemBase
            key={`scrap item ${i}`}
            onClick={() => {
              window.location.href = `http://projecttycoon.com/callPageProjectBoardDetail/${scrapData[i]?.projectId}`;
            }}
          >
            <PosterContain>
              <Poster
                src={`http://projecttycoon.com${scrapData[i]?.projectFilePath}`}
              />
            </PosterContain>
            <ScrapItemTextZone>
              <ScrapItemTextTitle>
                {scrapData[i]?.projectTitle}
              </ScrapItemTextTitle>
              <ScrapItemTextName>
                {scrapData[i]?.projectWriterNick}
              </ScrapItemTextName>
              <ScrapItemContents>
                {scrapData[i]?.projectContent.replace(/<[^>]*>?/g, "")}
              </ScrapItemContents>
              <ScrapItemDate>
                {scrapData[i]?.createdAt.slice(0, 10)}~
                {scrapData[i]?.projectDue.slice(0, 10)}
              </ScrapItemDate>
            </ScrapItemTextZone>
          </ScrapItemBase>
        );
      }
    }
    return contents;
  }, [scrapData]);
  return <Container>{handleScrapGen()}</Container>;
}

export default ScrapList;
