# Hardhat 3 Boilerplate

The sample Hardhat 3 project uses `viem` and `Hardhat Ignition` instead of `ethers` and plain scripts. It needs `Node.js 22` or newer.

#### Step 1. Enter the `hardhat/v3` folder

```shell
cd cronos-contract-boilerplate/hardhat/v3
```

#### Step 2. Run `npm install` inside the folder

```shell
npm install
```

#### Step 3. Store your secrets

Store your private key:

```bash
npx hardhat keystore set PRIVATE_KEY
```

You will be prompted for a keystore password (first time only) and then for the value. It's recommended to store your Explorer API key in keystore rather than hardcoding it in your `.env` :

```bash
npx hardhat keystore set CRONOS_EXPLORER_TESTNET_API_KEY
npx hardhat keystore set CRONOS_EXPLORER_MAINNET_API_KEY
```

#### Step 4. Review the contracts in `contracts/`

There are three example contracts, one for each token standard. They all use `OpenZeppelin` and share the same style: minting and pausing are guarded by roles, and the deployer is set as the owner and role admin. They are the same contracts used in the Foundry and Hardhat 2 examples:

* `contracts/MyERC20.sol` is a fungible token. Its constructor takes a name and a symbol, and mints one million tokens to the deployer.
* `contracts/MyERC721.sol` is an NFT collection. Its constructor takes no arguments (the name and symbol are set inside the contract).
* `contracts/MyERC1155.sol` is a multi-token contract. Its constructor takes the metadata URI.

#### Step 5. Build and test the contracts

```bash
npx hardhat compile
npx hardhat test
```

The tests use `viem` and Node's built-in `node:test` runner against an in-process network created with `network.create()`, so they need no RPC access or funded wallet.

#### Step 6. Review the Ignition modules in `ignition/modules/`

There is one module per contract. Each one calls `m.contract` with the constructor arguments that contract needs. Arguments are declared with `m.getParameter`, so you can override them at deploy time with `--parameters`.

* `ignition/modules/MyERC20.ts` deploys `MyERC20` with a name and a symbol.
* `ignition/modules/MyERC721.ts` deploys `MyERC721`, which takes no constructor arguments.
* `ignition/modules/MyERC1155.ts` deploys `MyERC1155` with a metadata URI.

#### Step 7. Check the network settings

The Cronos networks are already set up in `hardhat.config.ts`:

<pre class="language-typescript"><code class="lang-typescript">networks: {
  cronos: {
    type: "http",
    chainType: "l1",
    url: "https://evm.cronos.com/",
    chainId: 25,
    accounts: [configVariable("PRIVATE_KEY")],
    gasPrice: 10100000000000,
  },
  cronosTestnet: {
    type: "http",
    chainType: "l1",
    url: "https://evm-t3.cronos.com/",
    chainId: 338,
    accounts: [configVariable("PRIVATE_KEY")],
    gasPrice: 10100000000000,
  },
},
chainDescriptors: {
  25: {
    name: "cronos",
    blockExplorers: {
      etherscan: {
        name: "Cronos Explorer",
        url: "https://explorer.cronos.com",
        apiUrl:
          "https://explorer-api.cronos.org/mainnet/api/v2",
      },
    },
  },
  338: {
    name: "cronosTestnet",
    blockExplorers: {
      etherscan: {
        name: "Cronos Explorer Testnet",
        url: "https://explorer.cronos.com/testnet",
        apiUrl: "https://explorer-api.cronos.org/testnet/api/v2",
      },
    },
<strong>  },
</strong>},
verify: {
  etherscan: {
    apiKey: networkArg === "cronos"
      ? configVariable("CRONOS_EXPLORER_MAINNET_API_KEY") ?? ""
      : networkArg === "cronosTestnet"
        ? configVariable("CRONOS_EXPLORER_TESTNET_API_KEY") ?? ""
        : "",
  },
},
</code></pre>

#### Step 8. Deploy the contracts

Deploy to testnet with Hardhat Ignition:

*   ERC20:

    ```bash
    npx hardhat ignition deploy ignition/modules/MyERC20.ts --network cronosTestnet
    ```
*   ERC721:

    ```bash
    npx hardhat ignition deploy ignition/modules/MyERC721.ts --network cronosTestnet
    ```
*   ERC1155:

    ```bash
    npx hardhat ignition deploy ignition/modules/MyERC1155.ts --network cronosTestnet
    ```

To deploy to Mainnet, replace `--network cronosTestnet` with `--network cronos`.

#### Step 9. Verify the contract

Ignition prints the deployed address for each module, verify the deployed contracts with hardhat verify.

*   ERC20:

    ```bash
    npx hardhat verify --network cronosTestnet <ADDRESS> "My token name" "My token symbol"
    ```
*   ERC721:

    ```bash
    npx hardhat verify --network cronosTestnet <ADDRESS>
    ```
*   ERC1155:

    ```bash
    npx hardhat verify --network cronosTestnet <ADDRESS> "https://example.com/api/token/{id}.json"
    ```

To verify in Mainnet, replace `--network cronosTestnet` with `--network cronos`.
