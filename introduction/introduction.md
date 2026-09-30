---
meta:
  - name: title
    content: Cronos | Crypto.org EVM Chain | Testnet Introduction
  - name: description
    content: >-
      Cronos Testnet aims to massively scale the Chain DeFi ecosystem, by
      providing developers with the ability to rapidly port apps from Ethereum
      and EVM-compatible chains.
  - name: og:title
    content: Cronos | Crypto.org EVM Chain | Testnet Introduction
  - name: og:type
    content: Website
  - name: og:description
    content: >-
      Cronos Testnet aims to massively scale the Chain DeFi ecosystem, by
      providing developers with the ability to rapidly port apps from Ethereum
      and EVM-compatible chains.
  - name: og:image
    content: https://cronos.org/og-image.png
  - name: twitter:title
    content: Cronos | Crypto.org EVM Chain | Testnet Introduction
  - name: twitter:site
    content: '@cryptocom'
  - name: twitter:card
    content: summary_large_image
  - name: twitter:description
    content: >-
      Cronos Testnet aims to massively scale the Chain DeFi ecosystem, by
      providing developers with the ability to rapidly port apps from Ethereum
      and EVM-compatible chains.
  - name: twitter:image
    content: https://cronos.org/og-image.png
canonicalUrl: https://docs.cronos.com/chain-details/introduction.html
description: >-
  Mainnet and testnet chain specifications, explorer links, and public RPC
  endpoints.
---

# 📝 Network Specifications

## Network Specifications and Public Endpoints

### Chain ID

Cronos has different Chain IDs to distinguish between the _devnet_, _testnet_ and _mainnet_. When running Cronos in your local environment, you will need to decide your own Chain ID.

For example, our testnet Chain ID is `cronostestnet_338-3`.

### Cronos EVM Mainnet Specs

* Chain ID: `25`
* JSON RPC API: [https://evm.cronos.com](https://evm.cronos.com)
* Block explorer: [https://explorer.cronos.com/](https://explorer.cronos.com/)
* Native token symbol: `CRO`

### Cronos EVM Testnet Specs

* Chain ID: `338`
* JSON RPC API: [https://evm-t3.cronos.com/](https://evm-t3.cronos.com/)
* Block explorer: [https://explorer.cronos.com/testnet](https://explorer.cronos.com/testnet)
* Native token symbol: `tCRO`

### Block Explorers

{% tabs %}
{% tab title="Cronos Mainnet" %}
* **Cronos Explorer:** [https://explorer.cronos.com/](https://explorer.cronos.com/)
{% endtab %}

{% tab title="Testnet" %}
* **Cronos Testnet Explorer:** [https://explorer.cronos.com/testnet](https://explorer.cronos.com/testnet)
{% endtab %}
{% endtabs %}

Cronos Explorer is the reference transaction and block explorer on Cronos `https://explorer.cronos.com`

### Free RPC URLs for Cronos

{% hint style="danger" %}
Public RPCs URL Updates:

The Cronos RPC endpoints have been updated in March 2021 (shown as below) and it is recommended that all users update the endpoints. The old endpoints are still available for compatibility but maybe deprecated later.
{% endhint %}

{% hint style="info" %}
Request Limits on Public RPCs:

To provide a stable experience to users, there is a request rate limit on the public RPCs to ensure fair usage. If your application requires a higher usage, please consider setting up your own nodes or using a commercial node provider. You can also reach out to us on [Discord](https://discord.gg/cGtxgVfGMZ) for assistance.
{% endhint %}

{% hint style="info" %}
Public RPCs Integration Tips:

There are more than one machines serving the public RPC services. There is no guarantee that you are served by the same machine every time. For example, if you are broadcasting many transactions in a row, they will be sent to multiple machines that may not be perfectly in sync with respect to the account nonce, and this may cause your batch to fail.

If you are sending large numbers of transactions from your backend, consider setting up a single dedicated node.
{% endhint %}

{% tabs %}
{% tab title="Mainnet" %}
* **EVM HTTP JSON RPC (Web3 compatible)**
  * [https://evm.cronos.com/](https://evm.cronos.com/)
* **Block explorer**
  * [https://explorer.cronos.com/](https://explorer.cronos.com/)
* **Tendermint RPC**
  * [https://rpc.cronos.com/](https://rpc.cronos.com/)
* **Cosmos RESTful**
  * [https://rest.cronos.com/](https://rest.cronos.com/)
* **Cosmos gRPC Based**
  * [https://grpc.cronos.com/](https://grpc.cronos.com/)
* **Swagger Rest API**
  * [https://rest.cronos.com/swagger/](https://rest.cronos.com/swagger/)
{% endtab %}

{% tab title="Testnet" %}
* **EVM HTTP JSON RPC (Web3 compatible)**
  * [https://evm-t3.cronos.com/](https://evm-t3.cronos.com/)
* **Block explorer**
  * [https://explorer.cronos.com/testnet](https://explorer.cronos.com/testnet)
* **Tendermint RPC**
  * [https://rpc-t3.cronos.com/](https://rpc-t3.cronos.com/)
* **Cosmos RESTful**
  * [https://rest-t3.cronos.com/](https://rest-t3.cronos.com/)
* **Cosmos gRPC Based**
  * [https://grpc-t3.cronos.com/](https://grpc-t3.cronos.com/)
{% endtab %}
{% endtabs %}

#### Commercial node providers

{% hint style="info" %}
Disclaimer:

The RPC endpoints below are provided by third-party services. Please conduct thorough independent research and testing before use. The use of these endpoints is at the user's sole risk.
{% endhint %}

* Moralis:
  * [Moralis Nodes](https://moralis.io/nodes/?utm_source=cronos-docs\&utm_medium=partner-docs)
  * [Moralis YouTube Tutorials](https://www.youtube.com/@MoralisWeb3)
* Blockdaemon:
  * [Blockdaemon landing page](https://blockdaemon.com/protocols/cronos/)
* RockX:
  * [Guide to Cronos Free Access Node](https://help.rockx.com/en/articles/6153885-guide-to-cronos-free-access-node)
  * [Cronos Blockchain API for Web3 Builders](https://access.rockx.com/product/cronos-blockchain-api-for-web3-builders)
* Chainstack:
  * [Cronos documentation](https://docs.chainstack.com/operations/cronos/)
  * [Get started with Cronos Node on Chainstack](https://chainstack.com/build-better-with-cronos/)
  * [Build lottery smart contract on Cronos blockchain with Chainstack](https://chainstack.com/lottery-smart-contract-on-cronos-blockchain/)
  * [Chainstack announces support for Cronos](https://chainstack.com/chainstack-announces-support-for-cronos/)
* GetBlock:
  * [Cronos Shared Nodes](https://getblock.io/nodes/cro/)
* Automata:
  * [Automata 1RPC](https://docs.1rpc.io/overview/supported-networks#cronos)
* BlockPI:
  * [Distributed RPC Service](https://public.blockpi.io/)
* All That Node:
  * [Cronos Nodes](https://www.allthatnode.com/cronos.dsrv)
* Allnodes:
  * [RPC Gateway to Cronos](https://cronos.publicnode.com/)
* Dwellir:
  * [Connect your dApp or Web3 project with any blockchain](https://www.dwellir.com/networks/cronos)
* dRPC NodeCloud:
  * [Cronos Mainnet endpoints](https://drpc.org/chainlist/cronos-mainnet-rpc)
  * [Cronos Testnet endpoints](https://drpc.org/chainlist/cronos-testnet-rpc)
  * [Service Status](https://status.drpc.org/)
