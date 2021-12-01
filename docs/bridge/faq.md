# FAQ

### What are the fees involved?

-The bridge service itself is free and does not charge any additional service fees. The fees displayed are network gas fees which the blockchain infrastructure charges itself to process the transactions and vary depending on the network.

- For any bridge transaction, network gas fees are incurred on two chains: origin and destination.
  - For the origin chain gas fee, this will be displayed and settled directly on your wallet extension.
  - For the destination chain gas fee (“Bridge network fee”), our decentralized bridge is tasked to collect the appropriate gas fee and pay the network.

### How does the Bridge network fee waiver work?

- The following transactions are eligible for a fee waiver:
  - Crypto.org => Cronos
  - Cronos => Crypto.org
- The fee waived is the bridge network transaction fee on the destination chain. However, you are still liable to pay for the origin chain gas fee directly on your wallet extension.
- This is a promotional waiver; we reserve the right to modify and terminate the promotion at any time

### How fast is the transfer?

- IBC Transfers will take between 1 min to 1 hour, depending on transfer congestion. After an hour, the transaction will either go through or revert with the funds sent back to your origin wallet.

### Can I transfer assets to a different wallet than my own?

- For transfers between Cronos and Crypto.org, we support either connecting a second compatible wallet or inputting the wallet address string.
  - If possible, we recommend connecting the second wallet to avoid manual typing and potential malware risks such as clipboard attacks.

### What are the support blockchains and tokens?

- The networks supported are:
  - Crypto.org
  - Cronos
  - Coming Soon: Cosmos and Ethereum

### What are the supported wallets?

- The initially supported wallets will be Crypto.com DeFi Wallet, Metamask, and Keplr.
- Please ensure to set the correct active network on your Wallet if it is supported.

### Can I complete multiple transfers in one go?

- While it is possible to have multiple ongoing transactions, we recommend having one transaction at a time, even if there is some waiting time to avoid issues and duplication.

### Where can I report bugs and provide product feedback?

For any bug reports, or feedback please contact contact.bridge@crypto.org. This is for the web Cronos bridge only. For Crypto.com app, exchange, and DeFi wallet, contact directly https://help.crypto.com/en/

### How do I find my missing funds?

- Please check the transaction history table for your past transactions. If your transactions are not on the list, it was likely not initiated at all.
  If you believe you still have missing funds, please contact us at product@cronos.org.

### Is transferring tokens across blockchains safe?

- As with any decentralized application, there is a degree of risk related to code exploits and hacking.
- Our bridge code is publicly available. We leverage open-source code from the IBC protocol and Gravity bridge projects.
