import { useMutation } from "@apollo/client";
import { useRouter } from "next/router";
import { ChangeEvent, useState } from "react";
import {
  CREATE_USED_ITEM_QUESTION,
  FETCH_USED_ITEM_QUESTIONS,
  UPDATE_USED_ITEM_QUESTION,
} from "../../../src/api/market/detail/MarketQuestion.quries";
import * as QuestionWrite from "../../../src/styles/market/detail/QuestionWrite.styles";
import { FuncButtonMain } from "../../common/Button.component";

const QuestionWriteComponent = () => {
  const router = useRouter();
  const [contents, setContents] = useState("");

  const [createUseditemQuestion] = useMutation(CREATE_USED_ITEM_QUESTION);
  const [updateUseditemQuestion] = useMutation(UPDATE_USED_ITEM_QUESTION);

  const onChangeContents = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setContents(e.target.value);
  };

  const onClickQuestionWrite = async () => {
    if (contents.length === 0) {
      alert("누락된 내용이 있는지 확인해주세요.");
      return;
    }

    try {
      await createUseditemQuestion({
        variables: {
          createUseditemQuestionInput: {
            contents,
          },
          useditemId: String(router.query.detail),
        },
        refetchQueries: [
          {
            query: FETCH_USED_ITEM_QUESTIONS,
            variables: { useditemId: String(router.query.detail) },
          },
        ],
      });
      alert("댓글 등록이 완료됐습니다.");
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      }
    }
  };

  return (
    <QuestionWrite.WrapperDiv>
      <QuestionWrite.NameP>댓글</QuestionWrite.NameP>
      <QuestionWrite.ContentsBoxDiv>
        <QuestionWrite.ContentsTextArea
          maxLength={100}
          placeholder="댓글은 100자로 제한됩니다."
          onChange={onChangeContents}
        />
        <FuncButtonMain name="등록" func={onClickQuestionWrite} />
      </QuestionWrite.ContentsBoxDiv>
    </QuestionWrite.WrapperDiv>
  );
};

export default QuestionWriteComponent;
