import styled from "@emotion/styled";
import { Color, FontSize } from "../../theme";

export const WrapperArticle = styled.article`
  width: 100%;
  padding: 96px 20% 0px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const CarouselBoxDiv = styled.div``;

export const SellerImage = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
`;

export const SellerHeaderDiv = styled.div`
  width: 100%;

  display: flex;
  justify-content: space-between;
  align-items: center;

  padding: 10px;

  border-bottom: 1px solid #e9ecef;
`;

export const SellerInfoDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  gap: 10px;
`;

export const ItemPickDiv = styled.div`
  display: flex;
  align-items: center;

  gap: 10px;
`;

export const SellerNameAddressDiv = styled.div`
  display: flex;
  flex-direction: column;
`;

export const SellerNameDiv = styled.div`
  font-size: 15px;
  font-weight: 600;
  line-height: 1.5;
`;

export const SellerAddressDiv = styled.div`
  font-size: 13px;
  color: #212529;
`;

export const ItemTagsDiv = styled.div`
  display: flex;

  gap: 5px;

  div {
    color: #ffffff;

    padding: 5px;
    border-radius: 8px;

    background-color: ${Color.Main};
  }
`;

export const ItemDescDiv = styled(SellerNameAddressDiv)`
  padding: 20px;
  gap: 10px;

  border-bottom: 1px solid #e9ecef;
`;

export const ItemNameH1 = styled.h1`
  font-size: 24px;
  font-weight: 500;
`;

export const ItemCreatedAtP = styled.p`
  font-size: 13px;
`;

export const ItemPriceP = styled.p`
  font-size: 20px;
  font-weight: 500;
`;
export const ItemContents = styled.div`
  margin-top: 20px;
`;
