import { MenuOutlined } from "@ant-design/icons";
import { useMutation, useQuery } from "@apollo/client";
import { Dropdown, Menu, Modal } from "antd";
import moment from "moment";
import { useRouter } from "next/router";
import { useState } from "react";
import InfiniteScroll from "react-infinite-scroller";
import { DELETE_USED_ITEM_QUESTION } from "../../src/api/common/QuestionItem.queries";
import { FETCH_USED_ITEM_QUESTIONS_ANSWERS } from "../../src/api/market/detail/MarketAnswer.quries";
import { FETCH_USED_ITEM_QUESTIONS } from "../../src/api/market/detail/MarketQuestion.quries";
import * as QuestionItem from "../../src/styles/common/QuestionItem.styles";
import {
  IMutation,
  IMutationDeleteUseditemQuestionArgs,
  IQuery,
  IQueryFetchUseditemQuestionAnswersArgs,
  IUseditemQuestion,
  IUseditemQuestionAnswer,
} from "../../src/types/generated/types";
import AnswerWriteComponent from "../market/detail/AnswerWrite.component";
import QuestionWriteComponent from "../market/detail/QuestionWrite.component";
import AnswerItemComponent from "./AnswerItem.component";

interface IPropsQuestionItem {
  el: IUseditemQuestion;
}

const QuestionItemComponent = (props: IPropsQuestionItem) => {
  const router = useRouter();
  const [edit, setEdit] = useState(false);
  const { data, fetchMore } = useQuery<
    Pick<IQuery, "fetchUseditemQuestionAnswers">,
    IQueryFetchUseditemQuestionAnswersArgs
  >(FETCH_USED_ITEM_QUESTIONS_ANSWERS, {
    variables: { useditemQuestionId: String(props.el?._id) },
  });

  const [deleteUseditemQuestion] = useMutation<
    Pick<IMutation, "deleteUseditemQuestion">,
    IMutationDeleteUseditemQuestionArgs
  >(DELETE_USED_ITEM_QUESTION);

  const onClickDelete = async () => {
    try {
      await deleteUseditemQuestion({
        variables: {
          useditemQuestionId: props.el?._id,
        },
        refetchQueries: [
          {
            query: FETCH_USED_ITEM_QUESTIONS,
            variables: { useditemId: router.query.detail },
          },
        ],
      });
      Modal.success({ content: "삭제가 완료되었습니다." });
    } catch (error) {
      error instanceof Error && Modal.error({ content: error.message });
    }
  };

  const onClickEditForm = () => {
    setEdit(true);
  };

  const menu = (
    <Menu
      items={[
        {
          label: <div onClick={onClickEditForm}>수정하기</div>,
          key: "0",
        },
        {
          label: <div onClick={onClickDelete}>삭제하기</div>,
          key: "1",
        },
      ]}
    />
  );

  const onLoadMore = () => {
    if (!data) return;

    fetchMore({
      variables: {
        page: Math.ceil(data?.fetchUseditemQuestionAnswers.length / 10) + 1,
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult?.fetchUseditemQuestionAnswers)
          return {
            fetchUseditemQuestionAnswers: [...prev.fetchUseditemQuestionAnswers],
          };
        return {
          fetchUseditemQuestionAnswers: [
            ...prev.fetchUseditemQuestionAnswers,
            ...fetchMoreResult.fetchUseditemQuestionAnswers,
          ],
        };
      },
    });
  };

  return (
    <QuestionItem.WrapperDiv>
      <QuestionItem.WrapperHeadDiv>
        <QuestionItem.UserProfileImg
          src={String(props.el?.user.picture)}
          onError={(e) => {
            e.currentTarget.src = "/logo_daangn.png";
          }}
        />
        <QuestionItem.UserNameCreatedAtDiv>
          <QuestionItem.UserNameP>{props.el?.user.name}</QuestionItem.UserNameP>
          <QuestionItem.CreatedAtP>{moment(props.el?.createdAt).format("LLL")}</QuestionItem.CreatedAtP>
        </QuestionItem.UserNameCreatedAtDiv>
        <Dropdown overlay={menu} trigger={["click"]}>
          <MenuOutlined onClick={(e) => e.preventDefault()} />
        </Dropdown>
      </QuestionItem.WrapperHeadDiv>

      <QuestionItem.ContentsBoxDiv>
        <QuestionItem.ContentsP>{props.el?.contents}</QuestionItem.ContentsP>
      </QuestionItem.ContentsBoxDiv>

      {edit && <QuestionWriteComponent el={props.el} edit={edit} setEdit={setEdit} />}

      <QuestionItem.AnswerItemBoxDiv>
        <InfiniteScroll pageStart={0} loadMore={onLoadMore} hasMore={true}>
          {data?.fetchUseditemQuestionAnswers.map((el: IUseditemQuestionAnswer) => (
            <AnswerItemComponent key={el._id} el={el} />
          ))}
        </InfiniteScroll>
      </QuestionItem.AnswerItemBoxDiv>

      <QuestionItem.AnswerWriteBoxDiv>
        <AnswerWriteComponent id={props.el._id} />
      </QuestionItem.AnswerWriteBoxDiv>
    </QuestionItem.WrapperDiv>
  );
};

export default QuestionItemComponent;
