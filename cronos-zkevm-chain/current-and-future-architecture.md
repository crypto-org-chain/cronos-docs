# Current and future architecture

## Current architecture

The Cronos zkEVM Testnet is a zero-knowledge layer 2 roll-up network on top of Ethereum Sepolia Testnet. It leverages the [hyperchain stack created by Matter Labs](https://era.zksync.io/docs/reference/concepts/hyperscaling.html), together with some custom open-source developments such as the use of a custom token (TCRO) to pay for transaction fees.

Relevant Github repositories:

* [https://github.com/cronos-labs/zksync-era](https://github.com/cronos-labs/zksync-era)&#x20;
* [https://github.com/cronos-labs/era-contracts](https://github.com/cronos-labs/era-contracts)
* [https://github.com/cronos-labs/zksync2-js](https://github.com/cronos-labs/zksync2-js)

Relevant smart contract addresses on Ethereum Sepolia:

* TCRO:   [CronosTestnet.sol](https://sepolia.etherscan.io/address/0x1c815aca8daacdf46805fbFB9F08abD1D614773D)
* Timelock:   [ValidatorTimelock.sol](https://sepolia.etherscan.io/address/0x411015940f04B6f29B3081c339F53A3e86D0a227)
* Hyperchain:   [DiamondProxy.sol](https://sepolia.etherscan.io/address/0x08A064F0c455Df1806Fb02425f2C31fAFc187979)
* Verifier:   [Verifier.sol](https://sepolia.etherscan.io/address/0x264793786ac01E14378F2b3823b6c4EC0a5245D3)

## Future architecture

Cronos zkEVM is a new Layer 2, will coexist with the flagship Cronos chain (EVM compatible Layer 1 built on Cosmos SDK) and Cronos POS chain (aka "layer zero" built on Cosmos SDK). This is aligned with Cronos' vision of a multi-chain world.

The target timeframe for mainnet launch is by June 2024.

The new network aims to introduce 4 distinctive strengths aligned with the emerging trends of the next market cycle:

### **CROFam**

\#CROFam is a strong community of users and dapps that have proven their passion and resilience through the bear market.

Partners like VVS Finance, Veno Finance and Fulcrom Finance have crafted high quality apps that deserve to be better known and have the potential to scale in the next market cycle.

The new chain will enable participating apps to scale to the next level.

### **Shared liquidity**

When users hold cryptocurrencies on a hyperchain, their assets are secured by Ethereum where they can always choose to withdraw. Besides, they can transfer their assets to other hyperchains securely and at low cost thanks to unified bridge and messaging.

### **Yield-bearing assets**.

At this point we expect that the network token, backed by CRO, and several stable coins and other cryptos, will be natively APY generating for users, just by holding them on the chain. This can be achieved via rebase tokens. Exact mechanism is being worked out with the Veno Finance team.

Cronos zkEVM has the potential to create an entire ecosystem of dapps that treat yield-bearing tokens as first class citizens and can effectively compete in a high interest rate economy.

### **Account Abstraction**.

Account sbstraction has been possible for a while on EVM compatible chains, but it has been challenging for legacy chains to migrate existing liquidity to AA-enabled wallets.

Thanks to AA, users can deposit their funds to the chain and transact with dapps without ever having to switch network. Instead, they can opt to emit off-chain signatures from any EVM home chain, or even from mobile apps or games with usual login.

Dapps on Cronos zkEVM should support AA by default, so that they can take care of relaying transactions to Cronos zkEVM and even pay for gas.

This will unleash the power of AA to support mainstream adoption.

### What's next

We are still in the early days and significant R\&D is needed to translate this vision into a live network, while at the same time monitoring and optimizing the performance of the testnet.

To participate in the conversation, please join the [Discord server](https://discord.com/invite/cronos).

