"use client";

import {
  type IComponentBaseProps,
  mp,
  ReloadIcon,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@pfl-wsr/ui";
import React from "react";
import { useAccount } from "wagmi";
import { useOrders } from "@/domains/order/use-orders";
import { PanelCard } from "./panel-card";
import { throttle } from "lodash-es";
import { AsyncButton } from "./async-button";
import { useBalanceUI } from "@/domains/balance/use-balance-ui";
import { EOrderStatus, EOrderType } from "@/domains/contracts/types";
import { useContractsConfigOfCurrentChain } from "@/domains/contracts/use-contract-configs";

/** TODO sort filters */
export const OrderBook: React.FC<IComponentBaseProps> = (props) => {
  const contractConfig = useContractsConfigOfCurrentChain();
  const { address: account } = useAccount();
  const { orders, fillOrder, reload } = useOrders();
  const { tokensMap } = useBalanceUI();

  const buyOrders = orders?.[EOrderStatus.PENDING]?.[EOrderType.BUY];
  const sellOrders = orders?.[EOrderStatus.PENDING]?.[EOrderType.SELL];

  return mp(
    props,
    <PanelCard
      action={<ReloadIcon cursor="pointer" onClick={reload} />}
      title={"Order Book"}
    >
      <Tabs defaultValue={EOrderType.BUY}>
        <TabsList>
          <TabsTrigger value={EOrderType.BUY}>Buy Orders</TabsTrigger>
          <TabsTrigger value={EOrderType.SELL}>Sell Orders</TabsTrigger>
        </TabsList>

        <TabsContent value={EOrderType.BUY}>
          <Table>
            <TableBody>
              <TableRow>
                <TableCell>DApp</TableCell>
                <TableCell>DApp/ETH</TableCell>
                <TableCell>ETH</TableCell>
                <TableCell>Operations</TableCell>
              </TableRow>

              {buyOrders
                ?.sort((a, b) => b.tokenPrice - a.tokenPrice)
                .map((order) => (
                  <TableRow key={order.id}>
                    <TableCell>{order.tokenAmountFormatted}</TableCell>
                    <TableCell>{order.tokenPriceFormatted}</TableCell>
                    <TableCell>{order.etherAmountFormatted}</TableCell>
                    <TableCell>
                      {order.user !== account &&
                        tokensMap[contractConfig.Token.address] &&
                        tokensMap[contractConfig.Token.address]
                          .exchangeAmount! >= order.amountGet && (
                          <AsyncButton
                            variant={"secondary"}
                            onClick={throttle(() => fillOrder(order))}
                          >
                            Fill Order
                          </AsyncButton>
                        )}
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TabsContent>

        <TabsContent value={EOrderType.SELL}>
          <Table>
            <TableBody>
              <TableRow>
                <TableCell>DApp</TableCell>
                <TableCell>DApp/ETH</TableCell>
                <TableCell>ETH</TableCell>
                <TableCell>Operations</TableCell>
              </TableRow>

              {sellOrders
                ?.sort((a, b) => b.tokenPrice - a.tokenPrice)
                .map((order) => (
                  <TableRow key={order.id}>
                    <TableCell>{order.tokenAmountFormatted}</TableCell>
                    <TableCell>{order.tokenPriceFormatted}</TableCell>
                    <TableCell>{order.etherAmountFormatted}</TableCell>
                    <TableCell>
                      {order.user !== account &&
                        tokensMap[contractConfig.Exchange.address] &&
                        tokensMap[contractConfig.Exchange.address]
                          .exchangeAmount! >= order.amountGive && (
                          <AsyncButton
                            variant={"secondary"}
                            onClick={throttle(() => fillOrder(order))}
                          >
                            Fill Order
                          </AsyncButton>
                        )}
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TabsContent>
      </Tabs>
    </PanelCard>,
  );
};
