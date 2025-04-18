# @pfl-wsr/nft-topia-contracts

## Local development

```bash
npx hardhat node
npm run compile
npm run deploy:localhost
```

## Generate index.ts file used by frontend and scripts

After all deployments, just run:

```bash
npm run generate-index
```

Then you will see the `index.ts` file under the directory.

## Locally seed data after deployment

```bash
npx hardhat vars set NEXT_PUBLIC_PINATA_GATEWAY_URL
npx hardhat vars set PINATA_JWT
npx hardhat run ./scripts/seed.ts --network localhost
```

`NEXT_PUBLIC_PINATA_GATEWAY_URL` value:

```bash
purple-electoral-manatee-423.mypinata.cloud
```

`PINATA_JWT` value:

```bash
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiJhNGY4NWI5MC05ZGFjLTQ5ZmUtODAyZi01MWZhYmZkZmI5MmQiLCJlbWFpbCI6IndhbmdzaG91cmVuMTE2QGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJwaW5fcG9saWN5Ijp7InJlZ2lvbnMiOlt7ImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxLCJpZCI6IkZSQTEifSx7ImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxLCJpZCI6Ik5ZQzEifV0sInZlcnNpb24iOjF9LCJtZmFfZW5hYmxlZCI6ZmFsc2UsInN0YXR1cyI6IkFDVElWRSJ9LCJhdXRoZW50aWNhdGlvblR5cGUiOiJzY29wZWRLZXkiLCJzY29wZWRLZXlLZXkiOiIxMjFhOGRmYTU3MDY0NzEwM2Q4MiIsInNjb3BlZEtleVNlY3JldCI6IjdmYzNmZGVkOTQ2OWQ1YTUyZDZlMjQ3M2Q5ZGIwYmEzOGE0ODgzMDE4MDM2NmEyZWQzOWE1NGI0ZmQ1YzQzOTciLCJleHAiOjE3NzYxNzQ1NzJ9.vllUULbbhh-Y6gCU6NJwC4ldiweit_eUNntNEBmvwY8
```

## Sepolia testnet development

```bash
npx hardhat vars set SEPOLIA_TEST_RPC_URL
npx hardhat vars set SEPOLIA_TEST_PRIVATE_KEY
npm run compile
npm run deploy:sepolia
```

## Verify Contract in Sepolia

```bash
npx hardhat vars set ETHERSCAN_API_KEY
npx hardhat verify --network sepolia [DEPLOYED_CONTRACT_ADDRESS]
```

## Handle errors

```bash
 npx hardhat ignition deploy ./ignition/modules/NFTMarketPlace.ts --network sepolia

Debugger attached.
npm warn using --force Recommended protections disabled.
Debugger attached.
✔ Confirm deploy to network sepolia (11155111)? … yes
[ NFTMarketplaceModule ] reconciliation failed ⛔

The module contains changes to executed futures:

NFTMarketplaceModule#NFTMarketplace:
 - Artifact bytecodes have been changed

Consider modifying your module to remove the inconsistencies with deployed futures.
```

solve:

```bash
rm -rf ./ignition/deployments
```
