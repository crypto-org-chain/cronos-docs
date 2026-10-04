# Cronos contract boilerplate

Example ERC20, ERC721 and ERC1155 contracts for the Cronos EVM chain, provided for three toolchains. Every subproject ships the same three contracts and can deploy and verify them on Cronos mainnet (chain id 25) and testnet (chain id 338).

All contracts use OpenZeppelin `^5.6.0`, Solidity `0.8.28` and `evmVersion: cancun`. The contract sources are identical across all three.

## Subprojects

| Folder | Toolchain | Deploy | Verify |
| --- | --- | --- | --- |
| [`foundry`](foundry/README.md) | Foundry (forge) | `forge script` | `forge verify-contract` |
| [`hardhat/v3`](hardhat/v3/README.md) | Hardhat 3 (viem + Ignition) | Ignition modules | `hardhat verify` |
| [`hardhat/v2`](hardhat/v2/README.md) | Hardhat 2 (ethers + TypeScript) | `hardhat run` scripts | `hardhat verify` |

Each folder is independent and has its own README, dependencies and setup steps.

## Tests

Every subproject ships the same test suite for all three contracts, covering
metadata, the initial supply, minting under `MINTER_ROLE`, rejection of minting
without that role, and the pause guard.

| Folder | Command | Local chain |
| --- | --- | --- |
| `foundry` | `forge test` | in-process (forge) |
| `hardhat/v3` | `npx hardhat test` | in-process (Hardhat) |
| `hardhat/v2` | `npx hardhat test` | in-process (Hardhat) |

None of them need RPC access, a funded wallet or a `.env` file.

## Contracts

- `MyERC20.sol` - ERC20 with Burnable, Pausable, Permit, AccessControl and Ownable.
- `MyERC721.sol` - ERC721 with URIStorage, Burnable, Pausable, AccessControl and Ownable.
- `MyERC1155.sol` - ERC1155 with Burnable, Pausable, Supply, AccessControl and Ownable.

## Cronos networks

| Network | Chain ID | RPC | Explorer |
| --- | --- | --- | --- |
| Mainnet | 25 | https://evm.cronos.com/ | https://explorer.cronos.com |
| Testnet | 338 | https://evm-t3.cronos.com/ | https://explorer.cronos.com/testnet |

## Verification

Both Hardhat and Foundry verify programmatically against the Cronos Explorer API. The API key is passed either inside the explorer apiUrl (Hardhat) or with `--etherscan-api-key` (Foundry). See the [Cronos Explorer API documentation](https://explorer-api-doc.cronos.org/testnet/) for how to get a key.