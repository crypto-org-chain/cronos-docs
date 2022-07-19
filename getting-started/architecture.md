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

The Ethereum Virtual Machine (EVM) has led to the creation of many useful and interesting projects. Instead of re-inventing the wheel, Crypto.org Chain can leverage on these existing projects and add on the high speed and low transaction costs of the Cosmos SDK. Cronos is an EVM sidechain along the main Crypto.org Chain built on Ethermint with smart contract capability. It aims to empower and scale decentralised applications for the multichain world of the future, focusing on use cases of NFTs, DeFi, and payments. EVM support will allow for the simple porting of apps from other chains, driving exponential ecosystem growth for Crypto.org, a fully decentralised, open-source, and public chain with high speed and extremely low fees.

## Solution

**Ethereum Virtual Machine** - EVM is the widely adopted standard for smart contract development. With EVM compatibility, developers can build the same way as they would on Ethereum and benefit from the same tools and applications.

**Cosmos SDK** - A modular blockchain development framework where the components are interdependent. You can develop your own modules to fulfil your application’s custom needs in addition to using pre-built modules such as the governance, token transfer, or IBC (Inter-Blockchain Communication) modules functionalities.

**Tendermint’s Core BFT Proof-of-Stake Consensus Engine** - Unlike other blockchain solutions that are pre-packaged and built-in state machines, developers can use Tendermint for BFT state machine replication of applications in whatever language they desire, and whatever development environment works for them.

**Proof of Authority** - A more streamlined and scalable consensus protocol while still maintaining security with a range of validators that many different parties run.

## Consensus engine

Cronos Testnet is based on Ethermint and it is a proof of stake blockchain built on the Cosmos SDK, which is EVM-compatible as well. Ethereum requires improvements in scalability, gas price, and customisation. Cronos utilises the [Cosmos SDK](https://cosmos.network/sdk) and the [Tendermint](https://tendermint.com/) Core Consensus Engine. Tendermint works well for PoS / DPos networks, allowing for high transaction throughputs, and provides instant transaction finality on block commitment. It was chosen as the consensus engine for the chain prototype due to the following:

* Backed by [formal research](https://eprint.iacr.org/2018/574.pdf)
* Robustly tested [implementation](http://jepsen.io/analyses/tendermint-0-10-2)
* Strong track record: Tendermint has been in continuous development since 2014, and has been adopted by several high-profile [projects](https://forum.cosmos.network/t/list-of-projects-in-cosmos-tendermint-ecosystem/243)
* Modular architecture: It offers flexibility regarding which applications are developed on top of it, and how they are developed.
