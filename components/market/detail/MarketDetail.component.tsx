import { HeartFilled, HeartOutlined } from "@ant-design/icons";
import { useMutation, useQuery } from "@apollo/client";
import moment from "moment";
import "moment/locale/ko";
import Head from "next/head";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import {
  DELETE_USED_ITEM,
  FETCH_USED_ITEM,
  FETCH_USED_ITEMS_PICKED,
  TOGGLE_USED_ITEM_PICK,
} from "../../../src/api/market/detail/MarketDetail.queries";
import { FormatKRW } from "../../../src/commons/libraries/getNumberFormat";
import { IUseditem } from "../../../src/types/generated/types";
import * as Detail from "../../../src/styles/market/detail/MarketDetail.styles";
import CarouselComponent from "../../common/Carousel.component";
import LoadingComponent from "../../common/Loading.component";
import ItemComponent from "../../common/ItemGrid.component";
import { Dropdown, Menu, Modal } from "antd";
import { GlobalContext } from "../../../pages/_app";

const MarketDetailComponent = () => {
  const router = useRouter();
  const { userInfo } = useContext(GlobalContext);
  const [pick, setPick] = useState(false);
  const [interestedItems, setInterestedItems] = useState([]);
  const [deleteUseditem] = useMutation(DELETE_USED_ITEM);
  const [toggleUseditemPick] = useMutation(TOGGLE_USED_ITEM_PICK);

  const { data: itemData, loading } = useQuery(FETCH_USED_ITEM, {
    variables: { useditemId: String(router.query.detail) },
  });

  const { data: pickData } = useQuery(FETCH_USED_ITEMS_PICKED, {
    variables: {
      page: 1,
      search: "",
    },
  });

  const onClickDelete = async () => {
    try {
      await deleteUseditem({
        variables: { useditemId: String(router.query.detail) },
      });
      Modal.success({ content: "삭제가 완료되었습니다." });
      router.push("/market");
    } catch (error) {
      error instanceof Error && Modal.error({ content: error.message });
    }
  };

  const onClickMoveEdit = () => {
    router.push(`${router.query.detail}/edit`);
  };

  const onClickToggleUsedItemPick = async () => {
    try {
      await toggleUseditemPick({
        variables: { useditemId: String(router.query.detail) },
        refetchQueries: [
          {
            query: FETCH_USED_ITEM,
            variables: { useditemId: String(router.query.detail) },
          },
        ],
      });
      if (pick === false) {
        Modal.success({ content: "상품을 찜했습니다!" });
        setPick(true);
      }
      if (pick === true) {
        Modal.success({ content: "찜을 취소했습니다!" });
        setPick(false);
      }
    } catch (error) {
      error instanceof Error && Modal.error({ content: error.message });
    }
  };

  const menu = (
    <Menu
      items={[
        {
          label: <div onClick={onClickMoveEdit}>수정하기</div>,
          key: "0",
        },
        {
          label: <div onClick={onClickDelete}>삭제하기</div>,
          key: "1",
        },
      ]}
    />
  );

  useEffect(() => {
    setInterestedItems(JSON.parse(localStorage.getItem("interested") || "[]"));
  }, []);

  useEffect(() => {
    if (pickData?.fetchUseditemsIPicked.filter((el: IUseditem) => el._id === itemData?.fetchUseditem._id).length) {
      setPick(true);
    } else {
      setPick(false);
    }
  }, [pickData]);

  return (
    <Detail.WrapperArticle>
      <Head>
        <title>{itemData?.fetchUseditem.name} | 당근마켓</title>
        <meta name="description" content="당근마켓에서 거래되는 최신 중고 매물을 소개합니다."></meta>
        <meta property="og:title" content={itemData?.fetchUseditem.name}></meta>
        <meta property="og:description" content={itemData?.fetchUseditem.remarks}></meta>
        <meta
          property="og:image"
          content={`https://storage.googleapis.com/${itemData?.fetchUseditem.seller.picture}`}
        ></meta>
      </Head>
      {loading && <LoadingComponent />}

      {!loading && (
        <>
          {itemData?.fetchUseditem.images.length > 0 && (
            <CarouselComponent images={itemData?.fetchUseditem.images.filter((el: string) => el)} />
          )}
          {!itemData?.fetchUseditem.images.length && <Detail.SubImg src="/logo_daangn.png" />}
          <Detail.SellerHeaderDiv>
            <Detail.SellerInfoDiv>
              <Detail.SellerImg
                src={`https://storage.googleapis.com/${itemData?.fetchUseditem.seller.picture}`}
                onError={(e) => {
                  e.currentTarget.src = "/logo_daangn.png";
                }}
              />
              <Detail.SellerNameAddressDiv>
                <Detail.SellerNameDiv>{itemData?.fetchUseditem.seller.name}</Detail.SellerNameDiv>
                <Detail.SellerAddressDiv>{itemData?.fetchUseditem.useditemAddress?.address}</Detail.SellerAddressDiv>
              </Detail.SellerNameAddressDiv>
            </Detail.SellerInfoDiv>
            <Detail.ItemPickDiv>
              {pick ? (
                <HeartFilled onClick={onClickToggleUsedItemPick} />
              ) : (
                <HeartOutlined onClick={onClickToggleUsedItemPick} />
              )}

              {itemData?.fetchUseditem.pickedCount}
              {userInfo?._id === itemData?.fetchUseditem.seller._id && (
                <Dropdown overlay={menu} trigger={["click"]}>
                  <a onClick={(e) => e.preventDefault()}>글 관리</a>
                </Dropdown>
              )}
            </Detail.ItemPickDiv>
          </Detail.SellerHeaderDiv>
          <Detail.ItemDescDiv>
            <Detail.ItemTagsDiv>
              {itemData?.fetchUseditem.tags.map((el: string) => {
                return <div>{el.slice(1)}</div>;
              })}
            </Detail.ItemTagsDiv>
            <Detail.ItemNameH1>{itemData?.fetchUseditem.name}</Detail.ItemNameH1>
            <Detail.ItemCreatedAtP>{moment(itemData?.fetchUseditem.createdAt).format("LLL")}</Detail.ItemCreatedAtP>
            <Detail.ItemPriceP>{FormatKRW(itemData?.fetchUseditem.price).slice(1)}원</Detail.ItemPriceP>

            <Detail.ItemContents
              dangerouslySetInnerHTML={{
                __html: String(itemData?.fetchUseditem.contents),
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
