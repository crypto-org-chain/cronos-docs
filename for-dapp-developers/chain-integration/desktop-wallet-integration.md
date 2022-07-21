# Desktop Wallet Integration

## Introduction

[Crypto.com DeFi Desktop Wallet](https://crypto.com/defi-wallet), a public, open-source Desktop Wallet on Cronos Chain.

Crypto.com DeFi Desktop Wallet supports staking operations, validator selections, and governance voting. Users can also view, send and mint NFTs directly, and much more from the Desktop Wallet. It provides a simple and secure way for users to connect their Desktop Wallet with Ethereum-compatible DApps via DApp Browser.

* **For DApp builders**, integrating with Desktop Wallet allows them to offer a streamlined user experience to the users, as well as encourage increased adoption and usage.
* **For users**, this means that they can connect to DApps simply by clicking the DApp's logo or type in the DApp's URL, they can also bookmark their favorite DApps. The user experience is familiar for those who are already using DApps in the browser. It also supports Ledger out of the box.

The Desktop Wallet currently supports the following networks:

{% tabs %}
{% tab title="Mainnet" %}
* Cronos Mainnet Beta
* Crypto.org Chain
{% endtab %}

{% tab title="Testnet" %}
* Cronos Testnet
* Croeseid Testnet
{% endtab %}
{% endtabs %}

Integrations with additional chains are planned for the near future.

## Integrating with the Desktop Wallet

The DApp Browsers in Desktop Wallet works the same way as MetaMask does: it injects the global `ethereum` object into the DApp's `window` object. It has implemented the essential Ethereum Provider API most DApps use, which means that if your DApp can works with MetaMask, it can also work with the Desktop Wallet.

### Add a Connect Wallet Button

![](../assets/desktopwallet-button.png)

Although the Desktop Wallet works the same way as MetaMask, users can click the MetaMask's button to connect to the DApp, it would be better to add a button to the wallet options to make it more intuitive for users to connect their Desktop Wallet with DApps.

The DApp Browser's user agent contains `Desktop Wallet`, so you can check the user agent when user clicks the button to provide a more user-friendly experience within or out of the Desktop Wallet,

```tsx
desktopWalletButton.on("click", () => {
  if (navigator.userAgent.includes("Desktop Wallet")) {
    // within Desktop Wallet's DappBrowser, connect wallet
  } else {
    // jump to download Desktop Wallet page
    window.open("https://crypto.com/defi-wallet");
  }
});
```
