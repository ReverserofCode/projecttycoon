import styled from "@emotion/styled";
import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { QuillTool } from "../options/QuillOption";
import purify from "dompurify";
const Container = styled.div`
  display: flex;
  box-sizing: border-box;
  flex-direction: column;
  width: 80%;
  border: 2px solid #c4c4c4;
  box-shadow: rgb(0 0 0 / 20%) 0px 1rem 2rem;
  border-radius: 5px;
`;
const Preview = styled.div`
  display: flex;
  width: 100%;
  box-sizing: border-box;
  flex-direction: column;
  width: 80%;
  border: 2px solid #c4c4c4;
  box-shadow: rgb(0 0 0 / 20%) 0px 1rem 2rem;
  border-radius: 5px;
  padding: 10px;
  .ql-syntax {
    border: 2px solid #c4c4c4;
    padding: 10px;
    background-color: #ffffebd1;
  }
`;

function QuillTestPage() {
  const [value, setValue] = useState("");
  return (
    <>
      <Container>
        <ReactQuill value={value} onChange={setValue} modules={QuillTool} />
      </Container>
      <Preview
        dangerouslySetInnerHTML={{ __html: purify.sanitize(value) }}
      ></Preview>
    </>
  );
}

export default QuillTestPage;
