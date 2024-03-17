# Cronos General FAQ

#### **What is the difference between Cronos Chain and Cronos POS Chain?**

* Cronos is an EVM-compatible (Ethereum Virtual Machine) chain powered by Ethermint, built on the Cosmos SDK, which allows rapid porting of apps and smart contracts from Ethereum and EVM-compatible chains. On Cronos, users pay transaction fees in the $CRO cryptocurrency.
* &#x20;Cronos POS Chain is another Cosmos SDK chain that is primarily used for $CRO staking and as the backbone behind many Crypto.com applications. It aims to provide a fast transaction experience. (Croeseid Testnet is the testnet of Cronos POS Chain). On Cronos POS Chain, users also pay transaction fees in the $CRO cryptocurrency.

If you are an application developer who is creating smart contracts in Solidity and would like to deploy decentralized applications in a permissionless environment, Cronos is suitable for your needs.&#x20;

#### **Who is currently running as a validator on Cronos?**&#x20;

Cronos uses Proof of Authority (POA) consensus, a  streamlined and scalable consensus mechanism derived from the Tendermint POS consensus.&#x20;

There are currently 27 validators supporting the Cronos network, all leading infrastructure providers (see the [list here](https://cronos.org/validators)).

#### **How can I become a Cronos validator?**&#x20;

Cronos validators are by invitation only at the moment. Application for new Cronos validators are not currently open. We will make an announcement once applications re-open.

#### **What is the chain-ID for Cronos Mainnet?**&#x20;

* Ethereum Chain ID: `25`&#x20;
* Cosmos Chain ID: `cronosmainnet_25-1`

#### **What are the rate limits of the free JSON-RPC EVM endpoint for Cronos?**&#x20;

* Cronos Mainnet: rate limit is 300 req/min/IP&#x20;
* Cronos Testnet: rate limit of 500 req/min/IP

If the limit is exceeded, the IP gets blocked for 1 minute. If you are expecting to consistently make more requests than what limits allow, you may consider setting up your own full node or contacting a commercial JSON-RPC endpoint provider (see Dev Tools & Integrations). You can also reach out to us on [Discord](https://discord.gg/cGtxgVfGMZ) for assistance.

#### **If I increase the gas price, does it help to speed up my transaction?**&#x20;

The current mempool setting works in a [priority gas fee manner](module\_overview/module\_feemarket.md), where transaction prioritization happens based on the gas price or priority fee.
