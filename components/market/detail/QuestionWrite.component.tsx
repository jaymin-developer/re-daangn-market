import * as QuestionWrite from "../../../src/styles/market/detail/QuestionWrite.styles";
import { FuncButtonMain } from "../../common/Button.component";

const QuestionWriteComponent = () => {
  return (
    <QuestionWrite.WrapperDiv>
      <QuestionWrite.NameP>댓글</QuestionWrite.NameP>
      <QuestionWrite.ContentsBoxDiv>
        <QuestionWrite.ContentsTextArea />
        <FuncButtonMain name="등록" />
      </QuestionWrite.ContentsBoxDiv>
    </QuestionWrite.WrapperDiv>
  );
};

export default QuestionWriteComponent;
