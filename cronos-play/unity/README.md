# Unity

### Pre-requisites

This SDK assumes that you have a basic understanding of Unity, ERC721 and EVM practices.

### Supported OS

This documentation currently supports WebGL, IOS and Android builds. Other platforms may work but there is no guarantee. We will extend our support to other platforms after we have stabilized our current architecture.

### Other Requirements

* **Mobile IDE**: If you want to test your Mobile Builds we recommend you to download a Mobile Development IDE with Device Simulation Capabilities such as Xcode.
* **DefiConnect**: [DefiConnect](https://chrome.google.com/webstore/detail/cryptocom-wallet-extensio/hifafgmccdpekplomjjkcfgodnhcellj) is required for the Login Example.
* **Assets**: Some of the scenes require assets to work properly. If you do not have any assets you can always use the Cronos Testnet and generate some ERC721 test assets. You can read more around integration methods [here](https://cronos.crypto.org/docs/resources/chain-integration.html#useful-links]).

#### Download and install Unity

You can refer to the [Unity Download Section](https://unity.com/download)

#### Unity Build Modules

Depending on your preferred build settings we recommend to install platform packages for `WebGL`, `IOS` and `Android` from your Unity build settings.

#### Chain Overview

You can use the following RPC methods. By default, we use the mainnet rpc method.

{% tabs %}
{% tab title="Mainnet" %}
* RPC Method: `https://evm-dev.cronos.org`
* Chain ID: **25**
{% endtab %}

{% tab title="Testnet" %}
* RPC Method: `https://evm-dev-t3.cronos.org`
* Chain ID: **338**
{% endtab %}
{% endtabs %}

### Import ChainSafe Package

#### Github

You can clone the following repository.

```bash
$ git clone git@github.com:ChainSafe/web3.unity.git
```

#### Releases

Or you can download the latest [releases](https://github.com/ChainSafe/web3.unity/releases)

#### Create a new Unity Project

Create a new project directly from your Unity Hub. In the next step Choose 3D as your project type.

![](../assets/getting-started/new-projects.png)

#### Upload web3.unity Folders into Project

Now you have to import the content of the cloned repository (web3.unity) directly into your newly created project assets folder.
