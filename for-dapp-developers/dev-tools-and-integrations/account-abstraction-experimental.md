# Account Abstraction

## Introduction

Account Abstraction simplifies blockchain interactions by allowing smart contracts to serve as user accounts, merging contract capabilities with account management. The Titan upgrade opens the door for Account Abstraction to become reality on Cronos Testnet.\
\
Account Abstraction opens up possibilities for numerous use cases such as multi-signature transactions, social recovery, contract whitelisting, custom gas tokens, subsidizing gas fees, and much more. It expands the use-case potential of DApps and enables a more intuitive user experience.

Key components are provided to support Account Abstraction development:

* **User Operations:** A new transaction object type that includes additional data, allowing for custom transaction and security configurations.
* **JSON-RPC API debug\_traceCall:** Enables simulation of User Operations before they are executed on-chain.
* **Bundlers:** Crucial nodes that bundle unsigned User Operations into a single package for signing and subsequent publication on the mainnet. Bundlers estimate transaction fees.
* **Entry Point Contract:** an audited and trusted singleton contract, is functional and can process the execution and validating User Operations.

\
Account Abstraction is natively supported on Cronos, and developers can leverage these features for their own use cases. There are also application-level account abstraction solutions available for developers who need Account Abstraction functionality now. Please contact [Cronos Labs](https://cronoslabs.org) if you would like to be introduced to the relevant developer tool platforms.

## Send a UserOperation using `userop.js`

In this guide, we will go through how to send a userop transaction with subsidized gas fee.\
Here we are using [userop.js](https://github.com/stackup-wallet/userop.js) to send UserOperations but you can use any library you like, even using `curl` .

We will create a new project for sending transactions:

```bash
mkdir userop-test
cd userop-test
yarn init -y
yarn add userop  // the example code below is built on version: ^0.4.0-beta.5
yarn add dotenv
```

In the root directory, create a new file `.env` :

```
ENTRY_POINTS=0x5FF137D4b0FDCD49DcA30c7CF57E578a026d2789
ACCOUNT_FACTORY=0x9406Cc6185a346906296840746125a0E44976454
NODE_RPC_URL=http://localhost:8545
BUNDLER_RPC_URL=http://localhost:3000
SIGNER_PKEY=0x0000000000000000000000000000000000000000000000000000000000000003
```

{% hint style="info" %}
NOTE: The above addresses of ENTRY\_POINTS contract and ACCOUNT\_FACTORY contract are on Cronos Mainnet.&#x20;

And here is the ENTRY\_POINTS contract address on Cronos Testnet: [0x84D2EF0545514BF121d81769d8E94b94770670Ef](https://explorer.cronos.org/address/0x84D2EF0545514BF121d81769d8E94b94770670Ef). Feel free to deploy your own ACCOUNT\_FACTORY contract on testnet.
{% endhint %}



Create a new `index.mjs` :

```javascript
import { ethers } from "ethers";
import { V06 } from "userop";
import { config } from "dotenv";

config();

const NODE_RPC_URL = process.env.NODE_RPC_URL;
const BUNDLER_RPC_URL = process.env.BUNDLER_RPC_URL;
const SIGNER_PKEY = process.env.SIGNER_PKEY;
const ENTRY_POINTS = process.env.ENTRY_POINTS;
const ACCOUNT_FACTORY = process.env.ACCOUNT_FACTORY;

async function main() {
  // Initialize providers and signer
  const provider = new ethers.JsonRpcProvider(NODE_RPC_URL);
  const bundlerProvider = new ethers.JsonRpcProvider(BUNDLER_RPC_URL);

  // signer is the owner of the smart account
  const signer = new ethers.Wallet(SIGNER_PKEY, provider);

  // Create the account instance
  // The base helper sets up the Common SimpleAccount ABI and logic
  const account = new V06.Account.Instance({
    ...V06.Account.Common.SimpleAccount.base(provider, signer),
    entryPointAddress: ENTRY_POINTS,
    factoryAddress: ACCOUNT_FACTORY,
    bundlerClient: bundlerProvider,
    onBuild: (op) => {
      console.log("Signed UserOperation:", op);
    },
  });

  // these two addresses are different
  // need to fund the smart account before running this script
  console.log(`Signer  address: ${signer.address}`);
  console.log(`Account address: ${await account.getSender()}`);

  // Build the execution call (transfer)
  await account.encodeCallData(
    "execute", 
    [
      "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266", // to
      "100", // value (wei)
      "0x"   // data
    ]
  );

  // Send the UserOperation
  const res = await account.sendUserOperation();

  console.log(`UserOpHash: ${res.userOpHash}`);

  // !!! this step can get stuck in a local geth dev setup
  // because the bundler node is waiting for new block event to bundle the userops
  // try to send a new tx in the local geth dev setup to trigger bundle  console.log("Waiting for transaction...");
  const ev = await res.wait();

  console.log(`Transaction hash: ${ev?.receipt.transactionHash ?? null}`);
}

main().then(() => process.exit(0)).catch((error) => {
  console.error(error);
  process.exit(1);
});

```

Now send the userop by running:

<pre class="language-bash"><code class="lang-bash">$ node index.mjs

Signer  address: 0x6813Eb9362372EE...19671cBA69
Account address: 0xF249baC852124B9...1b6907FcAD
verification gas limit: 70000
verification gas limit: 1000000
<strong>Signed UserOperation: {
</strong>  sender: '0x6813Eb9362372EE...19671cBA69',
  nonce: '0xb',
  initCode: '0x',
  callData: '0xb61d27f6000000000000000000000000f39fd6e51aad88f6f...27279cfffb92266000000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000000000000000600000000000000000000000000000000000000000000000000000000000000000',
  callGasLimit: '0x4443',
  verificationGasLimit: '0xaba7',
  preVerificationGas: '0xbfb1',
  maxFeePerGas: '0x925761c3500',
  maxPriorityFeePerGas: '0xd27a99500',
  paymasterAndData: '0x',
  signature: '0xd42139cf71d00cd7ff...5461bbd949df9500413948fd06a284029e4a777247d6dd609e72b538d60d51b'
}
UserOpHash: 0xdc07e08d601ff82dd509c...34c7262ccf22463f10fb2191
Waiting for transaction...
Transaction hash: 0xcd54434b8c949...2580930cf14045cc3829ef09feb73ec9a


</code></pre>

If successful, you will see the above logs including transaction hash and userOpHash printed out.

We can now verify with this tx hash on the block explorer, that we have successfully sent out a TX, and the gas fees were funded by the account address 0x6813Eb9362372EE...19671cBA69.

<figure><img src="../../.gitbook/assets/Screenshot 2024-03-18 at 12.19.52 PM.png" alt=""><figcaption></figcaption></figure>
