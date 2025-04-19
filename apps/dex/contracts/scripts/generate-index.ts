import { writeFileSync } from "fs";
import { artifacts } from "hardhat";
import { getDeployedChainIdToAddresses, importEsm } from "./utils";

async function generateIndex() {
  const { constantCase } = (await importEsm(
    "change-case",
    // eslint-disable-next-line @typescript-eslint/consistent-type-imports
  )) as typeof import("change-case");
  const chainIdToAddresses = await getDeployedChainIdToAddresses();

  const contractNames = Object.keys(
    chainIdToAddresses[Object.keys(chainIdToAddresses)[0]],
  );

  const contracts = await Promise.all(
    contractNames.map(async (name) => {
      const abi = (await artifacts.readArtifact(name)).abi;
      const events = abi
        .filter((abi) => abi.type === "event")
        .reduce((acc, abi) => {
          acc[abi.name] = abi;
          return acc;
        }, {});
      return {
        name,
        abi,
        events,
      };
    }),
  );

  const code = `
  // The contract config for Frontend usage.
  // Automatically generated.

  export * from "./typechain-types";

  ${contracts
    .map((contract) => {
      return `
  export const ${constantCase(contract.name)}_ABI = ${JSON.stringify(contract.abi, null, 2)} as const;
  export const ${constantCase(contract.name)}_EVENTS = ${JSON.stringify(contract.events, null, 2)} as const;
  `;
    })
    .join("\n")}

  export const CHAIN_ID_TO_CONTRACT_CONFIG = {
    ${Object.entries(chainIdToAddresses)
      .map(([chainId, addresses]) => {
        return `
      ${chainId}: {
        ${contracts
          .map((contract) => {
            return `
          ${contract.name}: {
            address: "${addresses[contract.name]}",
            abi: ${constantCase(contract.name)}_ABI,
          },
          `;
          })
          .join("\n")}
      },
      `;
      })
      .join("\n")}
  } as const;
   
  `;

  writeFileSync(`./index.ts`, code);
}

generateIndex();
