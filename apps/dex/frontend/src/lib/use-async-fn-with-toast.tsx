import { toast, useMemoizedFn } from "@pfl-wsr/ui";
import { type Hash, isHash } from "viem";
import { useGetTransactionUrl } from "./use-get-transaction-url";
import { usePublicClient } from "wagmi";

export const useTransactionFnWithToast = <
  T extends (...args: any) => Promise<Hash>,
>(
  fn: T,
) => {
  const runTransactionFn = useRunTransactionFnWithToast();

  return useMemoizedFn((...args: Parameters<T>) =>
    runTransactionFn(() => fn(...args)),
  );
};

export const useRunTransactionFnWithToast = () => {
  const getTransactionUrl = useGetTransactionUrl();
  const publicClient = usePublicClient();

  return useMemoizedFn(async (fn: () => Promise<Hash>) => {
    let toastId = toast.loading("Sending transaction, please wait...");

    try {
      const tx = String(await fn());
      const url = isHash(tx) ? getTransactionUrl(tx) : undefined;
      if (!url || !isHash(tx) || !publicClient) {
        toast.success("Transaction sent successfully", { id: toastId });
        return;
      }

      toastId = toast.loading(
        <div>
          Transaction is being sent, please wait
          <a className="ml-1 link" href={url} rel="noreferrer" target="_blank">
            confirming
          </a>
          ...
        </div>,
        {
          id: toastId,
        },
      );
      await publicClient?.waitForTransactionReceipt({ hash: tx });
      toast.success("Transaction confirmed", { id: toastId });
    } catch (error) {
      toast.error("Transaction sent failed", { id: toastId });
      throw error;
    }
  });
};
