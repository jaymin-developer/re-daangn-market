import styled from "@emotion/styled";
import moment from "moment";
import "moment/locale/ko";
import { useMoveToPage } from "../../hooks/useRouter";
import { IUseditem } from "../../src/commons/types/generated/types";
import { FontSize } from "../../styles/theme";

interface IPropsItem {
  el: IUseditem;
}

const ItemComponent = (props: IPropsItem) => {
  const { moveToPage } = useMoveToPage();
  console.log(props.el._id);

  return (
    <ItemWrapperArticle
      key={props.el._id}
      id={props.el._id}
      onClick={moveToPage(`market/${props.el._id}`)}
    >
      <ItemImgDiv>
        <ItemImg
          title={props.el.name}
          alt={props.el.name}
          src={`https://storage.googleapis.com/${props.el.images[0]}`}
          onError={(e) => {
            e.currentTarget.src = "/logo_daangn.png";
          }}
        />
      </ItemImgDiv>
      <ItemNameH2>{props.el.name}</ItemNameH2>
      <ItemPriceDiv>
        {new Intl.NumberFormat("ko-KR", {
          style: "currency",
          currency: "KRW",
        }).format(props.el.price)}
      </ItemPriceDiv>
      <ItemRegionDiv>
        {props.el.useditemAddress
          ? props.el.useditemAddress.address
          : "위치 정보 없음"}
      </ItemRegionDiv>
      <ItemCountsDiv>{moment(props.el.createdAt).format("LLL")}</ItemCountsDiv>
    </ItemWrapperArticle>
  );
};

export default ItemComponent;

const ItemWrapperArticle = styled.article`
  display: flex;
  flex-direction: column;

  gap: 10px;

  cursor: pointer;
`;

const ItemImgDiv = styled.div`
  width: 100%;
  aspect-ratio: 1/1;
  overflow: hidden;

  border: 1px solid #d3d4d5;
  border-radius: 8px;
`;

const ItemImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const ItemNameH2 = styled.h2`
  width: 100%;
  font-size: ${FontSize.CardTitle};
`;

const ItemPriceDiv = styled.div`
  width: 100%;
  font-size: ${FontSize.CardPrice};
  font-weight: 700;
`;

const ItemRegionDiv = styled.div`
  width: 100%;
  font-size: ${FontSize.CardRegion};
`;

const ItemCountsDiv = styled.div`
  width: 100%;
  font-size: ${FontSize.CardCounts};

  display: flex;
`;