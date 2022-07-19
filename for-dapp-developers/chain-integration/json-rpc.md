# JSON-RPC

## Ethereum type JSON-RPC Methods

### Pre-requisite Readings

* [Ethereum JSON-RPC](https://eth.wiki/json-rpc/API)
* [Geth JSON-RPC APIs](https://geth.ethereum.org/docs/rpc/server)

Below is a list of Ethereum type JSON-RPC Methods where users can curl via local node. While you can also surf to our swagger playground for a better understanding.

{% tabs %}
{% tab title="Mainnet" %}
[Mainnet swagger playground](https://cronos.org/docs/swagger?network=mainnet)
{% endtab %}

{% tab title="Testnet" %}
[Testnet swagger playground](https://cronos.org/docs/swagger?network=testnet)
{% endtab %}
{% endtabs %}

### JSON-RPC Methods

| Method                                                                              | Namespace | Implemented | Public |
| ----------------------------------------------------------------------------------- | --------- | ----------- | ------ |
| `web3_clientVersion`                                                                | Web3      | ✔           | ✔      |
| `web3_sha3`                                                                         | Web3      | ✔           | ✔      |
| `net_version`                                                                       | Net       | ✔           | ✔      |
| `net_peerCount`                                                                     | Net       | ✔           | ✔      |
| `net_listening`                                                                     | Net       | ✔           | ✔      |
| `eth_protocolVersion`                                                               | Eth       | ✔           | ✔      |
| `eth_syncing`                                                                       | Eth       | ✔           | ✔      |
| `eth_gasPrice`                                                                      | Eth       | ✔           | ✔      |
| `eth_accounts`                                                                      | Eth       | ✔           | ✔      |
| `eth_blockNumber`                                                                   | Eth       | ✔           | ✔      |
| `eth_getBalance`                                                                    | Eth       | ✔           | ✔      |
| `eth_getStorageAt`                                                                  | Eth       | ✔           | ✔      |
| `eth_getTransactionCount`                                                           | Eth       | ✔           | ✔      |
| `eth_getBlockTransactionCountByNumber`                                              | Eth       | ✔           | ✔      |
| `eth_getBlockTransactionCountByHash`                                                | Eth       | ✔           | ✔      |
| `eth_getCode`                                                                       | Eth       | ✔           | ✔      |
| `eth_sign`                                                                          | Eth       | ✔           | ✔      |
| `eth_sendTransaction`                                                               | Eth       | ✔           | ✔      |
| `eth_sendRawTransaction`                                                            | Eth       | ✔           | ✔      |
| `eth_call`                                                                          | Eth       | ✔           | ✔      |
| `eth_estimateGas`                                                                   | Eth       | ✔           | ✔      |
| `eth_getBlockByNumber`                                                              | Eth       | ✔           | ✔      |
| `eth_getBlockByHash`                                                                | Eth       | ✔           | ✔      |
| `eth_getTransactionByHash`                                                          | Eth       | ✔           | ✔      |
| `eth_getTransactionByBlockHashAndIndex`                                             | Eth       | ✔           | ✔      |
| `eth_getTransactionReceipt`                                                         | Eth       | ✔           | ✔      |
| `eth_newFilter`                                                                     | Eth       | ✔           |        |
| `eth_newBlockFilter`                                                                | Eth       | ✔           |        |
| `eth_newPendingTransactionFilter`                                                   | Eth       | ✔           |        |
| `eth_uninstallFilter`                                                               | Eth       | ✔           |        |
| `eth_getFilterChanges`                                                              | Eth       | ✔           |        |
| `eth_getFilterLogs`                                                                 | Eth       | ✔           |        |
| `eth_getLogs`                                                                       | Eth       | ✔           | ✔      |
| `eth_getTransactionbyBlockNumberAndIndex`                                           | Eth       |             | ✔      |
| `eth_submitHashrate`                                                                | Eth       |             |        |
| `eth_getCompilers`                                                                  | Eth       |             |        |
| `eth_compileLLL`                                                                    | Eth       |             |        |
| `eth_compileSolidity`                                                               | Eth       |             |        |
| `eth_compileSerpent`                                                                | Eth       |             |        |
| `eth_signTransaction`                                                               | Eth       |             |        |
| `eth_coinbase`                                                                      | Eth       | ✔           |        |
| `eth_getProof`                                                                      | Eth       | ✔           |        |
| `eth_subscribe`                                                                     | Websocket | ✔           |        |
| `eth_unsubscribe`                                                                   | Websocket | ✔           |        |

{% hint style="info" %}
Tip\
\
Block Number can be entered as a Hex string, `"earliest"`, `"latest"` or `"pending"`.
{% endhint %}

{% hint style="info" %}
Tip\
\
While the examples below make use of local node [http://localhost:8545](http://localhost:8545), users may also use our public full node: [https://evm-t3.cronos.org:8545/](https://evm-t3.cronos.org:8545/)
{% endhint %}

{% hint style="info" %}
Note\
\
When using batch requests, we currently only allow 3 objects for Mainnet and 5 objects for Testnet
{% endhint %}

## JSON-RPC namespaces

### Pre-requisite Readings

* [Geth JSON-RPC Namespaces](https://geth.ethereum.org/docs/rpc/server)

### Ethereum Namespaces

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
