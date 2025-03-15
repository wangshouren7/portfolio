import { type Chain, getDefaultConfig } from "@rainbow-me/rainbowkit";
import { mainnet, sepolia, hardhat, localhost } from "wagmi/chains";
import { ENABLE_TESTNETS, IS_DEV } from "./lib/env";

const ganache: Chain = {
  ...localhost,
  id: 1337,
  name: "Ganache",
  rpcUrls: {
    default: {
      http: ["http://localhost:7545"],
    },
  },
};

const sepoliaTest: Chain = {
  ...sepolia,
  rpcUrls: {
    default: {
      http: [process.env.NEXT_PUBLIC_SEPOLIA_TEST_RPC_URL ?? ""],
    },
  },
};

export const config = getDefaultConfig({
  appName: "Dapp Token Exchange",
  projectId: "YOUR_PROJECT_ID",
  chains: [
    mainnet,
    ...(IS_DEV ? [hardhat, ganache] : []),
    ...(ENABLE_TESTNETS ? [sepoliaTest] : []),
  ],
  ssr: true,
});
