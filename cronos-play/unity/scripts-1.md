---
description: >-
  A standard interface for contracts that manage multiple token types. A single
  deployed contract may include any combination of fungible tokens, non-fungible
  tokens or other configurations
---

# ERC1155

This section contains the different types of ERC1155 methods that can be used in the Unity SDK. For additional operations and methods please refer to the [ChainSafe Documentation.](https://docs.gaming.chainsafe.io/)

### Balance Of <a href="#balance-of" id="balance-of"></a>

Counts all ERC1155 tokens assigned to an owner

<pre class="language-csharp"><code class="lang-csharp">string chain = "cronos";
<strong>string network = "mainnet"; // mainnet or testnet
</strong>string contract = "CONTRACT_ADDRESS";
string account = "WALLET_ADDRESS";
string tokenId = "TOKEN_ID";

BigInteger balanceOf = await ERC1155.BalanceOf(chain, network, contract, account, tokenId);
print(balanceOf);</code></pre>

### Balance Of Batch <a href="#balance-of-batch" id="balance-of-batch"></a>

Balance of batch will get the balance of a list of accounts and token ids

```csharp
string chain = "cronos";
string network = "mainnet"; // mainnet or testnet
string contract = "CONTRACT_ADDRESS";
string[] accounts = { "WALLET_ADDRESS", "WALLET_ADDRESS" };
string[] tokenIds = { "TOKEN_ID", "TOKEN_ID" };

List<BigInteger> batchBalances = await ERC1155.BalanceOfBatch(chain, network, contract, accounts, tokenIds);
foreach (var balance in batchBalances)
{
    print ("BalanceOfBatch: " + balance);
} 
```

### URI <a href="#uri" id="uri"></a>

Returns meta data about the token.

```csharp
string chain = "cronos";
string network = "mainnet"; // mainnet or testnet
string contract = "CONTRACT_ADDRESS";
string tokenId = "TOKEN_ID";

string uri = await ERC1155.URI(chain, network, contract, tokenId);
print(uri);
```

### All 1155s <a href="#all-1155s" id="all-1155s"></a>

Get all 1155 tokens from an account.

```csharp
string chain = "cronos";
string network = "mainnet"; // mainnet or testnet
string account = "WALLET_ADDRESS";
string contract = "CONTRACT_ADDRESS";
int first = 500;
int skip = 0;
string response = await EVM.AllErc1155(chain, network, account, contract, first, skip);
print(response);#
```
