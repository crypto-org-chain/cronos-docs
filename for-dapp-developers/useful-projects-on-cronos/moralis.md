# Moralis

## **Introduction**

Moralis provides the full-stack workflow for building high-performance Dapps, which is now integrated with Cronos Chain. It serves as one of the leading platforms for Web3 development that Web3 developers can simplify their workflow by accessing the Moralis developer tools on the Cronos chain, including high-performance JSON-RPC endpoints, NFT data indexers, and other advanced functionalities. Cronos integration is available for Moralis Identity, Moralis Real-Time, Moralis API and Moralis SDK.&#x20;

Building Cronos Dapp with Moralis includes three main steps, which are setting up Moralis Server and building the login component as well as Dashboard. Below provides a brief introduction of components and functions for Cronos Dapp building with Moralis. Developers interested in exploring the full details can refer to [Moralis official doc](https://docs.moralis.io/moralis-dapp/web3-api) and [Moralis Dapp building guide](https://moralis.io/how-to-build-a-cronos-dapp/).

## Moralis Server

Developers need to have an account with Moralis to get started.&#x20;

In the main dashboard go to “Create New Dapp” and select Cronos Testnet or Cronos mainnet for launching your Dapp on the Cronos chain.

![](https://lh5.googleusercontent.com/7oIaGeTNe80fuhymIeCuPRIg-uoSS9bI3OO2VLGWZi3hOIyPfc2Dmc7i48vRbkcuLHSxZrMMpFauaMmRtByIbX0xWlSp020-zodS-r0ZpFGMqUlyjszH6Td0IbqGpePIzk7MKB1F7SGSD7ZnpJf0DP4)

![](https://lh4.googleusercontent.com/A5vDJU3yd7sFEVHpMtVVML2j4vFSst-GliJ9r-KJsuEhaKb\_jj2tf58oLR-4N403oL2RHo9T7gRah-gzYQ5ARtHuUarfSF-v2432IiRaXL6md3HslVWQF0u0f-PpM\_7Uj1zmsJL0HP-xVf3wJDKpEfg)

## **Functions and Components**

### **Login Component:**

To install the SDK, add the following to the HTML file for the login component:

```
<script src="https://cdn.jsdelivr.net/npm/web3@latest/dist/web3.min.js"></script>
<script src=”https://unpkg.com/moralis/dist/moralis.js"></script>
```

To initialize Moralis, input the following into the file where you have JavaScript logic to make the elements interactive and add your server URL and application ID:

```
const serverUrl = "YOUR_SERVER_URL"; 
const appId = "YOUR_APP_ID";
```

For authenticating logic, this function allows users to authenticate themselves and saves the details being used to sign the message. The function also redirects the users to the dashboard page.

```
login = async () => {
    Moralis.authenticate().then(async function (user) {
        console.log(user.get(’logged in’))
        user.set(”name”, document.getElementById(’user-username’).value)
        user.set(”email”, document.getElementById(’user-email’).value)
        await user.save();
        window.location.href = ”dashboard.html”; 
    })
}
```



### **`Functions`**`:`

Users can see their transaction history, assets details and other elements you set to display on the dashboard. Some of the common Moralis functions are as follows.

#### _**`getBalances()`**_

It is used to fetch data regarding users’ balances, then you can feed the data to your Dapp.

```
getBalances = async () => {
  console.log('Get balances clicked');
  const ethBalance = await Moralis.Web3API.account.getNativeBalance();
}
```

#### _**`getTransactions()`**_

[Moralis API](https://docs.moralis.io/moralis-dapp/web3-api) allows fetching the transaction history of a particular Web3 wallet easily. It can return an object with the number of transactions and the array of native transactions (asynchronous).

```
getTransactions = async () => {
  const options = {chain: "…", address: "0x…" };
  const transactions = await Moralis.Web3API.account.getTransactions(options);
  console.log(transactions);
} 
```

#### _`getNFTs()`_

With Moralis’ NFT API, developers can fetch a user’s NFT balance easily. This function fetches all of the current user’s NFTs and supposes both ERC721 and ERC1155. The next is to loop through each token and fetch the metadata.

```
getNFTs = async () => {
  console.log('get nfts clicked');
  let nfts = await Moralis.Web3API.account.getNFTs({ chain: '…' });
  console.log(nfts); 
}
```

#### _`logout()`_

It logs out from the account and redirects the users to the login component.

```
logout = async () => {
    Moralis.User.logOut();
    window.location.href = <dashboard file>;
}
```



### **Resources**

Here are additional resources to help you get started with the Moralis:

* [Introduction and how to get started with Moralis on Cronos](https://www.youtube.com/watch?v=TE7Pkx\_z5m4)
* [Buy NFT Outfits Game Programming Demo](https://youtu.be/nxezdsQT1Mk)
* [Dapp building Tutorial](https://youtu.be/jdx2H1alijQ)
* [Moralis Account Login](https://admin.moralis.io/login)
* [Moralis Web3 Tutorial](https://youtu.be/txHnWDRB728)
* [Adding Moralis to Your Unity Game](https://docs.moralis.io/moralis-dapp/connect-the-sdk/connect-with-unity)
* [Unity Integration on Cronos](https://docs.cronos.org/cronos-play/unity)
