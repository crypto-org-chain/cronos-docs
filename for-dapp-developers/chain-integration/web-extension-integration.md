# Wallet integrations

## Overview

Cronos chain is supported by the following self-custodial wallets:

* Crypto.com Onchain Wallet
* Rabby (rabby.io)
* MetaMask (requires custom network configuration) (metamask.io)
* Trust Wallet

Crypto.com Onchain Wallet, Trust Wallet and MetaMask have mobile apps that include in-app dApp browsers. Users can access dApps on the go via these in-app browsers. We recommend that all dApp developers integrate with these 3 wallets at least, and more if possible.

## Basic tutorial

[Follow this link](web3-wallet.md) for a basic example on how to implement the main wallet connection methods available to Cronos dApp developers.

## Crypto.com Onchain Wallet

[Crypto.com Onchain Wallet ](https://crypto.com/sg/onchain)is a non-custodial wallet solution that enables users to store, earn, and grow their cryptocurrency holdings with complete control.

**Key Features:**

* Users maintain complete ownership of their crypto assets and private keys with no third-party custody
* Private keys are encrypted and stored locally on the user's mobile device for enhanced security
* Protected by biometric authentication and two-factor authentication (2FA) for comprehensive security

Integration with the Crypto.com Onchain Wallet provides dApp developers access to over 50 million Crypto.com customers with a seamless user experience.

**Users will be able to login with your dApp in several ways:**

* On Mobile: Users access your dApp through the in-app browser within the Crypto.com Onchain Wallet iOS or Android applications
* On Desktop: Users can install the Crypto.com Wallet Extension from the [Chrome Web Store](https://chromewebstore.google.com/category/extensions?utm_source=ext_sidebar\&hl=en-GB) into their Chrome, Edge or Brave browser.
* Hybrid Mode: The desktop extension can be connected to the Crypto.com Onchain Wallet mobile app (in which case the user will need to confirm each transaction on their mobile phone), or alternatively it can work as a standalone extension entirely in the browser.

To get your dApp listed on the dApp section of Crypto.com Onchain Wallet, follow these steps:

1. Get listed on DefiLlama: Submit your dApp following [How to list a DeFi Project](https://docs.llama.fi/list-your-project/submit-a-project)
2. Wait for synchronization: Allow 48 hours for data to sync between Crypto.com Onchain Wallet and DeFiLlama
3. Submit manual request if needed: If your dApp doesn't appear in the wallet UI after 48 hours, complete the [dApp Submission Form](https://airtable.com/app5F2H2Qp46Q9fGC/shr2pGmQR5lzoMOBh)

To get your dApp featured in the **Featured dApps** section of the Crypto.com Onchain Browser Extension:

1. Submit application: Complete the [dApp Submission Form](https://airtable.com/app5F2H2Qp46Q9fGC/shr2pGmQR5lzoMOBh) with your project details
2. Team review: Applications are reviewed at the discretion of the Crypto.com team for featured placement
3. Selection criteria: Listing in the featured section is subject to internal evaluation and approval processes

As a developer, if you would like to offer all the mobile and desktop connection options provided by the Crypto.com Onchain Wallet, the first step is to integrate your dApp with the Crypto.com Wallet Extension.

Once the Wallet Extension is working, all the other connection methods should start working as well, even on mobile, since they are supported by the same SDKs.

The Crypto.com Wallet Extension currently supports the following networks:

{% tabs %}
{% tab title="Mainnet" %}
* Cronos EVM Chain
* Cronos POS Chain
* Ethereum
* Bitcoin
* BNB Smart Chain
* Polygon
* Avalanche-C
* Cosmos
* Fantom
* Arbitrum
* Optimism
* Gnosis
* Aptos
* All other EVM-compatible networks (manual configuration)
{% endtab %}

{% tab title="Testnet" %}
* Cronos Testnet
* Goerli Testnet
* Scroll Alpha Testnet
* Aptos Devnet
* Aptos Testnet
{% endtab %}
{% endtabs %}

The official repository and documentation of Crypto.com Wallet Extension are available at: [https://github.com/crypto-com/deficonnect-monorepo](https://github.com/crypto-com/deficonnect-monorepo).

**For most dApp developers,** the best way to integrate the Crypto.com Onchain Wallet Extension is to develop your application's front-end in React and to use the `DeFiWeb3Connector` object which is provided by the `@deficonnect/web3-connector` npm package as documented here: [https://github.com/crypto-com/deficonnect-monorepo/tree/develop/packages/web3-connector](https://github.com/crypto-com/deficonnect-monorepo/tree/develop/packages/web3-connector).

Once the connector is activated, your dApp can retrieve the provider using `getProvider()` and subsequently use it via a common Web3 SDK like `ethers.js`.

**Some developers** may need to dig deeper into the documentation, for example if they are not using React or need more customization. In this case, please refer to:

* Github: [https://github.com/crypto-com/deficonnect-monorepo](https://github.com/crypto-com/deficonnect-monorepo)
* Document: [https://github.com/crypto-com/deficonnect-monorepo/wiki/Chrome-Extension-Wallet-Integration](https://github.com/crypto-com/deficonnect-monorepo/wiki/Chrome-Extension-Wallet-Integration)
