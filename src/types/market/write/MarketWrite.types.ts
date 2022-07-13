import { IQuery } from "../../generated/types";

export interface IPropsMarketWrite {
  isEdit?: boolean;
  data?: Pick<IQuery, "fetchUseditem">;
}

export interface FormValues {
  name?: string;
  remarks?: string;
  price?: number;
  contents?: string;
}
