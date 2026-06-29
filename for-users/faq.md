# FAQs for Bridge transfers

#### What are the fees involved?

* The Cronos Bridge service itself is free and does not charge any additional service fees. The fees displayed are network gas fees which the blockchain infrastructure charges itself to process the transactions and vary depending on the network.
* For any bridge transaction, network gas fees are incurred on two chains: origin and destination.
  * For the origin chain gas fee, this will be displayed and settled directly on your wallet extension.
  * For the destination chain gas fee (“Bridge network fee”), our decentralised bridge is tasked to collect the appropriate gas fee and pay the network.

#### How does the Cronos Bridge network fee waiver work?

* The following transactions are eligible for a fee waiver:
  * Cronos POS Chain => Cronos (Cronos EVM chain)
  * Cronos (Cronos EVM chain) => Cronos POS Chain
* The fee waived is the bridge network transaction fee on the destination chain. However, you are still liable to pay for the origin chain gas fee directly on your wallet extension.
* This is a promotional waiver; we reserve the right to modify and terminate the promotion at any time

#### How fast is the transfer?

IBC Transfers will take between 1 min to 1 hour, depending on transfer congestion. After an hour, the transaction will either go through or revert with the funds sent back to your origin wallet.

#### Can I transfer assets to a different wallet than my own?

* For transfers between Cronos and Cronos POS Chain, we support either connecting a second compatible wallet or inputting the wallet address string.
* If possible, we recommend connecting the second wallet to avoid manual typing and potential malware risks such as clipboard attacks.

#### What are the support blockchains and tokens?

The networks supported are:

* Cronos (Cronos EVM Chain)
* Cronos POS Chain
* [Cosmos](https://hub.cosmos.network/)
* [Akash](https://akash.network/)
* [IRISnet](https://www.irisnet.org/)
* [Canto](https://www.canto.io/)
* [Celestia](https://celestia.org/)
* [Juno](https://www.junonetwork.io/)

#### What are the supported wallets?

* The initially supported wallets will be Crypto.com Onchain Wallet, MetaMask, Rabby and Keplr.
* Please ensure to set the correct active network on your Wallet if it is supported.

#### Can I complete multiple transfers in one go?

While it is possible to have multiple ongoing transactions, we recommend having one transaction at a time, even if there is some waiting time to avoid issues and duplication.

#### Where can I report bugs and provide product feedback?

For any bug reports, or feedback please contact [bridge@cronos.com](mailto:bridge@cronos.com). This is for the web Cronos bridge only. For Crypto.com app, exchange, and Onchain wallet, refer to [https://help.crypto.com/en/](https://help.crypto.com/en/) or [https://help.crypto.com/en/articles/5645017-cronos-bridge](https://help.crypto.com/en/articles/5645017-cronos-bridge).

#### How do I find my missing funds?

Please check the transaction history table for your past transactions. If your transactions are not on the list, it was likely not initiated at all. If you believe you still have missing funds, please contact [bridge@cronos.com](mailto:bridge@cronos.com)[.](mailto:product@cronos.com.)

#### Is transferring tokens across blockchains safe?

* As with any decentralised application, there is a degree of risk related to code exploits and hacking.
* Our bridge code is publicly available. We leverage open-source code from the IBC protocol project.

#### How to check a IBC transfer?

IBC transfers do not appear in Cronos Explorer because they are processed at the Cosmos layer and do not emit EVM-compatible logs, making them invisible to standard Ethereum JSON-RPC APIs. To look up an IBC transfer, use the [Cronos IBC Bridge Activity API](../cronos-chain-protocol/cronos-ibc-bridge-activity-api.md) instead.
