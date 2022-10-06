# Cronos Configuration

After creating **BP\_DefiWalletCore**, we should configure the Network Configuration, so that when we spawn the actor, we could get the same network settings.

* Double click **BP\_DefiWalletCore** in **Content Browser**, and open the Blueprint Editor
* In **Cronos Play Unreal** section of **Details** tab, input the RPC and Chain ID settings, for example like below:
  * `My Cronos Rpc`: [https://evm-dev-t3.cronos.org](https://evm-dev-t3.cronos.org) (Testnet) or [https://evm-dev.cronos.org](https://evm-dev.cronos.org) (Mainnet)
  *   `My Cronos Chain ID`: 338 (Testnet) or 25 (Mainnet)



      <figure><img src="../../../.gitbook/assets/image (10) (2).png" alt=""><figcaption></figcaption></figure>
  * `My Cosmos Rpc`, `My Tendermint Rpc`, and `My Chain ID` are for COSMOS chain, such as Crypto.org Chain, you can leave them as default values.
  * **Save** > **Compile** to check if any errors
