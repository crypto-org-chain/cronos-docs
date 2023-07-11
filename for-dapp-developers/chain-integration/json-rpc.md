# JSON-RPC methods

## Ethereum type JSON-RPC Methods

### Pre-requisite Readings

* [Ethereum JSON-RPC](https://eth.wiki/json-rpc/API)
* [Geth JSON-RPC APIs](https://geth.ethereum.org/docs/rpc/server)

Below is a list of Ethereum type JSON-RPC Methods where users can curl via local node. While you can also surf to our `swagger playground`for a better understanding.

### JSON-RPC Methods

#### Web3

<table><thead><tr><th width="416">Method</th><th width="119">Namespace</th><th width="131">Implemented</th><th>Public</th></tr></thead><tbody><tr><td><code>web3_clientVersion</code></td><td>Web3</td><td>✔</td><td>✔</td></tr><tr><td><code>web3_sha3</code></td><td>Web3</td><td>✔</td><td>✔</td></tr></tbody></table>

#### Getting Blocks

<table><thead><tr><th width="248">Method</th><th>Namespace</th><th>Implemented</th><th width="40">Public</th></tr></thead><tbody><tr><td><code>eth_getBalance</code></td><td>Eth</td><td>✔</td><td>✔</td></tr><tr><td><code>eth_getBlockByNumber</code></td><td>Eth</td><td>✔</td><td>✔</td></tr><tr><td><code>eth_getBlockByHash</code></td><td>Eth</td><td>✔</td><td>✔</td></tr></tbody></table>

#### Read data

<table><thead><tr><th width="432">Method</th><th>Namespace</th><th width="121">Implemented</th><th>Public</th></tr></thead><tbody><tr><td><code>eth_call</code></td><td>Eth</td><td>✔</td><td>✔</td></tr><tr><td><code>eth_getTransactionByHash</code></td><td>Eth</td><td>✔</td><td>✔</td></tr><tr><td><code>eth_getTransactionCount</code></td><td>Eth</td><td>✔</td><td>✔</td></tr><tr><td><code>eth_getTransactionReceipt</code></td><td>Eth</td><td>✔</td><td>✔</td></tr><tr><td><code>eth_getBlockTransactionCountByNumber</code></td><td>Eth</td><td>✔</td><td>✔</td></tr><tr><td><code>eth_getBlockTransactionCountByHash</code></td><td>Eth</td><td>✔</td><td>✔</td></tr><tr><td><code>eth_getTransactionbyBlockNumberAndIndex</code></td><td>Eth</td><td>✔</td><td>✔</td></tr><tr><td><code>eth_getTransactionByBlockHashAndIndex</code></td><td>Eth</td><td>✔</td><td>✔</td></tr><tr><td><code>eth_sign</code></td><td>Eth</td><td>✔</td><td></td></tr><tr><td><code>eth_coinbase</code></td><td>Eth</td><td>✔</td><td></td></tr></tbody></table>

#### Writing data

<table><thead><tr><th width="363">Method</th><th width="145">Namespace</th><th>Implemented</th><th>Public</th></tr></thead><tbody><tr><td><code>eth_sendTransaction</code></td><td>Eth</td><td>✔</td><td></td></tr><tr><td><code>eth_sendRawTransaction</code></td><td>Eth</td><td>✔</td><td>✔</td></tr><tr><td><code>eth_sendPrivateTransaction</code></td><td>Eth</td><td></td><td></td></tr><tr><td><code>eth_cancelPrivateTransaction</code></td><td>Eth</td><td></td><td></td></tr></tbody></table>

#### Account

<table><thead><tr><th width="260">Method</th><th>Namespace</th><th>Implemented</th><th>Public</th></tr></thead><tbody><tr><td><code>eth_getBalance</code></td><td>Eth</td><td>✔</td><td>✔</td></tr><tr><td><code>eth_getStorageAt</code></td><td>Eth</td><td>✔</td><td>✔</td></tr><tr><td><code>eth_getCode</code></td><td>Eth</td><td>✔</td><td>✔</td></tr><tr><td><code>eth_accounts</code></td><td>Eth</td><td>✔</td><td></td></tr><tr><td><code>eth_getProof</code></td><td>Eth</td><td>✔</td><td></td></tr></tbody></table>

#### Event Logs

<table><thead><tr><th width="367">Method</th><th>Namespace</th><th>Implemented</th><th>Public</th></tr></thead><tbody><tr><td><code>eth_getLogs</code></td><td>Eth</td><td>✔</td><td>✔</td></tr><tr><td><code>eth_getFilterChanges</code></td><td>Eth</td><td>✔</td><td></td></tr><tr><td><code>eth_getFilterLogs</code></td><td>Eth</td><td>✔</td><td></td></tr><tr><td><code>eth_newBlockFilter</code></td><td>Eth</td><td>✔</td><td></td></tr><tr><td><code>eth_newFilter</code></td><td>Eth</td><td>✔</td><td></td></tr><tr><td><code>eth_newPendingTransactionFilter</code></td><td>Eth</td><td>✔</td><td></td></tr><tr><td><code>eth_uninstallFilter</code></td><td>Eth</td><td>✔</td><td></td></tr></tbody></table>

#### Chain

<table><thead><tr><th width="303">Method</th><th>Namespace</th><th>Implemented</th><th>Public</th></tr></thead><tbody><tr><td><code>eth_protocolVersion</code></td><td>Eth</td><td>✔</td><td>✔</td></tr><tr><td><code>eth_gasPrice</code></td><td>Eth</td><td>✔</td><td>✔</td></tr><tr><td><code>eth_estimateGas</code></td><td>Eth</td><td>✔</td><td>✔</td></tr><tr><td><code>eth_feeHistory</code></td><td>Eth</td><td>✔</td><td>✔</td></tr><tr><td><code>eth_maxPriorityFeePerGas</code></td><td>Eth</td><td>✔</td><td>✔</td></tr><tr><td><code>eth_chainId</code></td><td>Eth</td><td>✔</td><td>✔</td></tr><tr><td><code>eth_syncing</code></td><td>Eth</td><td>✔</td><td>✔</td></tr><tr><td><code>eth_blockNumber</code></td><td>Eth</td><td>✔</td><td>✔</td></tr><tr><td><code>net_listening</code></td><td>Net</td><td>✔</td><td>✔</td></tr><tr><td><code>net_version</code></td><td>Net</td><td>✔</td><td>✔</td></tr><tr><td><code>net_peerCount</code></td><td>Net</td><td>✔</td><td>✔</td></tr></tbody></table>

#### Websocket

<table><thead><tr><th width="204">Method</th><th>Namespace</th><th>Implemented</th><th>Public</th></tr></thead><tbody><tr><td><code>eth_subscribe</code></td><td>Websocket</td><td>✔</td><td></td></tr><tr><td><code>eth_unsubscribe</code></td><td>Websocket</td><td>✔</td><td></td></tr></tbody></table>

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

<table><thead><tr><th width="164">Namespace</th><th width="377">Description</th><th width="122">Supported</th><th>Enabled by Default</th></tr></thead><tbody><tr><td><code>eth</code></td><td>Cronos provides several extensions to the standard <code>eth</code> JSON-RPC namespace.</td><td>✔</td><td>✔</td></tr><tr><td><code>web3</code></td><td>The <code>web3</code> API provides utility functions for the web3 client.</td><td>✔</td><td>✔</td></tr><tr><td><code>net</code></td><td>The <code>net</code> API provides access to network information of the node</td><td>✔</td><td>✔</td></tr><tr><td><code>clique</code></td><td>The <code>clique</code> API provides access to the state of the clique consensus engine. You can use this API to manage signer votes and to check the health of a private network.</td><td>❌</td><td></td></tr><tr><td><code>debug</code></td><td>The <code>debug</code> API gives you access to several non-standard RPC methods, which will allow you to inspect, debug and set certain debugging flags during runtime.</td><td>✔</td><td></td></tr><tr><td><code>les</code></td><td>The <code>les</code> API allows you to manage LES server settings, including client parameters and payment settings for prioritized clients. It also provides functions to query checkpoint information in both server and client mode.</td><td>❌</td><td></td></tr><tr><td><code>miner</code></td><td>The <code>miner</code> API allows you to remote control the node’s mining operation and set various mining specific settings.</td><td>✔</td><td>❌</td></tr><tr><td><code>txpool</code></td><td>The <code>txpool</code> API gives you access to several non-standard RPC methods to inspect the contents of the transaction pool containing all the currently pending transactions as well as the ones queued for future processing.</td><td>✔</td><td>❌</td></tr><tr><td><code>admin</code></td><td>The <code>admin</code> API gives you access to several non-standard RPC methods, which will allow you to have a fine grained control over your nodeinstance, including but not limited to network peer and RPC endpoint management.</td><td>❌</td><td></td></tr><tr><td><code>personal</code></td><td>The <code>personal</code> API manages private keys in the key store.</td><td>✔</td><td>❌</td></tr></tbody></table>
