import styled from "@emotion/styled";
import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Formats, QuillTool } from "./QuillOption";
const Container = styled.div`
  display: flex;
  box-sizing: border-box;
  flex-direction: column;
  max-width: 900px;
  max-height: 400px;
  border: 2px solid #c4c4c4;
  box-shadow: rgb(0 0 0 / 20%) 0px 1rem 2rem;
  border-radius: 5px;
  .ql-container.ql-snow {
    border: none;
  }
`;

function QuillTestPage({ handleSetContents, originContents }) {
  const [value, setValue] = useState(originContents);
  useEffect(() => {
    handleSetContents(value);
  }, [handleSetContents, value]);
  return (
    <Container>
      <ReactQuill
        style={{ width: "850px", height: "500px", padding: 0 }}
        theme="snow"
        value={value}
        onChange={setValue}
        modules={QuillTool}
        formats={Formats}
      />
    </Container>
  );
}

export default QuillTestPage;
