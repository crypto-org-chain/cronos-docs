# FAQ

## FAQs for ERC20-only transaction Support

### I transferred CRO from the other centralized exchanges (CEXs) to the Crypto.org Desktop wallet, but why it is not showing up in my Crypto.com DeFi Desktop Wallet?

**A** : Some centralized exchanges currently only support Ethereum mainnet ERC20-CRO withdrawal, while the Crypto.com DeFi Desktop Wallet only supports Crypto.org Chain & Cronos Beta Chain for the moment, thus you're not able to view any ERC20 assets or balances of Ethereum Chain on the Desktop Wallet. It is highly recommended that all users check the networks before making the withdrawal and always begin with a small amount to make sure the transfer actually works.

### I’ve already made the transfer from the centralized exchange that does not support Cronos Beta Chain to my Crypto.com DeFi Desktop Wallet. What should I do to retrieve my funds?

**A** : Here's what you could do:

1. Send some ETH (around 0.03 ETH) to your `0x..` address for paying the transaction gas fee on Ethereum
2. Download our Crypto.com App, and register an account (skip this if you're already a user)
3. Send your ERC20-CRO to the Crypto.com App ERC20-CRO deposit address\*
4. When you get your CRO, withdraw your CRO to your ledger address (MAKE SURE YOU SELECT Cronos Beta Chain) `0x..` address
5. You would be able to see your funds on Crypto.com DeFi Desktop Wallet afterwards

Other than this, it is also possible that there is no Ethereum in your wallet, which could result in your funds getting stuck as you aren't able to pay for the Ethereum gas fee. Please ensure you have enough ETH for the transaction.

_For step 3 of transferring your ERC20-CRO, you could either use Metamask or Ledger Live (for ledger user) to send ERC20-CRO from your Ledger to Crypto.com App. Take the wallet on Metamask as an example, if you log into the same wallet on Metamask and switch the network to the ethereum mainnet on Metamask, you would be able to access those ERC20 tokens in this wallet on Metamask. After that, you would be free to transfer the funds to the Crypto.com app then withdraw them to the Cronos Beta network._

### I would like to send ERC20-CRO from Crypto.com App or Defi Wallet to the other CEXs directly. Is it possible?

**A** : Please make sure both sender and receiver accounts support ERC20 format. Only if the other CEXs support ERC20-CRO can you send it. Users may refer to this guide for more details:

* https://help.crypto.com/en/articles/5019195-send-and-receive-cro-the-difference-between-native-cro-and-erc20-cro
* https://help.crypto.com/en/articles/4970776-cro-deposit-withdrawal-information-in-crypto-com-app

### I made a transaction on MetaMask (through Cronos Beta network) to the other CEXs that do NOT support Cronos. How should I retrieve it back?

**A** : In this case, only the owner of the receiving account has access to that funds. You could also check if your transaction is successful/confirmed on [Cronoscan](https://cronoscan.com/). Given the receiving account is from other CEXs, you may contact the receiving party and find out if it is possible for them to do a manual refund for your transaction. They may or may not do it depending on their own policies. Otherwise, you will most likely not be able to access the funds until that CEX starts to support Cronos.

## FAQs for Bridge transfers



### What are the fees involved?

\-The bridge service itself is free and does not charge any additional service fees. The fees displayed are network gas fees which the blockchain infrastructure charges itself to process the transactions and vary depending on the network.

* For any bridge transaction, network gas fees are incurred on two chains: origin and destination.
  * For the origin chain gas fee, this will be displayed and settled directly on your wallet extension.
  * For the destination chain gas fee (“Bridge network fee”), our decentralized bridge is tasked to collect the appropriate gas fee and pay the network.

### How does the Bridge network fee waiver work?

* The following transactions are eligible for a fee waiver:
  * Crypto.org => Cronos
  * Cronos => Crypto.org
* The fee waived is the bridge network transaction fee on the destination chain. However, you are still liable to pay for the origin chain gas fee directly on your wallet extension.
* This is a promotional waiver; we reserve the right to modify and terminate the promotion at any time

### How fast is the transfer?

* IBC Transfers will take between 1 min to 1 hour, depending on transfer congestion. After an hour, the transaction will either go through or revert with the funds sent back to your origin wallet.

### Can I transfer assets to a different wallet than my own?

* For transfers between Cronos and Crypto.org, we support either connecting a second compatible wallet or inputting the wallet address string.
  * If possible, we recommend connecting the second wallet to avoid manual typing and potential malware risks such as clipboard attacks.

### What are the support blockchains and tokens?

* The networks supported are:
  * Crypto.org
  * Cronos
  * Coming Soon: Cosmos and Ethereum

### What are the supported wallets?

* The initially supported wallets will be Crypto.com DeFi Wallet, Metamask, and Keplr.
* Please ensure to set the correct active network on your Wallet if it is supported.

### Can I complete multiple transfers in one go?

* While it is possible to have multiple ongoing transactions, we recommend having one transaction at a time, even if there is some waiting time to avoid issues and duplication.

### Where can I report bugs and provide product feedback?

For any bug reports, or feedback please contact contact.bridge@crypto.org. This is for the web Cronos bridge only. For Crypto.com app, exchange, and DeFi wallet, contact directly https://help.crypto.com/en/

### How do I find my missing funds?

* Please check the transaction history table for your past transactions. If your transactions are not on the list, it was likely not initiated at all. If you believe you still have missing funds, please contact us at product@cronos.org.

### Is transferring tokens across blockchains safe?

* As with any decentralized application, there is a degree of risk related to code exploits and hacking.
* Our bridge code is publicly available. We leverage open-source code from the IBC protocol and Gravity bridge projects.
