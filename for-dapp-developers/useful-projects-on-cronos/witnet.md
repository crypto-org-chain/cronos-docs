---
description: Random Number Generation on Cronos with Witnet
---

# Witnet

## **Introduction**

Witnet is a decentralized oracle protocol that provides reliable data to autonomous smart contracts. It works as a trustable source of randomness for creating unpredictability in various use cases, such as games and NFTs. Witnet has been live on the Cronos Mainnet and Testnet for several months, and the Witnet Random Number Generator is[ deployed on the Cronos](https://docs.witnet.io/smart-contracts/witnet-randomness-oracle/contract-addresses#cronos-chain) blockchain. In this post, we are going to introduce the purpose of the Witnet randomness generator and walk through a smart contract sample.

## Randomness Oracle in Smart Contracts

Random numbers can be useful in decentralized applications. The use cases can be NFTs, video games, or anything else that requires unpredictability at the smart contract level. For example, a smart contract that automatically generates collectibles inside an NFT collection will need a source of randomness to assign different traits. This allows for a variety of unique NFTs to be generated for a certain collection.

However, the execution of smart contracts is deterministic, and smart contract developers do not have access to native random number generation functions natively in Solidity. The randomness must come from outside of the blockchain. This is where an oracle comes in: the job of an oracle is to import number series from off-chain into the blockchain, in a way that provably fulfills certain properties.

Witnet provides a solution to generate randomness on EVM-compatible chains, including Cronos. Every time that a block is created on Cronos, the oracle’s nodes (called witnesses) generate random numbers independently, and these numbers are assembled into a single random number which is stored in the Witnet smart contract on Cronos.

At each block height of the blockchain, any other smart contract can query the next random number from the Witnet smart contract, called the WitnetRandomness contract (also known as the Witnet Randomness Oracle). The WitnetRandomness contract offers a user-friendly interface to developers. It is the easiest way to generate reliable randomness for smart contracts.

WitnetRandomness can be used by practically any dApp, as it has already been deployed by the Witnet Foundation. The WitnetRandomness contract uses an instance of the low-level `WitnetRequestRandomness`. The same instance can also be used by other applications running within the same chain. The best way to interact with the WitnetRandomness contract is through the IWitnetRandomness interface, which is readily available through the [witnet-solidity-bridge npm package](https://www.npmjs.com/package/witnet-solidity-bridge).

## Generate Random Numbers with Witnet&#x20;

You can start by checking out the [Witnet documentation](https://docs.witnet.io/).

In this section, we will walk through random number generation using a sample smart contract. Please ensure that you have some CRO (or TestCRO) stored in your crypto address to pay transaction fees. If you are deploying on Cronos testnet, simply use the [test-token faucet](https://cronos.org/faucet) to obtain the testnet TCRO tokens.

Firstly, we need to import the interface of the WitnetRandomness .sol file into our smart contract in order to be able to interact with it. This is done with: import "[witnet-solidity-bridge/contracts/interfaces/IWitnetRandomness.sol](https://github.com/witnet/witnet-solidity-bridge/blob/master/contracts/interfaces/IWitnetRandomness.sol)";

This is a full example of the basic smart contract that makes use of randomness (credits to Witnet for the example):

```
// SPDX-License-Identifier: MIT
pragma solidity >=0.7.0 <0.9.0;
import "witnet-solidity-bridge/contracts/interfaces/IWitnetRandomness.sol";
contract MyContract {
uint32 public randomness;
uint256 public latestRandomizingBlock;
IWitnetRandomness immutable public witnet;
 
/// @param _witnetRandomness Address of the WitnetRandomness contract.
constructor (IWitnetRandomness _witnetRandomness) {
assert(address(_witnetRandomness) != address(0));
witnet = _witnetRandomness;
}
 
receive () external payable {}
 
function requestRandomNumber() external payable {
latestRandomizingBlock = block.number;
uint _usedFunds = witnet.randomize{ value: msg.value }();
if (_usedFunds < msg.value) {
payable(msg.sender).transfer(msg.value - _usedFunds);
}
}
 
function fetchRandomNumber() external {
assert(latestRandomizingBlock > 0);
randomness = witnet.random(type(uint32).max, 0, latestRandomizingBlock);
}
}

```

This contract involves a two-step workflow:

* **Step 1** - the user should call `requestRandomNumber()`. This initiates an asynchronous request to the WitnetRandomness contract to generate a new random number associated with the current block number. If you need any user input/action to be recorded before the random number is known, you should do it at this workflow step (for example, a bet). You can see that requestRandomNumber is payable, this means that you need to send some CRO or TCRO when you call this function. Some of the balance will be used to pay transaction fees during the asynchronous process, the rest will be transferred back to your address.
* **Step 2** - the user should call `fetchRandomNumber()`, which will retrieve the random number from WitnetRandomness and store it in the randomness variable of your smart contract.

You should deploy the contract to the Cronos network. The contract constructor requires the address of the WitnetRandomness contract on the blockchain network. You can retrieve the addresses on Cronos [here](https://docs.witnet.io/smart-contracts/witnet-randomness-oracle/contract-addresses#cronos-chain). For this example, you can use the Cronos Testnet address (`0x0017A464A86f48B342Cae3b8Fe29cFCDaA7b0643`).

_Remark: make sure that you are using the_ [_Cronos WitnetRandomness address_](https://docs.witnet.io/smart-contracts/witnet-randomness-oracle/contract-addresses#cronos-chain)_, not the_  [_Cronos WitnetRequestBoard address_](https://docs.witnet.io/smart-contracts/witnet-web-oracle/contracts-addresses#cronos-chain)_._



In case a gas estimation error appears when executing `requestRandomNumber()`, increasing the gas allowance will solve the problem. Since randomisation requests will take some time to complete, calling `fetchRandomNumber()` right after `requestRandomNumber()` will most likely cause the transaction to revert. Therefore, you should wait for 5 to 10 minutes before executing `fetchRandomNumber()`.&#x20;

See the following screenshot from remix.ethereum.org:

<figure><img src="https://lh5.googleusercontent.com/FCESj_Ls4xgSh6EpdDQXWJoXuzhqMuENSwX3uZfP0pH04ZaBaXHvV_gd79gVnrNl1EAZm0MqgX2RKeAghQEo3ZZgiHMn2eMHWstG1p4kboEeJgMXCik9wV61ZAcEL8WlMD4Zc1GYfAIInnMdMo2__zAO525VhOLp-Vrz5Q-SGX_zlX5wKQNy_fBDBQ" alt=""><figcaption></figcaption></figure>

After executing `fetchRandomNumber()`, you can then query the value of the randomness variable within Remix. The screenshot below shows that the random `uint32` value is “`1345667621`.”

```
Decode output {
	"0": "uint32: 1345667621"
}
```

<figure><img src="https://lh3.googleusercontent.com/OSmsr1GqjtlrhWouD1Xvnes7nQqleLxHirGad5jfJqFaOqE8qORmQx4lfLO-FvQdq9TDl-w_KXfYjYF_ZDuiBkSqlD39bZ4TBK_9jtmqugUy94VV-yaUmiVmL8AA-lJQmoWezNIe9STV_IHW_FG7E5X8Msza85P00kC6OAEAo4SskBmkjQ-Gj30j2g" alt=""><figcaption></figcaption></figure>

![](https://lh6.googleusercontent.com/BYwhL506ZusNpz826P8p6aWu55nn-EIb3AnmXaFFaFtbQESwuhY4FwP44BeXZMmGQW27z1kZFnCZhtPxY08wCv7rM6dAErkLSSjuG3jwdtiOgjDG\_I8jkHxF8DnIrAC8AnkxvUP6yAM\_7Njeu0ivT3E-2vtddU6EbnqPIF462ggDelhwsWP8bttHdQ)

If you would like to generate another random number, you need to execute the same two steps again:

![](https://lh5.googleusercontent.com/DW1LJgzPinuOV0DWEYKOyE8GxGQeHWY3QvcW5x4m5j7fUa-m0MGSRtYsEA5Ui794XJd4x-fLC6X8peThAewaWWViOup1X-8WPuFejqK5tz4PYfNtjMbncd6eji-xBkYhZrTBfXxPQ8Mcvzx9RF3hCIs-xLlHv3JXeNGOsc7hz3E9VNeyOeyxwStH6Q)



As usual, you can review your transaction details on [CronoScan](https://cronoscan.com/)/[Testnet CronoScan](https://testnet.cronoscan.com/).



### Resources&#x20;

Here are several additional resources to help you get started with Witnet random number generation:

* [**Witnet Randomness Oracle Page**](https://docs.witnet.io/smart-contracts/witnet-randomness-oracle/randomness-contract#best-practices)
* [**WitnetRandomness Contract page**](https://docs.witnet.io/smart-contracts/witnet-randomness-oracle/randomness-contract)
* [**Witnet Solidity Bridge Contract**](https://github.com/witnet/witnet-solidity-bridge/tree/master/contracts)
* [**Witnet Discord Support**](https://discord.gg/X4uurfP)
