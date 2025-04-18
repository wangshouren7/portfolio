// This setup uses Hardhat Ignition to manage smart contract deployments.
// Learn more about it at https://hardhat.org/ignition

import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const NftMarketplaceModule = buildModule("NFTMarketplaceModule", (m) => {
  // Deploy the NFT marketplace contract
  const nftMarketplace = m.contract("NFTMarketplace", []);

  return { nftMarketplace };
});

export default NftMarketplaceModule;
