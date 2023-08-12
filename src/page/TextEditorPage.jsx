import styled from "@emotion/styled";
import React from "react";
import { createReactEditorJS } from "react-editor-js";
import { EditorFormat } from "../options/Editor";
import DragDrop from "editorjs-drag-drop";
import Undo from "editorjs-undo";

const EditorPage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  gap: 10px;
`;
const Container = styled.div`
  display: flex;
  box-sizing: border-box;
  flex-direction: column;
  width: 80%;
  border: 2px solid #c4c4c4;
  box-shadow: rgb(0 0 0 / 20%) 0px 1rem 2rem;
  border-radius: 5px;
  min-height: 90vh;
`;
const ReadOnlyContainer = styled.div`
  display: flex;
  box-sizing: border-box;
  flex-direction: column;
  width: 80%;
  border: 2px solid #c4c4c4;
  box-shadow: rgb(0 0 0 / 20%) 0px 1rem 2rem;
  border-radius: 5px;
  pointer-events: none;
  min-height: 90vh;
`;
const SaveButton = styled.div`
  display: flex;
  box-sizing: border-box;
  justify-content: center;
  align-items: center;
  height: 90vh;
  padding: 10px;
  user-select: none;
  cursor: pointer;
  background-color: #ffffce;
  border: 3px solid #cacaa3;
  font-size: 20px;
  font-weight: 600px;
  border-radius: 5px;
  margin-top: 10px;
  :hover {
    scale: 1.01;
  }
  :active {
    scale: 1;
  }
`;

const Editor = createReactEditorJS();
function TextEditorPage({ handleSetEditorjsData, editorjsData }) {
  const editorCore = React.useRef(null);
  const handleInitialize = React.useCallback((instance) => {
    editorCore.current = instance;
  }, []);
  const handleSave = React.useCallback(async () => {
    const savedData = await editorCore.current.save();
    handleSetEditorjsData(savedData);
  }, [handleSetEditorjsData]);
  const handleReady = () => {
    const editor = editorCore.current._editorJS;
    new Undo({ editor });
    new DragDrop(editor);
  };
  return (
    <EditorPage>
      <Container>
        <Editor
          tools={EditorFormat}
          onInitialize={handleInitialize}
          onReady={handleReady}
          defaultValue={editorjsData}
        />
      </Container>
      <SaveButton onClick={handleSave}>{">>"}</SaveButton>
      <ReadOnlyContainer>
        <Editor tools={EditorFormat} value={editorjsData} />
      </ReadOnlyContainer>
    </EditorPage>
  );
}

export default TextEditorPage;
