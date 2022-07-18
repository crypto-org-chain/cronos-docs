# Cronos Integration

### Integration guides

{% tabs %}
{% tab title="Mainnet" %}
#### Setup Guide

* [Joining the Cronos Mainnet](../../for-node-hosts/running-nodes/cronos-mainnet.md)
* [Seeds for Fullnode](https://github.com/crypto-org-chain/cronos-mainnet#seed-nodes)
* [Genesis files](https://raw.githubusercontent.com/crypto-org-chain/cronos-mainnet/master/cronosmainnet\_25-1/genesis.json)
* [JSON-RPC Swagger Playground](https://docs.cronos.org/swagger?network=mainnet)



* [Deploying Smart Contract](../../for-dapp-developers/cronos-smart-contract.md)
* [Using MetaMask](https://docs.cronos.org/getting-started/metamask.html)
{% endtab %}

{% tab title="Testnet" %}
#### Setup Guide

* [Joining the Cronos Testnet](https://docs.cronos.org/getting-started/cronos-testnet.html)
* [Seeds for Fullnode](https://github.com/crypto-org-chain/cronos-testnets/blob/main/testnet.json#L21)
* [Genesis files](https://raw.githubusercontent.com/crypto-org-chain/cronos-testnets/main/cronostestnet\_338-1/genesis.json)
* [JSON-RPC Swagger Playground](https://docs.cronos.org/swagger)



* [Testnet Faucet](https://cronos.org/faucet/)
* [Using Metamask](https://docs.cronos.org/for-users/metamask)
{% endtab %}
{% endtabs %}

### Useful Links

* [Cronos website](https://cronos.org/)
* [GitHub Repository](https://github.com/crypto-org-chain/cronos)
* [Official Documentation](https://docs.cronos.org/)
* [Cronos Binaries](https://github.com/crypto-org-chain/cronos/releases)

### API Clients and libraries

* [**TypeScript** library](https://github.com/crypto-org-chain/chain-jslib);
* [**Python** library](https://pypi.org/project/chainlibpy/#description);
* [**Rust** library](https://github.com/crypto-org-chain/chainlib-rs) (note that it is not feature complete);
* [@cosmjs/stargate](https://github.com/cosmos/cosmjs/tree/master/packages/stargate).

##

#### JSON-RPC Methods

| Method                                                                              | Namespace | Implemented | Public |
| ----------------------------------------------------------------------------------- | --------- | ----------- | ------ |
| [`web3_clientVersion`](./#web3-clientversion)                                       | Web3      | ✔           | ✔      |
| [`web3_sha3`](./#web3-sha3)                                                         | Web3      | ✔           | ✔      |
| [`net_version`](./#net-version)                                                     | Net       | ✔           | ✔      |
| [`net_peerCount`](./#net-peerCount)                                                 | Net       | ✔           | ✔      |
| [`net_listening`](./#net-listening)                                                 | Net       | ✔           | ✔      |
| [`eth_protocolVersion`](./#eth-protocolversion)                                     | Eth       | ✔           | ✔      |
| [`eth_syncing`](./#eth-syncing)                                                     | Eth       | ✔           | ✔      |
| [`eth_gasPrice`](./#eth-gasprice)                                                   | Eth       | ✔           | ✔      |
| [`eth_accounts`](./#eth-accounts)                                                   | Eth       | ✔           | ✔      |
| [`eth_blockNumber`](./#eth-blocknumber)                                             | Eth       | ✔           | ✔      |
| [`eth_getBalance`](./#eth-getbalance)                                               | Eth       | ✔           | ✔      |
| [`eth_getStorageAt`](./#eth-getstorageat)                                           | Eth       | ✔           | ✔      |
| [`eth_getTransactionCount`](./#eth-gettransactioncount)                             | Eth       | ✔           | ✔      |
| [`eth_getBlockTransactionCountByNumber`](./#eth-getblocktransactioncountbynumber)   | Eth       | ✔           | ✔      |
| [`eth_getBlockTransactionCountByHash`](./#eth-getblocktransactioncountbyhash)       | Eth       | ✔           | ✔      |
| [`eth_getCode`](./#eth-getcode)                                                     | Eth       | ✔           | ✔      |
| [`eth_sign`](./#eth-sign)                                                           | Eth       | ✔           | ✔      |
| [`eth_sendTransaction`](./#eth-sendtransaction)                                     | Eth       | ✔           | ✔      |
| [`eth_sendRawTransaction`](./#eth-sendrawtransaction)                               | Eth       | ✔           | ✔      |
| [`eth_call`](./#eth-call)                                                           | Eth       | ✔           | ✔      |
| [`eth_estimateGas`](./#eth-estimategas)                                             | Eth       | ✔           | ✔      |
| [`eth_getBlockByNumber`](./#eth-getblockbynumber)                                   | Eth       | ✔           | ✔      |
| [`eth_getBlockByHash`](./#eth-getblockbyhash)                                       | Eth       | ✔           | ✔      |
| [`eth_getTransactionByHash`](./#eth-gettransactionbyhash)                           | Eth       | ✔           | ✔      |
| [`eth_getTransactionByBlockHashAndIndex`](./#eth-gettransactionbyblockhashandindex) | Eth       | ✔           | ✔      |
| [`eth_getTransactionReceipt`](./#eth-gettransactionreceipt)                         | Eth       | ✔           | ✔      |
| [`eth_newFilter`](./#eth-newfilter)                                                 | Eth       | ✔           | ✔      |
| [`eth_newBlockFilter`](./#eth-newblockfilter)                                       | Eth       | ✔           | ✔      |
| [`eth_newPendingTransactionFilter`](./#eth-newpendingtransactionfilter)             | Eth       | ✔           | ✔      |
| [`eth_uninstallFilter`](./#eth-uninstallfilter)                                     | Eth       | ✔           | ✔      |
| [`eth_getFilterChanges`](./#eth-getfilterchanges)                                   | Eth       | ✔           | ✔      |
| [`eth_getFilterLogs`](./#eth-getfilterlogs)                                         | Eth       | ✔           | ✔      |
| [`eth_getLogs`](./#eth-getlogs)                                                     | Eth       | ✔           | ✔      |
| `eth_getTransactionbyBlockNumberAndIndex`                                           | Eth       |             | ✔      |
| `eth_submitHashrate`                                                                | Eth       |             |        |
| `eth_getCompilers`                                                                  | Eth       |             |        |
| `eth_compileLLL`                                                                    | Eth       |             |        |
| `eth_compileSolidity`                                                               | Eth       |             |        |
| `eth_compileSerpent`                                                                | Eth       |             |        |
| `eth_signTransaction`                                                               | Eth       |             |        |
| [`eth_coinbase`](./#eth-coinbase)                                                   | Eth       | ✔           |        |
| [`eth_getProof`](./#eth-getProof)                                                   | Eth       | ✔           |        |
| [`eth_subscribe`](./#eth-subscribe)                                                 | Websocket | ✔           |        |
| [`eth_unsubscribe`](./#eth-unsubscribe)                                             | Websocket | ✔           |        |

{% hint style="info" %}
Tip\
\
Block Number can be entered as a Hex string, `"earliest"`, `"latest"` or `"pending"`.&#x20;
{% endhint %}

{% hint style="info" %}
Tip\
\
While the examples below make use of local node [http://localhost:8545](http://localhost:8545), users may also use our public full node: [https://evm-t3.cronos.org:8545/ ](https://evm-t3.cronos.org:8545/)
{% endhint %}

### JSON-RPC namespaces

#### Pre-requisite Readings

* [Geth JSON-RPC Namespaces](https://geth.ethereum.org/docs/rpc/server) {prereq}

#### Ethereum Namespaces

| Namespace                                                                | Description                                                                                                                                                                                                                  | Supported | Enabled by Default |
| ------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------- | ------------------ |
| [`eth`](../../about-cronos/resources/endpoints.md#eth-methods)           | Cronos provides several extensions to the standard `eth` JSON-RPC namespace.                                                                                                                                                 | ✔         | ✔                  |
| [`web3`](../../about-cronos/resources/endpoints.md#web3-methods)         | The `web3` API provides utility functions for the web3 client.                                                                                                                                                               | ✔         | ✔                  |
| [`net`](../../about-cronos/resources/endpoints.md#net-methods)           | The `net` API provides access to network information of the node                                                                                                                                                             | ✔         | ✔                  |
| `clique`                                                                 | The `clique` API provides access to the state of the clique consensus engine. You can use this API to manage signer votes and to check the health of a private network.                                                      | ❌         |                    |
| `debug`                                                                  | The `debug` API gives you access to several non-standard RPC methods, which will allow you to inspect, debug and set certain debugging flags during runtime.                                                                 | ✔         |                    |
| `les`                                                                    | The `les` API allows you to manage LES server settings, including client parameters and payment settings for prioritized clients. It also provides functions to query checkpoint information in both server and client mode. | ❌         |                    |
| [`miner`](../../about-cronos/resources/endpoints.md#miner-methods)       | The `miner` API allows you to remote control the node’s mining operation and set various mining specific settings.                                                                                                           | ✔         | ❌                  |
| [`txpool`](../../about-cronos/resources/endpoints.md#txpool-methods)     | The `txpool` API gives you access to several non-standard RPC methods to inspect the contents of the transaction pool containing all the currently pending transactions as well as the ones queued for future processing.    | ✔         | ❌                  |
| `admin`                                                                  | The `admin` API gives you access to several non-standard RPC methods, which will allow you to have a fine grained control over your nodeinstance, including but not limited to network peer and RPC endpoint management.     | ❌         |                    |
| [`personal`](../../about-cronos/resources/endpoints.md#personal-methods) | The `personal` API manages private keys in the key store.                                                                                                                                                                    | ✔         | ❌                  |

###
