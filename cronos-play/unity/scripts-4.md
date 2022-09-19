---
description: A standard interface for custom RPC methods.
---

# Custom RPC

This section contains an introduction to custom methods that can be used in the Unity SDK. For additional operations and methods please refer to the [ChainSafe Documentation.](https://docs.gaming.chainsafe.io/)

### Example of Custom RPC <a href="#balance-of" id="balance-of"></a>

Connect to Cronos and any EVM compatible blockchain by providing an RPC. All methods have an optional field to add an RPC URL.

```csharp
string chain = "cronos";
string network = "mainnet"; // mainnet or testnet
string account = "WALLET_ADDRESS";
string rpc = "https://evm-dev.cronos.org"; // test: https://evm-dev-t3.cronos.org/

string balance = await EVM.BalanceOf(chain, network, account, rpc);
print(balance);
```

### Call Custom Contracts <a href="#call-custom-contracts" id="call-custom-contracts"></a>

Call will execute a smart contract method without altering the smart contract state.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract AddTotal {
    uint256 public myTotal = 0;

    function addTotal(uint8 _myArg) public {
        myTotal = myTotal + _myArg;
    }
}lid
```

```csharp
string chain = "cronos";
string network = "mainnet"; // mainnet or testnet
string method = "myTotal"; // smart contract method to call
string abi = "[ { \"inputs\": [ { \"internalType\": \"uint8\", \"name\": \"_myArg\", \"type\": \"uint8\" } ], \"name\": \"addTotal\", \"outputs\": [], \"stateMutability\": \"nonpayable\", \"type\": \"function\" }, { \"inputs\": [], \"name\": \"myTotal\", \"outputs\": [ { \"internalType\": \"uint256\", \"name\": \"\", \"type\": \"uint256\" } ], \"stateMutability\": \"view\", \"type\": \"function\" } ]";
string contract = "CONTRACT_ADDRESS";
string args = "[]";

string response = await EVM.Call(chain, network, contract, abi, method, args);
print(response);
```
