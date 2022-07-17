import { useQuery } from "@apollo/client";
import moment from "moment";
import "moment/locale/ko";
import { useRouter } from "next/router";
import InfiniteScroll from "react-infinite-scroller";
import { FETCH_USED_ITEM_QUESTIONS_ANSWERS } from "../../src/api/market/detail/MarketAnswer.quries";
import * as QuestionItem from "../../src/styles/common/QuestionItem.styles";
import {
  IQuery,
  IQueryFetchUseditemQuestionAnswersArgs,
  IUseditemQuestion,
  IUseditemQuestionAnswer,
} from "../../src/types/generated/types";
import AnswerWriteComponent from "../market/detail/AnswerWrite.component";
import AnswerItemComponent from "./AnswerItem.component";

interface IPropsQuestionItem {
  el: IUseditemQuestion;
}

const QuestionItemComponent = (props: IPropsQuestionItem) => {
  const router = useRouter();
  const { data, fetchMore } = useQuery<
    Pick<IQuery, "fetchUseditemQuestionAnswers">,
    IQueryFetchUseditemQuestionAnswersArgs
  >(FETCH_USED_ITEM_QUESTIONS_ANSWERS, {
    variables: { useditemQuestionId: String(props.el?._id) },
  });

  const onLoadMore = () => {
    if (!data) return;

    fetchMore({
      variables: {
        page: Math.ceil(data?.fetchUseditemQuestionAnswers.length / 10) + 1,
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult?.fetchUseditemQuestionAnswers)
          return {
            fetchUseditemQuestionAnswers: [
              ...prev.fetchUseditemQuestionAnswers,
            ],
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
          <QuestionItem.CreatedAtP>
            {moment(props.el?.createdAt).format("LLL")}
          </QuestionItem.CreatedAtP>
        </QuestionItem.UserNameCreatedAtDiv>
      </QuestionItem.WrapperHeadDiv>
      <QuestionItem.ContentsBoxDiv>
        <QuestionItem.ContentsP>{props.el?.contents}</QuestionItem.ContentsP>
      </QuestionItem.ContentsBoxDiv>
      <QuestionItem.AnswerItemBoxDiv>
        <InfiniteScroll pageStart={0} loadMore={onLoadMore} hasMore={true}>
          {data?.fetchUseditemQuestionAnswers.map(
            (el: IUseditemQuestionAnswer) => (
              <AnswerItemComponent key={el._id} el={el} />
            )
          )}
        </InfiniteScroll>
      </QuestionItem.AnswerItemBoxDiv>
      <QuestionItem.AnswerWriteBoxDiv>
        <AnswerWriteComponent id={props.el._id} />
      </QuestionItem.AnswerWriteBoxDiv>
    </QuestionItem.WrapperDiv>
  );
};

export default QuestionItemComponent;
