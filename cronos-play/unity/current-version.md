# Current Version

### Install via Package Manager With Open UPM

1. On the top bar in unity, navigate to `Window` -> `Package Manager` -> `Gear icon` -> `Advanced Project Settings`.&#x20;
2. Add a new scoped registry or edit the existing OpenUPM entry if it's already there.
3. Save the following details to the scope:

* **Name:** package.openupm.com
* **URL:** [https://package.openupm.com](https://package.openupm.com)
* **Scope:** io.chainsafe.web3-unity

<figure><img src="https://lh7-us.googleusercontent.com/bQqMFZANEZ9owaLn75YErsn7QJWCwK617ZyCB4aQI1YYWPIpkEjrWc_GBvlig70wgT7vlPKkBKOXzjWAXUjRkyMjW_YZiPSMk3WBp10byiYEaNS96Zzl0ww7QxFUcm3xldxaV86-Quo3vPQDomHP7uI" alt=""><figcaption></figcaption></figure>

4. Add a new package by name by pressing `+ ->` Add package by name `io.chainsafe.web3-unity` & `io.chainsafe.web3-unity.web3auth`.
5. Next go to the web3.unity SDK package and install the examples by going to the samples tab and pressing import.

{% hint style="info" %}
Please note that unity versions 2021 and below may require a restart if you experience assembly errors.
{% endhint %}

### Updating via The Package Manager

Updating the SDK is easy. Simply go to `window` -> `package manager` -> select the `ChainSafe SDK package` & `press update`. The same can be done for any additional packages you have installed, web3auth, loot boxes etc.

### Set Project ID

As the package is installed, you'll be prompted with the settings window. First of all you have to set up your `Project ID`. You can get one [here](https://dashboard.gaming.chainsafe.io/).

For more information on Project ID, see [Project ID Registration](https://docs.gaming.chainsafe.io/current/getting-started/#chainsafe-server-settings).

After you've completed the registration process, copy your `Project ID` into the project settings window. Save settings. You should see a message in the console saying your `Project ID` is valid.

{% hint style="info" %}
If the Settings do not appear, please restart the project and they should appear under the windows tab.
{% endhint %}

### Chain Settings

You need to set up default settings for the RPC node you're going to use for the Cronos chain.

{% tabs %}
{% tab title="Mainnet" %}
* Chain ID - 25
* Chain name - Cronos
* Network - Mainnet
* Symbol - CRO
* RPC - `https://evm-dev.cronos.org`
{% endtab %}

{% tab title="Testnet" %}
* Chain ID - 338
* Chain name - Cronos
* Network - Testnet
* Symbol - TCRO
* RPC: - `https://evm-t3.cronos.org`
{% endtab %}
{% endtabs %}

<figure><img src="https://lh7-us.googleusercontent.com/rDQE1oUlm9qKq9AbgXUGMIDeJUqY7jSfbDb_VtN0hxYU6dHSSIlrKy5Ekj5jizLjtJX-k3Rb77JgCh_-u6Dtwel6hDl50BTCHC1vrmn3DXzCoPw-zjZ_RXC4YJBSXF8BZSQlICWnEHG7vVqGf_0LXZk" alt=""><figcaption></figcaption></figure>

### Example Scene

If you navigate to Window -> Package Manager -> Web3Unity SDK -> Samples, you can import an example package to help you understand the SDK. Press import and let it load into the project. You'll see some new files in your project under samples, these files contain everything we need to get started with the SDK. Have a look around, check out the script and the scene locations.

<figure><img src="https://lh7-us.googleusercontent.com/eHW3_qMKqEUBEODQcWhQk8aVxDyoY4jPGGw-Y82AvOOEgDuUD-ZFDBTxm2OPSYK45_8_-gdFx5olbCnQl3l_iuW7H1W0BLzTpynMTJ6p4xdNy-x2nGBZ3VGu4WOnbliMZ_GT3cy5rguSsnZpAQT77wQ" alt=""><figcaption></figcaption></figure>

You'll notice when you import the samples into the project that some scenes are added to your build configuration. This is to show you a demo of how all the functions in the SDK work. Simply go to the sample log in scene and press play to connect a wallet to get started with some examples.

<figure><img src="https://lh7-us.googleusercontent.com/siQAcDRCYbODT3TXdq9L31424Vm6zhnWTTDWHtnYViOzdHz-9oe7dfE58VeIeKr7jU_uKhzkGJXR6oCK0lwxjM1Q4-mmu4pqCRc8ZOTnWy2l04evya7f0nbSb2xURlTYfsXi9YuVUESGaTNxMSuHnh4" alt=""><figcaption></figcaption></figure>

Once you've logged in it will take you to the main scene. You can play around in the menus and check out each script's functionality by pressing the show script button, this will highlight the script in the editor and allow you to inspect it further. If you're an advanced developer you should have enough to work with from the sample scripts in front of you. If you're just beginning we suggest you take a look at our easy to use prefabs below.

### &#x20;Cheat Sheet

{% hint style="info" %}
This is a Cheat Sheet which can be used as a shorthand reference for the new ways of accomplishing tasks with the SDK. Refer to this if you need help with the new code structure.
{% endhint %}

```csharp
async void Start()
{
    // Configure & build Web3 client using Web3Builder
    var projectConfig = ProjectConfigUtilities.Load();
    var web3 = await new Web3Builder(projectConfig).Configure(services =>
        {
            services.UseUnityEnvironment();
            services.UseRpcProvider();


            var config = new WalletConnectConfig
            {
                // Set wallet to testing
                Testing = true,
                TestWalletAddress = "YOUR_WALLET_ADDRESS",
            };


            services.UseWalletConnect(config);
            services.UseWalletConnectSigner();
            services.UseWalletConnectTransactionExecutor();


            // Add any contracts we would want to use
            services.ConfigureRegisteredContracts(contracts =>
                contracts.RegisterContract("CsTestErc20", ABI.Erc20, Contracts.Erc20));
        }).LaunchAsync();


    // Read from blockchain using RpcProvider
    var ethBalance = await web3.RpcProvider.GetBalance(
        address: "0xaBed4239E4855E120fDA34aDBEABDd2911626BA1");


    // Read player address & sign messages using Signer
    var playerAddress = await web3.Signer.GetAddress();
    var signedMessageHash = await web3.Signer.SignMessage("Hello web3!"); // todo check if it really returns hash


    // Write to blockchain using TransactionExecutor
    var transactionResponse = await web3.TransactionExecutor.SendTransaction(
        new TransactionRequest
        {
            To = "0xdD4c825203f97984e7867F11eeCc813A036089D1",
            Value = new HexBigInteger(12300000000000000),
        });
    
    // Build contract objects using ContractBuilder
    var shibaContract = web3.ContractBuilder.Build("shiba"); // preregistered contracts
    var customContract = web3.ContractBuilder.Build(
        contractAbiJson, 
        address: "0x7286Cf0F6E80014ea75Dbc25F545A3be90F4904F");
    
    // Read from contracts using Contract.Call()
    object[] response = await shibaContract.Call(EthMethod.BalanceOf, new object[] { playerAddress });
    
    // Write to contracts using Contract.Send()
    object[] response = await customContract.Send(method: "addTotal", new object[] { 1 });
    
    // Balance of custom coin ERC-20
    var tokenBalance = await ERC20.BalanceOf(
        web3,
        contractAddress: "0x3E0C0447e47d49195fbE329265E330643eB42e6f",
        account: "0xd25b827D92b0fd656A1c829933e9b0b836d5C3e2");
    
    // Balance of NFT ERC-721
    var contract721 = "0x9123541E259125657F03D7AD2A7D1a8Ec79375BA";
    var balance = await ERC721.BalanceOf(contract721, playerAddress);


    // Owner of NFT ERC-721
    var tokenId = "0x01559ae4021a565d5cc4740f1cefa95de8c1fb193949ecd32c337b03047da501";
    var ownerOf = await ERC721.OwnerOf(contract721, tokenId);
    
    // URI of NFT ERC-721
    var uri = await ERC721.URI(contract721, tokenId);
    
    // Balance of NFT ERC-1155
    var contract1155 = "0x2c1867bc3026178a47a677513746dcc6822a137a";
    var tokenId = "5";
    var balanceOf = await ERC1155.BalanceOf(contract1155, playerAddress, tokenId);
    
    // URI of NFT ERC-1155
    var uri = await ERC1155.URI(contract1155, tokenId);
}
```

### Configuration

For Additional configuration, please refer to the official Chainsafe Documentation [here](https://docs.gaming.chainsafe.io/current/getting-started).
