import { EOrderType } from "../contracts/types";

export const orderTypeConfig = {
  [EOrderType.BUY]: {
    color: "text-green-500",
    symbol: "+",
  },
  [EOrderType.SELL]: {
    color: "text-red-500",
    symbol: "-",
  },
};
