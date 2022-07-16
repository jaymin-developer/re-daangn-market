import { useQuery } from "@apollo/client";
import moment from "moment";
import "moment/locale/ko";
import { useRouter } from "next/router";
import InfiniteScroll from "react-infinite-scroller";
import { FETCH_USED_ITEM_QUESTIONS } from "../../src/api/market/detail/MarketQuestion.quries";
import * as QuestionItem from "../../src/styles/common/QuestionItem.styles";
import { IUseditemQuestion } from "../../src/types/generated/types";
import AnswerWriteComponent from "../market/detail/AnswerWrite.component";
import QuestionWriteComponent from "../market/detail/QuestionWrite.component";

interface IPropsQuestionItem {
  el: IUseditemQuestion;
}

const QuestionItemComponent = (props: IPropsQuestionItem) => {
  const router = useRouter();

  const { data, fetchMore } = useQuery(FETCH_USED_ITEM_QUESTIONS, {
    variables: { useditemId: String(router.query.detail) },
  });

  const onLoadMore = async () => {
    if (!data) return;

    await fetchMore({
      variables: {
        page: Math.ceil(data?.fetchUseditemQuestions.length / 10) + 1,
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult?.fetchUseditemQuestions)
          return { fetchUseditemQusetions: [...prev.fetchUseditemQuestions] };
        return {
          fetchUseditemQusetions: [
            ...prev.fetchUseditemQuestions,
            ...fetchMoreResult.fetchUseditemQuestions,
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
        <QuestionItem.BlankDiv />
        <QuestionItem.ContentsP>{props.el?.contents}</QuestionItem.ContentsP>
        {/* <InfiniteScroll pageStart={0} loadMore={onLoadMore} hasMore={true}>
          {data?.fetchUseditemQuestions.map((el: IUseditemQuestion) => (
            <QuestionItemComponent key={el._id} el={el} />
          ))}
        </InfiniteScroll> */}
      </QuestionItem.ContentsBoxDiv>
      <QuestionItem.ContentsBoxDiv>
        <QuestionItem.BlankDiv />
        <AnswerWriteComponent />
      </QuestionItem.ContentsBoxDiv>
    </QuestionItem.WrapperDiv>
  );
};

export default QuestionItemComponent;
