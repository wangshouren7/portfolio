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
import { contracts } from "@/contracts";
import { useAsyncFnWithToast } from "@/lib/use-async-fn-with-toast";
import { logger } from "@/lib/logger";

export const useOrders = () => {
  const queryClient = useQueryClient();
  const { address: account } = useAccount();

  const { writeContractAsync } = useWriteContract();

  useWatchContractEvent({
    ...contracts.Exchange.config,
    eventName: "Order",
    onLogs: () => {
      reload();
    },
  });

  const { data: orders, queryKey } = useReadContract({
    ...contracts.Exchange.config,
    functionName: "getOrders",
    query: {
      select: (data) => {
        const orders = data.map(decorateOrder);

        const ret = {
          [contracts.Exchange.EOrderStatus.PENDING]: {
            [contracts.Exchange.EOrderType.BUY]: [] as IDecoratedOrder[],
            [contracts.Exchange.EOrderType.SELL]: [] as IDecoratedOrder[],
            my: [] as IDecoratedOrder[],
            all: [] as IDecoratedOrder[],
          },
          [contracts.Exchange.EOrderStatus.FILLED]: {
            [contracts.Exchange.EOrderType.BUY]: [] as IDecoratedOrder[],
            [contracts.Exchange.EOrderType.SELL]: [] as IDecoratedOrder[],
            my: [] as IDecoratedOrder[],
            all: [] as IDecoratedOrder[],
          },
          [contracts.Exchange.EOrderStatus.CANCELLED]: {
            [contracts.Exchange.EOrderType.BUY]: [] as IDecoratedOrder[],
            [contracts.Exchange.EOrderType.SELL]: [] as IDecoratedOrder[],
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

  const fillOrder = useAsyncFnWithToast(
    async (order: IDecoratedOrder) => {
      try {
        logger.info({
          message: "尝试填充订单",
          data: {
            orderId: order.id.toString(),
            orderType:
              order.orderType === contracts.Exchange.EOrderType.BUY
                ? "购买"
                : "出售",
            orderUser: order.user,
            etherAmount: order.etherAmount.toString(),
            tokenAmount: order.tokenAmount.toString(),
            etherAmountFormatted: order.etherAmountFormatted,
            tokenAmountFormatted: order.tokenAmountFormatted,
            tokenPrice: order.tokenPrice,
          },
        });

        await writeContractAsync({
          ...contracts.Exchange.config,
          functionName: "fillOrder",
          args: [order.id],
        });

        logger.info({
          message: "订单填充成功",
          data: {
            orderId: order.id.toString(),
          },
        });

        reload();
      } catch (error) {
        logger.error({
          message: "合约执行失败：填充订单时发生错误",
          error,
          data: {
            orderId: order.id.toString(),
            orderType:
              order.orderType === contracts.Exchange.EOrderType.BUY
                ? "购买"
                : "出售",
            orderUser: order.user,
          },
        });
        throw error; // 重新抛出错误，以便toast能够捕获并显示
      }
    },
    {
      success: "订单已成功填充",
      error: "填充订单失败，请查看控制台了解详细错误信息",
    },
  );

  const cancelOrder = useAsyncFnWithToast(
    async (id: bigint) => {
      try {
        logger.info({
          message: "尝试取消订单",
          data: {
            orderId: id.toString(),
          },
        });

        await writeContractAsync({
          ...contracts.Exchange.config,
          functionName: "cancelOrder",
          args: [id],
        });

        logger.info({
          message: "订单取消成功",
          data: {
            orderId: id.toString(),
          },
        });

        reload();
      } catch (error) {
        logger.error({
          message: "合约执行失败：取消订单时发生错误",
          error,
          data: {
            orderId: id.toString(),
          },
        });
        throw error; // 重新抛出错误，以便toast能够捕获并显示
      }
    },
    {
      success: "订单已成功取消",
      error: "取消订单失败，请查看控制台了解详细错误信息",
    },
  );

  return {
    orders,
    fillOrder,
    cancelOrder,
    reload,
  };
};
