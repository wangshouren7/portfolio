import { type Address } from "viem";
import {
  decorateBaseOrder,
  type IDecoratedBaseOrder,
} from "../order/decorate-order";
import { type TradeEvent } from "../contracts/types";

export interface IDecoratedTrade extends IDecoratedBaseOrder {
  userFill: Address;
}

export function decorateTrade(trade: TradeEvent.OutputObject): IDecoratedTrade {
  const decoratedBaseOrder = decorateBaseOrder(trade);
  return {
    ...decoratedBaseOrder,
    userFill: trade.userFill as Address,
  } satisfies IDecoratedTrade;
}
