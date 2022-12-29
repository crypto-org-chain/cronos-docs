---
meta:
  - name: title
    content: Cronos | Crypto.org EVM Chain | Architecture
  - name: description
    content: >-
      Cronos is an EVM sidechain along the main Crypto.org Chain built on
      Ethermint with smart contract capability. It aims to empower and scale
      decentralised applications for the future multichain world.
  - name: og:title
    content: Cronos | Crypto.org EVM Chain | Architecture
  - name: og:type
    content: Website
  - name: og:description
    content: >-
      Cronos is an EVM sidechain along the main Crypto.org Chain built on
      Ethermint with smart contract capability. It aims to empower and scale
      decentralised applications for the future multichain world.
  - name: og:image
    content: https://cronos.org/og-image.png
  - name: twitter:title
    content: Cronos | Crypto.org EVM Chain | Architecture
  - name: twitter:site
    content: '@cryptocom'
  - name: twitter:card
    content: summary_large_image
  - name: twitter:description
    content: >-
      Cronos is an EVM sidechain along the main Crypto.org Chain built on
      Ethermint with smart contract capability. It aims to empower and scale
      decentralised applications for the future multichain world.
  - name: twitter:image
    content: https://cronos.org/og-image.png
canonicalUrl: https://docs.cronos.org/chain-details/architecture.html
---

# Architecture

## Overview

The Cronos blockchain protocol is an [open-source project](https://github.com/crypto-org-chain/cronos) based on:

* [Ethermint](https://github.com/evmos/ethermint), an open-source Cosmos application module that allows the portability of the Ethereum Virtual Machine (EVM), its go-ethereum client, and its solidity-based smart contracts to the Cosmos ecosystem.
* [Cosmos SDK](https://v1.cosmos.network/sdk), the leading development framework to build interoperable sovereign blockchains.
* [Tendermint’s](https://docs.tendermint.com/) Core BFT Proof-of-Stake consensus engine, a scalable and energy-efficient blockchain consensus.

The open-source Cronos blockchain protocol is fast, cheap, and energy-efficient.

Going forward, Cronos aims to leverage the best of what the Ethereum/EVM and Cosmos ecosystems both have to offer for end-users and developers.

## **Open-source project**

Please visit the [Github repository](https://github.com/crypto-org-chain/cronos) to contribute to the Cronos blockchain protocol.

## **Consensus**

The Cronos consensus is commonly referred to as a proof-of-authority (POA) consensus, as it is a permissioned variant of the proof-of-stake consensus.

Please refer to the [Cronos repository](https://github.com/crypto-org-chain/cronos) for details.

Tendermint was selected by Cronos as the underlying technology for several reasons:

* Backed by [formal research](https://eprint.iacr.org/2018/574.pdf)
* Robustly tested [implementation](http://jepsen.io/analyses/tendermint-0-10-2)
* Strong track record: Tendermint has been in continuous development since 2014, and has been adopted by several high-profile [projects](https://forum.cosmos.network/t/list-of-projects-in-cosmos-tendermint-ecosystem/243)
* Modular architecture: It offers flexibility regarding which applications are developed on top of it, and how they are developed.
