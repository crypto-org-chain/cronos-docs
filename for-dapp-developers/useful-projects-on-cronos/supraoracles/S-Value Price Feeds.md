---
title: SupraOracles
description: SupraOracles provides smart contracts with a next-generation cross-chain oracle solution that has superior data accuracy, speed, scalability and security. 
keywords: [supraoracles, oracle, data feeds, price feeds]
---

## What is SupraOracles?

> :bulb: **Note:** SupraOracles is only available on Cronos Testnet at the moment.


[SupraOracles](https://supraoracles.com/) is a novel, high-throughput Oracle & IntraLayer: a vertically integrated toolkit of cross-chain solutions (data oracles, asset bridges, automation network, and more) that interlink all blockchains, public (L1s and L2s) or private (enterprises). SupraOracles provides smart contracts with a next-generation cross-chain solutions that has superior data accuracy, speed, scalability and security. 


## How to use SupraOracles' Price Feeds

Integrating with SupraOracles' Price Feeds is quick and easy. SupraOracles currently supports many Solidity/EVM-based networks, like **Cronos TestNet**, and non-EVM networks such as Sui and Aptos.

To see all of the networks SupraOracles supports, please visit   [SupraOracles' Networks](https://supraoracles.com/docs/get-started/networks)!

To get started, you should follow this guide for a quick start or  visit [SupraOracles' docs site](https://supraoracles.com/docs/get-started/) and review the documentation.


### Step 1: Create The S-Value Interface

Add the following code to the Solidity smart contract that you wish to retrieve an S-Value.


```solidity
interface ISupraSValueFeed {
    function checkPrice(string memory marketPair) external view returns (int256 price, uint256 timestamp);
}
```



The above codes provides the interface that you will use apply in next steps in order to fetch a price data from SupraOracles.


### Step 2: Configure The S-Value Feed Address

To fetch the S-Value from a SupraOracles smart contract, you must first find the S-Value Feed Address for the chain of your choice.

For Cronos TestNet, the address is: **0x700a89Ba8F908af38834B9Aba238b362CFfB665F**

Now you have the proper address, let's create an instance of the S-Value Feed using the interface we previously defined for Cronos TestNet:


```solidity
contract ISupraSValueFeedExample {
    ISupraSValueFeed internal sValueFeed;

    constructor() {
        sValueFeed = ISupraSValueFeed(0x700a89Ba8F908af38834B9Aba238b362CFfB665F);
    }
}
```




### Step 3: Get The S-Value Crypto Price

Now you can simply access the S-Value Crypto Price of our supported market pairs. In this step, we'll get the price of ETH/USDT (eth_usdt) by applying the following code to our Smart Contract.


```solidity
function getEthUsdtPrice() external view returns (int) {
    (
        int price,
        /* uint timestamp */
    ) = sValueFeed.checkPrice("eth_usdt");

    return price;
}
```



Here's an example of what your implementation should look like


```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;


interface ISupraSValueFeed {
    function checkPrice(string memory marketPair) external view returns (int256 price, uint256 timestamp);
}

contract ISupraSValueFeedExample {
    ISupraSValueFeed internal sValueFeed;

    constructor() {
        sValueFeed = ISupraSValueFeed(0x700a89Ba8F908af38834B9Aba238b362CFfB665F);
    }

    function getEthUsdtPrice() external view returns (int) {
        (
            int price,
            /* uint timestamp */
        ) = sValueFeed.checkPrice("eth_usdt");

        return price;
    }
}
```


Tada! You now have a method in your Smart Contract that you can call at any time to retrieve the price of ETH in USDT!

### BONUS: Get S-Value Feeds with ethers.js


```js
// example assumes that the ethers library has been imported and is accessible within your scope


const getEthUsdtPrice = async () => {
  ////for ethers version 6.0
  const provider = new ethers.JsonRpcProvider('https://data-seed-prebsc-1-s1.binance.org:8545/')
  ////for ethers version <= 5.7.2
  //const provider = new ethers.providers.JsonRpcProvider('https://data-seed-prebsc-1-s1.binance.org:8545/')
  
  const abi = [{ "inputs": [ { "internalType": "string", "name": "marketPair", "type": "string" } ], "name": "checkPrice", "outputs": [ { "internalType": "int256", "name": "price", "type": "int256" }, { "internalType": "uint256", "name": "timestamp", "type": "uint256" } ], "stateMutability": "view", "type": "function" } ]

  // Cronos address to retrieve price feeds
  const address = '0x700a89Ba8F908af38834B9Aba238b362CFfB665F'
  const sValueFeed = new ethers.Contract(address, abi, provider)
  const price = (await sValueFeed.checkPrice('eth_usdt')).price

  console.log(`The price is: ${price.toString()}`);
}

getEthUsdtPrice()
```





## Going Further with SupraOracles

If you want to take the next step, consider using our [Verifiable Random Functions (VRFs) product.](https://supraoracles.com/docs/vrf1/a-deeper-dive-into-supra-vrf) or refer to the [Supra docs](https://supraoracles.com/docs/additional-guides) for additional tutorials and guides based on example use-cases, etc. 


## Connect with us!

Still looking for answers? We got them! Check out all the ways you can reach us:

* Visit us at [supraoracles.com](https://supraoracles.com)
* Read our [Docs](https://supraoracles.com/docs/overview)
* Follow us on [Twitter](https://twitter.com/SupraOracles)