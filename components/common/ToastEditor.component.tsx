import "@toast-ui/editor/dist/i18n/ko-kr";
import "@toast-ui/editor/dist/toastui-editor.css";
import "tui-color-picker/dist/tui-color-picker.css";
import "@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css";
import { Editor } from "@toast-ui/react-editor";
import { useState } from "react";
import colorSyntax from "@toast-ui/editor-plugin-color-syntax";

const ToastEditor = (props: { editorRef: any }) => {
  const [youtubeUrl, setYoutubeUrl] = useState("");
  const [youtubeUrls, setYoutubeUrls] = useState<typeof youtubeUrl[]>([]);

  const customPlugin = () => {
    const container = document.createElement("div");
    container.className = "youtube-div";
    container.id = "youtube-div";

    const youtubeInput = document.createElement("input");
    youtubeInput.className = "youtube-input";
    youtubeInput.id = "youtube-input";
    youtubeInput.placeholder = "유튜브 링크";

    const youtubeButton = document.createElement("button");
    youtubeButton.className = "youtube-button";
    youtubeButton.id = "youtube-button";

    let btnText = document.createTextNode("확인");

    container.appendChild(youtubeInput);
    container.appendChild(youtubeButton);

    youtubeButton.appendChild(btnText);
    youtubeButton.onclick = () => {
      const value = (document.getElementById("youtube-input") as HTMLInputElement).value;

      if (!value) {
        youtubeInput.value = "";
        return;
      }
      if (!value.includes("https://youtu.be/")) {
        alert("'https://youtu.be/' 를 포함한 링크만 가능합니다.");
        youtubeInput.value = "";
        return;
      }

      const youtubeUrl = value.split("/")[3];
      setYoutubeUrl(youtubeUrl);
      setYoutubeUrls([...youtubeUrls, youtubeUrl]);

      const getHTML = props.editorRef.current?.getInstance().getHTML();

      props.editorRef.current
        ?.getInstance()
        .setHTML(
          getHTML + `<img src="https://img.youtube.com/vi/${youtubeUrl}/hqdefault.jpg" contenteditable="false" />`
        );
      youtubeInput.value = "";
    };

    return {
      toolbarItems: [
        {
          groupIndex: 3,
          itemIndex: 2,
          item: {
            name: "youtube",
            tooltip: "유튜브 링크",
            className: "youtube",

            popup: {
              className: "toastui-editor-popup-add-link-youtube",
              body: container,
              style: { width: "400" },
            },
          },
        },
      ],
    };
  };

  return (
    <Editor
      initialValue=" "
      language="ko-KR"
      placeholder="게시글 내용을 작성해주세요"
      previewStyle="vertical"
      height="500px"
      initialEditType="wysiwyg"
      plugins={[colorSyntax, customPlugin]}
      useCommandShortcut={true}
      ref={props.editorRef}
      toolbarItems={[
        ["heading", "bold", "italic", "strike"],
        ["hr", "quote"],
        ["ul", "ol", "task", "indent", "outdent"],
        ["table", "link"],
        ["code", "codeblock"],
      ]}
    />
  );
};

export default ToastEditor;
