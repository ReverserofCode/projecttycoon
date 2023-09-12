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
/** 미리보기를 위한 태그로 굳이 넣어줄 필요 없다. */
const Preview = styled.div`
  display: flex;
  width: 500px;
  box-sizing: border-box;
  flex-direction: column;
  width: 80%;
  border: 2px solid #c4c4c4;
  box-shadow: rgb(0 0 0 / 20%) 0px 1rem 2rem;
  border-radius: 5px;
  padding: 10px;
  min-height: 600px;
  /* .ql-syntax {
    // 미리보기 페이지에서 codeblock의 색상을 기입해주기 위한 태그
    border: 2px solid #c4c4c4;
    padding: 10px;
    background-color: #ffffebd1;
  }
  .ql-align-center {
    // 미리보기 페이지에서 가운데 정렬을 사용할때 적용하기 위한 태그
    text-align: center;
  }
  .ql-align-right {
    // 미리보기 페이지에서 오른쪽 정렬을 사용할때 적용하기 위한 태그
    text-align: right;
  }
  .ql-align-justify {
    // 미리보기 페이지에서 오른쪽 정렬을 사용할때 적용하기 위한 태그
    text-align: justify;
  } */
`;

function QuillTestPage({ handleSetContents }) {
  const [value, setValue] = useState("");
  useEffect(() => {
    handleSetContents(value);
  }, [handleSetContents, value]);
  return (
    <>
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
    </>
  );
}

export default QuillTestPage;
