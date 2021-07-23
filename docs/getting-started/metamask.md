---
meta:
  - name: "title"
    content: Cronos | Crypto.org EVM Chain | Using MetaMask
  - name: "description"
    content: Learn how to use the MetaMask chrome extension to send or receive and interact with the Cronos testnet in this technical documentation.
  - name: "og:title"
    content: Cronos | Crypto.org EVM Chain | Using MetaMask
  - name: "og:type"
    content: Website
  - name: "og:description"
    content: Learn how to use the MetaMask chrome extension to send or receive and interact with the Cronos testnet in this technical documentation.
  - name: "og-image"
    content: https://cronos.crypto.org/og-image.png
  - name: "twitter:title"
    content: Cronos | Crypto.org EVM Chain | Using MetaMask
  - name: "twitter:site"
    content: "@cryptocom"
  - name: "twitter:card"
    content: summary_large_image
  - name: "twitter:description"
    content: Learn how to use the MetaMask chrome extension to send or receive and interact with the Cronos testnet in this technical documentation.
  - name: "twitter-image"
    content: https://cronos.crypto.org/og-image.png
---

## Using MetaMask

<h2 class="normal-text">
  In the following step-by-step guide, you will learn how to use the MetaMask chrome extension to send/receive and interact with the Cronos testnet.
</h2>

First of all we would need to connect the MetaMask with the Cronos testnet network:

- Hit the my account button in the top right corner, under **"Settings"**, select **"Networks"**

    <img src="./assets/1.png" />

- In the **"Networks"** page, click "Add Network":

    <img src="./assets/2.png" />

- Insert the network name, for example "ethermint" ; for RPC URL put
  `https://cronos-testnet.crypto.org:8545/` and `338` for chain-id If you would like to join the Cronos testnet

    <img src="./assets/3.png" />

- After saving the network config, we can add use the Ethereum-formatted address to request test token from the [faucet](https://cronos.crypto.org/faucet)

    <img src="./assets/7.png" />

- Fill your address and complete the eCapcha, then click "Get Test CRO":
    <img src="./assets/8.png" />

- Then we should be able to see the test token in your address: 
    <img src="./assets/9.png" />

### Export privKey

Alternatively, We can export the private key by using the `unsafe-export-eth-key` command, for example:

```
ethermintd keys unsafe-export-eth-key mykey --keyring-backend test
```

It will show your private, we can copy it for the next step.

Then hit my account button in the top right corner again, select "Import Account" under "My account" on your MetaMask:

<img src="./assets/4.png" />

## Importing private key to MetaMask

Paste the private from the former step here and click "Import".

<img src="./assets/5.png" />

Once it has been connect, you should see the balance and may start performing transactions via MetaMask!

<img src="./assets/6.png" />

## Address conventions

Note that the address format in ethermint is in there form of bech32 `eth...` , we can use `ethermintd debug addr` to convert an address between hex and bech32, for example:

```
$ ethermintd keys list --keyring-backend test
  - name: mykey
    type: local
    address: eth12uqc42yj77hk64cdr3vsnpkfs6k0pllln7rudt
    pubkey: '{"@type":"/ethermint.crypto.v1alpha1.ethsecp256k1.PubKey","key":"Azy1tg0wZKRdQ7sd9mICzteCstGThiodZtQqlVT9Amlc"}'
    mnemonic: ""

$ ethermintd debug addr eth12uqc42yj77hk64cdr3vsnpkfs6k0pllln7rudt
    Address: [87 1 138 168 146 247 175 109 87 13 28 89 9 134 201 134 172 240 255 255]
    Address (hex): 57018AA892F7AF6D570D1C590986C986ACF0FFFF
    Bech32 Acc: eth12uqc42yj77hk64cdr3vsnpkfs6k0pllln7rudt
    Bech32 Val: ethvaloper12uqc42yj77hk64cdr3vsnpkfs6k0pllldvagr4

$ ethermintd debug addr 57018AA892F7af6D570D1c590986c986aCf0fFff
    Address: [87 1 138 168 146 247 175 109 87 13 28 89 9 134 201 134 172 240 255 255]
    Address (hex): 57018AA892F7AF6D570D1C590986C986ACF0FFFF
    Bech32 Acc: eth12uqc42yj77hk64cdr3vsnpkfs6k0pllln7rudt
    Bech32 Val: ethvaloper12uqc42yj77hk64cdr3vsnpkfs6k0pllldvagr4
```

::: tip Remarks:
One would have to add the `0x` at the beginning when using the Ethereum HEX address shown as above: for example:
`Address (hex): 57018AA892F7AF6D570D1C590986C986ACF0FFFF` implies that `0x57018AA892F7AF6D570D1C590986C986ACF0FFFF` will be the address in the Ethereum manner.
:::
