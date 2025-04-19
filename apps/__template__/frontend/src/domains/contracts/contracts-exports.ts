import { type CHAIN_ID_TO_CONTRACT_CONFIG } from "@pfl-wsr/template-contracts";

export * from "@pfl-wsr/template-contracts";

export type IContractsConfig =
  (typeof CHAIN_ID_TO_CONTRACT_CONFIG)[keyof typeof CHAIN_ID_TO_CONTRACT_CONFIG];

export * as LockTypes from "@pfl-wsr/template-contracts/typechain-types/Lock";
