# Cronos contract boilerplate: Hardhat 2 (ethers + TypeScript)

Example ERC20, ERC721 and ERC1155 contracts for Cronos EVM, built with Hardhat 2, ethers and TypeScript.

Contracts use OpenZeppelin `^5.6.0`, Solidity `0.8.28` and `evmVersion: cancun`.

## Contracts

- `contracts/MyERC20.sol` - ERC20 with Burnable, Pausable, Permit, AccessControl and Ownable.
- `contracts/MyERC721.sol` - ERC721 with URIStorage, Burnable, Pausable, AccessControl and Ownable.
- `contracts/MyERC1155.sol` - ERC1155 with Burnable, Pausable, Supply, AccessControl and Ownable.

## Setup

```bash
npm install
cp .env.example .env
```

Fill in `.env`:

- `PRIVATE_KEY` - private key of the deployment wallet (needs CRO for gas).
- `CRONOS_EXPLORER_MAINNET_API_KEY` / `CRONOS_EXPLORER_TESTNET_API_KEY` - explorer API keys for verification.

See the [Cronos Explorer API documentation](https://docs.cronos.com/block-explorers/block-explorer-and-api-keys) for how to get an API key.

## Build and test

```bash
npx hardhat compile
npx hardhat test
```

The tests run against Hardhat's in-process network, so they need no RPC access, funded wallet or `.env`.

## Deploy

```bash
npx hardhat run scripts/DeployMyERC20.script.ts --network cronosTestnet
npx hardhat run scripts/DeployMyERC721.script.ts --network cronosTestnet
npx hardhat run scripts/DeployMyERC1155.script.ts --network cronosTestnet
```

Swap `cronosTestnet` for `cronos` to deploy to mainnet.

## Verify

The Cronos Explorer API expects the API key inside the URL, which is already wired up in `hardhat.config.ts`. Pass the constructor arguments through the matching argument file:

```bash
npx hardhat verify --network cronosTestnet <ADDRESS> --constructor-args deploy-verification-arguments-erc20.js
npx hardhat verify --network cronosTestnet <ADDRESS>
npx hardhat verify --network cronosTestnet <ADDRESS> --constructor-args "https://example.com/api/token/{id}.json"
```

Once done, the contract shows as verified on the [Cronos Explorer](https://explorer.cronos.com).
