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
canonicalUrl: https://docs.cronos.org/getting-started/cronos-smart-contract.html
---

# 📃 Smart Contracts

Smart contracts hold an essential role in the blockchain ecosystem of dApps. It is critical to ensure they work as intended and remain as secure as possible. Complete and well-design smart contracts save us from unnecessary financial losses and help the project stay secure. Smart contract verification is sometimes overlooked when teams are rushing to ship, but it is vital to verify smart contracts on their correctness, validity and security.&#x20;

The following documentation demonstrates the deployment and verification of a smart contract by Solidity to Cronos. `@openzeppelin/contracts` is used for the demo Solidity script. Both Truffle and Hardhat for deployment are included in this documentation and you shall use one of your choices. We also walk through the steps of verifying a smart contract with the Hardhat Cronoscan plugin on Cronos. &#x20;

## Pre-requisites

Below are the prerequisites for contract deployment and verification.&#x20;

### Supported OS

We officially support macOS, Windows and Linux only. Other platforms may work but there is no guarantee. We will extend our support to other platforms after we have stabilized our current architecture.

### Prepare nodejs and npm environment

You can refer to [Downloading and installing Node.js and npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)\
`Nodejs v18+` is suggested

### Sufficient funds on deployer address

You can access to [faucet](https://cronos.org/faucet) to obtain testnet TCRO and [explorer](https://testnet.cronoscan.com/) to view the address details.

### Git clone `smart-contract-example`

```bash
$ git clone git@github.com:crypto-org-chain/cronos-smart-contract-example.git
```



Once you have them all ready, now we are ready to go through the next step of contract deployment and verification!

###

