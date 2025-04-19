import { formatUnits } from "@/lib/format";
import dayjs from "dayjs";
import { divide, round } from "mathjs";
import { type Address } from "viem";
import { type EOrderStatus, EOrderType } from "../contracts/types";
import { ETHER_ADDRESS, type contracts2 } from "../contracts/configs";

export interface IDecoratedBaseOrder {
  id: bigint;
  user: Address;
  etherAmount: bigint;
  tokenAmount: bigint;
  etherAmountFormatted: number;
  tokenAmountFormatted: number;
  tokenPriceFormatted: number;
  tokenPrice: number;
  orderType: EOrderType;
  /** The order type of the fill order, opposite to orderType */
  fillOrderType: EOrderType;
  timestamp: bigint;
  time: string;
  tokenGet: Address;
  tokenGive: Address;
  amountGet: bigint;
  amountGive: bigint;
}

export interface IDecoratedOrder extends IDecoratedBaseOrder {
  status: EOrderStatus;
}

export function decorateBaseOrder({
  id,
  user,
  amountGet,
  tokenGive,
  amountGive,
  timestamp,
  tokenGet,
}: Omit<contracts2.Exchange._OrderStruct, "status">): IDecoratedBaseOrder {
  let etherAmount: bigint;
  let tokenAmount: bigint;
  let orderType: EOrderType;
  if (tokenGive === ETHER_ADDRESS) {
    // buy
    orderType = EOrderType.BUY;
    etherAmount = BigInt(amountGive);
    tokenAmount = BigInt(amountGet);
  } else {
    // sell
    orderType = EOrderType.SELL;
    etherAmount = BigInt(amountGet);
    tokenAmount = BigInt(amountGive);
  }

  const etherAmountFormatted = +formatUnits(etherAmount);
  const tokenAmountFormatted = +formatUnits(tokenAmount);
  const tokenPrice = +divide(
    etherAmountFormatted,
    tokenAmountFormatted,
  ).toString();

  const tokenPriceFormatted = round(tokenPrice, 5);

  return {
    id: BigInt(id),
    user: user as Address,
    etherAmount,
    tokenAmount,

    etherAmountFormatted,
    tokenAmountFormatted,
    tokenPriceFormatted,
    tokenPrice,
    orderType,
    fillOrderType:
      orderType === EOrderType.BUY ? EOrderType.SELL : EOrderType.BUY,
    timestamp: BigInt(timestamp),
    time: dayjs(Number(timestamp) * 1000).format("YYYY-MM-DD HH:mm:ss"),
    tokenGet: tokenGet as Address,
    tokenGive: tokenGive as Address,
    amountGet: amountGet as bigint,
    amountGive: amountGive as bigint,
  } satisfies IDecoratedBaseOrder;
}

export function decorateOrder({
  status,
  ...rest
}: contracts2.Exchange._OrderStruct): IDecoratedOrder {
  return {
    ...decorateBaseOrder(rest),
    status: status as EOrderStatus,
  } satisfies IDecoratedOrder;
}
