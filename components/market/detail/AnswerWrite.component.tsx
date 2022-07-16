import { useMutation } from "@apollo/client";
import { ChangeEvent, useState } from "react";
import {
  CREATE_USED_ITEM_QUESTION_ANSWER,
  FETCH_USED_ITEM_QUESTIONS_ANSWERS,
} from "../../../src/api/market/detail/MarketAnswer.quries";
import * as AnswerWrite from "../../../src/styles/market/detail/AnswerWrite.styles";
import { FuncButtonSub } from "../../common/Button.component";

interface IPropsAnswerWrite {
  id?: string;
}

const AnswerWriteComponent = (props: IPropsAnswerWrite) => {
  const [contents, setContents] = useState("");
  const [createUsedItemQuestionAnswer] = useMutation(
    CREATE_USED_ITEM_QUESTION_ANSWER
  );

  const onChangeContents = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setContents(e.target.value);
  };

  async function onClickWrite() {
    if (contents.length === 0) {
      alert("누락된 내용이 있는지 확인해주세요.");
      return;
    }

    if (contents) {
      try {
        await createUsedItemQuestionAnswer({
          variables: {
            createUseditemQuestionAnswerInput: {
              contents,
            },
            useditemQuestionId: String(props.id),
          },
          refetchQueries: [
            {
              query: FETCH_USED_ITEM_QUESTIONS_ANSWERS,
              variables: {
                useditemQuestionId: String(props.id),
              },
            },
          ],
        });
        alert("답글 등록이 완료됐습니다.");
      } catch (error) {
        if (error instanceof Error) alert(error.message);
      }
    }
  }

  return (
    <AnswerWrite.WrapperDiv>
      <AnswerWrite.ContentsBoxDiv>
        <AnswerWrite.ContentsTextArea
          maxLength={100}
          placeholder="답글은 100자로 제한됩니다."
          onChange={onChangeContents}
        />
        <FuncButtonSub name="등록" func={onClickWrite} />
      </AnswerWrite.ContentsBoxDiv>
    </AnswerWrite.WrapperDiv>
  );
};

export default AnswerWriteComponent;
