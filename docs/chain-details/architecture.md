---
meta:
  - name: "title"
    content: Cronos | Crypto.org EVM Chain | Architecture
  - name: "description"
    content: Cronos is an EVM sidechain along the main Crypto.org Chain built on Ethermint with smart contract capability. It aims to empower and scale decentralised applications for the future multichain world.
  - name: "og:title"
    content: Cronos | Crypto.org EVM Chain | Architecture
  - name: "og:type"
    content: Website
  - name: "og:description"
    content: Cronos is an EVM sidechain along the main Crypto.org Chain built on Ethermint with smart contract capability. It aims to empower and scale decentralised applications for the future multichain world.
  - name: "og:image"
    content: https://cronos.org/og-image.png
  - name: "twitter:title"
    content: Cronos | Crypto.org EVM Chain | Architecture
  - name: "twitter:site"
    content: "@cryptocom"
  - name: "twitter:card"
    content: summary_large_image
  - name: "twitter:description"
    content: Cronos is an EVM sidechain along the main Crypto.org Chain built on Ethermint with smart contract capability. It aims to empower and scale decentralised applications for the future multichain world.
  - name: "twitter:image"
    content: https://cronos.org/og-image.png
canonicalUrl: https://cronos.org/docs/chain-details/architecture.html
---

# Architecture

## Overview

The Ethereum Virtual Machine (EVM) has bred many useful and interesting projects. Instead of re-implementing the wheel, Crypto.org Chain can leverage these existing projects and add on top of the high speed and low transaction costs of Cosmos SDK. Cronos is an EVM sidechain along the main Crypto.org Chain built on Ethermint with smart contract capability. It aims to empower and scale decentralised applications for the future multichain world, focusing on use cases of NFT, DeFi and payments. EVM support will allow for simple porting of apps from other chains, driving exponential ecosystem growth for Crypto.org, a fully decentralised, open-source, public chain with high speed and extremely low fees.

## Solution
 
**Ethereum Virtual Machine** - EVM is the widely adopted standard for smart-contract development. With EVM compatibility, developers can build the same way they would do on Ethereum and benefit from the same tools and applications.
 
**Cosmos SDK** - A modular blockchain development framework where the components are interdependent. You can develop your own modules to fulfil your application’s custom needs in addition to using pre-built modules such as the governance, token transfer, or IBC (Inter-Blockchain Communication) modules functionalities.
 
**Tendermint’s Core BFT Proof-of-Stake consensus engine** - Unlike other blockchain solutions pre-packaged and built-in state machines, developers can use the Tendermint for BFT state machine replication of applications whatever language they desire, and whatever development environment works for them. 
 
**Proof of Authority** - A more streamlined and scalable consensus protocol while still maintaining security with a range of validators that many different parties run.


## Consensus engine

Cronos Testnet is based on Ethermint is a proof-of-stake blockchain built on the Cosmos SDK which is EVM compatible. Ethereum requires improvement in scalability, gas price, and customization. Cronos utilizes [Cosmos SDK](https://cosmos.network/sdk) and the [Tendermint](https://tendermint.com/) Core consensus engine underneath. Tendermint works well for PoS / DPos networks, allows high transaction throughputs, and provides instant transaction finality on block commitment. It was chosen as the consensus engine for the Chain prototype due to the following additional reasons:

- Backed by [formal research](https://eprint.iacr.org/2018/574.pdf);
- Robustly tested [implementation](http://jepsen.io/analyses/tendermint-0-10-2);
- Track record of adoption: Tendermint has been in continuous
  development since 2014, and has been adopted by several high-profile
  [projects](https://forum.cosmos.network/t/list-of-projects-in-cosmos-tendermint-ecosystem/243); and
- Modular architecture: It offers flexibility on which and how applications are developed on top of it.
