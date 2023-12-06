---
description: Quick-start resource if you are hacking and need to integrate with Cronos.
---

# 🏅 Hacker's getting started resources

## Overview of Cronos chain

[Cronos](https://cronos.org/) ([cronos.org](http://cronos.org)) is the leading Ethereum-compatible layer 1 blockchain network built on the Cosmos SDK, supported by [Crypto.com](http://crypto.com), [Crypto.org](http://crypto.org) and more than 500 app developers and partners. Today, the #CROfam ecosystem represents an addressable user base of more than 80 million people worldwide. Our mission is to make it easy and safe for the next billion crypto users to adopt Web3, with a focus on DeFi and GameFi.

[Broken link](broken-reference "mention")

## How to stand out and win in a Web3 hackathon 🥇

Check out our [blog post](https://blog.cronos.org/p/cronos-developer-series-5-tips-to-stand-out-in-a-web3-hackathon-924d774f1617).

## Hack with Cronos 🥚

Developing Dapps on Cronos is as easy as developing them on any of the major EVM-compatible chains: write and test solidity with Hardhat, deploy your contract, connect your frontend or your backend with ethers.js, and connect your wallet with MetaMask or Crypto.com Defi Wallet.

The native cryptocurrency of Cronos mainnet is CRO, while the testnet uses TCRO.

**Cronos overview & key links for developers**

* Cronos docs: [https://docs.cronos.org](https://docs.cronos.org)
* Cronos Play (for game developers): [https://cronos.org/play](https://cronos.org/play)
* [Why build on Cronos](https://blog.cronos.org/p/why-build-grow-on-cronos-692da1de7885)
* Cronos overview by Eat The Blocks: [https://www.youtube.com/watch?v=NqeeKEJiPZU](https://www.youtube.com/watch?v=NqeeKEJiPZU)

**MetaMask end-user configuration**

* The [cronos.org](http://cronos.org) website has a little orange button at the top of the page, that you can click to add Cronos mainnet to your MetaMask wallet.
* For more details, see [Metamask configuration](../for-users/metamask.md)

**JSON-RPC endpoint configuration**

*   For most use cases you can use the free endpoints that are provided by Cronos Labs. Most developers use a configuration file that looks like this:

    For Hardhat:

    ```json
    {
    "cronos_mainnet": {
          "chainId": 25,
          "url": "https://evm.cronos.org/",
          "gasPrice": 5000000000000,
          "blockExplorer": "https://explorer.cronos.org/",
          "blockExplorerPrefix": "https://explorer.cronos.org/tx/"
        },
    "cronos_testnet": {
          "chainId": 338,
          "url": "https://evm-t3.cronos.org/",
          "gasPrice": 5000000000000,
          "blockExplorer": "https://explorer.cronos.org/testnet/",
          "blockExplorerPrefix": "https://explorer.cronos.org/testnet/tx/"
        },
    }
    ```

    or, using EIP1559 in a Node.js backend:

    ```json
    {
    "cronos_mainnet": {
          "id": 25,
          "url": "https://evm.cronos.org/",
          "maxPriorityFeePerGas": 5000000000,
          "maxFeePerGas": 6000000000000,
          "blockExplorer": "https://explorer.cronos.org/",
          "blockExplorerPrefix": "https://explorer.cronos.org/tx/"
        },
    "cronos_testnet": {
          "id": 338,
          "url": "https://evm-t3.cronos.org/",
          "maxPriorityFeePerGas": 5000000000,
          "maxFeePerGas": 6000000000000,
          "blockExplorer": "https://explorer.cronos.org/",
          "blockExplorerPrefix": "https://explorer.cronos.org/tx/"
        },
    }
    ```
*   Testnet CRO faucet

    [https://cronos.org/faucet](https://cronos.org/faucet)

## Tutorials 🚀

**Essential tutorials / boilerplates**

* [Deploy and verify your smart contracts](https://github.com/kentimsit/cronos-hardhat-boilerplate) (see Readme for instructions)
* [Build a Dapp: how to connect and interact with Web3 wallets on Cronos](https://github.com/kentimsit/cronos-wallet-connections) (see Readme for instructions)
* [Create & deploy a smart contract with OpenZeppelin Wizard and Remix](https://cronoslabs.substack.com/p/cronos-developer-series-create-deploy-a-smart-contract-with-openzeppelin-wizard-and-remix-5b6769fc8b93) (low code version)

**Other useful tutorials**

* Create an end to end Web3 application: [smart contract](https://github.com/cronos-labs/cronos-accelerator-workshop-hardhat) and [front-end client](https://github.com/cronos-labs/cronos-accelerator-workshop-client) (repositories)
* [Create a NFT collection on Cronos and IPFS](https://cronoslabs.substack.com/p/cronos-developer-series-build-a-simple-dapp-with-react-crypto-com-defi-wallet-and-metamask-87c37ccd589f)
* [Create dApps on Cronos chain](https://www.youtube.com/watch?v=lKzzyUXPeRk) (video)
* [Build your Web3 Game with Cronos Play](https://www.youtube.com/watch?v=lmM7HgXDZ2w) (video)
* [How to win a hackathon](https://www.youtube.com/watch?v=kyMg0jtuT-8\&t=29s) (video)

## Essential developer tools 💻

Write, test and deploy smart contracts

* Smart contracts library: [OpenZeppelin](https://www.openzeppelin.com/)
* Compile & test: [Hardhat](https://hardhat.org/)

Connect your Dapp to the blockchain

* Web3 library for Javascript / Typescript: [ethers.js](https://docs.ethers.io/v5/), [web3.js](https://web3js.readthedocs.io/)
* Web3 library for Python: [web3.py](https://web3py.readthedocs.io/)

Create games

* Cronos Play overview: [Cronos Play](https://cronos.org/docs/play/cronos-gamefi-integraton.html)
* Javascript SDK: [Moralis](https://moralis.io/)
* Unity plugin: [docs](https://cronos.org/docs/play/getting-started.html) and [repo](https://github.com/ChainSafe/web3.unity)
* Unreal plugin: [docs](https://cronos.org/docs/play/getting-started\_unreal.html#pre-requisites), [repo](https://github.com/cronos-labs/play-unreal-plugin) and [demo](https://github.com/cronos-labs/play-unreal-demo)
* C++ SDK: [docs](https://cronos.org/docs/play/getting-started\_cpp.html#pre-requisites) and [repo](https://github.com/cronos-labs/play-cpp-sdk)
* [Full list of available dev tools and integration](useful-projects-on-cronos/overview-of-dev-tools-and-integrations.md)

## Developer support ☎️

Please visit the #cronos-mainnet-beta channel on the Cronos [Discord](https://discord.com/invite/pahqHz26q4) server.

Feedback is a gift! [Let us know](mailto:contact@cronoslabs.org) if there is anything that we can improve in this documentation.

Socials: [Twitter](https://twitter.com/cronos\_chain) | [Telegram](https://t.me/Cronos\_Announcements) | [Discord](https://discord.com/invite/cronos) | [Youtube](https://www.youtube.com/@cronos\_chain)

