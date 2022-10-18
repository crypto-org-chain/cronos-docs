# Table of contents

## Getting Started

* [Getting Started](README.md)
* [Introduction](getting-started/introduction.md)
* [Architecture](getting-started/architecture.md)

## FOR USERS

* [MetaMask](for-users/metamask.md)
* [Bridge](for-users/bridge/README.md)
  * [From the Crypto.com App and Exchange](for-users/bridge/app\_n\_ex/README.md)
    * [From the Crypto.com App](for-users/bridge/app\_n\_ex/cdcapp.md)
    * [From the Crypto.com Exchange](for-users/bridge/app\_n\_ex/cdcex.md)
  * [From Crypto.org Chain](for-users/bridge/other\_chain/README.md)
    * [Cronos Bridge Web App](for-users/bridge/other\_chain/webapp.md)
    * [Keplr](for-users/bridge/other\_chain/keplr.md)
  * [From Gravity Bridge Web App (Testnet only)](for-users/bridge/gb-testnet.md)
  * [FAQs for Bridge transfers](for-users/faq.md)
  * [FAQs for ERC20-only transaction Support](for-users/bridge/faqs-for-erc20-only-transaction-support.md)
* [Testnet Faucet](for-users/testnet-faucet.md)

## FOR DAPP DEVELOPERS

* [Cronos Integration](for-dapp-developers/chain-integration/README.md)
  * [Public RPC endpoints](for-dapp-developers/chain-integration/public-rpc-endpoints.md)
  * [Wallet integrations](for-dapp-developers/chain-integration/web-extension-integration.md)
  * [Crypto.com DeFi Desktop Wallet](for-dapp-developers/chain-integration/desktop-wallet-integration.md)
  * [JSON-RPC](for-dapp-developers/chain-integration/json-rpc.md)
  * [Swagger Playground](https://cronos.org/swagger?network=mainnet)
* [Smart Contracts](for-dapp-developers/cronos-smart-contract/README.md)
  * [Contract Deployment](for-dapp-developers/cronos-smart-contract/contract-deployment.md)
  * [Contract Verification](for-dapp-developers/cronos-smart-contract/contract-verification.md)
  * [Best Practices](for-dapp-developers/cronos-smart-contract/defi-practice.md)
  * [Token Contract Addresses](for-dapp-developers/cronos-smart-contract/token-contract-addresses.md)
* [Dev Tools & Integrations](for-dapp-developers/useful-projects-on-cronos/README.md)
  * [Band Protocol](for-dapp-developers/useful-projects-on-cronos/band-protocol.md)
  * [Covalent](for-dapp-developers/useful-projects-on-cronos/covalent.md)
  * [Moralis](for-dapp-developers/useful-projects-on-cronos/moralis.md)
  * [Witnet](for-dapp-developers/useful-projects-on-cronos/witnet.md)

## FOR NODE HOSTS

* [Running nodes](for-node-hosts/running-nodes/README.md)
  * [Cronos Mainnet](for-node-hosts/running-nodes/cronos-mainnet/README.md)
    * [Quicksync](for-node-hosts/running-nodes/cronos-mainnet/quicksync.md)
    * [State-sync](for-node-hosts/running-nodes/cronos-mainnet/state-sync.md)
    * [The "Huygen" upgrade guide (v0.6.\* to v0.7.\*) :](for-node-hosts/running-nodes/cronos-mainnet/huygen.md)
    * [Patching unlucky tx](for-node-hosts/running-nodes/cronos-mainnet/patching-unlucky-tx.md)
  * [Cronos Testnet](for-node-hosts/running-nodes/cronos-testnet.md)
  * [Devnet](for-node-hosts/running-nodes/local-devnet.md)
  * [Cronos Gravity Bridge Testnet](for-node-hosts/running-nodes/cronos-gbtestnet.md)
  * [Best Practices](for-node-hosts/running-nodes/cronos-node-best-practises.md)
  * [Cronosd build with Nix](for-node-hosts/running-nodes/cronosd-build-with-nix.md)
* [Cronosd](for-node-hosts/cli.md)

## CRONOS PLAY

* [Cronos Play](cronos-play/cronos-play/README.md)
  * [Cronos Play FAQ](cronos-play/cronos-play/cronos-play-faq.md)
* [Unity](cronos-play/unity/README.md)
  * [EVM](cronos-play/unity/scripts.md)
  * [ERC1155](cronos-play/unity/scripts-1.md)
  * [ERC721](cronos-play/unity/scripts-2.md)
  * [ERC20](cronos-play/unity/scripts-3.md)
  * [Custom RPC](cronos-play/unity/scripts-4.md)
  * [Login Example](cronos-play/unity/login-example.md)
  * [Useful Links](cronos-play/unity/useful-links.md)
  * [2D Game Example](cronos-play/unity/play.md)
* [Unreal Engine Plugin](cronos-play/getting-started\_unreal/README.md)
  * [Installation and Enabling](cronos-play/getting-started\_unreal/download.md)
  * [Quick Start](cronos-play/getting-started\_unreal/quick-start/README.md)
    * [Actors and Blueprint Classes](cronos-play/getting-started\_unreal/quick-start/actors-and-blueprint-classes.md)
    * [Cronos Configuration](cronos-play/getting-started\_unreal/quick-start/cronos-configuration.md)
    * [Wallet](cronos-play/getting-started\_unreal/quick-start/wallet.md)
    * [ERC20](cronos-play/getting-started\_unreal/quick-start/erc20.md)
    * [ERC721](cronos-play/getting-started\_unreal/quick-start/erc721.md)
    * [ERC1155](cronos-play/getting-started\_unreal/quick-start/erc1155.md)
    * [Broadcast Transactions](cronos-play/getting-started\_unreal/quick-start/broadcast-transactions.md)
    * [Get Tokens or Transactions](cronos-play/getting-started\_unreal/quick-start/get-tokens-or-transactions.md)
    * [WalletConnect](cronos-play/getting-started\_unreal/quick-start/walletconnect.md)
    * [Working with C++](cronos-play/getting-started\_unreal/quick-start/working-with-c++/README.md)
      * [Creating a C++ Project](cronos-play/getting-started\_unreal/quick-start/working-with-c++/creating-a-c++-project.md)
      * [Creating a child DefiWalletCoreActor](cronos-play/getting-started\_unreal/quick-start/working-with-c++/creating-a-child-defiwalletcoreactor.md)
      * [Querying a contract](cronos-play/getting-started\_unreal/quick-start/working-with-c++/querying-a-contract.md)
      * [Customizing Netowork](cronos-play/getting-started\_unreal/quick-start/working-with-c++/customizing-netowork.md)
  * [Demo](cronos-play/getting-started\_unreal/demo.md)
* [Cronos Play C++ SDK](cronos-play/getting-started\_cpp.md)
* [Crypto.com Pay Integration](cronos-play/crypto.com-pay-integration.md)

## Block Explorers

* [Block Explorer and API Keys](block-explorers/block-explorer-and-api-keys.md)
* [Cronoscan](https://cronoscan.com/)

## ABOUT CRONOS

* [Chain ID and Address Format](about-cronos/chain-id.md)
* [Cronos General FAQ](about-cronos/cronos-general-faq.md)
* [Genesis](about-cronos/genesis\_file.md)
* [Modules](about-cronos/module\_overview/README.md)
  * [module\_bank](about-cronos/module\_overview/module\_bank.md)
  * [module\_distribution](about-cronos/module\_overview/module\_distribution.md)
  * [module\_gov](about-cronos/module\_overview/module\_gov.md)
  * [module\_mint](about-cronos/module\_overview/module\_mint.md)
  * [module\_slashing](about-cronos/module\_overview/module\_slashing.md)
  * [module\_staking](about-cronos/module\_overview/module\_staking.md)
  * [module\_feemarket](about-cronos/module\_overview/module\_feemarket.md)
* [Chain Details](about-cronos/chain-details/README.md)
  * [List of parameters](about-cronos/chain-details/parameters.md)
  * [Technical glossary](about-cronos/chain-details/technical-glossary.md)
  * [Protocol Documentation](about-cronos/chain-details/cosmos-grpc-docs.md)
