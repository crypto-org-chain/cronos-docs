---
description: A standard interface for EVM methods
---

# EVM

This section contains the different types of EVM methods that can be used in the Unity SDK. For additional operations and methods please refer to the [ChainSafe Documentation.](https://docs.gaming.chainsafe.io/)

### Player Account

PlayerPrefs.GetString("Account") is the user's wallet account accessed after the LoginScene.

```csharp
string account = PlayerPrefs.GetString("Account");
print(account);
```

{% hint style="info" %}
Important: If you run your script from the editor, you will have to hardcode the account string (e.g. "0x6e...")
{% endhint %}

### Block number <a href="#block-number" id="block-number"></a>

Get the current latest block number

```csharp
string chain = "cronos";
string network = "mainnet"; // mainnet or testnet

int blockNumber = await EVM.BlockNumber(chain, network);
print(blockNumber); Some code
```

### Balance Of <a href="#balance-of" id="balance-of"></a>

Get the balance of the native blockchain

```csharp
string chain = "cronos";
string network = "mainnet"; // mainnet or testnet
string account = "WALLET_ADDRESS";

string balance = await EVM.BalanceOf(chain, network, account, rpc);
print(balance);
```

### Verify <a href="#verify" id="verify"></a>

Verify a signed message.

```csharp
string message = "YOUR_MESSAGE";
string signature = "YOUR_SIGNATURE";

string address = await EVM.Verify(message, signature);
print(address);
```

### Nonce <a href="#nonce" id="nonce"></a>

Print Nonce.

```csharp
string chain = "cronos";
string network = "mainnet"; // mainnet or testnet
string account = "WALLET_ADDRESS";
string rpc = "https://evm-dev.cronos.org";

string nonce = await EVM.Nonce(chain, network, account, rpc);
print(nonce);
```

### Convert WEI to CRO and CRO to WEI <a href="#convert-wei-to-eth-and-eth-to-wei" id="convert-wei-to-eth-and-eth-to-wei"></a>

Converts WEI values

```csharp
float cro = float.Parse("0.1");
float decimals = 1000000000000000000; // 18 decimals
float wei = cro * decimals;
print(Convert.ToDecimal(wei).ToString());

float wei = float.Parse("10123755");
float decimals = 1000000000000000000; // 18 decimals
float cro = wei / decimals;
print(Convert.ToDecimal(cro).ToString());
```
