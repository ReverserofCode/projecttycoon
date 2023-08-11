import styled from "@emotion/styled";
import React, { useCallback, useState } from "react";
import TextEditorPage from "./page/TextEditorPage";
import QuillTestPage from "./page/QuillTestPage";
const Container = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
  width: 100%;
  min-height: 100vh;
  gap: 20px;
`;
const ModeButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 5px 10px;
  user-select: none;
  cursor: pointer;
  background-color: #ffffce;
  border: 3px solid #cacaa3;
  font-size: 20px;
  font-weight: 600px;
  border-radius: 5px;
  margin-top: 10px;
  :hover {
    scale: 1.02;
  }
  :active {
    scale: 1;
  }
`;

function App() {
  const [editorSet, setEditorSet] = useState("editorjs");
  const [editorjsData, setEditorjsData] = useState();
  const handleSetEditorjsData = useCallback((e) => {
    setEditorjsData(e);
  });
  return (
    <Container>
      <ModeButton
        onClick={() => {
          editorSet === "editorjs"
            ? setEditorSet("quill")
            : setEditorSet("editorjs");
        }}
      >
        {editorSet === "editorjs" ? "EditorJS" : "Quill"}
      </ModeButton>
      {editorSet === "editorjs" ? (
        <TextEditorPage
          handleSetEditorjsData={handleSetEditorjsData}
          editorjsData={editorjsData}
        />
      ) : (
        <QuillTestPage />
      )}
    </Container>
  );
}

export default App;
