import * as QuestionList from "../../../src/styles/market/detail/QuestionList.styles";
import { useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import InfiniteScroll from "react-infinite-scroller";
import { FETCH_USED_ITEM_QUESTIONS } from "../../../src/api/market/detail/MarketQuestion.quries";
import QuestionItemComponent from "../../common/QuesiotnItem.component";
import { IUseditemQuestion } from "../../../src/types/generated/types";

const QuestionListComponent = () => {
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
    <QuestionList.WrapperDiv>
      <InfiniteScroll pageStart={0} loadMore={onLoadMore} hasMore={true}>
        {data?.fetchUseditemQuestions.map((el: IUseditemQuestion) => (
          <QuestionItemComponent key={el._id} el={el} />
        ))}
      </InfiniteScroll>
    </QuestionList.WrapperDiv>
  );
};

export default QuestionListComponent;
