import "@toast-ui/editor/dist/toastui-editor.css";
import { Editor, EditorProps } from "@toast-ui/react-editor";
import { RefObject } from "react";

const ToastEditor = (props: { editorRef: RefObject<Editor> }) => {
  return (
    <Editor
      language="ko"
      initialValue=" "
      placeholder="게시글 내용을 작성해주세요"
      previewStyle="vertical"
      height="500px"
      initialEditType="wysiwyg"
      useCommandShortcut={true}
      ref={props.editorRef}
    />
  );
};

export default ToastEditor;
