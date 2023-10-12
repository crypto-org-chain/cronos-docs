# Moralis

## **Introduction**

Moralis helps leading cryptocurrency and blockchain companies like Metamask, Blockchain.com and Opera Crypto Wallet to grow and innovate faster with high quality, insightful data tools on Cronos, and on all other major EVM chains. By using Moralis, your team can focus on growing your product and your business while minimizing the time and money you spend on data infrastructure.

Moralis offers APIs and real-time data Streams for NFT data, Token data, Wallet data, Raw Blockchain data, as well as market insights and discovery data. 

## Getting Started

In order to use any of the Moralis APIs, you need to [register](https://admin.moralis.io/register?utm_source=cronos-docs) for a free Moralis account and get your API key. 

You will find your API key under your account settings.


## Moralis APIs

Below you'll find details about the different APIs that Moralis offers and some examples of the endpoints available.

## NFT API
The Moralis NFT API can be used quickly build NFT functionality in your wallet, portfolio application or to spin up an NFT marketplace. You can use it to fetch NFTs owned by particular wallets, or get NFT transfers and sales, or track prices of recent NFT sales.

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
