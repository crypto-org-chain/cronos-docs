# Cronos contract boilerplate: Foundry

Example ERC20, ERC721 and ERC1155 contracts for Cronos EVM, built with Foundry (forge).

Contracts use OpenZeppelin `^5.6.0`, Solidity `0.8.28` and `evmVersion: cancun`.

## Contracts

- `src/MyERC20.sol` - ERC20 with Burnable, Pausable, Permit, AccessControl and Ownable.
- `src/MyERC721.sol` - ERC721 with URIStorage, Burnable, Pausable, AccessControl and Ownable.
- `src/MyERC1155.sol` - ERC1155 with Burnable, Pausable, Supply, AccessControl and Ownable.

## Setup

Install Foundry if you have not already (see the [Foundry book](https://book.getfoundry.sh/getting-started/installation)):

```bash
curl -L https://foundry.paradigm.xyz | bash
foundryup
```

Install the dependencies:

```bash
forge install foundry-rs/forge-std@v1.16.2
forge install OpenZeppelin/openzeppelin-contracts@v5.6.0
```

The `@openzeppelin/` remapping is already set in `foundry.toml`.

Copy the environment file and fill it in:

```bash
cp .env.example .env
source .env
```

- `PRIVATE_KEY` - private key of the deployment wallet (needs CRO for gas).
- `CRONOS_EXPLORER_MAINNET_API_KEY` / `CRONOS_EXPLORER_TESTNET_API_KEY` - explorer API keys for verification.

See the [Cronos Explorer API documentation](https://docs.cronos.com/block-explorers/block-explorer-and-api-keys) for how to get an API key.

## Build and test

```bash
forge build
forge test
```

## Deploy

```bash
forge script script/MyERC20.s.sol:MyERC20Script --rpc-url cronos_testnet --broadcast
forge script script/MyERC721.s.sol:MyERC721Script --rpc-url cronos_testnet --broadcast
forge script script/MyERC1155.s.sol:MyERC1155Script --rpc-url cronos_testnet --broadcast
```

Swap `cronos_testnet` for `cronos_mainnet` to deploy to mainnet.

## Verify

```bash
forge verify-contract <ADDRESS> src/MyERC20.sol:MyERC20 \
  --chain-id 338 \
  --verifier-url https://explorer-api.cronos.org/testnet/api/v2 \
  --etherscan-api-key $CRONOS_EXPLORER_TESTNET_API_KEY \
  --constructor-args $(cast abi-encode "constructor(string,string)" "My token name" "My token symbol")
```

`MyERC721` takes no constructor arguments (drop `--constructor-args`), and `MyERC1155` takes the metadata URI:

```bash
--constructor-args $(cast abi-encode "constructor(string)" "https://example.com/api/token/{id}.json")
```

For mainnet use `--chain-id 25`, `--verifier-url https://explorer-api.cronos.org/mainnet/api/v2` and `$CRONOS_EXPLORER_MAINNET_API_KEY`.
