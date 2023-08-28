import React, { useEffect } from "react";
import styled from "@emotion/styled";
import { AiOutlineArrowLeft } from "react-icons/ai";
import Sidebar from "../components/Sidebar";
import { GetProjectFromID } from "../functional/GetProject";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  width: 100%;
  height: fit-content;
  margin-top: 20px;
`;
const SideContents = styled.div`
  display: flex;
  width: 260px;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  position: sticky;
  top: 80px;
  left: 10px;
  gap: 15px;
`;
const MainContents = styled.div`
  display: flex;
  box-sizing: border-box;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  margin-left: 50px;
  width: 100%;
`;

function DetailPage() {
  const value = {
    createdAt: "2023-08-19T06:54:37.741+00:00",
    modifiedAt: "2023-08-19T06:54:37.741+00:00",
    projectId: 26,
    projectTitle: "Test title item length test. how long text viewing",
    projectContent: "testContents",
    projectWantedRole: [
      { Role: "back", complete: 1, personnel: 3 },
      { Role: "front", complete: 0, personnel: 2 },
    ],
    projectDue: "2023-08-16T00:00:00.000+00:00",
    projectAcademy: "강남",
    projectStatus: true,
    projectWriterId: "testWriterId",
    projectWriterNick: "testNickname",
    projectFilePath:
      "/webapp/c40ba566-0f72-4bf1-90ef-904e6d9f3a92_Project image.png",
    projectFileName: "projectImage",
    projectScrapNum: 10,
  };
  useEffect(() => {
    const path = window.location.href.split("/");
    // console.log(path[5]);
    // GetProjectFromID(path[5]);
  }, []);
  return (
    <Container>
      <SideContents>
        <AiOutlineArrowLeft fontSize={"30px"} />
        <Sidebar value={value} />
      </SideContents>
      <MainContents></MainContents>
    </Container>
  );
}

export default DetailPage;
