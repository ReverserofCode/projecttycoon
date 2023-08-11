import Paragraph from "editorjs-paragraph-with-alignment";
import Header from "editorjs-header-with-alignment";
import Code from "@bomdi/codebox";
import List from "@editorjs/nested-list";
import Quoto from "@editorjs/quote";
import Embed from "@editorjs/embed";
import Image from "@editorjs/simple-image";
import UnderLine from "@editorjs/underline";
import ColorPlugin from "editorjs-text-color-plugin";
import Table from "editorjs-table";

export const EditorFormat = {
  header: {
    class: Header,
    inlineToolbar: true,
    shortcut: "Ctrl+h",
  },
  code: {
    class: Code,
    config: {
      themeURL:
        "https://cdn.jsdelivr.net/gh/highlightjs/cdn-release@11.8.0/build/styles/github-dark-dimmed.min.css",
      themeName: "github-dark-dimmed",
      useDefaultTheme: "dark",
    },
    shortcut: "Alt+c",
    inlineToolbar: true,
  },
  paragraph: {
    class: Paragraph,
    inlineToolbar: true,
  },
  list: {
    class: List,
    shortcut: "Alt+l",
    inlineToolbar: true,
    config: {
      defaultStyle: "ordered",
    },
  },
  quoto: {
    class: Quoto,
    inlineToolbar: true,
  },
  image: {
    class: Image,
  },
  underline: UnderLine,
  Color: {
    class: ColorPlugin,
    config: {
      colorCollections: [
        "#EC7878",
        "#9C27B0",
        "#673AB7",
        "#3F51B5",
        "#0070FF",
        "#03A9F4",
        "#00BCD4",
        "#4CAF50",
        "#8BC34A",
        "#CDDC39",
        "#FFF",
      ],
      defaultColor: "#FF1300",
      type: "text",
      customPicker: true,
    },
  },
  table: {
    class: Table,
    shortcut: "Alt+t",
  },
  embed: Embed,
};
