import hljs from "highlight.js";
import "highlight.js/styles/obsidian.css";
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
export const QuillTool = {
  syntax: {
    highlight: (text) => hljs.highlightAuto(text).value,
  },
  toolbar: {
    container: [
      [{ header: [1, 2, 3, 4, 5, false] }],
      [{ align: [] }],
      ["bold", "italic", "underline", "blockquote"],
      [{ list: "ordered" }, { list: "bullet" }, "link"],
      ["code-block"],
      [
        {
          color: [],
        },
        { background: [] },
      ],
      ["image", "video"],
    ],
  },
};
