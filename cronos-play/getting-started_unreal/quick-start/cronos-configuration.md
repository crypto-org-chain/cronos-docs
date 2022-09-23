# Cronos Configuration

After creating **BP\_DefiWalletCore**, then we should configure the Network Configuration of it, so that when we spawn the actor, we could get the same network settings.

* Double click **BP\_DefiWalletCore** in **Content Browser**, and open the Blueprint Editor
* In **Cronos Play Unreal** section of **Details** tab, input the RPC and Chain ID settings, for example like below:
  * My Cronos Rpc: [https://cronos-testnet-3.crypto.org:8545](https://cronos-testnet-3.crypto.org:8545)
  *   My Cronos Chain ID: 383



      <figure><img src="../../../.gitbook/assets/image (12).png" alt=""><figcaption></figcaption></figure>
  * My Cosmos Rpc, My Tendermint Rpc, and My Chain ID are for COSMOS chain, such as Crypto.org Chain, you can leave them as default values.
  * Save > Compile to check if any errors
