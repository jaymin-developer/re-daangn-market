import * as AnswerWrite from "../../../src/styles/market/detail/AnswerWrite.styles";
import { FuncButtonSub } from "../../common/Button.component";

const AnswerWriteComponent = () => {
  return (
    <AnswerWrite.WrapperDiv>
      <AnswerWrite.ContentsBoxDiv>
        <AnswerWrite.ContentsTextArea
          maxLength={100}
          placeholder="답글은 100자로 제한됩니다."
          // onChange={onChangeContents}
        />
        <FuncButtonSub name="등록" />
      </AnswerWrite.ContentsBoxDiv>
    </AnswerWrite.WrapperDiv>
  );
};

export default AnswerWriteComponent;
