# Portfolio of Shouren Wang

A modern monorepo showcasing full-stack development capabilities, featuring a portfolio website, a decentralized token exchange platform, and an NFT marketplace.

## Overview

This repository contains multiple applications built with modern web technologies, smart contracts, and DevOps practices. It demonstrates proficiency in frontend development, blockchain technology, and cloud deployment strategies.

## Apps

| name      | description                                                          | online site                        | code                      |
| --------- | -------------------------------------------------------------------- | ---------------------------------- | ------------------------- |
| Portfolio | Personal portfolio website                                           | https://portfolio.wangshouren.site | [code](./apps/portfolio/) |
| Dex       | Decentralized token exchange platform supporting ERC20 token trading | https://dex.wangshouren.site       | [code](./apps/dex)        |
| NFT Topia | NFT marketplace for minting, trading, and collecting digital assets  | https://nft-topia.wangshouren.site | [code](./apps/nft-topia)  |

## Skill stack

| Domain             | Technologies                                                                                                                |
| ------------------ | --------------------------------------------------------------------------------------------------------------------------- |
| Frontend           | - Next.js (React Framework)<br>- TypeScript<br>- TailwindCSS<br>- Three.js (3D Graphics)<br>- Standalone Mode Support       |
| Blockchain         | - Solidity ^0.8.28<br>- Hardhat<br>- ERC20 Token Standard<br>- ERC721/ERC1155 NFT Standards<br>- Smart Contract Development |
| Testing            | - Playwright<br>- Vitest<br>- GitHub Actions CI                                                                             |
| DevOps             | - Docker Multi-stage Builds<br>- GitHub Container Registry<br>- Multi-architecture Support (linux/amd64, linux/arm64)       |
| Development Tools  | - Git<br>- GitHub Actions<br>- VSCode<br>- Docker                                                                           |
| Project Management | - Monorepo (Turborepo)<br>- pnpm Workspace<br>- Remote Caching                                                              |
| Code Quality       | - ESLint<br>- TypeScript Strict Mode<br>- Automated Testing                                                                 |

## Getting Started

### Prerequisites

- Node.js 18 or later
- pnpm 8 or later
- Docker (for containerized deployment)

### Installation

1. Clone the repository

2. Install dependencies

```bash
pnpm install
```

### Enable Eslint of this workspace

Add this setting to vscode settings.json.

```json
{
  "eslint.workingDirectories": [
    {
      "mode": "auto"
    }
  ]
}
```

## Development

### Project Structure

```bash
.
├── apps/
│   ├── portfolio/
│   │   └── frontend/         # Portfolio website
│   ├── dex/
│   │   ├── frontend/         # DApp frontend
│   │   └── contracts/        # Smart contracts
│   └── nft-topia/
│       ├── frontend/         # NFT marketplace frontend
│       └── contracts/        # NFT smart contracts
├── packages/
│   └── configs/             # Shared configurations
├── docker/                  # Docker configurations
└── .github/
    └── workflows/          # CI/CD pipelines
```

### Available Scripts

```bash
# Development
pnpm turbo dev             # Start development servers
pnpm turbo build           # Build all applications
pnpm turbo test            # Run tests
pnpm turbo lint            # Run linting
pnpm turbo compile         # Compile contracts
```

### Code Style

- Follow TypeScript strict mode
- Use ESLint for code linting
- Follow conventional commits

## CI/CD Pipeline

The repository includes GitHub Actions workflows for:

- Automated testing
- Docker image building
- Container registry publishing
- Multi-architecture support

## License

This project is licensed under the MIT License
