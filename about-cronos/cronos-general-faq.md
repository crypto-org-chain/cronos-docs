# Cronos General FAQ

#### **What is the difference between Cronos Chain and Crypto.org Chain?**

* Cronos is the EVM-compatible chain powered by Ethermint, which allows rapid porting of apps and smart contracts from Ethereum and EVM-compatible chains.&#x20;
* Crypto.org Chain is our native blockchain solution for Crypto.com, which is the backbone behind the Crypto.com applications. It aims to provide a fast transaction experience. Croeseid Testnet is the testnet for the Crypto.org mainnet to test out the chain.&#x20;

The directions and approaches for smart contract implementation Cronos is EVM compatible, while Crypto.org Chain is using CosmWasm.&#x20;

#### **Who is currently running as a validator on Cronos?**&#x20;

Cronos runs on Proof of Authority (POA), a more streamlined and scalable consensus mechanism. Currently, validator hosting is by invitation only at the early stage of the Cronos testnet, and as of now, there are 20+ industry partner validators committed to supporting Cronos.

#### **How can I become a Cronos validator?**&#x20;

Cronos Validators are by invitation only at the moment. The application for new Cronos validators is not open currently. We will make an announcement once the application reopens.

#### **What is the chain-ID for Cronos Mainnet?**&#x20;

* Ethereum Chain ID: `25`&#x20;
* Cronos Chain ID: `cronosmainnet_25-1`

#### **What are the rate limits for the EVM endpoint for Cronos?**&#x20;

* Cronos Mainnet: a rate limit is 300 req/min/IP&#x20;
* Cronos Testnet: a rate limit of 500 req/min/IP

If the limit is exceeded, the IP gets blocked for 1 minute. If it is expected to consistently make more requests than the limits, you may consider setting up your own full node.&#x20;

#### **If I increase the gas fee, does it help to speed up my transaction?**&#x20;

The current mempool setting works in a first-come-first-serve manner and priority with a gas fee is not supported ( i.e. setting a higher gas fee would not speed up the transaction).
