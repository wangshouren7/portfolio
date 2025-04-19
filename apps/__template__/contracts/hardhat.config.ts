import { vars, type HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "@nomicfoundation/hardhat-verify";
import { set } from "lodash";

const config: HardhatUserConfig = {
  solidity: "0.8.28",
  networks: {
    ganache: {
      url: "http://localhost:7545",
      accounts: [
        "0x341afa1e065408123210c5d54d1c8813f0db99fbc172f9fc388b60040f627f5b",
      ],
    },
  },
};

if (vars.has("SEPOLIA_TEST_PRIVATE_KEY") && vars.has("SEPOLIA_TEST_RPC_URL")) {
  set(config, "networks.sepolia", {
    url: vars.get("SEPOLIA_TEST_RPC_URL"),
    accounts: [vars.get("SEPOLIA_TEST_PRIVATE_KEY")],
  });
}

if (vars.has("ETHERSCAN_API_KEY")) {
  set(config, "etherscan.apiKey", vars.get("ETHERSCAN_API_KEY"));
  set(config, "sourcify.enabled", true);
}

export default config;
