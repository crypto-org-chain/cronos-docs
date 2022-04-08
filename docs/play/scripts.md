## Scripts

This section contains the different types of script that can be used in the Unity SDK. For additional operations and methods please refer to the [ChainSafe Documentation](https://chainsafe.github.io/game-docs/).

### Player Account

PlayerPrefs.GetString("Account") is the user's wallet account accessed after the LoginScene.

```csharp
string account = PlayerPrefs.GetString("Account");
print(account);
```

### EVM 

Get the current latest block number
```csharp
string chain = "cronos";
string network = "mainnet";
string rpc = "https://evm-dev.cronos.org";

int blockNumber = await EVM.BlockNumber(chain, network, rpc);
print(blockNumber);
```

Get the balance of the native blockchain
```csharp
string chain = "cronos";
string network = "mainnet";
string account = "ACCOUNT_ADDRESS";
string rpc = "https://evm-dev.cronos.org";

string balance = await EVM.BalanceOf(chain, network, account, rpc);
print(balance);
```

Verify a signed message.
```csharp
string message = "YOUR_MESSAGE";
string signature = "YOUR_SIGNATURE";

string address = await EVM.Verify(message, signature);
print(address);
```


Print Nonce.
```csharp
string chain = "cronos";
string network = "mainnet";
string account = "ACCOUNT_ADDRESS";
string rpc = "https://evm-dev.cronos.org";

string nonce = await EVM.Nonce(chain, network, account, rpc);
print(nonce);
```

### ERC721

Counts all NFTs assigned to an owner
```csharp
string chain = "cronos";
string network = "mainnet";
string contract = "CONTRACT_ADDRESS";
string account = "ACCOUNT_ADDRESS";
string rpc = "https://evm-dev.cronos.org";

int balance = await ERC721.BalanceOf(chain, network, contract, account, rpc);
print(balance);
```

Find the owner of a NFT.
```csharp
string chain = "cronos";
string network = "mainnet";
string contract = "CONTRACT_ADDRESS";
string tokenId = "TOKEN_ID";
string rpc = "https://evm-dev.cronos.org";

string ownerOf = await ERC721.OwnerOf(chain, network, contract, tokenId, rpc);
print(ownerOf);
```

Print URI.
```csharp
string chain = "cronos";
string network = "mainnet";
string contract = "CONTRACT_ADDRESS";
string tokenId = "TOKEN_ID";

string uri = await ERC721.URI(chain, network, contract, tokenId);
print(uri)

```

### Signatures

Sign through WebGL

```csharp
try {
  string message = "signature_message";
  string response = await Web3GL.Sign(message);
  Debug.Log(response);
} catch (Exception e) {
  Debug.LogException(e, this);
}
```
