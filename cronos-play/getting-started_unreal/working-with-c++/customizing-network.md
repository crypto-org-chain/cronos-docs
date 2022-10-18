# Customizing Network

Back to the level editor,&#x20;

* In Content Browser, select All > C++ Classes > CronosPlayDemo,&#x20;
* Drag `MyDefiWalletCoreActor` we just created into the map, you'll see a new created actor `MyDefiWalletCoreActor` in Outliner

<figure><img src="../../../.gitbook/assets/image (9).png" alt=""><figcaption></figcaption></figure>

* Select `MyDefiWalletCoreActor` in Outliner. Under **Cronos Play Unreal** section of **Details** tab, input the RPC and Chain ID settings, for example:
  * `My Cronos Rpc`:
    * **\[Testnet]** [https://evm-dev-t3.cronos.org](https://evm-dev-t3.cronos.org); or
    * **\[Mainnet]** [https://evm-dev.cronos.org](https://evm-dev.cronos.org).
  * `My Cronos Chain ID`:
    * **\[Testnet]** 338; or
    * **\[Mainnet]** 25

<figure><img src="../../../.gitbook/assets/image (1).png" alt=""><figcaption></figcaption></figure>

* Click `Play` to start the simulation, logs could be found in the Output Log

<figure><img src="../../../.gitbook/assets/image.png" alt=""><figcaption></figcaption></figure>
