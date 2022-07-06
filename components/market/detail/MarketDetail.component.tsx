import { useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import { FETCH_USED_ITEM } from "../../../queries/market/detail/MarketDetail.queries";
import * as Detail from "../../../styles/market/detail/MarketDetail.styles";
import CarouselComponent from "../../common/Carousel.component";

const MarketDetailComponent = () => {
  const router = useRouter();

  const { data: itemData } = useQuery(FETCH_USED_ITEM, {
    variables: { useditemId: String(router.query.detail) },
  });

  console.log(itemData?.fetchUseditem.images);

  return (
    <Detail.WrapperArticle>
      <Detail.CarouselBoxDiv>
        <CarouselComponent images={itemData?.fetchUseditem.images} />
      </Detail.CarouselBoxDiv>
    </Detail.WrapperArticle>
  );
};

export default MarketDetailComponent;
