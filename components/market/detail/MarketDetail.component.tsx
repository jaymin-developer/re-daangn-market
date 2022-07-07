import { HeartFilled, HeartOutlined } from "@ant-design/icons";
import { useQuery } from "@apollo/client";
import DOMPurify from "isomorphic-dompurify";
import moment from "moment";
import "moment/locale/ko";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { FETCH_USED_ITEM } from "../../../queries/market/detail/MarketDetail.queries";
import { FormatKRW } from "../../../src/commons/libraries/getNumberFormat";
import { IUseditem } from "../../../src/commons/types/generated/types";
import * as Detail from "../../../styles/market/detail/MarketDetail.styles";
import CarouselComponent from "../../common/Carousel.component";
import LoadingComponent from "../../common/Loading.component";
import ItemComponent from "../Item.component";

const MarketDetailComponent = () => {
  const router = useRouter();
  const [pick, setPick] = useState(false);
  const [interestedItems, setInterestedItems] = useState([]);

  const { data: itemData, loading } = useQuery(FETCH_USED_ITEM, {
    variables: { useditemId: String(router.query.detail) },
  });

  const onClickPick = () => {
    setPick((prev) => !prev);
  };

  useEffect(() => {
    setInterestedItems(JSON.parse(localStorage.getItem("interested") || "[]"));
  }, []);

  console.log(interestedItems);

  return (
    <Detail.WrapperArticle>
      <Head>
        <title>{itemData?.fetchUseditem.name}</title>
        <meta
          name="description"
          content="당근마켓에서 거래되는 최신 중고 매물을 소개합니다."
        ></meta>
        <meta property="og:title" content={itemData?.fetchUseditem.name}></meta>
        <meta
          property="og:description"
          content={itemData?.fetchUseditem.remarks}
        ></meta>
        <meta
          property="og:image"
          content={`https://storage.googleapis.com/${itemData?.fetchUseditem.seller.picture}`}
        ></meta>
      </Head>
      {loading && <LoadingComponent />}
      {!loading && (
        <>
          <CarouselComponent images={itemData?.fetchUseditem.images} />
          <Detail.SellerHeaderDiv>
            <Detail.SellerInfoDiv>
              <Detail.SellerImage
                src={`https://storage.googleapis.com/${itemData?.fetchUseditem.seller.picture}`}
                onError={(e) => {
                  e.currentTarget.src = "/logo_daangn.png";
                }}
              />
              <Detail.SellerNameAddressDiv>
                <Detail.SellerNameDiv>
                  {itemData?.fetchUseditem.seller.name}
                </Detail.SellerNameDiv>
                <Detail.SellerAddressDiv>
                  {itemData?.fetchUseditem.useditemAddress?.address}
                </Detail.SellerAddressDiv>
              </Detail.SellerNameAddressDiv>
            </Detail.SellerInfoDiv>
            <Detail.ItemPickDiv>
              {pick ? (
                <HeartFilled onClick={onClickPick} />
              ) : (
                <HeartOutlined onClick={onClickPick} />
              )}
              {itemData?.fetchUseditem.pickedCount}
            </Detail.ItemPickDiv>
          </Detail.SellerHeaderDiv>
          <Detail.ItemDescDiv>
            <Detail.ItemTagsDiv>
              {itemData?.fetchUseditem.tags.map((el: string) => {
                return <div>{el.slice(1)}</div>;
              })}
            </Detail.ItemTagsDiv>
            <Detail.ItemNameH1>
              {itemData?.fetchUseditem.name}
            </Detail.ItemNameH1>
            <Detail.ItemCreatedAtP>
              {moment(itemData?.fetchUseditem.createdAt).format("LLL")}
            </Detail.ItemCreatedAtP>
            <Detail.ItemPriceP>
              {FormatKRW(itemData?.fetchUseditem.price).slice(1)}원
            </Detail.ItemPriceP>

            <Detail.ItemContents
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(
                  String(itemData?.fetchUseditem.contents)
                ),
              }}
            />
          </Detail.ItemDescDiv>

          <Detail.InterestedWrapperDiv>
            <Detail.InterestedP>최근 본 상품</Detail.InterestedP>
            <Detail.InterestedItemsDiv>
              {interestedItems.slice(0, 6).map((el: IUseditem) => (
                <ItemComponent el={el} />
              ))}
            </Detail.InterestedItemsDiv>
          </Detail.InterestedWrapperDiv>
        </>
      )}
    </Detail.WrapperArticle>
  );
};

export default MarketDetailComponent;
