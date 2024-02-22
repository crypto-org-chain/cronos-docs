---
cover: ../.gitbook/assets/background.png
coverY: 0
---

# Cronos zkEVM

## Introducing Cronos zkEVM Testnet

In December 2023, [Cronos Labs](https://cronoslabs.org), the web3 start-up accelerator focusing on DeFi, GameFi, and the development of the [Cronos](https://cronos.org) ecosystem, announced the launch of Cronos zkEVM Chain public testnet, a zero-knowledge (ZK) layer 2 blockchain network that represents a significant milestone on Cronos' journey towards scalability and mainstream adoption.

The testnet is a chain using [ZK Stack](https://zkstack.io/), launched in a partnership between Cronos Labs, Matter Labs, the team behind [zkSync](https://zksync.io/), and engineering teams from [Crypto.com](https://crypto.com), [VVS Finance](https://vvs.finance/), [Fulcrom Finance](https://fulcrom.finance/en/) and [Veno Finance](https://veno.finance/).

It uses the latest [Boojum](https://zksync.mirror.xyz/HJ2Pj45EJkRdt5Pau-ZXwkV2ctPx8qFL19STM5jdYhc) STARK-based zero-knowledge proof system, which in addition to its  ability to run on GPUs with as little as 16 GB of RAM, boasts [amongst the lowest fees](https://l2fees.info/) of any layer 2, with further cost optimizations planned in the near future.

The network uses TCRO, a testnet version of the $CRO cryptocurrency of the Cronos ecosystem, as its native token to pay for transaction fees, but it can also support fee payment in any cryptocurrency thanks to zkSync's native account abstraction implemented at the protocol level.

This is the first live public testnet utilizing [ZK Stack](https://era.zksync.io/docs/reference/concepts/hyperscaling.html), [ a modular, open-source framework leveraging zkSync’s code, that is designed to build custom ZK-powered L2s and L3s (referred to as hyperchains)](https://era.zksync.io/docs/reference/concepts/hyperscaling.html). Hyperchains are fractal-like instances of zkEVM networks running in parallel and with a common settlement on the Ethereum mainnet.In 2024, hyperchains will adopt a shared native bridge to Ethereum mainnet as well as unified interchain messaging, which will make it possible for users to send tokens, messages or transactions across hyperchains while benefiting from the security of the Ethereum network.

As part of internal performance benchmarks, hyperchain technology can already deliver in excess of 100 transactions per second, with significant performance improvements planned for the coming months. The community is invited to run additional tests on this newly launched testnet and share them with the [Cronos community](https://discord.com/invite/cronos).

All developers are warmly invited to experiment with the Cronos zkEVM Chain testnet. Please read this section for details about the architecture and getting started resources.

## Current architecture

The Cronos zkEVM Testnet is a zero-knowledge layer 2 network on top of Ethereum Sepolia Testnet. It leverages the [hyperchain stack created by Matter Labs](https://era.zksync.io/docs/reference/concepts/hyperscaling.html), together with some custom open-source developments such as the use of a custom token (TCRO) to pay for transaction fees.

Relevant Github repositories:

* [https://github.com/cronos-labs/cronos-zkevm](https://github.com/cronos-labs/cronos-zkevm)
* [https://github.com/cronos-labs/cronos-zkevm-withdrawal-finalizer](https://github.com/cronos-labs/cronos-zkevm-withdrawal-finalizer)
* [https://github.com/cronos-labs/era-contracts](https://github.com/cronos-labs/era-contracts)
* [https://github.com/cronos-labs/cronos-zkevm-js](https://github.com/cronos-labs/cronos-zkevm-js)

Relevant smart contract addresses on Ethereum Sepolia:

* TCRO:   [CronosTestnet.sol](https://sepolia.etherscan.io/address/0x1c815aca8daacdf46805fbFB9F08abD1D614773D)
* Timelock:   [ValidatorTimelock.sol](https://sepolia.etherscan.io/address/0x411015940f04B6f29B3081c339F53A3e86D0a227)
* Hyperchain:   [DiamondProxy.sol](https://sepolia.etherscan.io/address/0x08A064F0c455Df1806Fb02425f2C31fAFc187979)
* Verifier:   [Verifier.sol](https://sepolia.etherscan.io/address/0x264793786ac01E14378F2b3823b6c4EC0a5245D3)

## Future architecture

Cronos zkEVM is a new Layer 2, will coexist with the flagship Cronos chain (EVM compatible Layer 1 built on Cosmos SDK) and Cronos POS chain (aka "layer zero" built on Cosmos SDK). This is aligned with Cronos' vision of a multi-chain world.

The target timeframe for mainnet launch is by June 2024.

The new network aims to introduce 4 distinctive strengths aligned with the emerging trends of the next market cycle:

**CROFam**

* \#CROFam is a strong community of users and dapps that have proven their passion and resilience through the bear market.
* Partners like VVS Finance, Veno Finance and Fulcrom Finance have crafted high quality apps that deserve to be better known and have the potential to scale in the next market cycle.
* The new chain will enable participating apps to scale to the next level.

**Shared liquidity**

* When users hold cryptocurrencies on a hyperchain, their assets are secured by Ethereum where they can always choose to withdraw. Besides, they can transfer their assets to other hyperchains securely and at low cost thanks to unified bridge and messaging.

**Yield-bearing assets**.

* At this point we expect that the network token, backed by CRO, and several stable coins and other cryptos, will be natively APY generating for users, just by holding them on the chain. The exact mechanism is being worked out with the Veno Finance team.
* Cronos zkEVM has the potential to create an entire ecosystem of dapps that treat yield-bearing tokens as first class citizens and can effectively compete in a high interest rate economy.

**Account Abstraction**.

* Account sbstraction has been possible for a while on EVM compatible chains, but it has been challenging for legacy chains to migrate existing liquidity to AA-enabled wallets.
* Thanks to AA, users can deposit their funds to the chain and transact with dapps without ever having to switch network. Instead, they can opt to emit off-chain signatures from any EVM home chain, or even from mobile apps or games with usual login.
* Dapps on Cronos zkEVM should support AA by default, so that they can take care of relaying transactions to Cronos zkEVM and even pay for gas.
* This will unleash the power of AA to support mainstream adoption.

### What's next

We are still in the early days and significant R\&D is needed to translate this vision into a live network, while at the same time monitoring and optimizing the performance of the testnet.

To participate in the conversation, please join the [Discord server](https://discord.com/invite/cronos).





