---
meta:
  - name: title
    content: Cronos | Crypto.org EVM Chain | Deploy Smart Contract
  - name: description
    content: >-
      Learn how to deploy a smart contract to Cronos using Solidity, both
      Truffle and Hardhat are included in this technical documentation.
  - name: og:title
    content: Cronos | Crypto.org EVM Chain | Deploy Smart Contract
  - name: og:type
    content: Website
  - name: og:description
    content: >-
      Learn how to deploy a smart contract to Cronos using Solidity, both
      Truffle and Hardhat are included in this technical documentation.
  - name: og:image
    content: https://cronos.org/og-image.png
  - name: twitter:title
    content: Cronos | Crypto.org EVM Chain | Deploy Smart Contract
  - name: twitter:site
    content: '@cryptocom'
  - name: twitter:card
    content: summary_large_image
  - name: twitter:description
    content: >-
      Learn how to deploy a smart contract to Cronos using Solidity, both
      Truffle and Hardhat are included in this technical documentation.
  - name: twitter:image
    content: https://cronos.org/og-image.png
canonicalUrl: https://cronos.org/docs/getting-started/cronos-smart-contract.html
---

# Cronos: Deploy Smart Contract

This documentation demostrate the deployment of smart contract to Cronos, using Solidity. `@openzeppelin/contracts` is used for the demo Solidity script.

Both Truffle and Hardhat are included in this documentation, feel free to choose one of them.

## Pre-requisites

### Supported OS

We officially support macOS, Windows and Linux only. Other platforms may work but there is no guarantee. We will extend our support to other platforms after we have stabilized our current architecture.

### Prepare nodejs and npm environment

You can refer to [Downloading and installing Node.js and npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)\
`Nodejs v10` is suggested

### Sufficient fund on deployer address

You can access to [faucet](https://cronos.org/faucet) to obtain testnet TCRO and [explorer](https://testnet.cronoscan.com/) to view the address details.

### Git clone `smart-contract-example`

```bash
$ git clone git@github.com:crypto-org-chain/cronos-smart-contract-example.git
```

## Truffle: Deploy ERC20 Contract

### Step 1. Enter `smart-contract-example/truffle` folder

```bash
$ cd cronos-smart-contract-example/truffle
```

### Step 2. Run `npm install` inside the folder

```bash
$ npm install
```

### Step 3. Make a copy of `.env.example` to `.env`

```bash
$ cp .env.example .env
```

### Step 4. Modify `.env` and fill _ONE_ of the field

```bash
MNEMONIC=goose easy ivory ...
PRIVATE_KEY=XXXXXXX
```

### Step 5. Review Migration Script at `migrations/2_deploy_cronos_token.js`

```javascript
  const CronosToken = artifacts.require("CronosToken");
  
  module.exports = function (deployer) {
      deployer.deploy(CronosToken, "Cronos Token", "CRT", "1000000000000000000000000");
  };
```

### Step 6. Endpoints setting

By default, the script will be using your local host `"127.0.0.1"` - If you are not running a localhost, you may leverage the public endpoint `https://evm-t3.cronos.org/` by making changes to `networks` in `truffle-config.js`, for example:

```json
  networks: {
    development: {
      provider: new HDWalletProvider(getHDWallet(), "http://127.0.0.1:8545"), // TODO
      network_id: "*",       // Any network (default: none)
    },
    testnet: {
      provider: new HDWalletProvider(getHDWallet(), "https://evm-t3.cronos.org/:8545"), // TODO
      network_id: "*",
      skipDryRun: true
    },
  },
```

### Step 7. Deploy Contract

```bash
npm run deploy-contract-cronos
```

### Step 8. Obtain Contract address from console and input to Metamask

Correct balance will be shown on Metamask page ![](../docs/getting-started/assets/cronos-smart-contract/truffle\_deploy\_contract\_address.png) ![](../docs/getting-started/assets/cronos-smart-contract/metamask\_add\_tokens.png) ![](../docs/getting-started/assets/cronos-smart-contract/metamask\_add\_token\_success.png)

## Hardhat: Deploy ERC20 Contract

### Step 1. Enter `smart-contract-example/hardhat` folder

```bash
$ cd smart-contract-example/hardhat
```

### Step 2. Run `npm install` inside the folder

```bash
$ npm install
```

### Step 3. Make a copy of `.env.example` to `.env`

```bash
$ cp .env.example .env
```

### Step 4. Modify `.env` and fill _ONE_ of the field

```bash
MNEMONIC=goose easy ivory ...
PRIVATE_KEY=XXXXXXX
```

### Step 5. Review Migration Script at `scripts/deploy-cronos-token.js`

```javascript
  async function main() {
      const CronosToken = await hre.ethers.getContractFactory("CronosToken");
      const cronosToken = await CronosToken.deploy("Cronos Token", "CRT", "1000000000000000000000000");
  
      await cronosToken.deployed();
  
      console.log("CronosToken deployed to:", cronosToken.address);
  }
```

### Step 6. Endpoints setting

By default, the script will be using your local host `"127.0.0.1"` - If you are not running a localhost, you may leverage the public endpoint `https://evm-t3.cronos.org/` by making changes to `networks` in `truffle-config.js`, for example:

```json
  networks: {
    development: {
      url: "http://localhost:8545",
      accounts: getHDWallet(),
     },
    testnet: {
      url: "https://evm-t3.cronos.org/:8545",
      accounts: getHDWallet(),
    },
  },
```

### Step 7. Deploy Contract

```bash
npm run deploy-contract-cronos
```

### Step 8. Obtain Contract address from console and input to Metamask

Correct balance will be shown on Metamask page

```bash
CronosToken deployed to: 0x5F803c894a0A16B46fe5982fB5D89eb334eAF68
```

![](../docs/getting-started/assets/cronos-smart-contract/metamask\_add\_tokens.png) ![](../docs/getting-started/assets/cronos-smart-contract/metamask\_add\_token\_success.png)
