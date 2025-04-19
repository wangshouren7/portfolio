"use client";

import { useMemoizedFn } from "@pfl-wsr/ui";
import { useQueryClient } from "@tanstack/react-query";
import {
  useAccount,
  useReadContract,
  useWatchContractEvent,
  useWriteContract,
} from "wagmi";
import { decorateOrder, type IDecoratedOrder } from "./decorate-order";
import { useTransactionFnWithToast } from "@/lib/use-async-fn-with-toast";
import { useContractsConfigOfCurrentChain } from "../contracts/use-contract-configs";
import { EOrderStatus, EOrderType } from "../contracts/types";

export const useOrders = () => {
  const contractConfig = useContractsConfigOfCurrentChain();
  const queryClient = useQueryClient();
  const { address: account } = useAccount();

  const { writeContractAsync } = useWriteContract();

  useWatchContractEvent({
    ...contractConfig.Exchange,
    eventName: "Order",
    onLogs: () => {
      reload();
    },
  });

  const { data: orders, queryKey } = useReadContract({
    ...contractConfig.Exchange,
    functionName: "getOrders",
    query: {
      select: (data) => {
        const orders = data.map(decorateOrder);

        const ret = {
          [EOrderStatus.PENDING]: {
            [EOrderType.BUY]: [] as IDecoratedOrder[],
            [EOrderType.SELL]: [] as IDecoratedOrder[],
            my: [] as IDecoratedOrder[],
            all: [] as IDecoratedOrder[],
          },
          [EOrderStatus.FILLED]: {
            [EOrderType.BUY]: [] as IDecoratedOrder[],
            [EOrderType.SELL]: [] as IDecoratedOrder[],
            my: [] as IDecoratedOrder[],
            all: [] as IDecoratedOrder[],
          },
          [EOrderStatus.CANCELLED]: {
            [EOrderType.BUY]: [] as IDecoratedOrder[],
            [EOrderType.SELL]: [] as IDecoratedOrder[],
            my: [] as IDecoratedOrder[],
            all: [] as IDecoratedOrder[],
          },
        };

        for (const order of orders) {
          ret[order.status][order.orderType].push(order);
          ret[order.status].all.push(order);
          if (order.user === account) {
            ret[order.status].my.push(order);
          }
        }

        return ret;
      },
    },
  });

  const reload = useMemoizedFn(() => {
    queryClient.invalidateQueries({ queryKey });
  });

  const fillOrder = useTransactionFnWithToast(
    async (order: IDecoratedOrder) => {
      const tx = await writeContractAsync({
        ...contractConfig.Exchange,
        functionName: "fillOrder",
        args: [order.id],
      });

      reload();

      return tx;
    },
  );

  const cancelOrder = useTransactionFnWithToast(async (id: bigint) => {
    const tx = await writeContractAsync({
      ...contractConfig.Exchange,
      functionName: "cancelOrder",
      args: [id],
    });

    reload();

    return tx;
  });

  return {
    orders,
    fillOrder,
    cancelOrder,
    reload,
  };
};
