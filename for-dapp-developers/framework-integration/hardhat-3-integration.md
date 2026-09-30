---
description: >-
  Build a Hardhat 3 project from scratch, configure it for Cronos EVM, and
  deploy a sample contract with Hardhat Ignition.
---

# Hardhat 3 Integration

## Hardhat 3

Hardhat 3 is the recommended toolchain for new Cronos projects. It uses `Hardhat Ignition` for declarative deploymentsand an encrypted keystore so your private key never touches a file in your repo, and it lets you pick your test stack at init time — `viem` with `node:test`, or `Mocha` with `Ethers.js`.

### Prerequisites

* Node.js 22.13.0 or later
* A wallet private key: With a small amount of CRO to pay for gas fees. (For testnet TCRO, use the faucet at[ https://faucet.cronos.com/](https://faucet.cronos.com/).)
* An RPC endpoint: See details [here](../../introduction/introduction.md).
* A Cronos Explorer API key, see how to obtain it [here](../block-explorer-and-api-keys.md#creating-account-and-getting-api-key-cronos-explorer).

### Step 1. Create and initialize the project

```bash
npx hardhat --init
```

`--init` is an interactive wizard. Choose:

* Where would you like to initialize the project? -> Your project path, for example `my-cronos-project`
* What type of project? →  `A TypeScript Hardhat project using Node Test Runner and Viem` or `A TypeScript Hardhat project using Mocha and Ethers.js` .
* Accept the suggested `package.json` and dependency install.

### Step 2. Write your contract

The wizard writes a sample `Counter` contract at `my-cronos-project/contracts/Counter.sol` . You can remove it and add your contracts to `my-cronos-project/contracts/`.&#x20;

### Step 2.1. Install Dependencies

For example, to add `OpenZeppelin` as a dependency:

```bash
npm install @openzeppelin/contracts
```

### Step 3. Store your secrets

Hardhat 3 ships an encrypted keystore. Use it instead of a `.env` file. The value is stored outside your project, encrypted with a password you choose.

```bash
npx hardhat keystore set PRIVATE_KEY
```

You will be prompted for a keystore password (first time only) and then for the value. Useful companions:

```bash
npx hardhat keystore list           # show which keys are set
npx hardhat keystore get PRIVATE_KEY
npx hardhat keystore delete PRIVATE_KEY
npx hardhat keystore path           # where the encrypted file lives
```

### Step 4. Configure Cronos Network

In your  `hardhat.config.ts` config Cronos networks:

{% code title="hardhat.config.ts" lineNumbers="true" %}
```typescript
const config: HardhatUserConfig = {
    plugins: [...],
    solidity: {
        ...
    },
    networks: {
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
};

export default config;
```
{% endcode %}

### Step 5. Compile

```bash
npx hardhat compile
```

### Step 6. Test

The wizard created a sample test contract at  `my-cronos-project/contracts/Counter.t.sol` , and a sample test script at `my-cronos-project/test/Counter.ts` :

* `contract/Counter.t.sol`: Written in Solidity. It runs directly on the Ethereum Virtual Machine (EVM) using Foundry (Forge).
* `test/Counter.ts`**:** Written in TypeScript. It runs in a Node.js environment.

Check the differences between two test approaches at [Hardhat 3 document](https://hardhat.org/docs/guides/testing).

To run all the tests:

```bash
npx hardhat test
```

To run each type of test:

```bash
npx hardhat test solidity   # Solidity tests only
npx hardhat test nodejs     # TypeScript & viem tests only
npx hardhat test mocha      # Mocha tests only
```

### Step 7. Deploy

Hardhat 3 deploys through Ignition modules — declarative descriptions of what to deploy, so re-running a deployment resumes instead of duplicating.

The wizard created a sample at  `ignition/modules/Counter.ts` . To run the script:

```bash
npx hardhat ignition deploy ignition/modules/Counter.ts --network cronosTestnet
```

Ignition prints the deployed address on success. To deploy to mainnet, swap `--network cronosTestnet` for `--network cronos`.

### Step 8. Verify

`hardhat-verify` is already included as part of the template project. If you want to add the plugin manually:

```bash
npm add --save-dev @nomicfoundation/hardhat-verify
```

In your `hardhat.config.ts` add:

```typescript
import hardhatVerify from "@nomicfoundation/hardhat-verify";

const networkArg = process.argv[process.argv.indexOf('--network') + 1] ?? 'hardhat';

export default defineConfig({
  plugins: [...,hardhatVerify,],
  ...
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
          apiUrl:
            "https://explorer-api.cronos.org/testnet/api/v2",
        },
      },
    },
  },
  verify: {
    etherscan: {
      apiKey: networkArg === "cronos"
        ? <your-cronos-mainnet-api-key> ?? ""
        : networkArg === "cronosTestnet"
          ? <your-cronos-testnet-api-key> ?? ""
          : "",
    },
  },
});

```

In your terminal:

```bash
npx hardhat verify --network cronosTestnet <ADDRESS>
```

This command will verify the contract in both Cronos Explorer and Sourcify, to verify it only in Cronos Explorer:

```bash
npx hardhat verify etherscan --network cronosTestnet <ADDRESS>
```

Or add below config to `hardhat.config.ts` :

```typescript
verify: {
  blockscout: {
    enabled: false,
  },
  sourcify: {
    enabled: false,
  },
},
```

Alternatively, you can deploy and verify the contract in a single command:

```bash
npx hardhat ignition deploy ignition/modules/Counter.ts --network cronosTestnet --verify
```

To verify the contract in mainnet, swap `--network cronosTestnet` for `--network cronos`.
