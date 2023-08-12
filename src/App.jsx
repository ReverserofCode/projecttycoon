import styled from "@emotion/styled";
import React, { useCallback, useState } from "react";
import TextEditorPage from "./page/TextEditorPage";
import QuillTestPage from "./page/QuillTestPage";
import MarkDownPage from "./page/MarkDownPage";
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
const SelectMode = styled.select`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 300px;
  height: 30px;
`;

function App() {
  const [editorSet, setEditorSet] = useState("editorjs");
  const [editorjsData, setEditorjsData] = useState();
  const handleSetEditorjsData = useCallback((e) => {
    setEditorjsData(e);
  });
  return (
    <Container>
      <SelectMode
        onChange={(e) => {
          setEditorSet(e.target.value);
        }}
      >
        <option value={"editorjs"}>EditorJS</option>
        <option value={"quill"}>Quill</option>
        <option value={"markdown"}>MarkDown</option>
      </SelectMode>
      {editorSet === "editorjs" && (
        <TextEditorPage
          handleSetEditorjsData={handleSetEditorjsData}
          editorjsData={editorjsData}
        />
      )}
      {editorSet === "quill" && <QuillTestPage />}
      {editorSet === "markdown" && <MarkDownPage />}
    </Container>
  );
}

export default App;
