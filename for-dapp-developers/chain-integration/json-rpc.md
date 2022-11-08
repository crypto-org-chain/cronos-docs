# JSON-RPC

## Ethereum type JSON-RPC Methods

### Pre-requisite Readings

* [Ethereum JSON-RPC](https://eth.wiki/json-rpc/API)
* [Geth JSON-RPC APIs](https://geth.ethereum.org/docs/rpc/server)

Below is a list of Ethereum type JSON-RPC Methods where users can curl via local node. While you can also surf to our `swagger playground`for a better understanding.

### JSON-RPC Methods

#### Web3

| Method               | Namespace | Implemented | Public |
| -------------------- | --------- | ----------- | ------ |
| `web3_clientVersion` | Web3      | ✔           | ✔      |
| `web3_sha3`          | Web3      | ✔           | ✔      |

#### Getting Blocks

| Method                 | Namespace | Implemented | Public |
| ---------------------- | --------- | ----------- | ------ |
| `eth_getBalance`       | Eth       | ✔           | ✔      |
| `eth_getBlockByNumber` | Eth       | ✔           | ✔      |
| `eth_getBlockByHash`   | Eth       | ✔           | ✔      |

#### Read data

| Method                                    | Namespace | Implemented | Public |
| ----------------------------------------- | --------- | ----------- | ------ |
| `eth_call`                                | Eth       | ✔           | ✔      |
| `eth_getTransactionByHash`                | Eth       | ✔           | ✔      |
| `eth_getTransactionCount`                 | Eth       | ✔           | ✔      |
| `eth_getTransactionReceipt`               | Eth       | ✔           | ✔      |
| `eth_getBlockTransactionCountByNumber`    | Eth       | ✔           | ✔      |
| `eth_getBlockTransactionCountByHash`      | Eth       | ✔           | ✔      |
| `eth_getTransactionbyBlockNumberAndIndex` | Eth       | ✔           | ✔      |
| `eth_getTransactionByBlockHashAndIndex`   | Eth       | ✔           | ✔      |
| `eth_sign`                                | Eth       | ✔           |        |
| `eth_coinbase`                            | Eth       | ✔           |        |

#### Writing data

| Method                         | Namespace | Implemented | Public |
| ------------------------------ | --------- | ----------- | ------ |
| `eth_sendTransaction`          | Eth       | ✔           |        |
| `eth_sendRawTransaction`       | Eth       | ✔           | ✔      |
| `eth_sendPrivateTransaction`   | Eth       |             |        |
| `eth_cancelPrivateTransaction` | Eth       |             |        |

#### Account

| Method             | Namespace | Implemented | Public |
| ------------------ | --------- | ----------- | ------ |
| `eth_getBalance`   | Eth       | ✔           | ✔      |
| `eth_getStorageAt` | Eth       | ✔           | ✔      |
| `eth_getCode`      | Eth       | ✔           | ✔      |
| `eth_accounts`     | Eth       | ✔           |        |
| `eth_getProof`     | Eth       | ✔           |        |

#### Event Logs

| Method                            | Namespace | Implemented | Public |
| --------------------------------- | --------- | ----------- | ------ |
| `eth_getLogs`                     | Eth       | ✔           | ✔      |
| `eth_getFilterChanges`            | Eth       | ✔           |        |
| `eth_getFilterLogs`               | Eth       | ✔           |        |
| `eth_newBlockFilter`              | Eth       | ✔           |        |
| `eth_newFilter`                   | Eth       | ✔           |        |
| `eth_newPendingTransactionFilter` | Eth       | ✔           |        |
| `eth_uninstallFilter`             | Eth       | ✔           |        |

#### Chain

| Method                     | Namespace | Implemented | Public |
| -------------------------- | --------- | ----------- | ------ |
| `eth_protocolVersion`      | Eth       | ✔           | ✔      |
| `eth_gasPrice`             | Eth       | ✔           | ✔      |
| `eth_estimateGas`          | Eth       | ✔           | ✔      |
| `eth_feeHistory`           | Eth       | ✔           | ✔      |
| `eth_maxPriorityFeePerGas` | Eth       | ✔           | ✔      |
| `eth_chainId`              | Eth       | ✔           | ✔      |
| `eth_syncing`              | Eth       | ✔           | ✔      |
| `eth_blockNumber`          | Eth       | ✔           | ✔      |
| `net_listening`            | Net       | ✔           | ✔      |
| `net_version`              | Net       | ✔           | ✔      |
| `net_peerCount`            | Net       | ✔           | ✔      |

#### Websocket

| Method            | Namespace | Implemented | Public |
| ----------------- | --------- | ----------- | ------ |
| `eth_subscribe`   | Websocket | ✔           |        |
| `eth_unsubscribe` | Websocket | ✔           |        |

{% hint style="info" %}
Tip\
Block Number can be entered as a Hex string, `"earliest"`, `"latest"` or `"pending"`.
{% endhint %}

{% hint style="info" %}
When using batch requests, we currently only allow 3 objects for Mainnet and 5 objects for Testnet
{% endhint %}

## JSON-RPC namespaces

### Pre-requisite Readings

* [Geth JSON-RPC Namespaces](https://geth.ethereum.org/docs/rpc/server)

### Ethereum Namespaces

| Namespace  | Description                                                                                                                                                                                                                  | Supported | Enabled by Default |
| ---------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------- | ------------------ |
| `eth`      | Cronos provides several extensions to the standard `eth` JSON-RPC namespace.                                                                                                                                                 | ✔         | ✔                  |
| `web3`     | The `web3` API provides utility functions for the web3 client.                                                                                                                                                               | ✔         | ✔                  |
| `net`      | The `net` API provides access to network information of the node                                                                                                                                                             | ✔         | ✔                  |
| `clique`   | The `clique` API provides access to the state of the clique consensus engine. You can use this API to manage signer votes and to check the health of a private network.                                                      | ❌         |                    |
| `debug`    | The `debug` API gives you access to several non-standard RPC methods, which will allow you to inspect, debug and set certain debugging flags during runtime.                                                                 | ✔         |                    |
| `les`      | The `les` API allows you to manage LES server settings, including client parameters and payment settings for prioritized clients. It also provides functions to query checkpoint information in both server and client mode. | ❌         |                    |
| `miner`    | The `miner` API allows you to remote control the node’s mining operation and set various mining specific settings.                                                                                                           | ✔         | ❌                  |
| `txpool`   | The `txpool` API gives you access to several non-standard RPC methods to inspect the contents of the transaction pool containing all the currently pending transactions as well as the ones queued for future processing.    | ✔         | ❌                  |
| `admin`    | The `admin` API gives you access to several non-standard RPC methods, which will allow you to have a fine grained control over your nodeinstance, including but not limited to network peer and RPC endpoint management.     | ❌         |                    |
| `personal` | The `personal` API manages private keys in the key store.                                                                                                                                                                    | ✔         | ❌                  |
