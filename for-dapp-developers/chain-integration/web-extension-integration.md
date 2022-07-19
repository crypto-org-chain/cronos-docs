# Web Extension Integration

## Introduction

### Crypto.com | Wallet Extension - A non-custodial wallet to store, earn, and grow your crypto

Crypto.com | Wallet Extension provides a simple and secure way for users to connect their Crypto.com DeFi Wallet with Ethereum-compatible DApps via their browser.

* **For DApp builders**, integrating with Wallet Extension allows them to offer a streamlined user experience to the millions of Crypto.com DeFi Wallet users, as well as encourage increased adoption and usage.
* **For users**, this means that they can connect to DApps simply by clicking the Wallet Extension logo, scanning the QR code with their DeFi Wallet, and approving the connection. The user experience is familiar for those who are already using Wallet Connect with the DeFi Wallet, yet it feels more native and simple. Over time, additional user-friendly features will be built into Wallet Extension.

Crypto.com DeFi Wallet is a non-custodial wallet that gives users full control of their crypto and private keys. Through Wallet Extension, it offers smooth navigation with DApps. Private keys are encrypted locally on the user’s mobile phone, and protected by Biometric Authentication and 2-Factor Authentication. For transactions made on desktop, users must confirm the transaction via the DeFi Wallet mobile app.

The Crypto.com Wallet Extension currently supports the following networks:

**Mainnet**:

* Cronos Mainnet Beta;
* Ethereum Mainnet;
* Crypto.org Chain.

**Testnet**:

* Cronos Testnet;
* Croeseid Testnet;
* Ethereum Testnet (Ropsten, Kovan, Ribkeby, Goerli);

Integrations with additional chains are planned for the near future.

## Integrating with Defi Connect

Integrate your DApp with Crypto.com | Wallet Extension to provide a seamless and native experience for your end users to sign transactions.

Web SDK Learn more about how to integrate with Wallet Extension here.

## DeFiConnect

### Installation

#### Via npm package manager

```bash
npm install "deficonnect"
```

#### Via script tag

```html
<script type="module" src="https://unpkg.com/deficonnect/dist/index.umd.js"></script>
```

the global variable is: `window.DeFiConnect`

```javascript
const connector = new window.DeFiConnect.DeFiWeb3Connector({
 supportedChainIds: [1],
 rpc: { 1: 'https://mainnet.infura.io/v3/INFURA_API_KEY' },
 pollingInterval: 15000
})
```

### Usage

{% hint style="info" %}
Note: `DeFiWeb3Connector` has implement `AbstractConnector` from `web3-react`&#x20;
{% endhint %}

#### For `web3-react`

if you use web3-react, it is easy to integrate:

```tsx
import { DeFiWeb3Connector } from 'deficonnect'

const connector = new DeFiWeb3Connector({
  supportedChainIds: [1],
  rpc: { 1: 'https://mainnet.infura.io/v3/INFURA_API_KEY' },
  pollingInterval: 15000,
})
connector.activate()
```

#### Normally

```tsx
import { DeFiWeb3Connector } from "deficonnect";
import Web3 from "web3";

const connector = new DeFiWeb3Connector({
  supportedChainIds: [1],
  rpc: {
    1: "https://mainnet.infura.io/v3/INFURA_API_KEY",
    25: "https://evm.cronos.org/", // cronos mainet
  },
  pollingInterval: 15000,
});
connector.activate();
const provider = await connector.getProvider();
const web3 = new Web3(provider);
```

### methods for DeFiWeb3Connector

```typescript
// connect to the Wallet
await connector.activate()
 
// disconnect the Wallet
await connector.deactivate()
```

### events for Provider (EIP-1193)

```typescript
// Subscribe to accounts change
provider.on('accountsChanged', (accounts: string[]) => {
 console.log(accounts)
})
 
// Subscribe to chainId change
provider.on('chainChanged', (chainId: number) => {
 console.log(chainId)
})
 
// Subscribe to session connection
provider.on('connect', () => {
 console.log('connect')
})
 
// Subscribe to session disconnection
provider.on('disconnect', (code: number, reason: string) => {
 console.log(code, reason)
})
```

### methods for Provider

```typescript
interface RequestArguments {
method: string;
params?: unknown[] | object;
}
 
// Send JSON RPC requests
const result = await provider.request(payload: RequestArguments);
 
// Close provider session
await provider.disconnect()
```

### methods for Web3

```typescript
//  Get Accounts
const accounts = await web3.eth.getAccounts()
 
//  Get Chain Id
const chainId = await web3.eth.chainId()
 
//  Get Network Id
const networkId = await web3.eth.net.getId()
 
// Send Transaction
const txHash = await web3.eth.sendTransaction(tx)
 
// Sign Transaction
const signedTx = await web3.eth.signTransaction(tx)
 
// Sign Message
const signedMessage = await web3.eth.sign(msg)
 
// Sign Typed Data
const signedTypedData = await web3.eth.signTypedData(msg)
```

## Example Apps

The following git folder will provide you with some basic deficonnect integrations via react and web3modal.&#x20;

{% hint style="info" %}
Note You need to replace `INFURA_API_KEY` with a key generated at [Infura](https://infura.io/)&#x20;
{% endhint %}

### Git clone `deficonnect-examples`

```bash
$ git clone git@github.com:crypto-org-chain/dev-utils.git
```

## DApp Listing Form

Complete the form below to be featured on our DeFi Wallet DApp listing:

To be featured on our DeFi Wallet, kindly complete the [DApp Listing Form](https://crypto-com.typeform.com/to/bRvudlYV).
