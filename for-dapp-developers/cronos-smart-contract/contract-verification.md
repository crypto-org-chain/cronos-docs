# Contract Verification

## Hardhat: Verify Your Contracts with Hardhat-Cronoscan plugin

After you deploy your ERC20 Contract successfully, the next is to verify the source code for your Solidity contracts. The [Hardhat-Cronoscan](https://www.npmjs.com/package/@cronos-labs/hardhat-cronoscan) plugin aims to make it easy for smart contract developers to verify the smart contracts on Cronoscan from the Hardhat development environment.

This plugin adds the Cronos network to the verify task provided by Hardhat-Etherscan. With this plugin, the verify task is able to verify Cronos contracts through Cronoscan's service.

### Step 1. Install the package&#x20;

We need the Hardhat plugin for integration with Cronoscan's contract verification service. This plugin needs to be used in conjunction with the Hardhat-Etherscan plugin (v3.1.0 or above).

```
# Install hardhat-etherscan plugin
npm install --save-dev @nomiclabs/hardhat-etherscan@^3.1.0

# Install hardhat-cronoscan plugin
npm install --save-dev @cronos-labs/hardhat-cronoscan
```

And make sure you also have the following dependencies:

```
npm install ethers dotenv @openzeppelin/contracts
npm install --save-dev solidity-coverage
npm install --save-dev hardhat-gas-reporter
```

### **Step 2. Import the plugins**

Under Hardhat, add the following statement to your `hardhat.config.ts`:

```
...
import "@nomiclabs/hardhat";
import "@nomiclabs/hardhat-etherscan";
import "@cronos-labs/hardhat-cronoscan";
... 
```

### **Step 3. Define your Cronoscan API key**

In your project's hardhat.config.js, append to your existing configurations. Replace `{YOUR_CRONOSCAN_API_KEY}`with your Cronoscan API key.

If you don’t have a Cronoscan API KEY, you will need to [create a Cronoscan account](https://docs.cronos.org/block-explorers/block-explorer-and-api-keys#creating-api-keys-on-cronoscan) first. After you log **** in to the Cronoscan account, you will be able to generate it at [API-KEY page](https://cronoscan.com/myapikey). Cronoscan Testnet shares the same API key as Cronoscan Mainnet, but it is recommended to generate a new one on the Cronoscan portal and replace `{YOUR_CRONOSCAN_TESTNET_API_KEY}` with it. One Cronoscan allows creating three API KEYs.

Update the settings as below under `hardhat.config.ts`

```
const config: HardhatUserConfig = { 
solidity: "version",
 networks: {
   hardhat: {},
   cronosTestnet: {
     url: "https://evm-t3.cronos.org/",
     chainId: 338,
     accounts: ['myPrivateKey'],
     gasPrice: 5000000000000,
   },
   cronos: {
     url: "https://evm.cronos.org/",
     chainId: 25,
     accounts: ['myPrivateKey'],
     gasPrice: 5000000000000,
   },
 },
  etherscan: {
    apiKey: {
      cronosTestnet: "{YOUR_CRONOSCAN_TESTNET_API_KEY}",
      cronos: "{YOUR_CRONOSCAN_API_KEY}", 
    },
  },
};
```

### **Step 4. Check the supported network list:**

Check the list of supported networks:

```
npx hardhat verify --list-networks
```

### Step 5. **Verify the Smart Contract**

Obtain your deployed contract address when you deployed the contract (Step 8 in the previous section).&#x20;

In your hardhat project, run the verify task as shown below. Replace `DEPLOYED_CONTRACT_ADDRESS` with your deployed contract address, and the constructor arguments that were used to deploy it (if any):

#### Verify on Cronos (Mainnet):&#x20;

```
npx hardhat verify --network cronos DEPLOYED_CONTRACT_ADDRESS "Constructor argument 1" "Constructor argument 2"
```

#### Verify on Cronos Testnet&#x20;

```
npx hardhat verify --network cronosTestnet DEPLOYED_CONTRACT_ADDRESS "Constructor argument 1""Constructor argument 2"
```

Example:

```
npx hardhat verify --network cronosTestnet "0x00e9fd0eaea8325dc31a64e23d91607fdd60d2d1" "My token name" "My token symbol"

```

You should now be able to see your contact is verified on [Cronoscan](https://cronoscan.com/) or [Testnet Cronoscan](https://testnet.cronoscan.com/) and start to read and write your smart contracts.

![](https://lh3.googleusercontent.com/0kiqsvlsjaE7K8gNfNqxPTUMFeXZjxLgdtQF9lgQ56eVfl9iSCSQrsNC1YE8GN2g9WG25ZYy716DGVFBanlEap3uAq\_wvTfI1Ijc-6cNhB0gzBYGBu2An7vjunlAkRLKAMLCnknuqT3qxZZ-45V1vEU)

[Follow this link for a blog post](https://medium.com/cronos-chain/cronos-developer-series-deploy-verify-your-contracts-using-hardhat-8b6ab6928986) with a more detailed step-by-step tutorial.
