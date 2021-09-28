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
  - name: "og:image"
    content: https://cronos.crypto.org/og-image.png
  - name: "twitter:title"
    content: Cronos | Crypto.org EVM Chain | Using MetaMask
  - name: "twitter:site"
    content: "@cryptocom"
  - name: "twitter:card"
    content: summary_large_image
  - name: "twitter:description"
    content: Learn how to use the MetaMask chrome extension to send or receive and interact with the Cronos testnet in this technical documentation.
  - name: "twitter:image"
    content: https://cronos.crypto.org/og-image.png
canonicalUrl: https://cronos.crypto.org/docs/getting-started/metamask.html
---

## Using MetaMask

In the following step-by-step guide, you will learn how to use the MetaMask chrome extension to send/receive and interact with the Cronos testnet.

First of all we would need to connect the MetaMask with the Cronos testnet network:

- Hit the my account button in the top right corner, under **"Settings"**, select **"Networks"**

    <img src="./assets/1.png" />

- In the **"Networks"** page, click "Add Network":

    <img src="./assets/2.png" />

- Insert the network name, for example "ethermint" and put 
  - `https://cronos-testnet-2.crypto.org:8545/` for **New RPC URL**; and 
  - `338` for **Chain ID**, 
  - tcro for the symble
  - `https://cronos.crypto.org/explorer/` for the Block explorer URL as below:

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
cronosd keys unsafe-export-eth-key mykey --keyring-backend test
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

Note that the address format in Cronos is in there form of bech32 `tcrc...` , we can use `cronosd debug addr` to convert an address between hex and bech32, for example:

```
$ cronosd keys list --keyring-backend test
  - name: mykey
    type: local
    address: tcrc19a6r74dvfxjyvjzf3pg9y3y5rhk6rds2c9265n
    pubkey: '{"@type":"/ethermint.crypto.v1alpha1.ethsecp256k1.PubKey","key":"Azy1tg0wZKRdQ7sd9mICzteCstGThiodZtQqlVT9Amlc"}'
    mnemonic: ""

$ cronosd debug addr tcrc19a6r74dvfxjyvjzf3pg9y3y5rhk6rds2c9265n
    Address: [47 116 63 85 172 73 164 70 72 73 136 80 82 68 148 29 237 161 182 10]
    Address (hex): 2F743F55AC49A446484988505244941DEDA1B60A
    Bech32 Acc: tcrc19a6r74dvfxjyvjzf3pg9y3y5rhk6rds2c9265n
    Bech32 Val: tcrcvaloper19a6r74dvfxjyvjzf3pg9y3y5rhk6rds2ph398y

$ cronosd debug addr 2F743F55AC49A446484988505244941DEDA1B60A
  Address: [47 116 63 85 172 73 164 70 72 73 136 80 82 68 148 29 237 161 182 10]
  Address (hex): 2F743F55AC49A446484988505244941DEDA1B60A
  Bech32 Acc: tcrc19a6r74dvfxjyvjzf3pg9y3y5rhk6rds2c9265n
  Bech32 Val: tcrcvaloper19a6r74dvfxjyvjzf3pg9y3y5rhk6rds2ph398y
```

::: tip Remarks:
One would have to add the `0x` at the beginning when using the Ethereum HEX address shown as above: for example:
`Address (hex): 2F743F55AC49A446484988505244941DEDA1B60A` implies that `0x2F743F55AC49A446484988505244941DEDA1B60A` will be the address in the Ethereum manner.
:::


## Resetting your account on Metamask

If you come across any issue with your account or you have used the imported account to perform transactions in the legacy testnet, you can reset it by using the `Reset Account` function on the MetaMask. 

Simply go to `Setting/Advance` and click `Reset Account` as shown below:

<img src="./assets/10.png" />
