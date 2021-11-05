# From Crypto.org Chain (Cronos Bridge Web App)

## Transfer assets from Crypto.org Chain using Cronos Bridge Web App

### Introduction

<img src="./assets/webappintro.png"  alt="centered image" />

The Cronos bridge’s goal is to support a seamless transfer of assets between blockchains to foster interoperability and for users to enjoy the best Dapps and earnings no matter the chain.

Our bridge is a fully decentralized protocol built on the open-source projects of [IBC](https://ibcprotocol.org/) and [Gravity Bridge](https://github.com/cosmos/gravity-bridge). Our project repository can be found here.

Please read the guide carefully and review the project documentation as misuse may cause incorrect transfer or even loss of assets. We recommend transferring a small amount first to get yourself acquainted with the bridge before moving significant amounts.

#### Currently supported networks:

- Crypto.org <=> Cronos.

#### Currently supported tokens:

- CRO

#### Currently supported wallets:

- Metamask, Keplr, Crypto.com DeFi Wallet

#### Coming Soon:

- Ethereum <=> Cronos [Coming Soon]
- ETH, WETH, WBTC, USDC, TCT, USDT, DAI

We are constantly working on adding new tokens and chain support. If you have any feedback and issues, please drop us an email at bridge@cronos.org.

## How to use the Cronos Bridge [Web Dapp]

### 1. Connect your wallet

Click the “Connect Wallet’ button to connect your desktop or browser extension wallet. We currently support browser-compatible versions of the Metamask, Keplr, and Crypto.com DeFi Wallet.
Once a connection request is sent, look for a popup from your wallet interface or click into the wallet extension to give consent.

Note: If you are bridging assets from or to Crypto.org, you may specify the destination wallet by pasting the address directly or connecting a second wallet to avoid manual errors.

<img src="./assets/webapp_connect_wallet.png"  alt="centered image" />

### 2. Select Network and Token

Select the origin chain on the left and the destination chain on the right in the bridge interface. We will do our best to auto-suggest your wallet network to match the desired transfer parameter. However, a manual adjustment on your end may be needed to set your wallet to match the selected network.

If you are transferring from or to Crypto.org, you need to specify the destination address by inputting the address manually or connecting a second wallet to receive your funds.

Once the networks are chosen, select the asset you would like to transfer.

<img src="./assets/webapp_select_network.png"  alt="centered image" />

### 3. Enter the amount
Once the network and asset have been chosen, insert and confirm the amount you would like to transfer. 


Our decentralized bridge protocol does not impose a minimum and maximum amount.
However, bridging a very small amount may have a high gas fee in proportion to the amount transferred. 

After the amount is entered, the bridge network fees will be calculated accordingly. The bridge itself and Crypto.org do not charge an additional fee. However, we pass on network gas fees incurred.

During the promotional launch period, the network fee incurred by the bridge will be waived. You will still be liable to pay a gas fee directly on your preferred wallet charged by the source network.

Before bridging a large amount, we encourage testing a transfer of a minor amount first to ensure all the settings are correct.

<img src="./assets/webapp_enter_amout.png"  alt="centered image" />


### 4. Confirm the transaction
Once all transfer settings have been confirmed, a transaction confirmation page will pop up summarizing the transaction.

This will send a transaction request to your wallet; please confirm on your wallet screen to ultimately authorize the transfer.

Please note that after bridging the tokens, they will be converted into the destination blockchain-supported tokens. See [FAQ](./faq.md) for more information

<img src="./assets/webapp_confirmation_screen.png"  alt="centered image" />

<img src="./assets/4a_confirm_wallet_txn.png"  alt="centered image" width="280"/>
<img src="./assets/4b_confirm_wallet_txn.png"  alt="centered image" width="280"/>
<img src="./assets/4c_confirm_wallet_txn.png"  alt="centered image" width="280"/>

#### 5. Bridging assets

After the transaction is confirmed from the wallet, the bridge operation will commence.
First, we will initiate and wait for the deposit of the assets on the origin chain.
Once the deposit is confirmed, we will initiate the transfer in the destination chain to your desired receiving wallet address.
Both transactions will include an external link to view and monitor the transaction on-chain via scanning utilities such as Cronos, and Crypto.org explorer.

Even if you dismiss, quit, or refresh the page, a small popup reminder will be available to indicate an in-progress transaction. 
A “transfer completed” message will finally confirm that the transaction has been completed successfully. You may also see a full record of past transactions tied to your wallet in the History tab.

Thank you for using the Cronos bridge and supporting the Crypto.org ecosystem! 

<img src="./assets/5_txn_complete.png"  alt="centered image" />
<img src="./assets/5_history_table.png"  alt="centered image" />