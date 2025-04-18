"use client";
import {
  useAccount,
  useChainId,
  usePublicClient,
  useReadContract,
  useWatchContractEvent,
  useWriteContract,
} from "wagmi";
import { contracts } from "./config";
import { values } from "lodash-es";
import { useAsync, useMemoizedFn } from "@pfl-wsr/ui";
import { useRunTransactionFnWithToast } from "@/modules/web3/use-async-fn-with-toast";
import { useRouter } from "next/navigation";
import { pathnames } from "../routes";
import { marketItemToNft } from "./transformer";

function useContractsConfigOfCurrentChain() {
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

function useListingPrice() {
  const configs = useContractsConfigOfCurrentChain();
  return useReadContract({
    ...configs.NFTMarketplace,
    functionName: "getListingPrice",
  });
}

export function useCreateToken() {
  const configs = useContractsConfigOfCurrentChain();
  const { writeContractAsync } = useWriteContract();
  const { data: listingPrice } = useListingPrice();
  const runTx = useRunTransactionFnWithToast();
  const router = useRouter();

  return useMemoizedFn(async (tokenURI: string, price: bigint) => {
    if (listingPrice == null) {
      return;
    }

    await runTx(async () => {
      const hash = await writeContractAsync({
        ...configs.NFTMarketplace,
        functionName: "createToken",
        args: [tokenURI, price],
        value: listingPrice,
      });

      return hash;
    });

    router.push(pathnames.myNft());
  });
}

export function useFetchMarketItems() {
  const configs = useContractsConfigOfCurrentChain();

  useWatchContractEvent({
    ...configs.NFTMarketplace,
    eventName: "MarketItemCreated",
    onLogs: () => {
      ret.refetch();
    },
  });

  useWatchContractEvent({
    ...configs.NFTMarketplace,
    eventName: "MarketItemSold",
    onLogs: () => {
      ret.refetch();
    },
  });

  useWatchContractEvent({
    ...configs.NFTMarketplace,
    eventName: "MarketItemRelisted",
    onLogs: () => {
      ret.refetch();
    },
  });

  const ret = useReadContract({
    ...configs.NFTMarketplace,
    functionName: "fetchMarketItems",
  });

  return ret;
}

export function useNfts() {
  const { data } = useFetchMarketItems();
  const configs = useContractsConfigOfCurrentChain();
  const client = usePublicClient();

  return useAsync(async () => {
    if (!client || !data) {
      return;
    }

    return Promise.all(
      data.map(async (x) => marketItemToNft(x, client, configs)),
    );
  }, [data, client, configs]);
}

export function useFetchMyNfts() {
  const { address } = useAccount();
  const configs = useContractsConfigOfCurrentChain();
  return useReadContract({
    ...configs.NFTMarketplace,
    functionName: "fetchMyNFTs",
    account: address,
  });
}

export function useMyNfts() {
  const configs = useContractsConfigOfCurrentChain();
  const { data } = useFetchMyNfts();
  const client = usePublicClient();

  return useAsync(async () => {
    if (!client || !data) {
      return;
    }

    return Promise.all(
      data.map(async (x) => marketItemToNft(x, client, configs)),
    );
  }, [data, client, configs]);
}

export function useFetchItemsListed() {
  const { address } = useAccount();
  const configs = useContractsConfigOfCurrentChain();
  return useReadContract({
    ...configs.NFTMarketplace,
    functionName: "fetchItemsListed",
    account: address,
  });
}

export function useItemsListed() {
  const { data } = useFetchItemsListed();
  const configs = useContractsConfigOfCurrentChain();
  const client = usePublicClient();
  return useAsync(async () => {
    if (!client || !data) {
      return;
    }

    return Promise.all(
      data.map(async (x) => marketItemToNft(x, client, configs)),
    );
  }, [data, client, configs]);
}

export function useNftDetail(tokenId: string) {
  const configs = useContractsConfigOfCurrentChain();
  const client = usePublicClient();
  return useAsync(async () => {
    if (!client) {
      return null;
    }

    const [, seller, owner, price, sold] = await client.readContract({
      ...configs.NFTMarketplace,
      functionName: "idToMarketItem",
      args: [BigInt(tokenId)],
    });

    return marketItemToNft(
      { tokenId, seller, owner, price, sold },
      client,
      configs,
    );
  }, [client, configs, tokenId]);
}

export function useCreateMarketSale() {
  const configs = useContractsConfigOfCurrentChain();
  const { writeContractAsync } = useWriteContract();
  const runTx = useRunTransactionFnWithToast();
  const client = usePublicClient();

  return useMemoizedFn(async (tokenId: string) => {
    if (!client) {
      return;
    }

    await runTx(async () => {
      const [, , , price] = await client.readContract({
        ...configs.NFTMarketplace,
        functionName: "idToMarketItem",
        args: [BigInt(tokenId)],
      });

      return await writeContractAsync({
        ...configs.NFTMarketplace,
        functionName: "createMarketSale",
        args: [BigInt(tokenId)],
        value: price,
      });
    });
  });
}

export function useResellToken() {
  const configs = useContractsConfigOfCurrentChain();
  const { writeContractAsync } = useWriteContract();
  const runTx = useRunTransactionFnWithToast();
  const client = usePublicClient();
  const { data: listingPrice } = useListingPrice();

  return useMemoizedFn(async (tokenId: string, price: bigint) => {
    if (!client || listingPrice == null) {
      return;
    }

    await runTx(async () => {
      return await writeContractAsync({
        ...configs.NFTMarketplace,
        functionName: "resellToken",
        args: [BigInt(tokenId), price],
        value: listingPrice,
      });
    });
  });
}
