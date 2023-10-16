# Moralis

## **Introduction**

Moralis helps leading cryptocurrency and blockchain companies like MetaMask, Blockchain.com and Opera Crypto Wallet to grow and innovate faster with high quality, insightful data tools on Cronos, and on all other major EVM chains. By using Moralis, your team can focus on growing your product and your business while minimizing the time and money you spend on data infrastructure.

Moralis offers APIs and real-time data Streams for NFT data, token data, wallet data, raw blockchain data, as well as market insights and discovery data. 

## Getting Started

In order to use any of the Moralis APIs, you need to [register](https://admin.moralis.io/register?utm_source=cronos-docs) for a free Moralis account and get your API key. 

You will find your API key under your account settings.


## Moralis APIs

Below you'll find details about the different APIs that Moralis offers and some examples of the endpoints available.

### NFT API
The Moralis [NFT API](https://moralis.io/api/nft/) can be used to quickly build NFT functionality in your wallet, portfolio application or to spin up an NFT marketplace. You can use it to fetch NFTs owned by particular wallets, or get NFT transfers and sales, or track prices of recent NFT sales.

The NFT API automatically indexes all NFTs and metadata across all available chains.  

#### Endpoints
- [Get Multiple NFTs](https://docs.moralis.io/web3-data-api/evm/reference/get-multiple-nfts)
- [Get NFTs by Wallet](https://docs.moralis.io/web3-data-api/evm/reference/get-wallet-nfts)
- [Get NFTs by Contract](https://docs.moralis.io/web3-data-api/evm/reference/get-contract-nfts)
- [Get NFT Metadata](https://docs.moralis.io/web3-data-api/evm/reference/get-nft-metadata)
- [Get NFT Transfers by Wallet](https://docs.moralis.io/web3-data-api/evm/reference/get-wallet-nft-transfers)
- [Get NFT Transfers by Contract](https://docs.moralis.io/web3-data-api/evm/reference/get-nft-contract-transfers)
- [Get NFT Transfers in a block](https://docs.moralis.io/web3-data-api/evm/reference/get-nft-transfers-by-block)
- [Get NFT Transfers in a block range](https://docs.moralis.io/web3-data-api/evm/reference/get-nft-transfers-from-to-block)
- [Get NFT Transfer by Token ID](https://docs.moralis.io/web3-data-api/evm/reference/get-nft-transfers)
- [Get NFT Collections by Wallet](https://docs.moralis.io/web3-data-api/evm/reference/get-wallet-nft-collections)
- [Get NFT Collection Metadata](https://docs.moralis.io/web3-data-api/evm/reference/get-nft-contract-metadata)
- [Get NFT Owners by Contract](https://docs.moralis.io/web3-data-api/evm/reference/get-nft-owners)
- [Get NFT Owners by Token ID](https://docs.moralis.io/web3-data-api/evm/reference/get-nft-token-id-owners)
- [Get NFT Trades by Marketplace](https://docs.moralis.io/web3-data-api/evm/reference/get-nft-trades)
- [Get NFT Lowest Price](https://docs.moralis.io/web3-data-api/evm/reference/get-nft-lowest-price)
- [Get NFT Stats](https://docs.moralis.io/web3-data-api/evm/reference/get-nft-token-stats)
- [Get NFT Collection Stats](https://docs.moralis.io/web3-data-api/evm/reference/get-nft-collection-stats)

#### Example call
Below is an example where we call the Get NFTs by Wallet endpoint ( `{wallet_address}/nft`) with the Moralis JS SDK.

```js
  const response = await Moralis.EvmApi.nft.getWalletNFTs({
    "chain": "0x1",
    "format": "decimal",
    "mediaItems": false,
    "address": "0x1f9090aaE28b8a3dCeaDf281B0F12828e676c326"
  });
```
```json
{
  "page": 1,
  "page_size": 100,
  "cursor": null,
  "result": [
    {
      "token_address": "0xbd3531da5cf5857e7cfaa92426877b022e612cf8",
      "token_id": "8165",
      "owner_of": "0x3e18e3987b3b73f4e7cb80e2b25776df7a30bb8b",
      "block_number": "18333219",
      "block_number_minted": "12878275",
      "token_hash": "f7d53f87dc31367e148b2ec957cb585b",
      "amount": "1",
      "possible_spam": false,
      "contract_type": "ERC721",
      "name": "PudgyPenguins",
      "symbol": "PPG",
      "token_uri": "https://ipfs.moralis.io:2053/ipfs/bafybeibc5sgo2plmjkq2tzmhrn54bk3crhnc23zd2msg4ea7a4pxrkgfna/8165",
      "metadata": "{\"attributes\":[{\"trait_type\":\"Background\",\"value\":\"Tangerine\"},{\"trait_type\":\"Skin\",\"value\":\"Normal\"},{\"trait_type\":\"Body\",\"value\":\"Kimono Orange\"},{\"trait_type\":\"Face\",\"value\":\"Squad\"},{\"trait_type\":\"Head\",\"value\":\"Cowboy Hat\"}],\"description\":\"A collection 8888 Cute Chubby Pudgy Penquins sliding around on the freezing ETH blockchain.\",\"image\":\"ipfs://QmNf1UsmdGaMbpatQ6toXSkzDpizaGmC9zfunCyoz1enD5/penguin/8165.png\",\"name\":\"Pudgy Penguin #8165\"}",
      "last_token_uri_sync": "2023-09-26T22:39:34.136Z",
      "last_metadata_sync": "2023-10-13T10:22:08.029Z",
      "minter_address": "0xbff79922fcbf93f9c30abb22322b271460c6bebb",
      "normalized_metadata": {
        "name": "Pudgy Penguin #8165",
        "description": "A collection 8888 Cute Chubby Pudgy Penquins sliding around on the freezing ETH blockchain.",
        "animation_url": null,
        "external_link": null,
        "image": "ipfs://QmNf1UsmdGaMbpatQ6toXSkzDpizaGmC9zfunCyoz1enD5/penguin/8165.png",
        "attributes": [
          {
            "trait_type": "Background",
            "value": "Tangerine",
            "display_type": null,
            "max_value": null,
            "trait_count": 0,
            "order": null
          },
          {
            "trait_type": "Skin",
            "value": "Normal",
            "display_type": null,
            "max_value": null,
            "trait_count": 0,
            "order": null
          },
          {
            "trait_type": "Body",
            "value": "Kimono Orange",
            "display_type": null,
            "max_value": null,
            "trait_count": 0,
            "order": null
          },
          {
            "trait_type": "Face",
            "value": "Squad",
            "display_type": null,
            "max_value": null,
            "trait_count": 0,
            "order": null
          },
          {
            "trait_type": "Head",
            "value": "Cowboy Hat",
            "display_type": null,
            "max_value": null,
            "trait_count": 0,
            "order": null
          }
        ]
      },
      "media": {
        "mimetype": "image/png",
        "parent_hash": "0x9b326b3d983984f6cfc60a88d16ed3ed5774cc12f230c753509cf2e34485685d",
        "status": "success",
        "updatedAt": "2023-10-13T10:22:07.684Z",
        "media_collection": {
          "low": {
            "height": 100,
            "width": 100,
            "url": "https://nft-preview-media.s3.us-east-1.amazonaws.com/evm/0x1/0xbd3531da5cf5857e7cfaa92426877b022e612cf8/0x96a9919f09d1df24d87658f4a8962c297587e2d4aab98e551081023b86c9d463/low.png"
          },
          "medium": {
            "height": 250,
            "width": 250,
            "url": "https://nft-preview-media.s3.us-east-1.amazonaws.com/evm/0x1/0xbd3531da5cf5857e7cfaa92426877b022e612cf8/0x96a9919f09d1df24d87658f4a8962c297587e2d4aab98e551081023b86c9d463/medium.png"
          },
          "high": {
            "height": 500,
            "width": 500,
            "url": "https://nft-preview-media.s3.us-east-1.amazonaws.com/evm/0x1/0xbd3531da5cf5857e7cfaa92426877b022e612cf8/0x96a9919f09d1df24d87658f4a8962c297587e2d4aab98e551081023b86c9d463/high.png"
          }
        },
        "original_media_url": "ipfs://QmNf1UsmdGaMbpatQ6toXSkzDpizaGmC9zfunCyoz1enD5/penguin/8165.png"
      },
      "verified_collection": true
    }
  ],
  "status": "SYNCED"
}
```

### Token API
The Moralis [Token API](https://moralis.io/api/token/?utm_source=cronos-docs) has all the information you need about ERC20 tokens, including ownership, transfers and token prices. Use it to add ERC20 support in your wallet or enrich your token pages with in-depth token metadata.

The Token API includes token logos and spam detection.

#### Endpoints
- [Get ERC20 Token Balance By Wallet](https://docs.moralis.io/web3-data-api/evm/reference/get-token-balances-by-wallet)
- [Get ERC20 Metadata by Contract](https://docs.moralis.io/web3-data-api/evm/reference/get-token-metadata)
- [Get ERC20 Metadata by Symbol](https://docs.moralis.io/web3-data-api/evm/reference/get-token-metadata-by-symbol)
- [Get ERC20 Token Prices](https://docs.moralis.io/web3-data-api/evm/reference/get-multiple-token-prices)
- [Get ERC20 Token Allowance](https://docs.moralis.io/web3-data-api/evm/reference/get-token-allowance)
- [Get ERC20 Token Transfers By Wallet](https://docs.moralis.io/web3-data-api/evm/reference/get-wallet-token-transfers)
- [Get ERC20 Token Transfers By Contract](https://docs.moralis.io/web3-data-api/evm/reference/get-token-transfers)
- [Get DEX Token Pair Reserves](https://docs.moralis.io/web3-data-api/evm/reference/get-pair-reserves)
- [Get DEX Token Pair Address](https://docs.moralis.io/web3-data-api/evm/reference/get-pair-address)
- [Get ERC20 Token Stats](https://docs.moralis.io/web3-data-api/evm/reference/get-token-stats)

#### Example call
```js
  const response = await Moralis.EvmApi.token.getWalletTokenBalances({
    "chain": "0x1",
    "address": "0x1f9090aaE28b8a3dCeaDf281B0F12828e676c326"
  });
```

```json
{
  "token_address": "0x2d30ca6f024dbc1307ac8a1a44ca27de6f797ec22ef20627a1307243b0ab7d09",
  "name": "Kylin Network",
  "symbol": "KYL",
  "logo": "https://cdn.moralis.io/eth/0x67b6d479c7bb412c54e03dca8e1bc6740ce6b99c.png",
  "thumbnail": "https://cdn.moralis.io/eth/0x67b6d479c7bb412c54e03dca8e1bc6740ce6b99c_thumb.png",
  "decimals": "",
  "balance": "123456789",
  "possible_spam": false,
  "verified_collection": false
}
```

### Market Data API
The Moralis [Market Data API](https://moralis.io/api/market-data/?utm_source=cronos-docs) helps you retrieve top coins and NFT collection based on market cap and trading volume. You can use it to build market discovery pages, coin listing pages or displaying winners and losers.

#### Endpoints
- [Get the top ERC20 tokens by market cap](https://docs.moralis.io/web3-data-api/evm/reference/get-top-erc20-tokens-by-market-cap)
- [Get the top ERC20 tokens by price change](https://docs.moralis.io/web3-data-api/evm/reference/get-top-erc20-tokens-by-price-movers)
- [Get the top NFT collections by market cap](https://docs.moralis.io/web3-data-api/evm/reference/get-top-nft-collections-by-market-cap)
- [Get the top NFT collections by trading volume](https://docs.moralis.io/web3-data-api/evm/reference/get-top-nft-collections-by-trading-volume)

#### Example call
```js
const response = await Moralis.EvmApi.marketData.getTopERC20TokensByMarketCap({});
```

```json
[
  {
    "rank": "1",
    "token_name": "Wrapped Ether",
    "token_symbol": "WETH",
    "token_logo": "https://cdn.moralis.io/eth/0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2.png",
    "token_decimals": "18",
    "contract_address": "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
    "price_usd": "0.0285",
    "price_24h_percent_change": "0.0285",
    "price_7d_percent_change": "0.0285",
    "market_cap_usd": "0.0285"
  }
]
```

### Blockchain API
Using the Moralis [Blockchain API](https://moralis.io/api/block/?utm_source=cronos-docs) you can fetch basic data about blocks, transactions, logs and events. The Blockchain API also supports transaction decoding, which automtically decodes the transaction logs for you, without submitting any ABIs. 

#### Endpoints
- [Get Block by Block number or Block Hash](https://docs.moralis.io/web3-data-api/evm/reference/get-block)
- [Get Block by Date](https://docs.moralis.io/web3-data-api/evm/reference/get-date-to-block)
- [Get Transaction by Transaction Hash](https://docs.moralis.io/web3-data-api/evm/reference/get-transaction)
- [Get Native Transactions by Wallet](https://docs.moralis.io/web3-data-api/evm/reference/get-wallet-transactions)
- [Get Decoded Transactions by Transaction Hash](https://docs.moralis.io/web3-data-api/evm/reference/get-decoded-transaction) 
- [Get Decoded Transactions by Wallet](https://docs.moralis.io/web3-data-api/evm/reference/get-decoded-wallet-transaction)
- [Get Internal Transactions by Transaction Hash](https://docs.moralis.io/web3-data-api/evm/reference/get-internal-transactions)
- [Get Logs by Contract](https://docs.moralis.io/web3-data-api/evm/reference/get-contract-logs)
- [Get Events by Contract](https://docs.moralis.io/web3-data-api/evm/reference/get-contract-events)
- [Get Block Stats](https://docs.moralis.io/web3-data-api/evm/reference/get-block-stats)



#### Example call
```js
  const response = await Moralis.EvmApi.transaction.getTransactionVerbose({
    "chain": "0x1",
    "transactionHash": "0x012b9b98e21664117ec0b499d726a39f492ac8bd402cca8bebcbd163b9f75760"
  });
```

```json
{
  "hash": "0x1ed85b3757a6d31d01a4d6677fc52fd3911d649a0af21fe5ca3f886b153773ed",
  "nonce": "1848059",
  "transaction_index": "108",
  "from_address": "0x267be1c1d684f78cb4f6a176c4911b741e4ffdc0",
  "to_address": "0x003dde3494f30d861d063232c6a8c04394b686ff",
  "from_address_label": "Binance 1",
  "to_address_label": "Binance 2",
  "value": "115580000000000000",
  "gas": "30000",
  "gas_price": "52500000000",
  "input": "0x",
  "receipt_cumulative_gas_used": "4923073",
  "receipt_gas_used": "21000",
  "receipt_status": "1",
  "block_timestamp": "2021-05-07T11:08:35.000Z",
  "block_number": "12386788",
  "block_hash": "0x9b559aef7ea858608c2e554246fe4a24287e7aeeb976848df2b9a2531f4b9171",
  "logs": {
    "log_index": "273",
    "transaction_hash": "0xdd9006489e46670e0e85d1fb88823099e7f596b08aeaac023e9da0851f26fdd5",
    "transaction_index": "204",
    "address": "0x3105d328c66d8d55092358cf595d54608178e9b5",
    "data": "0x00000000000000000000000000000000000000000000000de05239bccd4d537400000000000000000000000000024dbc80a9f80e3d5fc0a0ee30e2693781a443",
    "topic0": "0x2caecd17d02f56fa897705dcc740da2d237c373f70686f4e0d9bd3bf0400ea7a",
    "topic1": "0x000000000000000000000000031002d15b0d0cd7c9129d6f644446368deae391",
    "topic2": "0x000000000000000000000000d25943be09f968ba740e0782a34e710100defae9",
    "block_timestamp": "2021-05-07T11:08:35.000Z",
    "block_number": "12386788",
    "block_hash": "0x9b559aef7ea858608c2e554246fe4a24287e7aeeb976848df2b9a2531f4b9171",
    "decoded_event": {
      "signature": "Transfer(address,address,uint256)",
      "label": "Transfer",
      "type": "event",
      "params": [
        {
          "name": "from",
          "value": "0x26C5011483Add49801eA8E3Ee354fE013895aCe5",
          "type": "address"
        }
      ]
    }
  },
  "decoded_call": {
    "signature": "transfer(address,uint256)",
    "label": "transfer",
    "type": "function",
    "params": [
      {
        "name": "_to",
        "value": "0x1CA455A55108874A95C84620dDA2566c54D17953",
        "type": "address"
      }
    ]
  },
  "internal_transactions": {
    "transaction_hash": "0x057Ec652A4F150f7FF94f089A38008f49a0DF88e",
    "block_number": 12526958,
    "block_hash": "0x0372c302e3c52e8f2e15d155e2c545e6d802e479236564af052759253b20fd86",
    "type": "CALL",
    "from": "0xd4a3BebD824189481FC45363602b83C9c7e9cbDf",
    "to": "0xa71db868318f0a0bae9411347cd4a6fa23d8d4ef",
    "value": "650000000000000000",
    "gas": "6721975",
    "gas_used": "6721975",
    "input": "0x",
    "output": "0x"
  }
}
```


## Moralis Streams
[Moralis Streams](https://moralis.io/streams/?utm_source=cronos-docs) is an API for real-time blockchain data, sent over webhooks. Using Streams you can avoid polling of other APIs and instead only be notified when something has actually happened. You can configure the Stream to notify you only when specific things happen on-chain, like transactions, transfers, mints, or any other custom event. Streams support custom events and customer filters. 

Streams can be created either in the [Streams User Interface](https://admin.moralis.io/streams) once you're signed into the Moralis Admin Panel, or through the [API](https://docs.moralis.io/streams-api/evm).

### Moralis Streams Guides
- [How to listen to all ERC20 transfers over certain amount sent by specific address](https://docs.moralis.io/streams-api/evm/how-to-listen-to-all-erc20-contract-transfers-over-certain-amount-sent-by-specific-address)
- [How to listen all NFT transfers](https://docs.moralis.io/streams-api/evm/how-to-listen-all-nft-transfers)
- [How to monitor ENS Domain Registrations](https://docs.moralis.io/streams-api/evm/how-to-monitor-ens-domain-registrations)
- [How to monitor for ERC20 token burns or mints](https://docs.moralis.io/streams-api/evm/how-to-monitor-for-erc20-token-burns-or-mints)
- [How to Monitor Crypto Wallet Addresses with Streams](https://www.youtube.com/watch?v=pnmVhxdUBao)



## **Other Resources**

Here are additional resources to help you get started with the Moralis:

* [Moralis Documentation](https://docs.moralis.io)
* [Moralis Account Login](https://admin.moralis.io/login)
* [Moralis Tutorials](https://www.youtube.com/@MoralisWeb3)
* [Tutorial: Build a DEX with Moralis](https://www.youtube.com/watch?v=t8U7GRrlYW8)
* [Tutorial: Get Any Token Price with Moralis](https://www.youtube.com/watch?v=laDsODyofVU)