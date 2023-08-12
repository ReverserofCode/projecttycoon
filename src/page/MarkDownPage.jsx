import React, { useState } from "react";
import styled from "@emotion/styled";
import MDEditor from "@uiw/react-md-editor";
const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  height: 90vh;
  user-select: none;
  svg {
    scale: 1.2;
  }
`;

function MarkDownPage() {
  const [value, setValue] = useState("**Hello world!!!**");
  return (
    <Container data-color-mode="dark">
      <MDEditor
        value={value}
        onChange={setValue}
        height={"100%"}
        style={{ width: "100%" }}
      />
      {/* <MDEditor.Markdown source={value} style={{ whiteSpace: "pre-wrap" }} /> Markdown 미리보기 사용법*/}
    </Container>
  );
}

export default MarkDownPage;
