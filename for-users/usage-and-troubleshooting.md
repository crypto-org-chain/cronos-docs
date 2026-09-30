# 💡 Usage and Troubleshooting

### Ecosystem Discovery

**Where can I find the list of applications available on Cronos chain?**

* In the Crypto.com Onchain Wallet, you can check the "browser" tab where you can see a selection of apps.
* You can also visit [https://cronos.com/network/#network-apps](https://cronos.com/network/#network-apps) to browse a database of available dapps (decentralized apps).

**How can I get my project featured at** [**https://cronos.com/network/#network-apps**](https://cronos.com/network/#network-apps)**?**

* Visit [https://cronos.com/network/#network-apps](https://cronos.com/network/#network-apps) where you can submit your project to be added to the list (or submit directly to the form [here](https://docs.google.com/forms/d/e/1FAIpQLSdbCFhO_IjnrDIIU1PyuCLSdXDP6SM7SPSaUxud17wyIzr5IA/viewform)).

**How can I get my project featured in Trust Wallet, once deployed on Cronos?**

* [Trust Wallet](https://trustwallet.com/) supports the Cronos mainnet from within the in-app Dapp browser (via the injected Web3 provider) and also via Wallet Connect.
* You can contact the Trust Wallet team to have your Dapp and/or token featured in the Trust Wallet’s mobile Dapp browser. Refer to the [documentation](https://developer.trustwallet.com/developer/listing-new-dapps/listing-guide) for more details.

**How can I get my NFT collection allow-listed on the relevant NFT platforms?**

* Ebisu’s Bay
  * Ebisu’s Bay is a self-custodial NFT platform on Cronos chain and on Ethereum.
  * New launch & secondary trading: the Cronos Labs team can put you in touch with the Minted team via Telegram. Please send your Telegram handle to your Cronos Labs contact.

**How can I become a node operator?**

* Anyone can run their own Cronos node: see [the documentation](https://docs.cronos.com/for-node-hosts/running-nodes/cronos-mainnet) for instructions.
* However, the Cronos network is not currently adding **new validators** (except on an exceptional basis). The Cronos Labs team will make public announcements when validator applications are open again. Feel free to email [contact@cronoslabs.org](mailto:contact@cronoslabs.org) to register your interest.

### Gas Fees Explained

The Huygen upgrade v0.7.0 on Cronos Mainnet introduced the Feemarket module and EIP-1559 implementation. The new feemarket module allows a dynamic fee structure to be applied to the network. It allows for defining a common base fee for the network, and this base fee is calculated dynamically in each block for the next block allowing it to reflect the activity of the network.

With EIP-1559, the transaction fee itself is calculated with `fee = (baseFee + priorityTip)*gasLimit`, where `baseFee` is the fixed-per-block network fee per gas and `priorityTip` is an optional fee per gas added on extra to accelerate the transaction. However, Cronos chain is based on Cosmos SDK which does not have a prioritization mechanism by nature, and transactions are first in and first out (FIFO) basis on the Cronos chain. Thus, different from the regular EIP-1559 design, Cronos feemarket module design does not have any “prioritization fee” mechanism than the Ethereum EIP-1559 design.

Therefore, on Cronos at the current stage, `fee = gasFeeCap * gasLimit`, where the `gasFeeCap` is the maximum gas price and `gasLimit` is the gas amount. Increasing the total fee does not accelerate the transaction processing time on Cronos, while the transaction still possibly can be rejected if you set up a too low-value arbitrary.

**If I increase the gas price, does it help to speed up my transaction?**

Yes. The current mempool setting works in a priority gas fee manner, where transaction prioritization happens based on the gas price or priority fee.

### User Troubleshooting

#### Stuck or Pending Transactions

**I have transferred cryptocurrencies by mistake to an address on Cronos chain. Can someone help me to recover the funds?**

* Cronos chain is a public, open-source, decentralized, immutable blockchain network. The Cronos Labs team coordinates open-source development of the network, but it has no control over the network.
* If you have sent your cryptocurrencies to an incorrect address or network, it is not materially possible for the Cronos Labs team to revert the transaction or recover these funds. You need to contact the owner of the address where the funds have been sent.
* If you are the owner of that address and the address is self-custodial, meaning that you know the seed phrase or private key of the address, then you should be able to take control of the funds yourself. For this, you need to use either the [Crypto.com Onchain Wallet](https://crypto.com/fr/defi-wallet) or [MetaMask](https://metamask.io), where you can import either the seed phrase (Crypto.com Onchain Wallet) or private key (MetaMask) of the address. You can then connect to Cronos chain. You may then transfer your funds to another address, or to a Crypto.com account if you would like to move the cryptos to another chain.
* On the other hand, if you are not the owner of the address, it can be very difficult to contact the owner. If the address is the deposit address of a custodial exchange that does not support Cronos, most of the time it is not possible to recover the funds, and in any case, only the owner of that address can help.

#### Insufficient Gas Errors

* Don't forget that you need CRO in your wallet in order to pay for transaction fees on Cronos chain.

#### Revoking Token Permissions

* **Revoke Access to Unused dApps:** Regularly review and revoke permissions granted to dApps you no longer use.

