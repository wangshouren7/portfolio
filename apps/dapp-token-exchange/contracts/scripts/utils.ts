import { resolve } from "path";
import { existsSync } from "fs";

export async function getLocalhostDeployedAddressesJSON() {
  const addressFile = resolve(
    "ignition/deployments/chain-31337/deployed_addresses.json",
  );

  if (!existsSync(addressFile)) {
    throw new Error(`Address file ${addressFile} does not exist`);
  }

  return (await import(addressFile)) as Record<string, string>;
}
