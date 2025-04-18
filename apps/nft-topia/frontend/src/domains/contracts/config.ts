import * as contracts from "@pfl-wsr/nft-topia-contracts";

export { contracts };

export type IContractsConfig =
  (typeof contracts.CHAIN_ID_TO_CONTRACT_CONFIG)[keyof typeof contracts.CHAIN_ID_TO_CONTRACT_CONFIG];
