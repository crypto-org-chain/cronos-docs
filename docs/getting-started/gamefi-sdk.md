---
meta:
  - name: "title"
    content: Cronos | Crypto.org EVM Chain | GameFi SDK
  - name: "description"
    content: Learn how to Bridge Unity games to the Cronos EVM Chain. Create your in game NFTs.
  - name: "og:title"
    content: Cronos | Crypto.org EVM Chain | GameFi SDK
  - name: "og:type"
    content: Website
  - name: "og:description"
    content: Learn how to Bridge Unity games to the Cronos EVM Chain. Create your in game NFTs.
  - name: "og:image"
    content: https://cronos.crypto.org/og-image.png
  - name: "twitter:title"
    content: Cronos | Crypto.org EVM Chain | GameFi SDK
  - name: "twitter:site"
    content: "@cryptocom"
  - name: "twitter:card"
    content: summary_large_image
  - name: "twitter:description"
    content: Learn Learn how to Bridge Unity games to the Cronos EVM Chain. Create your in game NFTs.
  - name: "twitter:image"
    content: https://cronos.crypto.org/og-image.png
canonicalUrl: https://cronos.crypto.org/docs/getting-started/GameFi-sdk.html
---

# GameFi Unity SDK

This documentation demonstrates how to Bridge games to the Cronos EVM Chain, using Unity. The [ChainSafe Gaming SDK](https://github.com/ChainSafe/web3.unity/releases) assets are used for the Unity build.

## Pre-requisites
This SDK assumes that you have a basic understanding of Unity, ERC721 and EVM practices.

### Supported OS

This documentation currently supports WebGL, IOS and Android builds. Other platforms may work but there is no guarantee. We will extend our support to other platforms after we have stabilized our current architecture.

### Other Requirements
- **Mobile IDE**: If you want to test your Mobile Builds we recommend you to download a Mobile Development IDE with Device Simulation Capabilities such as Xcode. 
- **DefiConnect**: [DefiConnect](https://chrome.google.com/webstore/detail/cryptocom-wallet-extensio/hifafgmccdpekplomjjkcfgodnhcellj) is required for the Login Example below.
- **Assets**: Some of the scenes require assets to work properly. If you do not have any assets you can always use the Cronos Testnet and generate some ERC721 test assets. You can read more around integration methods [here](https://cronos.crypto.org/docs/resources/chain-integration.html#useful-links]).

### Download and install Unity

You can refer to the [Unity Download Section](https://unity.com/download)  

### Unity Build Modules
Depending on your preferred build settings we recommend to install platform packages for `WebGL`, `IOS` and `Android` from your Unity build settings.

### RPC Method
You can use the following RPC methods. By default, we use the mainnet rpc method.

- **Mainnet**: `https://evm-dev.cronos.org`

- **Testnet**: `https://evm-dev-t3.cronos.org`

## Step 1. Import web3.unity Assets

### Git clone `web3.unity.git`
You can clone the following repository.
```bash
$ git clone git@github.com:ChainSafe/web3.unity.git
```

### Releases
Or you can download the latest [releases](https://github.com/ChainSafe/web3.unity/releases)  

### Create a new Unity Project
Create a new project directly from your Unity Hub. In the next step Choose 3D as your project type.
<img src="./assets/gameFi/new_projects.png" />

### Upload web3.unity Folders into Project 
Now you have to import the content of the cloned repository (web3.unity) directly into your newly created project assets folder.

## Step 2. Connect to Cronos Assets
To connect your Cronos Assets to your Unity project, you can add the following scripts to your assets. For your scripts to work, you will need the create as well a prefab and link it to the asset as seen in the following image.

<img src="./assets/gameFi/prefab_scripts.png" />

### Get Cronos Balance
- Script Path: `Assets/Web3Unity/Scripts/Prefabs/EVM/EVMBalanceOfCronos.cs`
- Prefab Path: `Assets/Web3Unity/Prefabs/EVM/EVMBalanceOfCronos.prefab`

```csharp
using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class EVMBalanceOfCronos : MonoBehaviour
{
    async void Start()
    {
        string chain = "cronos";
        string network = "mainnet"; 
        string account = "ACCOUNT_ADDRESS";
        string rpc = "https://evm-dev.cronos.org";
        
        string balance = await EVM.BalanceOf(chain, network, account, rpc);
        print(balance);
    }
}
```
Drag the prefab into the sample scene and play in order to run the script. The balance should be printed below in the Unity output.

### Get NFT Balance
- Script Path: `Assets/Web3Unity/Scripts/Prefabs/ERC721/ERC721BalanceOfCronos.cs`
- Prefab Path: `Assets/Web3Unity/Prefabs/ERC721/ERC721BalanceOfCronos.prefab`

```csharp
using System.Collections;
using System.Numerics;
using System.Collections.Generic;
using UnityEngine;

public class ERC721BalanceOfCronos : MonoBehaviour
{
    async void Start()
    {
        string chain = "cronos";
        string network = "mainnet";
        string contract = "CONTRACT_ADDRESS";
        string account = "ACCOUNT_ADDRESS";
        string rpc = "https://evm-dev.cronos.org";

        int balance = await ERC721.BalanceOf(chain, network, contract, account, rpc);
        print(balance);
    }
}
```
Drag the prefab into the sample scene and play in order to run the script. The balance should be printed below in the Unity output.

### Get NFT Owner
- Script Path: `Assets/Web3Unity/Scripts/Prefabs/ERC721/ERC721OwnerOfCronos.cs`
- Prefab Path: `Assets/Web3Unity/Prefabs/ERC721/ERC721OwnerOfCronos.prefab`

```csharp
using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class ERC721OwnerOfCronos : MonoBehaviour
{
    async void Start()
    {
        string chain = "cronos";
        string network = "mainnet"; 
        string contract = "CONTRACT_ADDRESS";
        string tokenId = "TOKEN_ID";
        string rpc = "https://evm-dev.cronos.org";

        string ownerOf = await ERC721.OwnerOf(chain, network, contract, tokenId, rpc);
        print(ownerOf);
    }
}
```
Drag the prefab into the sample scene and play in order to run the script. The owner address of the asset should be printed below in the Unity output.

### Import NFT Metadata
You can test this script by creating a random 3D Quad object in the SampleScene and add the following script to it.

- Script Path: `Assets/Web3Unity/Scripts/Prefabs/ERC721/ImportNFTTextureCronos.cs`
- Prefab Path: `Assets/Web3Unity/Prefabs/ERC721/ImportNFTTextureCronos.prefab`

```csharp
using System.Collections;
using System.Collections.Generic;
using System.Threading.Tasks;
using UnityEngine;
using UnityEngine.Networking;

public class ImportNFTTextureCronos : MonoBehaviour
{
    public class Response {
        public string image;
    }

    async void Start()
    {
        string chain = "cronos";
        string network = "mainnet"; 
        string contract = "CONTRACT_ADDRESS";
        string tokenId = "TOKEN_ID";
        string rpc = "https://evm-dev.cronos.org";

        // fetch uri from chain
        string uri = await ERC721.URI(chain, network, contract, tokenId, rpc);
        print("uri: " + uri);

        // fetch json from uri
        UnityWebRequest webRequest = UnityWebRequest.Get(uri);
        await webRequest.SendWebRequest();
        Response data = JsonUtility.FromJson<Response>(System.Text.Encoding.UTF8.GetString(webRequest.downloadHandler.data));

        // parse json to get image uri
        string imageUri = data.image;
        print("imageUri: " + imageUri);

        // fetch image and display in game
        UnityWebRequest textureRequest = UnityWebRequestTexture.GetTexture(imageUri);
        await textureRequest.SendWebRequest();
        this.gameObject.GetComponent<Renderer>().material.mainTexture = ((DownloadHandlerTexture)textureRequest.downloadHandler).texture;
    }
}
```
Drag the prefab into the sample scene and play in order to run the script. The Quad should take the form of the image fetched form the NFT metadata.

## Step 3. Game Login Example
This section will illustrate how to build the scenes to login and load a player's NFT assets.

::: tip NOTE
  In order to use the Cronos Network, you will have to add the Network ID and Name in the network.js file in the `Assets/WebGLTemplates/Web3GL-2020x/` folder.
:::

### Load NFT on Login 
To ensure that the NFT loads conditionally after successfully connecting to a wallet, you can update the `ImportNFTTextureCronos.cs` file with the content below. 

- Script Path: `Assets/Web3Unity/Scripts/Prefabs/ERC721/ImportNFTTextureCronos.cs`

```csharp
using System.Collections;
using System.Collections.Generic;
using System.Threading.Tasks;
using UnityEngine;
using UnityEngine.Networking;

public class ImportNFTTextureCronos : MonoBehaviour
{
    public class Response {
        public string image;
    }

    async void Start()
    {
        string chain = "cronos";
        string network = "mainnet"; 
        string account = PlayerPrefs.GetString("Account");
        string contract = "CONTRACT_ADDRESS";
        string tokenId = "TOKEN_ID";
        string rpc = "https://evm-dev.cronos.org";

        string ownerOf = await ERC721.OwnerOf(chain, network, contract, tokenId, rpc);

        if (ownerOf == account) 
        {
            // fetch uri from chain
            string uri = await ERC721.URI(chain, network, contract, tokenId, rpc);
            print("uri: " + uri);

            // fetch json from uri
            UnityWebRequest webRequest = UnityWebRequest.Get(uri);
            await webRequest.SendWebRequest();
            Response data = JsonUtility.FromJson<Response>(System.Text.Encoding.UTF8.GetString(webRequest.downloadHandler.data));

            // parse json to get image uri
            string imageUri = data.image;
            print("imageUri: " + imageUri);

            // fetch image and display in game
            UnityWebRequest textureRequest = UnityWebRequestTexture.GetTexture(imageUri);
            await textureRequest.SendWebRequest();
            this.gameObject.GetComponent<Renderer>().material.mainTexture = ((DownloadHandlerTexture)textureRequest.downloadHandler).texture;
        }
    }
}
```
::: tip NOTE
  We are using `PlayerPrefs.GetString("Account")` to dynamically fetch the address when connecting to DefiConnect. You can replace this with the actual account address for testing purposes like so: `string account = "account_address"`
:::

### Build the Scenes
To build the Game Login example, you need to go to `File/Build Settings` and select your WebGL, IOS or Androi Build Settings. In this example, we will build using the WebGL method.

<img src="./assets/gameFi/build_settings.png" />

::: tip NOTE
  Make sure to select the right WebGL Template in the Player -> Resolution and Presentation settings.
:::

On successfull completion, you will be able to login to your DefiConnect wallet. On succesfull login, the scene will load any textures from NFT assets you own. 

## Scripts

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

## ChainSafe SDK
The underlying SDK for this documentation has been developed and curated by ChainSafe. For additional operations and methods please refer to the [ChainSafe Documentation](https://chainsafe.github.io/game-docs/)  .
