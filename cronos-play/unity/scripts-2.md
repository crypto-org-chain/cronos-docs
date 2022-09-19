---
description: A standard interface for non-fungible tokens
---

# ERC721

This section contains the different types of ERC721 methods that can be used in the Unity SDK. For additional operations and methods please refer to the [ChainSafe Documentation.](https://docs.gaming.chainsafe.io/)

### Balance Of <a href="#balance-of" id="balance-of"></a>

Counts all ERC721 tokens assigned to an owner

```csharp
string chain = "cronos";
string network = "mainnet"; // mainnet or testnet
string contract = "CONTRACT_ADDRESS";
string account = "WALLET_ADDRESS";

int balance = await ERC721.BalanceOf(chain, network, contract, account);
print(balance);
```

### Owner Of <a href="#owner-of" id="owner-of"></a>

Find the owner of an ERC721 token

```csharp
string chain = "cronos";
string network = "mainnet"; // mainnet or testnet
string contract = "CONTRACT_ADDRESS";
string tokenId = "TOKEN_ID";

string ownerOf = await ERC721.OwnerOf(chain, network, contract, tokenId);
print(ownerOf);
```

### Owner Of Batch <a href="#owner-of-batch" id="owner-of-batch"></a>

Balance of batch will get the balance of a list of token ids

```csharp
string chain = "cronos";
string network = "mainnet"; // mainnet or testnet
string contract = "CONTRACT_ADDRESS";
string[] tokenIds = {"TOKEN_ID", "TOKEN_ID"};

List<string> batchOwners = await ERC721.OwnerOfBatch(chain, network, contract, tokenIds);
foreach (string owner in batchOwners)
{
  print ("OwnerOfBatch: " + owner);
}
```

### URI <a href="#uri_1" id="uri_1"></a>

Returns meta data about the token.

```csharp
string chain = "cronos";
string network = "mainnet"; // mainnet or testnet
string contract = "CONTRACT_ADDRESS";
string tokenId = "TOKEN_ID";

string uri = await ERC721.URI(chain, network, contract, tokenId);
print(uri)
```

### All 721s <a href="#all-721s" id="all-721s"></a>

Get all 721 tokens from an account

```csharp
string chain = "cronos";
string network = "mainnet"; // mainnet or testnet
string account = "WALLET_ADDRESS";
string contract = "";
int first = 500;
int skip = 0;
string response = await EVM.AllErc721(chain, network, account, contract, first, skip);
print(response);
```
