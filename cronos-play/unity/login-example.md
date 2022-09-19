# Login Example

This section will illustrate how to build the scenes to login and load a player's NFT assets.

{% hint style="info" %}
NOTE In order to use the Cronos Network, you will have to add the Network ID and Name in the network.js file in the `Assets/WebGLTemplates/Web3GL-2020x/` folder.
{% endhint %}

### Import NFT

To ensure that the NFT loads conditionally after successfully connecting to a wallet, you can update the `ImportNFTTextureCronos.cs` file with the content below.

<pre class="language-csharp"><code class="lang-csharp">using System.Collections;
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
<strong>        string network = "mainnet"; // mainnet or testnet
</strong>        string account = "WALLET_ADDRESS"; // PlayerPrefs.GetString("Account");
        string contract = "CONTRACT_ADDRESS";
        string tokenId = "TOKEN_ID";

        string ownerOf = await ERC721.OwnerOf(chain, network, contract, tokenId);

        if (ownerOf == account) 
        {
            // fetch uri from chain
            string uri = await ERC721.URI(chain, network, contract, tokenId);
            print("uri: " + uri);

            // fetch json from uri
            UnityWebRequest webRequest = UnityWebRequest.Get(uri);
            await webRequest.SendWebRequest();
            Response data = JsonUtility.FromJson&#x3C;Response>(System.Text.Encoding.UTF8.GetString(webRequest.downloadHandler.data));

            // parse json to get image uri
            string imageUri = data.image;
            print("imageUri: " + imageUri);

            // fetch image and display in game
            UnityWebRequest textureRequest = UnityWebRequestTexture.GetTexture(imageUri);
            await textureRequest.SendWebRequest();
            this.gameObject.GetComponent&#x3C;Renderer>().material.mainTexture = ((DownloadHandlerTexture)textureRequest.downloadHandler).texture;
        }
    }
}</code></pre>

{% hint style="warning" %}
If you are using IPFS please replace IPFS with an HTTPS call as seen below
{% endhint %}

**Replace IPFS**&#x20;

```csharp
if (uri.StartsWith("ipfs://"))
{
    uri = uri.Replace("ipfs://", "https://ipfs.io/ipfs/");
}
```

### Build the Scenes

To build the Game Login example, you need to go to `File/Build Settings` and select your WebGL, IOS or Androi Build Settings. In this example, we will build using the WebGL method. To build with the DefiWallet option, you will have to select the Cronos DefiWallet Template in the Player -> Resolution and Presentation settings

{% hint style="info" %}
NOTE Make sure to select the Cronos Defi Wallet Template in the Player -> Resolution and Presentation settings.
{% endhint %}

![](../assets/getting-started/cronos\_template.png) ![](../assets/getting-started/build\_settings.png)

On successful completion, you will be able to log in to your DefiConnect wallet. The scene will load any textures from NFT assets you own on successful login.
