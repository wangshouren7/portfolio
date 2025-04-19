"use client";
import { useChainId } from "wagmi";
import { contracts } from "./contracts";
import { values } from "lodash-es";

export function useContractsConfigOfCurrentChain() {
  const chainId = useChainId();

  if (!(chainId in contracts.CHAIN_ID_TO_CONTRACT_CONFIG)) {
    return values(contracts.CHAIN_ID_TO_CONTRACT_CONFIG)[0];
  }

  const config =
    contracts.CHAIN_ID_TO_CONTRACT_CONFIG[
      chainId as keyof typeof contracts.CHAIN_ID_TO_CONTRACT_CONFIG
    ];

  return config;
}
