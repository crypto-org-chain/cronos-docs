---
description: >-
  Build a Hardhat 2 project from scratch, configure it for Cronos EVM, and
  deploy a sample contract with Hardhat Ignition.
---

# Hardhat 2 Integration

Hardhat 2 is the previous major version of Hardhat. Use it if you're maintaining an existing Hardhat 2 project; for new work, start with [Hardhat 3](hardhat-3-integration.md).

{% hint style="info" %}
Hardhat 2 is scheduled for formal End-of-Life (EOL) on June 1, 2027. However, this deprecation date will move even earlier if the Ethereum Hegota mainnet activation occurs before that date.

The [Nomic Foundation](https://blog.nomic.foundation/) has replaced Hardhat 2 with Hardhat 3, which is now stable and production-ready.&#x20;
{% endhint %}

### Prerequisites

* Node.js 20, 22 or 24
* A wallet private key: With a small amount of CRO to pay for gas fees. (For testnet TCRO, use the faucet at[ https://faucet.cronos.com/](https://faucet.cronos.com/).)
* An RPC endpoint: See details [here](../../introduction/introduction.md).

### Step 1. Create and initialize the project

```bash
mkdir my-cronos-project
cd my-cronos-project
npm init -y
npm install --save-dev hardhat@^2.29.0
npx hardhat init
```

`npx hardhat init` starts the setup wizard. Choose `Create a TypeScript project` , and accept the suggested dependencies.

### Step 2. Write your contract

The wizard created a sample contract at `contracts/Lock.sol` . You can remove it and add your contracts to `contracts/`.&#x20;

### Step 2.1. Install Dependencies

```bash
npm install @openzeppelin/contracts@^5.6.0
npm install dotenv
```

`hardhat-toolbox` bundles ethers v6, chai matchers, TypeChain, the gas reporter and the `hardhat verify` task.

### Step 3. Configure `.env`

Hardhat 2 has no keystore, so use a `.env` file loaded by `dotenv`:

{% code title=".env" %}
```bash
# Private key of the deployment wallet
PRIVATE_KEY=
# Block explorer API keys - used to verify contract source code
CRONOS_EXPLORER_MAINNET_API_KEY=
CRONOS_EXPLORER_TESTNET_API_KEY=
```
{% endcode %}

```bash
echo ".env" >> .gitignore
```

{% hint style="danger" %}
`.env` holds your private key in plain text. Never commit it, and never use a mainnet key that holds meaningful funds for day-to-day development.
{% endhint %}

### Step 4. Configure Cronos

Replace the generated `hardhat.config.ts` with this. It defines both Cronos networks and both explorers.

{% code title="hardhat.config.ts" lineNumbers="true" %}
```typescript
import * as dotenv from "dotenv";
dotenv.config();

import { HardhatUserConfig, task } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

const privateKey: string = <string>process.env.PRIVATE_KEY;
const accounts: string[] = privateKey ? [privateKey] : [];
const cronosApiKeyMainnet: string = <string>(
    process.env.CRONOS_EXPLORER_MAINNET_API_KEY
);
const cronosApiKeyTestnet: string = <string>(
    process.env.CRONOS_EXPLORER_TESTNET_API_KEY
);

task("accounts", "Prints the list of accounts", async (args, hre) => {
    const accounts = await hre.ethers.getSigners();

    for (const account of accounts) {
        console.log(account.address);
    }
});

const config: HardhatUserConfig = {
    networks: {
        hardhat: {},
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
        apiKey: {
            cronos: cronosApiKeyMainnet,
            cronosTestnet: cronosApiKeyTestnet,
        },
        customChains: [
            {
                network: "cronos",
                chainId: 25,
                urls: {
                    apiURL:
                        "https://explorer-api.cronos.org/mainnet/api/v1/hardhat/contract?apikey=" +
                        cronosApiKeyMainnet,
                    browserURL: "https://explorer.cronos.com",
                },
            },
            {
                network: "cronosTestnet",
                chainId: 338,
                urls: {
                    apiURL:
                        "https://explorer-api.cronos.org/testnet/api/v1/hardhat/contract?apikey=" +
                        cronosApiKeyTestnet,
                    browserURL: "https://explorer.cronos.com/testnet",
                },
            },
        ],
    },
    solidity: {
        version: "0.8.28",
        settings: {
            optimizer: {
                enabled: true,
                runs: 200,
            },
            evmVersion: "cancun",
        },
    },
    sourcify: {
        enabled: false,
    },
};

export default config;
```
{% endcode %}

Confirm the config connects:

```bash
npx hardhat accounts --network cronosTestnet
```

### Step 5. Compile

```bash
npx hardhat compile
```

This also generates TypeChain types under `typechain-types/`, which the tests and deploy scripts import.

### Step 6. Test

The wizard created a sample script at `test/Lock.ts` folder, to run it:

```bash
npx hardhat test
```

### Step 7. Deploy

Use `hardhat ignition` to deploy the contract:

```bash
npx hardhat ignition deploy ./ignition/modules/Lock.ts --network cronosTestnet
```

To deploy to mainnet, swap `--network cronosTestnet` for `--network cronos`.

### Step 8. Verify

In your terminal:

```bash
npx hardhat verify --network cronosTestnet <ADDRESS> 1893456000 // 1893456000 is the value used in ignition/modules/Lock.ts
```
