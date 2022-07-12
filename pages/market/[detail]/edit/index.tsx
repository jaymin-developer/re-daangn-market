import { useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import MarketWriteComponent from "../../../../components/market/write/MarketWrite.component";
import { FETCH_USED_ITEM } from "../../../../queries/market/detail/edit/MarketDetailEdit.queries";
import {
  IQuery,
  IQueryFetchUseditemArgs,
} from "../../../../src/commons/types/generated/types";

export default function MarketDetailEditPage() {
  const router = useRouter();

  const { data } = useQuery<
    Pick<IQuery, "fetchUseditem">,
    IQueryFetchUseditemArgs
  >(FETCH_USED_ITEM, {
    variables: { useditemId: String(router.query.detail) },
  });

  return <MarketWriteComponent isEdit={true} data={data} />;
}
