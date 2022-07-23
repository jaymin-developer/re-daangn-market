import { gql } from "@apollo/client";

export const FETCH_USED_ITEMS_PICKED = gql`
  query fetchUseditemsIPicked($search: String, $page: Int) {
    fetchUseditemsIPicked(search: $search, page: $page) {
      _id
      name
      price
      soldAt
      createdAt
      images
      pickedCount
    }
  }
`;
