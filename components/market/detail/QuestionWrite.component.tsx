import { useMutation } from "@apollo/client";
import { Modal } from "antd";
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
      Modal.error({ content: "누락된 내용이 있는지 확인해주세요." });
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
      Modal.success({ content: "댓글 등록이 완료됐습니다." });
    } catch (error) {
      error instanceof Error && Modal.error({ content: error.message });
    }
  };

  const onClickUpdate = async (data: FormValues) => {
    try {
      await updateUseditem({
        variables: {
          useditemId: router.query.id,
          updateUseditemInput: {
            name: data.name,
            remarks: data.remarks,
            contents: data.contents,
            price: Number(data.price),
            // images: images,
            // tags: tags,
          },
        },
      });
      Modal.success({ content: "수정이 완료되었습니다." });
      router.push(`/useditems/${router.query.id}`);
    } catch (error) {
      error instanceof Error && Modal.error({ content: error.message });
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
