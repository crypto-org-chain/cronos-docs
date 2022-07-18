# Public RPC endpoints

### RPC URLs for Cronos Beta

{% hint style="danger" %}
Public RPCs URL Updates: The Cronos RPC endpoints have been lately updated (shown as below) and it is recommended for users to update the endpoints. The old endpoints are still available for compatibility but maybe deprecated later.
{% endhint %}

{% hint style="info" %}
Request Limits on Public RPCs: To provide a stable experience to users, there is a request rate limit on the public RPCs to ensure fair usage. If your application requires a higher usage, please consider setting up your own nodes. You can also reach out to us on [Discord](https://discord.gg/cGtxgVfGMZ) for assistance.
{% endhint %}

{% hint style="info" %}
Public RPCs Integration Tips: There are more than one machines serving the public RPC services. There is no guarantee that you are served by the same machine every time. This could break the assumptions of some applications. For example when you want to broadcast multiple transactions in sequential account nonce at once, each transactions may arrive on different machines if you are not broadcasting them in a batch.

If this assumption is important in your application, please consider setting up your own nodes.
{% endhint %}

{% tabs %}
{% tab title="Mainnet" %}
* **Tendermint RPC**
  * [https://rpc.cronos.org/](https://rpc.cronos.org/)
* **Cosmos RESTful**
  * [https://rest.cronos.org/](https://rest.cronos.org/)
* **Cosmos gRPC Based**
  * [https://grpc.cronos.org/](http://grpc.cronos.org/)
* **EVM HTTP JSON RPC**&#x20;
  * [https://evm.cronos.org/](https://evm.cronos.org/)
{% endtab %}

{% tab title="Testnet" %}
* **Tendermint RPC**
  * [https://rpc-t3.cronos.org/](https://rpc-t3.cronos.org/)
* **Cosmos RESTful**
  * [https://rest-t3.cronos.org/](https://rest-t3.cronos.org/)
* **Cosmos gRPC Based**
  * [https://grpc-t3.cronos.org/](https://grpc-t3.cronos.org/)
* **EVM HTTP JSON RPC (Web3 compatible)**
  * [https://evm-t3.cronos.org/](https://evm-t3.cronos.org/)
{% endtab %}
{% endtabs %}

