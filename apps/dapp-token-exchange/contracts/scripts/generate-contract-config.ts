import { writeFileSync } from "fs";
import { artifacts } from "hardhat";
import { format } from "prettier";
import { getLocalhostDeployedAddressesJSON } from "./utils";

async function generateContractConfig(contractName: string) {
  const address = (await getLocalhostDeployedAddressesJSON())[
    `${contractName}Module#${contractName}`
  ];

  const config = await artifacts.readArtifact(contractName);

  const contractConfig = {
    address,
    abi: config.abi,
  };

  const events = config.abi
    .filter((abi) => abi.type === "event")
    .reduce((acc, abi) => {
      acc[abi.name] = abi;
      return acc;
    }, {});

  const code = `
  /**
   * The contract config for Frontend usage.
   * 
   * Automatically generated.
   * /
  const ${`${contractName}_Contract_Config`.toUpperCase()} = ${JSON.stringify(contractConfig, null, 2)} as const;

    const ${`${contractName}_Contract_Events`.toUpperCase()} = ${JSON.stringify(events, null, 2)} as const;

    export { ${`${contractName}_Contract_Config`.toUpperCase()} , ${`${contractName}_Contract_Events`.toUpperCase()}  };
    `;

  writeFileSync(
    `./contracts/${contractName}.ts`,
    await format(code, { parser: "typescript" }),
  );
}

generateContractConfig("Exchange");
generateContractConfig("Token");
