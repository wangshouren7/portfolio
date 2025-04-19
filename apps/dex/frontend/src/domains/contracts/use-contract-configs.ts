import { useChainId } from "wagmi";
import { contracts2 } from "./configs";
import { values } from "lodash-es";

export function useContractsConfigOfCurrentChain() {
  const chainId = useChainId();

  if (!(chainId in contracts2.CHAIN_ID_TO_CONTRACT_CONFIG)) {
    return values(contracts2.CHAIN_ID_TO_CONTRACT_CONFIG)[0];
  }

  const config =
    contracts2.CHAIN_ID_TO_CONTRACT_CONFIG[
      chainId as keyof typeof contracts2.CHAIN_ID_TO_CONTRACT_CONFIG
    ];

  return config;
}
