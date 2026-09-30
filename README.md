---
meta:
  - name: title
    content: Cronos | Crypto.org EVM Chain | Getting Started
  - name: description
    content: >-
      Learn how to setup nodes, different SDK modules and our all-in-one
      command-line interface cronosd in this technical documentation.
  - name: og:title
    content: Cronos | Crypto.org EVM Chain | Getting Started
  - name: og:type
    content: Website
  - name: og:description
    content: >-
      Learn how to setup nodes, different SDK modules and our all-in-one
      command-line interface cronosd in this technical documentation.
  - name: og:image
    content: https://cronos.org/og-image.png
  - name: twitter:title
    content: Cronos | Crypto.org EVM Chain | Getting Started
  - name: twitter:site
    content: '@cryptocom'
  - name: twitter:card
    content: summary_large_image
  - name: twitter:description
    content: >-
      Learn how to setup nodes, different SDK modules and our all-in-one
      command-line interface cronosd in this technical documentation.
  - name: twitter:image
    content: https://cronos.org/og-image.png
canonicalUrl: https://docs.cronos.com/getting-started/
description: What is Cronos EVM, why build on it, and how it fits in the Cronos universe.
---

# 📖 Introduction

## What is Cronos EVM?

Cronos Network is a EVM compatible blockchain delivering sub-cent, sub-second 24/7 global settlement, built for financial services and tokenized real-world assets.

As a leading blockchain ecosystem, we have partnered with Crypto.com and more than 100 application developers and contributors representing an addressable user base of more than a 150 million people around the world.

Transaction fees are paid in Cronos ($CRO), a blue chip cryptocurrency.

### The Cronos universe

The Cronos universe encompasses 2 chains: **Cronos EVM**, the leading Ethereum-compatible blockchain built on the Cosmos SDK; **Cronos POS**, a leading Cosmos chain for payments and NFTs.

The Cronos Mainnet was launched on 8 November 2021. Cronos runs separately from the [Cronos POS Chain](https://cronos-pos.org/), a Cosmos proof-of-stake chain also powered by $CRO.

{% hint style="info" %}
Notice: Cronos zkEVM is being sunset, please [bridge out your assets](https://docs-zkevm.cronos.com/for-users/cronos-zkevm-bridge) before the network is fully decommissioned.
{% endhint %}

### Why build on Cronos EVM?

If you are a Web3 application creator, there are 3 main reasons to build on Cronos:

* EVM compatible: Solidity and all the EVM tools just work out of the box.
* Strategic partnership with [Crypto.com](https://crypto.com/): easy on-ramp to your dapp.
* \#CROFam: a highly engaged user and builder community of >150 million people worldwide, who are keen to try the latest and greatest apps.

As an application founder/developer on Cronos, you can leverage:

* Wrapped versions of most of the world's top 50 cryptocurrencies
* 30+ leading wallets (including Crypto.com Defi Wallet, Rabby, MetaMask, Trust Wallet)
* IBC cross-chain connectivity to Cosmos chains.
* Convenient Ethereum developer tools (Solidity, Truffle, Hardhat, OpenZeppelin, Web3.js, ethers.js, ChainSafe Gaming SDK, etc.).

### Cronos Technology Overview

The Cronos blockchain protocol is an [open-source project](https://github.com/crypto-org-chain/cronos) based on:

* [Ethermint](https://github.com/evmos/ethermint), an open-source Cosmos application module that allows the portability of the Ethereum Virtual Machine (EVM), its go-ethereum client, and its solidity-based smart contracts to the Cosmos ecosystem.
* [Cosmos SDK](https://v1.cosmos.network/sdk), the leading development framework to build interoperable sovereign blockchains.
* [Tendermint’s](https://docs.tendermint.com/) Core BFT Proof-of-Stake consensus engine, a scalable and energy-efficient blockchain consensus.

The open-source Cronos blockchain protocol is fast, cheap, and energy-efficient.

Going forward, Cronos aims to leverage the best of what the Ethereum/EVM and Cosmos ecosystems both have to offer for end-users and developers.

### Cronos **Consensus**

The Cronos consensus is commonly referred to as a proof-of-authority (POA) consensus, as it is a permissioned variant of the proof-of-stake consensus.

Please refer to the [Cronos repository](https://github.com/crypto-org-chain/cronos) for details.

Tendermint was selected by Cronos as the underlying technology for several reasons:

* Backed by [formal research](https://eprint.iacr.org/2018/574.pdf)
* Robustly tested [implementation](http://jepsen.io/analyses/tendermint-0-10-2)
* Strong track record: Tendermint has been in continuous development since 2014, and has been adopted by several high-profile [projects](https://forum.cosmos.network/t/list-of-projects-in-cosmos-tendermint-ecosystem/243)
* Modular architecture: It offers flexibility regarding which applications are developed on top of it, and how they are developed.
