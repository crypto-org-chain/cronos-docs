# Foundry Boilerplate

#### Step 1. Enter the `foundry/` folder

```shell
cd cronos-contract-boilerplate/foundry/
```

#### Step 2. Install Foundry inside the folder

```bash
curl -L https://foundry.paradigm.xyz | bash && foundryup
```

#### Step 3. Install dependencies

```shell
forge install foundry-rs/forge-std@v1.16.2
forge install OpenZeppelin/openzeppelin-contracts@v5.6.0
```

The `@openzeppelin/` remapping is already set in `foundry.toml`.

#### Step 4. Config `.env`

Copy the environment file and fill it in:

```bash
cp .env.example .env
source .env
```

* `PRIVATE_KEY` - private key of the deployment wallet (needs CRO for gas).
* `CRONOS_EXPLORER_MAINNET_API_KEY` / `CRONOS_EXPLORER_TESTNET_API_KEY` - explorer API keys for verification.

#### Step 5. Review the contracts in `src/`

There are three example contracts in `src/`, one for each token standard. They all use `OpenZeppelin` and share the same style: minting and pausing are guarded by roles, and the deployer is set as the owner and role admin. They are the same contracts used in the Hardhat 2 and Hardhat 3 examples:

* `src/MyERC20.sol` is a fungible token. Its constructor takes a name and a symbol, and mints one million tokens to the deployer.
* `src/MyERC721.sol` is an NFT collection. Its constructor takes no arguments (the name and symbol are set inside the contract).
* `src/MyERC1155.sol` is a multi-token contract. Its constructor takes the metadata URI.

#### Step 6. Review the deploy scripts in `script/`

There is one script per contract:

* `script/MyERC20.s.sol` deploys `MyERC20` with a name and a symbol.
* `script/MyERC721.s.sol` deploys `MyERC721`, which takes no constructor arguments.
* `script/MyERC1155.s.sol` deploys `MyERC1155` with a metadata URI.

#### Step 7. Check the network settings

The Cronos networks are already set up in `foundry.toml`:

```javascript
# Cronos EVM RPC endpoints
[rpc_endpoints]
cronos_mainnet = "https://evm.cronos.com/"
cronos_testnet = "https://evm-t3.cronos.com/"

# Cronos Explorer verification endpoints.
# The API key is passed on the command line with --etherscan-api-key.
[etherscan]
cronos_mainnet = { key = "${CRONOS_EXPLORER_MAINNET_API_KEY}", chain = 25, url = "https://explorer-api.cronos.org/mainnet/api/v2" }
cronos_testnet = { key = "${CRONOS_EXPLORER_TESTNET_API_KEY}", chain = 338, url = "https://explorer-api.cronos.org/testnet/api/v2" }
```

#### Step 8. Build and test the contracts

```bash
forge build
forge test
```

#### Step 9. Deploy the contracts with scripts

Deploy to Testnet with `forge script` and scripts in `script/`:

*   ERC20:

    ```shell
    forge script script/MyERC20.s.sol:MyERC20Script --rpc-url cronos_testnet --broadcast
    ```
*   ERC721:

    ```shell
    forge script script/MyERC721.s.sol:MyERC721Script --rpc-url cronos_testnet --broadcast
    ```
*   ERC1155:

    ```shell
    forge script script/MyERC1155.s.sol:MyERC1155Script --rpc-url cronos_testnet --broadcast
    ```

Swap `cronos_testnet` for `cronos_mainnet` to deploy to mainnet.

#### Step 10. Verify the contract

*   ERC20:

    ```bash
    forge verify-contract <ADDRESS> src/MyERC20.sol:MyERC20 \
      --chain-id 338 \
      --verifier-url https://explorer-api.cronos.org/testnet/api/v2 \
      --etherscan-api-key $CRONOS_EXPLORER_TESTNET_API_KEY \
      --constructor-args $(cast abi-encode "constructor(string,string)" "My token name" "My token symbol")
    ```
*   ERC721:

    ```bash
    forge verify-contract <ADDRESS> src/MyERC721.sol:MyERC721 \
      --chain-id 338 \
      --verifier-url https://explorer-api.cronos.org/testnet/api/v2 \
      --etherscan-api-key $CRONOS_EXPLORER_TESTNET_API_KEY
    ```
*   ERC1155:

    ```bash
    forge verify-contract <ADDRESS> src/MyERC1155.sol:MyERC1155 \
      --chain-id 338 \
      --verifier-url https://explorer-api.cronos.org/testnet/api/v2 \
      --etherscan-api-key $CRONOS_EXPLORER_TESTNET_API_KEY \
    --constructor-args $(cast abi-encode "constructor(string)" "https://example.com/api/token/{id}.json")
    ```

For mainnet use `--chain-id 25`, `--verifier-url https://explorer-api.cronos.org/mainnet/api/v2` and `$CRONOS_EXPLORER_MAINNET_API_KEY`.
