# ERC20

## Querying

* Let's work with ERC20 tokens with Blueprint!
* Back to the map, select the drop down menu of **Blueprints** > **Open Level Blueprint** and launch the Level Blueprint Editor

<figure><img src="../../../.gitbook/assets/image (5) (2).png" alt=""><figcaption></figcaption></figure>

*   The following screenshot shows Query the name of ERC20 contract and print it on the screen. In this example, we use a Function - **Spawn Actor from Class** to create an Actor instance from **BP\_DefiWalletCore** Class. The Transformation defines the location, rotation, and scale that will be used by the new Actor. A reference to the new instance is available in the Return Value which feeds as input Value of Function **Erc20Name. Erc20Name** also has an input **Contract Address**, for example, we set it as **0xf0307093f23311FE6776a7742dB619EB3df62969**. Finally, print the token name with Function - **Print String**.

    <figure><img src="../../../.gitbook/assets/image (17) (1).png" alt=""><figcaption></figcaption></figure>


* Click **Compile** > **Play**, **USDC** is printed in the game.
* We can create a variable **contract** and set the default value as **0xf0307093f23311FE6776a7742dB619EB3df62969** for later easy access.

<figure><img src="../../../.gitbook/assets/image (19) (1).png" alt=""><figcaption></figcaption></figure>

*   Similarly, we can call other ERC20 functions by dragging from the **Return Value** of the **SpawnActor BP Defi Wallet Core** and search to add **Erc20Balance**, **Erc20Symbol**, **Erc20Decimals**, and **Erc20TotalSupply** like below

    <figure><img src="../../../.gitbook/assets/image (16) (1).png" alt=""><figcaption></figcaption></figure>

    PS: In above example, we use Account Address **0xf0307093f23311FE6776a7742dB619EB3df62969** to query its balance.

## Functions

All ERC20 functions are members of **DefiWalletCoreActor**. The Target should be **Defi Wallet Core Actor**.

### Erc20Balance

Get erc-20 balance

<figure><img src="../../../.gitbook/assets/image (6) (2).png" alt=""><figcaption></figcaption></figure>

* `Contract Address`: erc20 contract address
* `Account Address`: account address to fetch balance
* `Balance`: get balance of account address
* `Success`: whether succeed or not
* `Output message`: error message, "" if succeed



### Erc20Name

Get erc-20 name

<figure><img src="../../../.gitbook/assets/image (5) (3) (1).png" alt=""><figcaption></figcaption></figure>

* `Contract Address`: erc20 contract address
* `Name`: get name
* `Success`: whether succeed or not
* `Output message`: error message, "" if succeed

### Erc20Symbol

Get erc-20 symbol

<figure><img src="../../../.gitbook/assets/image (1) (3).png" alt=""><figcaption></figcaption></figure>

* `Contract Address`: erc20 contract address
* `Symbol`:: get symbol
* `Success`: whether succeed or not
* `Output message`: error message, "" if succeed

### Erc20Decimals

Get erc-20 decimals

<figure><img src="../../../.gitbook/assets/image (10).png" alt=""><figcaption></figcaption></figure>

* `Contract Address`: erc20 contract address
* `Decimals`: get decimals
* `Success`: whether succeed or not
* `Output message`: error message, "" if succeed

### Erc20TotalSupply

Get erc-20 total supply

<figure><img src="../../../.gitbook/assets/image (4) (2).png" alt=""><figcaption></figcaption></figure>

* `Contract Address`: erc20 contract address
* `Total Supply`: get total supply
* `Success`: whether succeed or not
* `Output message`: error message, "" if succeed



### Erc20Transfer

erc20 Moves `amount` tokens from the caller’s account to `to_address`.

<figure><img src="../../../.gitbook/assets/image (8) (2).png" alt=""><figcaption></figcaption></figure>

* `Contract Address`: erc20 contract
* `Walletindex`: wallet index which starts from 0
* `To Address`: to address
* `Amount`: amount
* `Out`: Erc20Transfer callback

### Erc20TransferFrom

erc20 Moves `amount` tokens from `from_address` to `to_address` using the allowance mechanism.

<figure><img src="../../../.gitbook/assets/image (3) (2) (1).png" alt=""><figcaption></figcaption></figure>

* `Contract Address`: erc20 contract
* `Walletindex`: wallet index which starts from 0
* `From Address`: from address to move
* `To Address`: to address
* `Amount`: amount
* `Out`: Erc20TransferFrom callback

### Erc20Approve

erc20 Allows `approved_address` to withdraw from your account multiple times, up to the `amount` amount.

<figure><img src="../../../.gitbook/assets/image (11) (2).png" alt=""><figcaption></figcaption></figure>

* `Contract Address`: erc20 contract
* `Walletindex`: wallet index which starts from 0
* `Approved Address`: address to approve
* `Amount`: amount
* `Out`: Erc20Approve callback

### Erc20Allowance

Returns the amount of tokens in existence

<figure><img src="../../../.gitbook/assets/image (7) (2).png" alt=""><figcaption></figcaption></figure>

* `Contract Address`: erc20 contract
* `Erc 20owner`: erc20 owner&#x20;
* `Erc 20spender`: erc20 spender
* `Result`: allowance
* `Success`: whether succeed or not
* `Output message`: error message, "" if succeed
