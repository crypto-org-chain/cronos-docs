# Contract Deployment and Verification

## Block Explorer

The Cronos blockchain network is transitioning away from the legacy Cronoscan block explorer and into the new [Cronos Explorer](https://explorer.cronos.org).&#x20;

The Cronos Explorer URLs are as follows:

* Mainnet: [https://explorer.cronos.org](https://explorer.cronos.org)
* Testnet: [https://explorer.cronos.org/testnet](https://explorer.cronos.org/testnet)

The documentation of the Cronos Explorer APIs are available at the following URLs:

* Mainnet: [https://explorer-api-doc.cronos.org/mainnet](https://explorer-api-doc.cronos.org/mainnet)
* Testnet: [https://explorer-api-doc.cronos.org/testnet](https://explorer-api-doc.cronos.org/testnet)

## Contract Deployment

To interact with Cronos mainnet, you can use the public endpoint `https:.//evm.cronos.org` or an endpoint provided by a commercial vendor. You will need CRO in your self-custodial wallet in order to pay for transaction fees.

In [this Github repository](https://github.com/kentimsit/cronos-hardhat-boilerplate), you will find a convenient example of Hardhat configuration for smart contract development on Cronos Testnet and Mainnet. Please refer to [the README.md file](https://github.com/kentimsit/cronos-hardhat-boilerplate/blob/main/README.md) for a list of frequently used commands, and to the [Hardhat documentation](https://hardhat.org) for more details.

In the `hardhat.config.js` file, you will notice that we currently recommend to set the gas price at 10100000000000 wei, but please [check the Gas Tracker](https://cronos.org/gastracker) for a more up to date value.

## Contract Verification

In order to enable users and fellow developers to do their own research, it is imperative that you publish your smart contract code on Cronos Explorer. This is called verifying your contracts.

The new Cronos Explorer supports smart contract verification either through the web interface or programmatically via Hardhat (we recommend to use Hardhat).

**Contract Verification Via Explorer Hardhat:**

For verification via Hardhat, refer to the example provided in [this boilerplate repository](https://github.com/kentimsit/cronos-hardhat-boilerplate/blob/main/README.md). Cronos is supported by Hardhat out of the box, you just need to configure the network parameters in `hardhat.config.js` . You will need an API key. To find out how to obtain an API key, refer to the [Cronos Explorer API documentation](https://docs.cronos.org/block-explorers/block-explorer-and-api-keys#creating-account-and-getting-api-key-cronso-explorer).

After the contract verification is complete, the Cronos Explorer will display details about your smart contract code like shown below.

<figure><img src="../../.gitbook/assets/2024-02-08 Screenshot 07-53-20@2x.png" alt=""><figcaption><p>Cronos Explorer screenshot</p></figcaption></figure>

**Contract Verification Via Explorer interface:**

For verification via the web interface, visit the following URLs:

* Mainnet: [https://explorer.cronos.org/verifyContract](https://explorer.cronos.org/verifyContract)
* Testnet: [https://explorer.cronos.org/testnet/verifyContract](https://explorer.cronos.org/testnet/verifyContract)

