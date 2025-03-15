import { useForm } from "@pfl-wsr/ui";
import { useState } from "react";
import { useWriteContract, useBalance } from "wagmi";
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
  const { data: ethBalance } = useBalance(); // 获取当前账户的ETH余额

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
          // 验证ETH余额是否足够支付交易费用
          if (!ethBalance || ethBalance.value === 0n) {
            throw new Error("ETH余额不足以支付交易费用");
          }

          // 如果是买单，检查ETH余额是否足够
          if (tab === contracts.Exchange.EOrderType.BUY) {
            // 买单需要支付ETH
            const requiredEth = amountGive;
            // 为gas预留0.01 ETH
            const gasAllowance = parseEther("0.01");

            if (!ethBalance || ethBalance.value < requiredEth + gasAllowance) {
              throw new Error(
                `ETH余额不足。下单需要至少 ${Number(requiredEth) / 1e18} ETH，另外需预留一些ETH用于支付gas费`,
              );
            }
          }

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

          // 成功后重置表单
          form.reset();
        } catch (error) {
          // 分析错误类型并提供更有意义的错误信息
          let errorMessage = "创建订单失败";

          if (error instanceof Error) {
            errorMessage = error.message;
          } else {
            // 分析可能的合约错误
            const errorString = String(error);

            // 常见错误模式匹配
            if (errorString.includes("insufficient funds")) {
              errorMessage = "ETH余额不足以支付交易费用";
            } else if (errorString.includes("execution reverted")) {
              if (errorString.includes("ether balance too low")) {
                errorMessage = "ETH余额不足";
              } else if (errorString.includes("token balance too low")) {
                errorMessage = "代币余额不足";
              }
            }
          }

          logger.error({
            message: `合约执行失败：${errorMessage}`,
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

          throw new Error(errorMessage); // 抛出更有意义的错误
        }
      },
    ),
    {
      success: "订单创建成功",
      error: (error) => {
        if (error instanceof Error) {
          return error.message;
        }
        return "创建订单失败，请查看控制台了解详细错误信息";
      },
    },
  );

  return {
    tab,
    setTab,
    form,
    onSubmit,
  };
}
