---
description: >-
  Build a Truffle project from scratch, configure it for Cronos EVM, and deploy
  a sample contract with migrations.
hidden: true
---

# Truffle

{% hint style="danger" %}
**Truffle and Ganache reached end of support in 2023 and are no longer maintained.** This page exists for teams maintaining an existing Truffle project. For anything new, use [Hardhat 3](hardhat-3-integration.md) or [Foundry](foundry-integration.md).
{% endhint %}

Truffle uses web3.js, JavaScript tests, and numbered migrations for deployment. It bundles its own Ganache chain for local testing.

### Prerequisites

* Node.js 14 - 18
* A wallet private key: With a small amount of CRO to pay for gas fees. (For testnet TCRO, use the faucet at[ https://faucet.cronos.com/](https://faucet.cronos.com/).)
* An RPC endpoint: See details [here](../../introduction/introduction.md).

### Step 1. Create and initialize the project

```bash
mkdir my-cronos-project
cd my-cronos-project
npm init -y
npm install --save-dev truffle@^5.11.5
npx truffle init
```

`truffle init` scaffolds `contracts/`, `migrations/`, `test/` and `truffle-config.js`.

### Step 2. Install dependencies

{% hint style="warning" %}
**Pin OpenZeppelin to exactly `5.4.0`, not `^5.6.0`.** Read the version notice below before you change it — a caret range will resolve to 5.6+ and break `truffle test`.
{% endhint %}

```bash
npm install --save-exact @openzeppelin/contracts@5.4.0
npm install --save-dev @truffle/hdwallet-provider@^2.1.15 truffle-flattener@^1.6.0
npm install dotenv
```

* `@truffle/hdwallet-provider` signs transactions from a private key or mnemonic.
* `truffle-flattener` produces the single-file source you need for verification, because Truffle has no verification plugin for Cronos.

### 4. Add the example contracts

Copy `MyERC20.sol`, `MyERC721.sol` and `MyERC1155.sol` from the Cronos contract boilerplate into your `contracts/` folder:

{% embed url="https://github.com/cronos-labs/cronos-contract-boilerplate/tree/main/truffle/contracts" %}

| Contract    | Constructor                    | Notes                                                                                                                                                 |
| ----------- | ------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| `MyERC20`   | `(string name, string symbol)` | Mints 1,000,000 tokens (18 decimals) to the deployer. Burnable, Pausable, Permit, AccessControl, Ownable.                                             |
| `MyERC721`  | `()` — none                    | Name/symbol hardcoded to `MyToken` / `MTK`. `safeMint(to, uri)` auto-increments the token ID. URIStorage, Burnable, Pausable, AccessControl, Ownable. |
| `MyERC1155` | `(string uri)`                 | Metadata URI template, e.g. `https://example.com/api/token/{id}.json`. Burnable, Pausable, Supply, AccessControl, Ownable.                            |

All three grant the deployer `DEFAULT_ADMIN_ROLE`, `MINTER_ROLE` and `CONTROLLER_ROLE`. Minting requires `MINTER_ROLE`; `pause()` / `unpause()` require `CONTROLLER_ROLE`.

{% hint style="info" %}
The sources are **byte-for-byte identical** to the Hardhat and Foundry subprojects. Only the compiler target and the OpenZeppelin version differ. Read the Solidity in the repository rather than here.
{% endhint %}

### 5. Store your secrets

Create a `.env` file with either a private key or a mnemonic:

{% code title=".env" %}
```bash
# Private key of the deployment wallet
PRIVATE_KEY=
# Or a mnemonic (twelve word phrase). One of PRIVATE_KEY or MNEMONIC is required.
MNEMONIC=
```
{% endcode %}

```bash
echo ".env" >> .gitignore
```

{% hint style="danger" %}
`.env` holds your private key in plain text. Never commit it, and never use a mainnet key that holds meaningful funds for day-to-day development.
{% endhint %}

Truffle has no verification plugin, so **no explorer API key is needed** — verification is done through the Explorer web UI.

### 6. Configure Cronos

Replace `truffle-config.js` with this. It defines both Cronos networks and the compiler settings.

{% code title="truffle-config.js" lineNumbers="true" %}
```javascript
require("dotenv").config();
const HDWalletProvider = require("@truffle/hdwallet-provider");

const getHDWallet = () => {
    for (const env of [process.env.MNEMONIC, process.env.PRIVATE_KEY]) {
        if (env && env !== "") {
            return env;
        }
    }
    throw Error("Private key not set. Please set MNEMONIC or PRIVATE_KEY in .env");
};

module.exports = {
    networks: {
        // Cronos EVM Mainnet (chain id 25)
        cronos: {
            provider: () =>
                new HDWalletProvider(getHDWallet(), "https://evm.cronos.com/"),
            network_id: 25,
            gasPrice: 10100000000000,
            skipDryRun: true,
        },
        // Cronos EVM Testnet (chain id 338)
        cronosTestnet: {
            provider: () =>
                new HDWalletProvider(getHDWallet(), "https://evm-t3.cronos.com/"),
            network_id: 338,
            gasPrice: 10100000000000,
            skipDryRun: true,
        },
    },

    compilers: {
        solc: {
            version: "0.8.28",
            settings: {
                optimizer: {
                    enabled: true,
                    runs: 200,
                },
                // Truffle's bundled Ganache implements hardforks only up to
                // Shanghai, so this project targets Shanghai and pins
                // OpenZeppelin to 5.4.0 (5.5.0+ emits the Cancun-only `mcopy`
                // opcode). Cronos itself supports Cancun and later.
                evmVersion: "shanghai",
            },
        },
    },

    db: {
        enabled: false,
    },
};
```
{% endcode %}

{% hint style="info" %}
**`skipDryRun: true`** matters on Cronos. Truffle's default dry run simulates the migration on a forked chain first, which doubles the round trips against the public RPC and often times out. Skipping it goes straight to the real deployment.
{% endhint %}

{% hint style="info" %}
**`gasPrice: 10100000000000`** is 10,100 gwei. If your transactions stall, check [explorer.cronos.com/charts](https://explorer.cronos.com/charts) and raise the value.
{% endhint %}

#### Why this page pins older versions

{% hint style="warning" %}
The Hardhat and Foundry pages use OpenZeppelin `^5.6.0` with `evmVersion: "cancun"`. This page uses OpenZeppelin `5.4.0` with `evmVersion: "shanghai"`, for one reason:

Truffle bundles **Ganache 7.9.1** for `truffle test`. Ganache was retired before the Cancun hardfork shipped, so it implements hardforks only up to **Shanghai**. OpenZeppelin `5.5.0` and later emit the Cancun-only **`MCOPY`** opcode from `utils/Arrays.sol`, which `ERC1155.sol` imports — so on newer OpenZeppelin the contracts compile but hit `invalid opcode` the moment Ganache tries to deploy them. Setting `evmVersion: "shanghai"` on its own does not help either; solc then fails at compile time with `The "mcopy" instruction is only available for Cancun-compatible VMs`.

OpenZeppelin `5.4.0` is the last release with no Cancun opcodes anywhere in this import graph. Pinning it and targeting Shanghai keeps `truffle test` working with no extra tooling.

**This affects local testing only.** Cronos runs go-ethereum v1.16.9 and supports Cancun and later, so Shanghai bytecode deploys and runs there without issue.
{% endhint %}

{% hint style="danger" %}
Install with `--save-exact`. A caret range (`^5.4.0`) resolves to 5.6+ on a fresh `npm install` and silently reintroduces the failure.
{% endhint %}

### 7. Compile

```bash
npx truffle compile
```

{% hint style="info" %}
If you change `evmVersion` later, Truffle will report `Everything is up to date, there is nothing to compile` and keep the stale artifacts. Force a rebuild with `npx truffle compile --all`.
{% endhint %}

### 8. Test

Copy the test files from the boilerplate's `truffle/test/` folder, then:

```bash
npx truffle test
```

Tests run against Truffle's bundled Ganache chain. **No RPC access, no funded wallet and no `.env` file are needed.**

### 9. Deploy

Truffle deploys through numbered migrations in `migrations/`, run in filename order.

{% tabs %}
{% tab title="ERC-20" %}
{% code title="migrations/1_deploy_erc20.js" %}
```javascript
const MyERC20 = artifacts.require("MyERC20");

module.exports = function (deployer) {
    deployer.deploy(MyERC20, "My token name", "My token symbol");
};
```
{% endcode %}
{% endtab %}

{% tab title="ERC-721" %}
{% code title="migrations/2_deploy_erc721.js" %}
```javascript
const MyERC721 = artifacts.require("MyERC721");

module.exports = function (deployer) {
    // MyERC721 takes no constructor arguments.
    deployer.deploy(MyERC721);
};
```
{% endcode %}
{% endtab %}

{% tab title="ERC-1155" %}
{% code title="migrations/3_deploy_erc1155.js" %}
```javascript
const MyERC1155 = artifacts.require("MyERC1155");

module.exports = function (deployer) {
    deployer.deploy(MyERC1155, "https://example.com/api/token/{id}.json");
};
```
{% endcode %}
{% endtab %}
{% endtabs %}

Run all three:

```bash
npx truffle migrate --network cronosTestnet
```

Swap `cronosTestnet` for `cronos` to deploy to mainnet. To run a single migration, add `-f 1 --to 1`.

{% hint style="success" %}
Deployed contracts show up immediately at `https://explorer.cronos.com/testnet/address/<ADDRESS>`, but only as bytecode until you verify them.
{% endhint %}

### Next: verify

Truffle has no verification plugin for Cronos, so verification goes through the Explorer web UI with a flattened source file:

{% hint style="warning" %}
When you verify, select EVM version **`shanghai`**, not `cancun`. Verifying with the wrong EVM version will not reproduce this bytecode and the verification will fail.
{% endhint %}
