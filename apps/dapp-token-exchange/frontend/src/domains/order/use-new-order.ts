import { useForm } from "@pfl-wsr/ui";
import { useState } from "react";
import { useWriteContract } from "wagmi";
import { z } from "zod";
import { type Address, parseEther } from "viem";
import { contracts } from "@/contracts";
import { useAsyncFnWithToast } from "@/lib/use-async-fn-with-toast";
import { logger } from "@/lib/logger";

const NEW_ORDER_FORM_VALIDATION = z.object({
  price: z.coerce.number().gt(0),
  amount: z.coerce.number().gt(0),
});

export function useNewOrder() {
  const [tab, setTab] = useState<contracts.Exchange.EOrderType>(
    contracts.Exchange.EOrderType.BUY,
  );
  const form = useForm<z.infer<typeof NEW_ORDER_FORM_VALIDATION>>({
    defaultValues: {},
    schema: NEW_ORDER_FORM_VALIDATION,
  });
  const { writeContractAsync } = useWriteContract();

  const onSubmit = useAsyncFnWithToast(
    form.handleSubmit(
      async (values: z.infer<typeof NEW_ORDER_FORM_VALIDATION>) => {
        const { price, amount } = values;
        let tokenGet: Address;
        let amountGet: bigint;
        let tokenGive: Address;
        let amountGive: bigint;

        if (tab === contracts.Exchange.EOrderType.BUY) {
          tokenGet = contracts.Token.config.address;
          amountGet = parseEther(String(amount));
          tokenGive = contracts.ETHER_ADDRESS;
          amountGive = parseEther(String(price * amount)); // price here is how many ether per token
        } else {
          tokenGet = contracts.ETHER_ADDRESS;
          amountGet = parseEther(String(price * amount));
          tokenGive = contracts.Token.config.address;
          amountGive = parseEther(String(amount));
        }

        try {
          logger.info({
            message: "尝试创建订单",
            data: {
              tokenGet,
              amountGet: amountGet.toString(),
              tokenGive,
              amountGive: amountGive.toString(),
              orderType:
                tab === contracts.Exchange.EOrderType.BUY ? "购买" : "出售",
            },
          });

          await writeContractAsync({
            ...contracts.Exchange.config,
            functionName: "makeOrder",
            args: [tokenGet, amountGet, tokenGive, amountGive],
          });

          logger.info({
            message: "订单创建成功",
            data: {
              tokenGet,
              amountGet: amountGet.toString(),
              tokenGive,
              amountGive: amountGive.toString(),
            },
          });
        } catch (error) {
          logger.error({
            message: "合约执行失败：创建订单时发生错误",
            error,
            data: {
              tokenGet,
              amountGet: amountGet.toString(),
              tokenGive,
              amountGive: amountGive.toString(),
              orderType:
                tab === contracts.Exchange.EOrderType.BUY ? "购买" : "出售",
            },
          });
          throw error; // 重新抛出错误，以便toast能够捕获并显示
        }
      },
    ),
    {
      success: "订单创建成功",
      error: "订单创建失败，请查看控制台了解详细错误信息",
    },
  );

  return {
    tab,
    setTab,
    form,
    onSubmit,
  };
}
