import hljs from "highlight.js";
import "highlight.js/styles/obsidian.css";

// highlight js를 이용해 code에 색상을 입히기 위한 option
hljs.configure({
  languages: [
    "javascript",
    "html",
    "typescript",
    "css",
    "java",
    "python",
    "sql",
  ],
});
// react-quill에 사용되는 tools option
export const QuillTool = {
  syntax: {
    highlight: (text) => hljs.highlightAuto(text).value,
  },
  toolbar: {
    container: [
      [{ header: [1, 2, 3, false] }],
      // [
      //   { align: "" },
      //   { align: "center" },
      //   { align: "right" },
      //   { align: "justify" },
      // ],
      ["bold", "italic", "underline", "blockquote"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["code-block"],
      [
        {
          color: [],
        },
        { background: [] },
      ],
      // ["image", "video"],
    ],
  },
};
export const Formats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "align",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "background",
  "color",
  "link",
  "image",
  "video",
  "width",
  "code-block",
];
