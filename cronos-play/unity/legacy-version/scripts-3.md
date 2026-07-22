---
description: A standard interface for tokens.
---

# ERC20

This section contains the different types of ERC20 methods that can be used in the Unity SDK. For additional operations and methods please refer to the [ChainSafe Documentation.](https://docs.gaming.chainsafe.io/)

### Balance Of <a href="#balance-of" id="balance-of"></a>

Counts all ERC721 tokens assigned to an owner

```csharp
string chain = "cronos";
string network = "mainnet"; // mainnet or testnet
string contract = "CONTRACT_ADDRESS";
string account = "WALLET_ADDRESS";

BigInteger balanceOf = await ERC20.BalanceOf(chain, network, contract, account);
print(balanceOf);
```

### Name <a href="#name" id="name"></a>

Returns the name of the token.&#x20;

```csharp
string chain = "cronos";
string network = "mainnet"; // mainnet or testnet
string contract = "CONTRACT_ADDRESS";

string name = await ERC20.Name(chain, network, contract);
print(name);
```

### Symbol <a href="#symbol" id="symbol"></a>

Returns the symbol of the token

```csharp
string chain = "cronos";
string network = "mainnet"; // mainnet or testnet
string contract = "CONTRACT_ADDRESS";

string symbol = await ERC20.Symbol(chain, network, contract);
print(symbol);
```

### Decimals <a href="#decimals" id="decimals"></a>

Returns the number of decimals the token uses - e.g. 8, means to divide the token amount by 100000000 to get its user representation.

```csharp
string chain = "cronos";
string network = "mainnet"; // mainnet or testnet
string contract = "CONTRACT_ADDRESS";

BigInteger decimals = await ERC20.Decimals(chain, network, contract);
print(decimals);
```

### Total Supply <a href="#total-supply" id="total-supply"></a>

Returns the total token supply.

```csharp
string chain = "cronos";
string network = "mainnet"; // mainnet or testnet
string contract = "CONTRACT_ADDRESS";

BigInteger totalSupply = await ERC20.TotalSupply(chain, network, contract);
print(totalSupply);
```
