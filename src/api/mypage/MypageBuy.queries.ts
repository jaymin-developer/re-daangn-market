import { gql } from "@apollo/client";

export const FETCH_POINT_TRANSACTION_OF_BUYING = gql`
  query fetchPointTransactionsOfBuying($page: Int) {
    fetchPointTransactionsOfBuying(page: $page) {
      amount
      balance
      useditem {
        _id
        name
        price
        soldAt
        images
        useditemAddress {
          address
        }
      }
    }
  }
`;
