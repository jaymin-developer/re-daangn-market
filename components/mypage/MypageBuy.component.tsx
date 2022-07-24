import { useQuery } from "@apollo/client";
import InfiniteScroll from "react-infinite-scroller";
import { FETCH_POINT_TRANSACTION_OF_BUYING } from "../../src/api/mypage/MypageBuy.queries";
import * as Buy from "../../src/styles/mypage/MypageBuy.styles";
import { IUseditem } from "../../src/types/generated/types";
import ItemFlexComponent from "../common/ItemFlex.component";

const MyPageBuyComponent = () => {
  const { data, fetchMore } = useQuery(FETCH_POINT_TRANSACTION_OF_BUYING, {
    variables: { page: 1 },
  });

  const onLoadMore = () => {
    if (!data) return;

    fetchMore({
      variables: {
        page: Math.ceil(data.fetchPointTransactionsOfBuying.length / 10) + 1,
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult.fetchPointTransactionsOfBuying)
          return {
            fetchPointTransactionsOfBuying: [...prev.fetchPointTransactionsOfBuying],
          };

        return {
          fetchPointTransactionsOfBuying: [
            ...prev.fetchPointTransactionsOfBuying,
            ...fetchMoreResult.fetchPointTransactionsOfBuying,
          ],
        };
      },
    });
  };
  return (
    <Buy.WrapperDiv>
      <Buy.ListSection>
        <InfiniteScroll pageStart={0} loadMore={onLoadMore} hasMore={true}>
          {data?.fetchPointTransactionsOfBuying.slice(0, 8).map((el: IUseditem) => (
            <ItemFlexComponent el={el} category={"sold"} />
          ))}
        </InfiniteScroll>
      </Buy.ListSection>
    </Buy.WrapperDiv>
  );
};

export default MyPageBuyComponent;
