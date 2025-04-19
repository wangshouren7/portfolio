import { useForm, useMemoizedFn } from "@pfl-wsr/ui";
import { useState } from "react";
import { useWriteContract } from "wagmi";
import { z } from "zod";
import { type Address, parseEther } from "viem";
import { useContractsConfigOfCurrentChain } from "../contracts/use-contract-configs";
import { EOrderType } from "../contracts/types";
import { ETHER_ADDRESS } from "../contracts/configs";

const NEW_ORDER_FORM_VALIDATION = z.object({
  price: z.coerce.number().gt(0),
  amount: z.coerce.number().gt(0),
});

export function useNewOrder() {
  const contractConfig = useContractsConfigOfCurrentChain();
  const [tab, setTab] = useState<EOrderType>(EOrderType.BUY);
  const form = useForm<
    z.infer<typeof NEW_ORDER_FORM_VALIDATION>,
    z.infer<typeof NEW_ORDER_FORM_VALIDATION>
  >({
    defaultValues: {},
    schema: NEW_ORDER_FORM_VALIDATION,
  });
  const { writeContractAsync } = useWriteContract();

  const onSubmit = useMemoizedFn(
    form.handleSubmit(async (values) => {
      const { price, amount } = values;
      let tokenGet: Address;
      let amountGet: bigint;
      let tokenGive: Address;
      let amountGive: bigint;

      if (tab === EOrderType.BUY) {
        tokenGet = contractConfig.Token.address;
        amountGet = parseEther(String(amount));
        tokenGive = ETHER_ADDRESS;
        amountGive = parseEther(String(price * amount)); // price here is how many ether per token
      } else {
        tokenGet = ETHER_ADDRESS;
        amountGet = parseEther(String(price * amount));
        tokenGive = contractConfig.Token.address;
        amountGive = parseEther(String(amount));
      }

      const tx = await writeContractAsync({
        ...contractConfig.Exchange,
        functionName: "makeOrder",
        args: [tokenGet, amountGet, tokenGive, amountGive],
      });

      return tx;
    }),
  );

  return {
    tab,
    setTab,
    form,
    onSubmit,
  };
}
