import { useQuery } from "@apollo/client";
import InfiniteScroll from "react-infinite-scroller";
import { FETCH_USED_ITEMS_PICKED } from "../../src/api/mypage/MyPagePick.queries";
import * as Pick from "../../src/styles/mypage/MypagePick.styles";
import { IUseditem } from "../../src/types/generated/types";
import ItemFlexComponent from "../common/ItemFlex.component";

const MyPagePickComponent = () => {
  const { data, fetchMore } = useQuery(FETCH_USED_ITEMS_PICKED, {
    variables: {
      page: 1,
      search: "",
    },
  });

  const onLoadMore = () => {
    if (!data) return;

    fetchMore({
      variables: {
        page: Math.ceil(data.fetchUseditemsIPicked.length / 10) + 1,
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult.fetchUseditemsIPicked)
          return {
            fetchUseditemsIPicked: [...prev.fetchUseditemsIPicked],
          };

        return {
          fetchUseditemsIPicked: [...prev.fetchUseditemsIPicked, ...fetchMoreResult.fetchUseditemsIPicked],
        };
      },
    });
  };

  return (
    <Pick.WrapperDiv>
      <Pick.ListSection>
        <InfiniteScroll pageStart={0} loadMore={onLoadMore} hasMore={true}>
          {data?.fetchUseditemsIPicked.slice(0, 8).map((el: IUseditem) => (
            <ItemFlexComponent el={el} />
          ))}
        </InfiniteScroll>
      </Pick.ListSection>
    </Pick.WrapperDiv>
  );
};

export default MyPagePickComponent;
