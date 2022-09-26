# ERC20

* Let's work with ERC20 tokens with Blueprint!
* Back to the map, select the drop down menu of **Blueprints** > **Open Level Blueprint** and launch the Level Blueprint Editor

<figure><img src="../../../.gitbook/assets/image.png" alt=""><figcaption></figcaption></figure>

*   The following screenshot shows Query the name of ERC20 contract and print it on the screen. In this example, we use a Function - **Spawn Actor from Class** to create an Actor instance from **BP\_DefiWalletCore** Class. The Transformation defines the location, rotation, and scale that will be used by the new Actor. A reference to the new instance is available in the Return Value which feeds as input Value of Function **Erc20Name. Erc20Name** also has an input **Contract Address**, for example, we set it as **0xf0307093f23311FE6776a7742dB619EB3df62969**. Finally, print the token name with Function - **Print String**.

    <figure><img src="../../../.gitbook/assets/image (17).png" alt=""><figcaption></figcaption></figure>


* Click **Compile** > **Play**, **USDC** is printed in the game.
* We can create a variable **contract** and set the default value as **0xf0307093f23311FE6776a7742dB619EB3df62969** for later easy access.

<figure><img src="../../../.gitbook/assets/image (19) (1).png" alt=""><figcaption></figcaption></figure>

*   Similarly, we can call other ERC20 functions by dragging from the **Return Value** of the **SpawnActor BP Defi Wallet Core** and search to add **Erc20Balance**, **Erc20Symbol**, **Erc20Decimals**, and **Erc20TotalSupply** like below

    <figure><img src="../../../.gitbook/assets/image (16) (1).png" alt=""><figcaption></figcaption></figure>

    PS: In above example, we use Account Address **0xf0307093f23311FE6776a7742dB619EB3df62969** to query its balance.
