import styled from "@emotion/styled";
import { useRouter } from "next/router";
import { FormatKRW } from "../../src/commons/libraries/getNumberFormat";
import { IUseditem } from "../../src/types/generated/types";
import { Color, FontSize } from "../../src/styles/theme";
import moment from "moment";

interface IPropsItem {
  el: IUseditem;
  category?: string;
}

const ItemFlexComponent = (props: IPropsItem) => {
  const router = useRouter();
  const onClickMoveToDetail = () => {
    const basket = JSON.parse(localStorage.getItem("interested") || "[]");

    if (JSON.stringify(localStorage).includes(props.el?._id) === false) {
      basket.unshift(props.el);
    }
    localStorage.setItem("interested", JSON.stringify(basket));
    router.push(`/market/${props.el?._id}`);
  };

  return (
    <ItemWrapperArticle key={props.el?._id} id={props.el?._id} onClick={onClickMoveToDetail}>
      <ItemImgDiv>
        <ItemImg
          title={props.el?.name}
          alt={props.el?.name}
          src={`https://storage.googleapis.com/${props.el?.images[0]}`}
          onError={(e) => {
            e.currentTarget.src = "/logo_daangn.png";
          }}
        />
      </ItemImgDiv>
      <ItemDescDiv>
        <ItemNameH2>상품 : {props.el?.name}</ItemNameH2>
        <ItemPriceDiv>가격 : {FormatKRW(props.el?.price)}</ItemPriceDiv>
        <ItemRegionDiv>
          {props.el?.useditemAddress?.address ? props.el?.useditemAddress.address : "위치 정보 없음"}
        </ItemRegionDiv>
      </ItemDescDiv>
      {props.category === "sold" && <ItemOptionDiv>{props.el?.soldAt ? "판매완료" : "판매중"}</ItemOptionDiv>}
      {props.category === "buy" && <ItemOptionDiv>{moment(props.el?.soldAt).format("L")} 구매완료</ItemOptionDiv>}
    </ItemWrapperArticle>
  );
};

export default ItemFlexComponent;

const ItemWrapperArticle = styled.article`
  /* display: flex;
  justify-content: space-between; */
  display: grid;
  grid-template-columns: 2fr 3fr 1fr;

  align-items: center;

  padding: 10px;

  gap: 10px;

  cursor: pointer;

  border-bottom: 1px solid lightgray;
`;

const ItemImgDiv = styled.div`
  aspect-ratio: 1/1;
  overflow: hidden;

  border: 1px solid #d3d4d5;
  border-radius: 12px;
`;

const ItemImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const ItemNameH2 = styled.h2`
  width: 100%;
  font-size: 24px;
`;

const ItemPriceDiv = styled.div`
  width: 100%;
  font-size: 18px;
  font-weight: 700;
`;

const ItemRegionDiv = styled.div`
  width: 100%;
  font-size: ${FontSize.CardRegion};
`;

const ItemDescDiv = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;

  gap: 10px;
`;

const ItemOptionDiv = styled.div`
  display: flex;
  flex-direction: column;

  text-align: center;

  padding: 10px;

  border-radius: 10px;

  color: white;
  background-color: ${Color.Main};
`;
