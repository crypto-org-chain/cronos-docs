# Cronos Configuration

After creating **BP\_DefiWalletCore**, we should configure the Network Configuration, so that when we spawn the actor, we could get the same network settings.

* Double click **BP\_DefiWalletCore** in **Content Browser**, and open the Blueprint Editor
* In **Cronos Play Unreal** section of **Details** tab, input the RPC and Chain ID settings, for example like below:
  * `My Cronos Rpc`:
    * **\[Testnet]** [https://evm-dev-t3.cronos.org](https://evm-dev-t3.cronos.org); or
    * **\[Mainnet]** [https://evm-dev.cronos.org](https://evm-dev.cronos.org).
  * `My Cronos Chain ID`:
    * **\[Testnet]** 338; or
    *   **\[Mainnet]** 25

        <figure><img src="../../../.gitbook/assets/cronos-gamefi-blueprint-cronos-network-setting.png" alt=""><figcaption></figcaption></figure>
  * `My Grpc`, `My Cosmos Rpc`, `My Tendermint Rpc`, and `My Chain ID` are for COSMOS chain, such as Crypto.org Chain, you can leave them as default values.
  * **Compile** > **Save** to check if any errors
