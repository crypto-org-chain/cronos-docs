# Cronos Integration documentation

## Useful Links

- [Cronos website](https://cronos.crypto.org/)
- [GitHub Repository](https://github.com/crypto-org-chain/cronos)
- [Official Documentation](https://cronos.crypto.org/docs/)
- [Testnet Faucet](https://cronos.crypto.org/faucet/)
  - Note that the faucet only takes eth-type `0x...` addr
- [Binaries](https://github.com/crypto-org-chain/cronos/releases)

- [Seeds for fullnode](https://github.com/crypto-org-chain/cronos-testnets/blob/main/testnet.json#L21)
- Genesis files
  - [Mainnet genesis](https://raw.githubusercontent.com/crypto-org-chain/cronos-mainnet/master/cronosmainnet_25-1/genesis.json)
  - [Testnet genesis](https://github.com/crypto-org-chain/cronos-testnets/blob/main/cronostestnet_338-1/genesis.json)

## Setup Guide

- **Cronos Testnet**:
  - [Joining the Cronos Testnet](https://cronos.crypto.org/docs/getting-started/)
  - [Using MetaMask](https://cronos.crypto.org/docs/getting-started/metamask.html)
  - [Deploying Smart Contract](https://cronos.crypto.org/docs/getting-started/cronos-smart-contract.html)

## RPC URLs for Cronos mainnet Beta

1. **Tendermint RPC**

   - https://rpc-cronos.crypto.org

2. **Cosmos RESTful**

   - https://rest-cronos.crypto.org

3. **Cosmos gRPC Based**

   - https://grpc-cronos.crypto.org

4. **EVM HTTP JSON RPC (Web3 compatible)**
   - https://evm-cronos.crypto.org

## Official token contract addresses for Cronos mainnet Beta

| Token name | address                                      | decimal |
| ---------- | -------------------------------------------- | ------- |
| WCRO       | [0x5C7F8A570d578ED84E63fdFA7b1eE72dEae1AE23](https://cronos.crypto.org/explorer/tokens/0x5C7F8A570d578ED84E63fdFA7b1eE72dEae1AE23/token-transfers) | 18      |
| WETH       | [0xe44Fd7fCb2b1581822D0c862B68222998a0c299a](https://cronos.crypto.org/explorer/tokens/0xe44Fd7fCb2b1581822D0c862B68222998a0c299a/token-transfers)| 18      |
| WBTC       | [0x062E66477Faf219F25D27dCED647BF57C3107d52](https://cronos.crypto.org/explorer/tokens/0x062E66477Faf219F25D27dCED647BF57C3107d52/token-transfers)| 8       |
| USDC       | [0xc21223249CA28397B4B6541dfFaEcC539BfF0c59](https://cronos.crypto.org/explorer/tokens/0xc21223249CA28397B4B6541dfFaEcC539BfF0c59/token-transfers )| 6       |
| USDT       | [0x66e428c3f67a68878562e79A0234c1F83c208770](https://cronos.crypto.org/explorer/tokens/0x66e428c3f67a68878562e79A0234c1F83c208770/token-transfers )| 6       |
| DAI        | [0xF2001B145b43032AAF5Ee2884e456CCd805F677D](https://cronos.crypto.org/explorer/tokens/0xF2001B145b43032AAF5Ee2884e456CCd805F677D/token-transfers)| 18      |
| SHIB       | [0xbED48612BC69fA1CaB67052b42a95FB30C1bcFee](https://cronos.crypto.org/explorer/tokens/0xbED48612BC69fA1CaB67052b42a95FB30C1bcFee/token-transfers )| 18      |
| DOGE       | [0x1a8E39ae59e5556B56b76fCBA98d22c9ae557396](https://cronos.crypto.org/explorer/tokens/0x1a8E39ae59e5556B56b76fCBA98d22c9ae557396/token-transfers )| 8       |

## API Clients and libraries

- [**TypeScript** library](https://github.com/crypto-org-chain/chain-jslib);
- [**Python** library](https://pypi.org/project/chainlibpy/#description);
- [**Rust** library](https://github.com/crypto-org-chain/chainlib-rs) (note that it is not feature complete);
- [@cosmjs/stargate](https://github.com/cosmos/cosmjs/tree/master/packages/stargate).

### RPC URLs for For Cronos testnet

1. **Tendermint RPC**

   - https://cronos-testnet-3.crypto.org/ or
   - https://cronos-testnet-3.crypto.org:26657/

2. **Cosmos RPC**

   - https://cronos-testnet-3.crypto.org:1317/

3. **gRPC Based**

   - https://cronos-testnet-3.crypto.org:9090/

4. **EVM HTTP JSON RPC**

   - https://cronos-testnet-3.crypto.org:8545/

5. **EVM WS JSON RPC**
   - https://cronos-testnet-3.crypto.org:8546/

# Ethereum type JSON-RPC Methods

### Pre-requisite Readings

- [Ethereum JSON-RPC](https://eth.wiki/json-rpc/API) {prereq}
- [Geth JSON-RPC APIs](https://geth.ethereum.org/docs/rpc/server) {prereq}

### Endpoints

| Method                                                                            | Namespace | Implemented | Public |
| --------------------------------------------------------------------------------- | --------- | ----------- | ------ |
| [`web3_clientVersion`](#web3-clientversion)                                       | Web3      | ✔           | ✔      |
| [`web3_sha3`](#web3-sha3)                                                         | Web3      | ✔           | ✔      |
| [`net_version`](#net-version)                                                     | Net       | ✔           | ✔      |
| [`net_peerCount`](#net-peerCount)                                                 | Net       | ✔           | ✔      |
| [`net_listening`](#net-listening)                                                 | Net       | ✔           | ✔      |
| [`eth_protocolVersion`](#eth-protocolversion)                                     | Eth       | ✔           | ✔      |
| [`eth_syncing`](#eth-syncing)                                                     | Eth       | ✔           | ✔      |
| [`eth_gasPrice`](#eth-gasprice)                                                   | Eth       | ✔           | ✔      |
| [`eth_accounts`](#eth-accounts)                                                   | Eth       | ✔           | ✔      |
| [`eth_blockNumber`](#eth-blocknumber)                                             | Eth       | ✔           | ✔      |
| [`eth_getBalance`](#eth-getbalance)                                               | Eth       | ✔           | ✔      |
| [`eth_getStorageAt`](#eth-getstorageat)                                           | Eth       | ✔           | ✔      |
| [`eth_getTransactionCount`](#eth-gettransactioncount)                             | Eth       | ✔           | ✔      |
| [`eth_getBlockTransactionCountByNumber`](#eth-getblocktransactioncountbynumber)   | Eth       | ✔           | ✔      |
| [`eth_getBlockTransactionCountByHash`](#eth-getblocktransactioncountbyhash)       | Eth       | ✔           | ✔      |
| [`eth_getCode`](#eth-getcode)                                                     | Eth       | ✔           | ✔      |
| [`eth_sign`](#eth-sign)                                                           | Eth       | ✔           | ✔      |
| [`eth_sendTransaction`](#eth-sendtransaction)                                     | Eth       | ✔           | ✔      |
| [`eth_sendRawTransaction`](#eth-sendrawtransaction)                               | Eth       | ✔           | ✔      |
| [`eth_call`](#eth-call)                                                           | Eth       | ✔           | ✔      |
| [`eth_estimateGas`](#eth-estimategas)                                             | Eth       | ✔           | ✔      |
| [`eth_getBlockByNumber`](#eth-getblockbynumber)                                   | Eth       | ✔           | ✔      |
| [`eth_getBlockByHash`](#eth-getblockbyhash)                                       | Eth       | ✔           | ✔      |
| [`eth_getTransactionByHash`](#eth-gettransactionbyhash)                           | Eth       | ✔           | ✔      |
| [`eth_getTransactionByBlockHashAndIndex`](#eth-gettransactionbyblockhashandindex) | Eth       | ✔           | ✔      |
| [`eth_getTransactionReceipt`](#eth-gettransactionreceipt)                         | Eth       | ✔           | ✔      |
| [`eth_newFilter`](#eth-newfilter)                                                 | Eth       | ✔           | ✔      |
| [`eth_newBlockFilter`](#eth-newblockfilter)                                       | Eth       | ✔           | ✔      |
| [`eth_newPendingTransactionFilter`](#eth-newpendingtransactionfilter)             | Eth       | ✔           | ✔      |
| [`eth_uninstallFilter`](#eth-uninstallfilter)                                     | Eth       | ✔           | ✔      |
| [`eth_getFilterChanges`](#eth-getfilterchanges)                                   | Eth       | ✔           | ✔      |
| [`eth_getFilterLogs`](#eth-getfilterlogs)                                         | Eth       | ✔           | ✔      |
| [`eth_getLogs`](#eth-getlogs)                                                     | Eth       | ✔           | ✔      |
| `eth_getTransactionbyBlockNumberAndIndex`                                         | Eth       |             | ✔      |
| `eth_submitHashrate`                                                              | Eth       |             |        |
| `eth_getCompilers`                                                                | Eth       |             |        |
| `eth_compileLLL`                                                                  | Eth       |             |        |
| `eth_compileSolidity`                                                             | Eth       |             |        |
| `eth_compileSerpent`                                                              | Eth       |             |        |
| `eth_signTransaction`                                                             | Eth       |             |        |
| [`eth_coinbase`](#eth-coinbase)                                                   | Eth       | ✔           |        |
| [`eth_getProof`](#eth-getProof)                                                   | Eth       | ✔           |        |
| [`eth_subscribe`](#eth-subscribe)                                                 | Websocket | ✔           |        |
| [`eth_unsubscribe`](#eth-unsubscribe)                                             | Websocket | ✔           |        |

:::tip
Block Number can be entered as a Hex string, `"earliest"`, `"latest"` or `"pending"`.
:::
:::tip
While the examples below make use of local node http://localhost:8545, users may also use our public full node:
https://cronos-testnet-3.crypto.org:8545
:::

Below is a list of the RPC methods, the parameters and an example response from the namespaces.

### Web3 Methods

### `web3_clientVersion`

Get the web3 client version.

```json
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"web3_clientVersion","params":[],"id":67}' -H "Content-Type: application/json" http://localhost:8545
// Result
 {"jsonrpc":"2.0","id":1,"result":"Cronos/0.0.0+/linux/go1.14"}
```

### `web3_sha3`

Returns Keccak-256 (not the standardized SHA3-256) of the given data.

#### Parameters

- The data to convert into a SHA3 hash

```json
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"web3_sha3","params":["0x67656c6c6f20776f726c64"],"id":1}' -H "Content-Type: application/json" http://localhost:8545
// Result
{"jsonrpc":"2.0","id":1,"result":"0x1b84adea42d5b7d192fd8a61a85b25abe0757e9a65cab1da470258914053823f"}
```

### Net Methods

### `net_version`

Returns the current network id.

```json
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"net_version","params":[],"id":1}' -H "Content-Type: application/json" http://localhost:8545
// Result
{"jsonrpc":"2.0","id":1,"result":"8"}
```

### `net_peerCount`

Returns the number of peers currently connected to the client.

```json
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"net_peerCount","params":[],"id":1}' -H "Content-Type: application/json" http://localhost:8545
// Result
{"jsonrpc":"2.0","id":1,"result":23}
```

### `net_listening`

Returns if client is actively listening for network connections.

```json
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"net_listening","params":[],"id":1}' -H "Content-Type: application/json" http://localhost:8545
// Result
{"jsonrpc":"2.0","id":1,"result":true}
```

### Eth Methods

### `eth_protocolVersion`

Returns the current ethereum protocol version.

```json
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_protocolVersion","params":[],"id":1}' -H "Content-Type: application/json" http://localhost:8545
// Result
{"jsonrpc":"2.0","id":1,"result":"0x3f"}
```

### `eth_syncing`

The sync status object may need to be different depending on the details of Tendermint's sync protocol. However, the 'synced' result is simply a boolean, and can easily be derived from Tendermint's internal sync state.

```json
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_syncing","params":[],"id":1}' -H "Content-Type: application/json" http://localhost:8545
// Result
{"jsonrpc":"2.0","id":1,"result":false}
```

### `eth_gasPrice`

Returns the current gas price in the default EVM denomination parameter.

```json
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_gasPrice","params":[],"id":1}' -H "Content-Type: application/json" http://localhost:8545
// Result
{"jsonrpc":"2.0","id":1,"result":"0x0"}
```

### `eth_accounts`

Returns array of all accounts owned by the client.

```json
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_accounts","params":[],"id":1}' -H "Content-Type: application/json" http://localhost:8545
// Result
{"jsonrpc":"2.0","id":1,"result":["0x3b7252d007059ffc82d16d022da3cbf9992d2f70","0xddd64b4712f7c8f1ace3c145c950339eddaf221d","0x0f54f47bf9b8e317b214ccd6a7c3e38b893cd7f0"]}
```

## JSON-RPC Server

### Pre-requisite Readings

- [EthWiki JSON-RPC API](https://eth.wiki/json-rpc/API) {prereq}
- [Geth JSON-RPC Server](https://geth.ethereum.org/docs/rpc/server) {prereq}

### JSON-RPC API

[JSON](https://json.org/) is a lightweight data-interchange format. It can represent numbers, strings, ordered sequences of values, and collections of name/value pairs.

[JSON-RPC](http://www.jsonrpc.org/specification) is a stateless, light-weight remote procedure call (RPC) protocol. Primarily this specification defines several data structures and the rules around their processing. It is transport agnostic in that the concepts can be used within the same process, over sockets, over HTTP, or in many various message passing environments. It uses JSON ([RFC 4627](https://www.ietf.org/rfc/rfc4627.txt)) as data format.

### JSON-RPC Support

Ethermint supports all standard web3 JSON-RPC APIs. You can find documentation for these APIs in the [`JSON-RPC Methods`](#json-rpc-methods) section.

JSON-RPC is provided on multiple transports. Ethermint supports JSON-RPC over HTTP and WebSocket. Transports must be enabled through command-line flags or through the `app.toml` configuration file. For more details see the []

Ethereum JSON-RPC APIs use a name-space system. RPC methods are grouped into several categories depending on their purpose. All method names are composed of the namespace, an underscore, and the actual method name within the namespace. For example, the eth_call method resides in the eth namespace.

Access to RPC methods can be enabled on a per-namespace basis. Find documentation for individual namespaces in the [Namespaces](#json-rpc-namespaces) page.

### HEX value encoding

At present there are two key datatypes that are passed over JSON: unformatted byte arrays and quantities. Both are passed with a hex encoding, however with different requirements to formatting:

When encoding **QUANTITIES** (integers, numbers): encode as hex, prefix with `"0x"`, the most compact representation (slight exception: zero should be represented as `"0x0"`). Examples:

- `0x41` (65 in decimal)
- `0x400` (1024 in decimal)
- WRONG: `0x` (should always have at least one digit - zero is `"0x0"`)
- WRONG: `0x0400` (no leading zeroes allowed)
- WRONG: `ff` (must be prefixed `0x`)

When encoding **UNFORMATTED DATA** (byte arrays, account addresses, hashes, bytecode arrays): encode as hex, prefix with `"0x"`, two hex digits per byte. Examples:

- `0x41` (size 1, `"A"`)
- `0x004200` (size 3, `"\0B\0"`)
- `0x` (size 0, `""`)
- WRONG: `0xf0f0f` (must be even number of digits)
- WRONG: `004200` (must be prefixed `0x`)

### Default block parameter

The following methods have an extra default block parameter:

- [`eth_getBalance`](./endpoints.md#eth-getbalance)
- [`eth_getCode`](./endpoints.md#eth-getcode)
- [`eth_getTransactionCount`](./endpoints.md#eth-gettransactioncount)
- [`eth_getStorageAt`](./endpoints.md#eth-getstorageat)
- [`eth_call`](./endpoints.md#eth-call)

When requests are made that act on the state of Ethermint, the last default block parameter determines the height of the block.

The following options are possible for the `defaultBlock` parameter:

- `HEX String` - an integer block number
- `String "earliest"` for the earliest/genesis block
- `String "latest"` - for the latest mined block
- `String "pending"` - for the pending state/transactions

### Curl Examples Explained

The curl options below might return a response where the node complains about the content type, this is because the `--data` option sets the content type to `application/x-www-form-urlencoded`. If your node does complain, manually set the header by placing `-H "Content-Type: application/json"` at the start of the call.

The examples also do not include the URL/IP & port combination which must be the last argument given to curl e.x. `127.0.0.1:8545`

## JSON-RPC namespaces

### Pre-requisite Readings

- [Geth JSON-RPC Namespaces](https://geth.ethereum.org/docs/rpc/server) {prereq}

### Ethereum Namespaces

| Namespace                                     | Description                                                                                                                                                                                                                  | Supported | Enabled by Default |
| --------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------- | ------------------ |
| [`eth`](./endpoints.md#eth-methods)           | Cronos provides several extensions to the standard `eth` JSON-RPC namespace.                                                                                                                                                 | ✔         | ✔                  |
| [`web3`](./endpoints.md#web3-methods)         | The `web3` API provides utility functions for the web3 client.                                                                                                                                                               | ✔         | ✔                  |
| [`net`](./endpoints.md#net-methods)           | The `net` API provides access to network information of the node                                                                                                                                                             | ✔         | ✔                  |
| `clique`                                      | The `clique` API provides access to the state of the clique consensus engine. You can use this API to manage signer votes and to check the health of a private network.                                                      | ❌        |                    |
| `debug`                                       | The `debug` API gives you access to several non-standard RPC methods, which will allow you to inspect, debug and set certain debugging flags during runtime.                                                                 | ✔         |                    |
| `les`                                         | The `les` API allows you to manage LES server settings, including client parameters and payment settings for prioritized clients. It also provides functions to query checkpoint information in both server and client mode. | ❌        |                    |
| [`miner`](./endpoints.md#miner-methods)       | The `miner` API allows you to remote control the node’s mining operation and set various mining specific settings.                                                                                                           | ✔         | ❌                 |
| [`txpool`](./endpoints.md#txpool-methods)     | The `txpool` API gives you access to several non-standard RPC methods to inspect the contents of the transaction pool containing all the currently pending transactions as well as the ones queued for future processing.    | ✔         | ❌                 |
| `admin`                                       | The `admin` API gives you access to several non-standard RPC methods, which will allow you to have a fine grained control over your nodeinstance, including but not limited to network peer and RPC endpoint management.     | ❌        |                    |
| [`personal`](./endpoints.md#personal-methods) | The `personal` API manages private keys in the key store.                                                                                                                                                                    | ✔         | ❌                 |

## Block Explorer

- Cronos Mainnet Beta:
  [https://cronos-explorer.crypto.org/](https://cronos-explorer.crypto.org)
- Cronos Testnet:
  [https://cronos.crypto.org/explorer/testnet3](https://cronos.crypto.org/explorer/testnet3)

## Community

[Discord](https://discord.gg/cGtxgVfGMZ)
