# Anyswap

## What is anyCall?

AnyCall is a permissionless generic cross-chain message protocol that allows cross-chain messages and contract calling from chain A to chain B. anyCall is secured by the Multichain SMPC network which is used to secure billions of assets (more info [here](https://docs.multichain.org/developer-guide/anycall-v7)).

### Features and Updates include:

* Permissionless Deployments (No whitelisting)
* Flexible contract designs
* Chained anyCall allowed. You can call anyCall to Chain B, then to Chain C

### **anyCall V7 Workflow**

The anyCall protocol is made up of three main functions `anyCall`, `anyExec` and `anyExecute`. \
The first two methods exist in the deployed anyCall contracts.

DApps need to develop and deploy:

* A sender contract on chain A calling the `anyCall` on the official AnyCall contract
* A receiver contract on chain B with a function named **** `anyExecute`\
  This **needs to be present and it will be called!**

<mark style="color:green;">**DAPPS sender contract(Chain A)**</mark>** ->** `anyCall`(Chain A) _****_** ->** \
****_SMPC Network_ **->** `anyExec`(Chain B) **->`AnyCallExecutor` ->**\
****`anyExecute` by <mark style="color:green;">**DAPP receiver contract(Chain B)**</mark>



### **anyCall integration**

Cronos Mainnet

* AnycallV7Proxy deployed at:`0x8efd012977DD5C97E959b9e48c04eE5fcd604374`

Cronos Testnet

* AnycallV7Proxy deployed at: `0x5D9ab5522c64E1F6ef5e3627ECCc093f56167818`

More details on the parameters can be found [here](https://docs.multichain.org/developer-guide/anycall-v7/how-to-integrate-anycall-v7)

#### 1. anyCall (Called by Dapps)

`function anyCall( address _to, bytes calldata _data, uint256 _toChainID, uint256 _flags, bytes calldata )`

#### 2. anyExecute **(This exact format needs to be implemented in your dapp)**

`function anyExecute(bytes calldata data) external override onlyExecutor returns (bool success, bytes memory result)`

#### 3. AnyCallExecutor

As stated above, **** `AnyCallExecutor` **** will make the final execution to your destination contract as a sandbox.

The address of this executor contract is stored in the main anycall contract. It can be accessed with an interface function like below.

```
interface CallProxy{
 
    function executor() external view returns (address executor);
}
```

The executor should then be saved in your contract constructor

```
constructor(){
        anycallExecutor=CallProxy(anycallcontract).executor();
    }
```



## Quickstart (Cross-chain text example)

Let's look at a simple example as well as how to send and receive message using anyCall.​

{% embed url="https://github.com/zkaizhi/anyCall-V7-Simple-Message-Sender-Example" %}

This repo will deploy a solidity contract on two chains and send a text message from chain A to chain B.

1. Fork the provided repository and install the dependencies using either yarn or npm \
   (`yarn || npm install`).
2. Add your private key and Cronoscan API keys (if you want to verify the contract on Etherscan) to the `.env.example` file. Rename the file to `.env.`
3. Deploy the example contract on the ftm, bnb and cronos testnets by running the following commands:
   * `yarn hardhat deploy --network ftmtest`
   * `yarn hardhat deploy --network bnbtest`
   * `yarn hardhat deploy --network cronostest`
4. To test the flow, run the following command and change the customMessage in 1testanycall.js to send a different message:
   * `yarn hardhat run ./scripts/1testanycall.js --network cronostest` \
     `(send from Cronos)`
   * `yarn hardhat run ./scripts/1testanycall.js --network bnbtest` \
     `(send to Cronos)`
