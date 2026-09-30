# Hardhat 2 Boilerplate

#### Step 1. Enter the `hardhat/v2` folder

```shell
cd cronos-contract-boilerplate/hardhat/v2
```

#### Step 2. Run `npm install` inside the folder

```shell
npm install
```

#### Step 3. Config `.env`

Copy the environment file and fill it in:

```bash
cp .env.example .env
```

* `PRIVATE_KEY` - private key of the deployment wallet (needs CRO for gas).
* `CRONOS_EXPLORER_MAINNET_API_KEY` / `CRONOS_EXPLORER_TESTNET_API_KEY` - explorer API keys for verification.

#### Step 4. Review the contracts in `contracts/`

There are three example contracts, one for each token standard. They all use `OpenZeppelin` and share the same style: minting and pausing are guarded by roles, and the deployer is set as the owner and role admin. They are the same contracts used in the Foundry and Hardhat 3 examples:

* `contracts/MyERC20.sol` is a fungible token. Its constructor takes a name and a symbol, and mints one million tokens to the deployer.
* `contracts/MyERC721.sol` is an NFT collection. Its constructor takes no arguments (the name and symbol are set inside the contract).
* `contracts/MyERC1155.sol` is a multi-token contract. Its constructor takes the metadata URI.

#### Step 5. Build and test the contracts

```bash
npx hardhat compile
npx hardhat test
```

The tests run against Hardhat's in-process network, so they need no RPC access, funded wallet or `.env`.

#### Step 6. Review the deploy script in `scripts/`

There is one deploy script per contract. Each one gets the contract factory and calls `deploy` with the constructor arguments that contract needs, then prints the deployed address:

* `scripts/DeployMyERC20.script.ts` deploys `MyERC20` with a name and a symbol.
* `scripts/DeployMyERC721.script.ts` deploys `MyERC721`, which takes no constructor arguments.
* `scripts/DeployMyERC1155.script.ts` deploys `MyERC1155` with a metadata URI.

#### Step 7. Check the network settings

The Cronos networks are already set up in `hardhat.config.ts`:

```javascript
networks: {
    cronos: {
        url: "https://evm.cronos.com/",
        chainId: 25,
        accounts,
        gasPrice: 10100000000000,
    },
    cronosTestnet: {
        url: "https://evm-t3.cronos.com/",
        chainId: 338,
        accounts,
        gasPrice: 10100000000000,
    },
},
etherscan: {
    customChains: [
        {
            network: "cronos",
            chainId: 25,
            urls: {
                apiURL: "https://explorer-api.cronos.org/mainnet/api/v1/hardhat/contract?apikey=" + CRONOS_EXPLORER_MAINNET_API_KEY,
                browserURL: "https://explorer.cronos.com",
            },
        },
        {
            network: "cronosTestnet",
            chainId: 338,
            urls: {
                    apiURL: "https://explorer-api.cronos.org/testnet/api/v1/hardhat/contract?apikey=" + CRONOS_EXPLORER_TESTNET_API_KEY,
                    browserURL: "https://explorer.cronos.com/testnet",
            },
        },
    ],
},
```

#### Step 8. Deploy the contracts

Deploy to Testnet:

*   ERC20:

    ```bash
    npx hardhat run scripts/DeployMyERC20.script.ts   --network cronosTestnet
    ```
*   ERC721:

    ```bash
    npx hardhat run scripts/DeployMyERC721.script.ts  --network cronosTestnet
    ```
*   ERC1155:

    ```bash
    npx hardhat run scripts/DeployMyERC1155.script.ts --network cronosTestnet
    ```

To deploy to Mainnet, replace `--network cronosTestnet` with `--network cronos`.

#### Step 9. Verify the contract

Note the contract addresses from the console, and verify the contracts.

*   ERC20:

    ```bash
    npx hardhat verify --network cronosTestnet <ADDRESS> --constructor-args deploy-verification-arguments-erc20.js
    ```
*   ERC721:

    ```bash
    npx hardhat verify --network cronosTestnet <ADDRESS> --constructor-args deploy-verification-arguments-erc721.js
    ```
*   ERC1155:

    ```bash
    npx hardhat verify --network cronosTestnet <ADDRESS> --constructor-args deploy-verification-arguments-erc1155.js
    ```

To verify in Mainnet, replace `--network cronosTestnet` with `--network cronos`.
