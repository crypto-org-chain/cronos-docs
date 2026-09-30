# JSON-RPC: Batch Request Limits

The Cronos public RPC endpoint (`evm.cronos.com`) caps the number of requests allowed in a single JSON-RPC batch call.

* Mainnet: 3 items per batch
* Testnet: 5 items per batch

Requests over the limit will be rejected. The cap is in place to keep the public service stable for all users.

### Working Around the Limit

* Split large batches into chunks of 3 (mainnet) or 5 (testnet) and send them sequentially or in parallel. For example, if you need to fetch 9 items on mainnet, split into 3 separate batch calls of 3 items each.
* If your application needs larger batch sizes, consider setting up a dedicated node or using a commercial RPC provider. See Free and commercial RPC endpoints for available options: [https://docs.cronos.com/for-dapp-developers/chain-integration/public-rpc-endpoints#free-rpc-urls-for-cronos](https://docs.cronos.com/for-dapp-developers/chain-integration/public-rpc-endpoints#free-rpc-urls-for-cronos)
