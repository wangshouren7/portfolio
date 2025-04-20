# NFT Topia

[Online site](https://nft-topia.wangshouren.site/)

NFT Topia is a blockchain-based platform for trading and showcasing NFTs (Non-Fungible Tokens). Users can create, display, and trade their digital artworks and collectibles on the platform. Join the revolution of digital art and explore a world of unique NFTs.

## Features

- **Create NFTs**: Users can upload digital artworks and mint them as NFTs, turning their creations into unique digital assets.
- **NFT Showcase**: Browse and display all listed NFTs, featuring a wide range of digital art and collectibles.
- **Personal Collection**: View and manage personal NFT collections, keeping track of your digital assets.
- **NFT Trading**: Buy and sell NFTs with cryptocurrency support, enabling seamless transactions in the digital art market.
- **Multi-language Support**: Internationalization through next-intl, making the platform accessible to a global audience.

## Tech Stack

- Next.js 15
- React 19
- TypeScript
- Tailwind CSS
- DaisyUI
- RainbowKit & Wagmi (Blockchain connection)
- Viem (Ethereum interaction)
- Storybook (Component development)

## Development Guide

### Install Dependencies

```bash
pnpm install
```

### Development Mode

```bash
pnpm dev
```

The application will run at [http://localhost:3000](http://localhost:3000).

### Build for Production

```bash
pnpm build
```

### Start Production Server

```bash
pnpm start
```

### Run Storybook

```bash
pnpm storybook
```

Storybook will run at [http://localhost:6006](http://localhost:6006).

## Project Structure

- `src/app` - Next.js application pages
- `src/domains` - Business domain modules
- `src/modules` - Feature modules
- `src/i18n` - Internationalization configuration

## Common Issues

### uncaughtException [TypeError: Cannot read properties of undefined (reading 'length')]

When executing `npm run build`, this error may occur. Solution:

```bash
rm -rf ./.next
```

Then rebuild.
