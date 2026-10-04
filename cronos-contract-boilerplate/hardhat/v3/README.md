# Cronos contract boilerplate: Hardhat 3 (viem + Ignition)

Example ERC20, ERC721 and ERC1155 contracts for Cronos EVM, built with Hardhat 3, viem and Hardhat Ignition.

Contracts use OpenZeppelin `^5.6.0`, Solidity `0.8.28` and `evmVersion: cancun`.

Hardhat 3 is ESM-first, so this subproject uses `"type": "module"` and the plugin based config (`plugins: [hardhatToolboxViem]`).

## Contracts

- `contracts/MyERC20.sol` - ERC20 with Burnable, Pausable, Permit, AccessControl and Ownable.
- `contracts/MyERC721.sol` - ERC721 with URIStorage, Burnable, Pausable, AccessControl and Ownable.
- `contracts/MyERC1155.sol` - ERC1155 with Burnable, Pausable, Supply, AccessControl and Ownable.

## Setup

Hardhat 3 requires Node.js 22.13.0 or later.

Store your secretes with keystore:

```bash
npx hardhat keystore set PRIVATE_KEY
npx hardhat keystore set CRONOS_EXPLORER_TESTNET_API_KEY
npx hardhat keystore set CRONOS_EXPLORER_MAINNET_API_KEY
```

See the [Cronos Explorer API documentation](https://docs.cronos.com/block-explorers/block-explorer-and-api-keys) for how to get an API key.

## Build and test

```bash
npx hardhat compile
npx hardhat test
```

The tests use viem and Node's built-in `node:test` runner against an in-process network created with `network.create()`, so they need no RPC access or funded wallet.

## Deploy

Hardhat 3 deploys through Ignition modules:

```bash
npx hardhat ignition deploy ignition/modules/MyERC20.ts --network cronosTestnet
npx hardhat ignition deploy ignition/modules/MyERC721.ts --network cronosTestnet
npx hardhat ignition deploy ignition/modules/MyERC1155.ts --network cronosTestnet
```

Swap `cronosTestnet` for `cronos` to deploy to mainnet.

## Verify

The Cronos Explorer API expects the API key inside the apiUrl, which is already wired up in the `chainDescriptors` block of `hardhat.config.ts`:

```bash
npx hardhat verify --network cronosTestnet <ADDRESS> "My token name" "My token symbol"
```

For `MyERC721` pass no constructor arguments, and for `MyERC1155` pass the metadata URI. Once done, the contract shows as verified on the [Cronos Explorer](https://explorer.cronos.com).
