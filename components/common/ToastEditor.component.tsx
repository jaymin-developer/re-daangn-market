import "@toast-ui/editor/dist/toastui-editor.css";
import { Editor } from "@toast-ui/react-editor";

const ToastEditor = () => {
  return (
    <Editor
      language="ko"
      initialValue=" "
      placeholder="게시글 내용을 작성해주세요"
      previewStyle="vertical"
      height="500px"
      initialEditType="wysiwyg"
      useCommandShortcut={true}
    />
  );
};

export default ToastEditor;
