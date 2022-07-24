import { useQuery } from "@apollo/client";
import InfiniteScroll from "react-infinite-scroller";
import { FETCH_USED_ITEMS_I_SOLD, FETCH_USED_ITMES_COUNT_I_SOLD } from "../../src/api/mypage/MypageSold.queries";

import * as Sold from "../../src/styles/mypage/MypageSold.styles";
import { IUseditem } from "../../src/types/generated/types";
import ItemFlexComponent from "../common/ItemFlex.component";

const MyPageSellComponent = () => {
  const { data, fetchMore } = useQuery(FETCH_USED_ITEMS_I_SOLD, {
    variables: { page: 1 },
  });
  const { data: countData } = useQuery(FETCH_USED_ITMES_COUNT_I_SOLD);

  const onLoadMore = () => {
    if (!data) return;

    fetchMore({
      variables: {
        page: Math.ceil(data.fetchUseditemsISold.length / 10) + 1,
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult.fetchUseditemsISold) return { fetchUseditemsISold: [...prev.fetchUseditemsISold] };

        return {
          fetchUseditemsISold: [...prev.fetchUseditemsISold, ...fetchMoreResult.fetchUseditemsISold],
        };
      },
    });
  };

  return (
    <Sold.WrapperDiv>
      <Sold.ListSection>
        <InfiniteScroll pageStart={0} loadMore={onLoadMore} hasMore={true}>
          {data?.fetchUseditemsISold.slice(0, 8).map((el: IUseditem) => (
            <ItemFlexComponent el={el} category={"sold"} />
          ))}
        </InfiniteScroll>
      </Sold.ListSection>
    </Sold.WrapperDiv>
  );
};

export default MyPageSellComponent;
