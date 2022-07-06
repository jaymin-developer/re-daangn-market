import { useQuery } from "@apollo/client";
import { ChangeEvent, useContext, useState } from "react";
import InfiniteScroll from "react-infinite-scroller";
import { GlobalContext } from "../../pages/_app";
import { FETCH_USED_ITEMS } from "../../queries/market/Market.queries";
import { IUseditem } from "../../src/commons/types/generated/types";
import * as Market from "../../styles/market/Market.styles";
import { MoveButtonMain } from "../common/Button.component";
import ItemComponent from "./Item.component";
import RegionSelect from "./SearchRegion.component";

const MarketComponent = () => {
  const [region, setRegion] = useState("");
  const { search } = useContext(GlobalContext);
  const { data, fetchMore } = useQuery(FETCH_USED_ITEMS, {
    variables: { page: 1, search: search },
  });

  const onLoadMore = async () => {
    if (!data) return;

    await fetchMore({
      variables: { page: Math.ceil(data.fetchUseditems.length / 10) + 1 },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult.fetchUseditems)
          return { fetchUseditems: [...prev.fetchUseditems] };

        return {
          fetchUseditems: [
            ...prev.fetchUseditems,
            ...fetchMoreResult.fetchUseditems,
          ],
        };
      },
    });
  };

  const onChangeRegion = (e: ChangeEvent<HTMLSelectElement>) => {
    setRegion(e.target.value);
  };

  return (
    <Market.WrapperSection>
      <Market.HeaderH1>중고거래 최근매물</Market.HeaderH1>
      <Market.SearchWriteDiv>
        <RegionSelect onChangeRegion={onChangeRegion} />
        <MoveButtonMain name="중고 등록하기" page="/market/new" />
      </Market.SearchWriteDiv>
      <InfiniteScroll pageStart={0} loadMore={onLoadMore} hasMore={true}>
        {!data?.fetchUseditems.length && (
          <Market.NoDataDiv>검색 결과가 없습니다.</Market.NoDataDiv>
        )}

        <Market.ListSection>
          {/* 지역 설정 시 데이터 */}
          {region &&
            data?.fetchUseditems
              .filter((el: IUseditem) =>
                el.useditemAddress?.address?.slice(0, 2).includes(region)
              )
              .map((el: IUseditem) => <ItemComponent el={el} />)}

          {/* 지역 미설정 시 데이터 */}
          {!region &&
            data?.fetchUseditems.map((el: IUseditem) => (
              <ItemComponent el={el} />
            ))}
        </Market.ListSection>
      </InfiniteScroll>
    </Market.WrapperSection>
  );
};

export default MarketComponent;
