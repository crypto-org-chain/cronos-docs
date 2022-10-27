# Public RPC endpoints

### RPC URLs for Cronos

{% hint style="danger" %}
Public RPCs URL Updates: The Cronos RPC endpoints have been updated in March 2021 (shown as below) and it is recommended that all users update the endpoints. The old endpoints are still available for compatibility but maybe deprecated later.
{% endhint %}

{% hint style="info" %}
Request Limits on Public RPCs: To provide a stable experience to users, there is a request rate limit on the public RPCs to ensure fair usage. If your application requires a higher usage, please consider setting up your own nodes or using a commercial node provider. You can also reach out to us on [Discord](https://discord.gg/cGtxgVfGMZ) for assistance.
{% endhint %}

{% hint style="info" %}
Public RPCs Integration Tips: There are more than one machines serving the public RPC services. There is no guarantee that you are served by the same machine every time. For example, if you are broadcasting many transactions in a row, they will be sent to multiple machines that may not be perfectly in sync with respect to the account nonce, and this may cause your batch to fail.

If you are sending large numbers of transactions from your backend, consider setting up a single dedicated node.
{% endhint %}

{% tabs %}
{% tab title="Mainnet" %}
* **EVM HTTP JSON RPC (Web3 compatible)**
  * [https://evm.cronos.org/](https://evm.cronos.org/)
* **Block explorer**
  * [https://cronoscan.com/](https://cronoscan.com/)
* **Tendermint RPC**
  * [https://rpc.cronos.org/](https://rpc.cronos.org/)
* **Cosmos RESTful**
  * [https://rest.cronos.org/](https://rest.cronos.org/)
* **Cosmos gRPC Based**
  * [https://grpc.cronos.org/](http://grpc.cronos.org/)
* **Swagger Playground**
  * [https://cronos.org/swagger?network=mainnet](https://cronos.org/swagger?network=mainnet)
{% endtab %}

{% tab title="Testnet" %}
* **EVM HTTP JSON RPC (Web3 compatible)**
  * [https://evm-t3.cronos.org/](https://evm-t3.cronos.org/)
* **Block explorer**
  * [https://testnet.cronoscan.com/](https://testnet.cronoscan.com/)
* **Tendermint RPC**
  * [https://rpc-t3.cronos.org/](https://rpc-t3.cronos.org/)
* **Cosmos RESTful**
  * [https://rest-t3.cronos.org/](https://rest-t3.cronos.org/)
* **Cosmos gRPC Based**
  * [https://grpc-t3.cronos.org/](https://grpc-t3.cronos.org/)
* **Swagger Playground**
  * [https://cronos.org/swagger?network=testnet](https://cronos.org/swagger?network=testnet)
{% endtab %}

{% tab title="Gravity Bridge Testnet" %}
* **EVM HTTP JSON RPC (Web3 compatible)**
  * [https://evm-p11.cronos.org](https://evm-p11.cronos.org)
* **Block explorer**\
  [https://cronos.crypto.org/explorer/pioneer11](https://cronos.crypto.org/explorer/pioneer11)
* **Tendermint RPC**
  * [https://rpc-p11.cronos.org:443](https://rpc-p11.cronos.org)
* **Cosmos RESTful**
  * [https://rest-p11.cronos.org](https://rest-p11.cronos.org)
* **Cosmos gRPC Based**
  * [https://grpc-p11.cronos.org](https://grpc-p11.cronos.org)
{% endtab %}
{% endtabs %}

### External node providers

* RockX:&#x20;
  * [Guide to Cronos Free Access Node](https://help.rockx.com/en/articles/6153885-guide-to-cronos-free-access-node)
  * [Cronos Blockchain API for Web3 Builders](https://access.rockx.com/product/cronos-blockchain-api-for-web3-builders)
* Chainstack:
  * [Cronos documentation](https://docs.chainstack.com/operations/cronos/)
  * [Get started with Cronos Node on Chainstack](https://chainstack.com/build-better-with-cronos/)
  * [Chainstack announces support for Cronos ](https://chainstack.com/chainstack-announces-support-for-cronos/)
* GetBlock:
  * [Cronos Shared Nodes](https://getblock.io/nodes/cro/)
* Visit this [link](https://crofam.me/devtools) for an unofficial list of available development tools, including node providers and indexers.
