# @pfl-wsr/template-contracts

This project demonstrates a basic Hardhat use case. It comes with a sample contract, a test for that contract, and a Hardhat Ignition module that deploys that contract.

## Local development

```bash
npx hardhat node
npm run compile
npm run deploy:localhost
```

## Sepolia testnet development

```bash
npx hardhat vars set SEPOLIA_TEST_PRIVATE_KEY
npm run compile
npm run deploy:sepolia
```
