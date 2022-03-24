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
- Assets: Some of the scenes require assets to work properly. If you do not have any assets you can always use the Cronos Testnet and generate some ERC721 test assets. You can read more around integration methods [here](https://cronos.crypto.org/docs/resources/chain-integration.html#useful-links]).

### Download and install Unity

You can refer to the [Unity Download Section](https://unity.com/download)  

### Unity Build Modules
Depending on your preferred build settings we recommend to install platform packages for `WebGL`, `IOS` and `Android` from your Unity build settings.

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
- Script Path: `Assets/Web3Unity/Scripts/Prefabs/EVM/BalanceOfCronos.cs`
- Prefab Path: `Assets/Web3Unity/Prefabs/EVM/BalanceOfCronos.prefab`

```csharp
using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class BalanceOfCronos : MonoBehaviour
{
    async void Start()
    {
        string chain = "cronos";
        string network = "mainnet"; 
        string account = "ACCOUNT_ADDRESS";
        string rpc = "https://evm-cronos.crypto.org";

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
        string network = "Cronos Mainnet";
        string contract = "CONTRACT_ADDRESS";
        string account = "ACCOUNT_ADDRESS";
        string rpc = "https://evm-cronos.crypto.org";

        int balance = await ERC721.BalanceOf(chain, network, contract, account, rpc);
        print(balance);
    }
}
```
Drag the prefab into the sample scene and play in order to run the script. The balance should be printed below in the Unity output.

### Get NFT Owner
- Script Path: `Assets/Web3Unity/Scripts/Prefabs/ERC721/BalanceOfCronos.cs`
- Prefab Path: `Assets/Web3Unity/Prefabs/ERC721/BalanceOfCronos.prefab`

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
        string rpc = "https://evm-cronos.crypto.org";

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
        string rpc = "https://evm-cronos.crypto.org";

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
  In order to use the Cronos Network, you will have to add the Network ID and Name in the network.js file in the `Assets/WebGLTemplates/Web3GL-2020/` folder.
:::

### Load NFT on Login 
Firstly, lets create a new script. Instead of the prefab, we will create a Quad 3D object in the sample scene and add the script as a component to the Quad object.  

- Script Path: `Assets/Web3Unity/Scripts/Prefabs/ERC721/ImportNFTTextureCronos.cs`

```csharp
using System.Collections;
using System.Collections.Generic;
using System.Threading.Tasks;
using UnityEngine;
using UnityEngine.Networking;

public class LoadPlayerAssets : MonoBehaviour
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
        string rpc = "https://evm-cronos.crypto.org";

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
  We are using `PlayerPrefs.GetString("Account")` to dynamically fetch the address when connecting to Metamask. You can replace this with the actual account address for testing purposes like so: `string account = "account_address"`
:::

### Enable DefiConnect
To ensure that the Unity Game connects to the DefiConnect wallet, we'll have to replace the code in `assets/webGLTemplates/Web3GL-2020x/web3/index.js` with the following content.

:::tip Note
You need to replace `INFURA_API_KEY` with a key generated at [Infura](https://infura.io/) 
:::

```js
// load network.js to get network/chain id
document.body.appendChild(Object.assign(document.createElement("script"), { type: "text/javascript", src: "./network.js" }));
// load web3modal to connect to wallet
document.body.appendChild(Object.assign(document.createElement("script"), { type: "text/javascript", src: "./web3/lib/web3modal.js" }));
// load web3js to create transactions
document.body.appendChild(Object.assign(document.createElement("script"), { type: "text/javascript", src: "./web3/lib/web3.min.js" }));
// uncomment to enable torus wallet
document.body.appendChild(Object.assign(document.createElement("script"), { type: "text/javascript", src: "https://cdn.jsdelivr.net/npm/@deficonnect/web3-provider@1.6.13/dist/esm/index.min.js" }));
// uncomment to enable walletconnect
document.body.appendChild(Object.assign(document.createElement("script"), { type: "text/javascript", src: "https://unpkg.com/@walletconnect/web3-provider@1.2.1/dist/umd/index.min.js" }));
// Load defi connect
document.body.appendChild(Object.assign(document.createElement("script"), { type: "text/javascript", src: "./web3/lib/index.umd.js" }));

// load web3gl to connect to unity
window.web3gl = {
  networkId: 0,
  connect,
  connectAccount: "",
  signMessage,
  signMessageResponse: "",
  sendTransaction,
  sendTransactionResponse: "",
  sendContract,
  sendContractResponse: "",
};

// will be defined after connect()
let provider;
let connector;
let web3;

/*
paste this in inspector to connect to wallet:
window.web3gl.connect()
*/
async function connect() {
  // uncomment to enable torus and walletconnect
  const providerOptions = {
    walletconnect: {
       package: window.WalletConnectProvider.default,
       options: {
         infuraId: "INFURA_API_KEY",
       },
    },
    "custom-example": {
      display: {
        logo:
          "data:image/gif;base64,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",
        name: "Defi Wallet",
        description: "Connect to your Defi Wallet account"
      },
      package: window.DeFiConnect.DeFiWeb3Connector,
      options: {
        supportedChainIds: [1],
        rpc: {
          1: "https://mainnet.infura.io/v3/INFURA_API_KEY",
          25: "https://evm.cronos.org/" // cronos mainet
        },
        pollingInterval: 15000
      },
      connector: async (ProviderPackage, options) => {
          const connector = new ProviderPackage(options);
          await connector.activate();
          provider = await connector.getProvider() 
          return provider;
      }
    },
  };

  const web3Modal = new window.Web3Modal.default({
    providerOptions,
  });

  web3Modal.clearCachedProvider();

  // set provider
  provider = await web3Modal.connect();
  web3 = new Web3(provider);

  // set current network id
  web3gl.networkId = parseInt(provider.chainId);

  // if current network id is not equal to network id, then switch
  if (web3gl.networkId != window.web3ChainId) {
    try {
      await window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: `0x${window.web3ChainId.toString(16)}` }], // chainId must be in hexadecimal numbers
      });
    } catch {
      // if network isn't added, pop-up metamask to add
      await addEthereumChain();
    }
  }

  // set current account
  web3gl.connectAccount = (await web3.eth.getAccounts())[0]
  // or web3gl.connectAccount = (await provider.request({ method: 'eth_accounts' }))[0]

  // refresh page if player changes account
  provider.on("accountsChanged", (accounts) => {
    window.location.reload();
  });

  // update if player changes network
  provider.on("chainChanged", (chainId) => {
    web3gl.networkId = parseInt(chainId);
  });
}

/*
paste this in inspector to connect to sign message:
window.web3gl.signMessage("hello")
*/
async function signMessage(message) {
  try {
    const from = (await web3.eth.getAccounts())[0];
    const signature = await web3.eth.personal.sign(message, from, "");
    window.web3gl.signMessageResponse = signature;
  } catch (error) {
    window.web3gl.signMessageResponse = error.message;
  }
}

/*
paste this in inspector to send eth:
const to = "0xdD4c825203f97984e7867F11eeCc813A036089D1"
const value = "12300000000000000"
const gasLimit = "21000" // gas limit
const gasPrice = "33333333333"
window.web3gl.sendTransaction(to, value, gasLimit, gasPrice);
*/
async function sendTransaction(to, value, gasLimit, gasPrice) {
  const from = (await web3.eth.getAccounts())[0];
  web3.eth
    .sendTransaction({
      from,
      to,
      value,
      gas: gasLimit ? gasLimit : undefined,
      gasPrice: gasPrice ? gasPrice : undefined,
    })
    .on("transactionHash", (transactionHash) => {
      window.web3gl.sendTransactionResponse = transactionHash;
    })
    .on("error", (error) => {
      window.web3gl.sendTransactionResponse = error.message;
    });
}

/*
paste this in inspector to connect to interact with contract:
const method = "increment"
const abi = `[ { "inputs": [], "name": "increment", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "x", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "stateMutability": "view", "type": "function" } ]`;
const contract = "0xB6B8bB1e16A6F73f7078108538979336B9B7341C"
const args = "[]"
const value = "0"
const gasLimit = "222222" // gas limit
const gasPrice = "333333333333"
window.web3gl.sendContract(method, abi, contract, args, value, gasLimit, gasPrice)
*/
async function sendContract(method, abi, contract, args, value, gasLimit, gasPrice) {
  const from = (await web3.eth.getAccounts())[0];
  new web3.eth.Contract(JSON.parse(abi), contract).methods[method](...JSON.parse(args))
    .send({
      from,
      value,
      gas: gasLimit ? gasLimit : undefined,
      gasPrice: gasPrice ? gasPrice : undefined,
    })
    .on("transactionHash", (transactionHash) => {
      window.web3gl.sendContractResponse = transactionHash;
    })
    .on("error", (error) => {
      window.web3gl.sendContractResponse = error.message;
    });
}

// add new wallet to in metamask
async function addEthereumChain() {
  const account = (await web3.eth.getAccounts())[0];

  // fetch https://chainid.network/chains.json
  const response = await fetch("https://chainid.network/chains.json");
  const chains = await response.json();

  // find chain with network id
  const chain = chains.find((chain) => chain.chainId == window.web3ChainId);

  const params = {
    chainId: "0x" + chain.chainId.toString(16), // A 0x-prefixed hexadecimal string
    chainName: chain.name,
    nativeCurrency: {
      name: chain.nativeCurrency.name,
      symbol: chain.nativeCurrency.symbol, // 2-6 characters long
      decimals: chain.nativeCurrency.decimals,
    },
    rpcUrls: chain.rpc,
    blockExplorerUrls: [chain.explorers && chain.explorers.length > 0 && chain.explorers[0].url ? chain.explorers[0].url : chain.infoURL],
  };

  await window.ethereum
    .request({
      method: "wallet_addEthereumChain",
      params: [params, account],
    })
    .catch(() => {
      // I give up
      window.location.reload();
    });
}
```

### Build the Scenes
To build the Game Login example, you need to go to `File/Build Settings` and select your WebGL, IOS or Androi Build Settings. In this example, we will build using the WebGL method.

<img src="./assets/gameFi/build_settings.png" />

::: tip NOTE
  Make sure to select the right WebGL Template in the Player -> Resolution and Presentation settings.
:::

On successfull completion, you will be able to login to your Metamask wallet. On succesfull login, the scene will load any textures from NFT assets you own. 

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
string rpc = "https://evm-cronos.crypto.org";

int blockNumber = await EVM.BlockNumber(chain, network, rpc);
print(blockNumber);
```

Get the balance of the native blockchain
```csharp
string chain = "cronos";
string network = "mainnet";
string account = "ACCOUNT_ADDRESS";
string rpc = "https://evm-cronos.crypto.org";

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
string rpc = "https://evm-cronos.crypto.org";

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
string rpc = "https://evm-cronos.crypto.org";

int balance = await ERC721.BalanceOf(chain, network, contract, account, rpc);
print(balance);
```

Find the owner of a NFT.
```csharp
string chain = "cronos";
string network = "mainnet";
string contract = "CONTRACT_ADDRESS";
string tokenId = "TOKEN_ID";
string rpc = "https://evm-cronos.crypto.org";

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
