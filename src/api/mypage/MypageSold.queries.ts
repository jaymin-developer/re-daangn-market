import { gql } from "@apollo/client";

export const FETCH_USED_ITEMS_I_SOLD = gql`
  query fetchUseditemsISold($page: Int) {
    fetchUseditemsISold(page: $page) {
      _id
      name
      price
      images
      createdAt
      soldAt
      buyer {
        _id
      }
      useditemAddress {
        address
      }
    }
  }
`;

export const FETCH_USED_ITMES_COUNT_I_SOLD = gql`
  query fetchUseditemsCountISold {
    fetchUseditemsCountISold
  }
`;
