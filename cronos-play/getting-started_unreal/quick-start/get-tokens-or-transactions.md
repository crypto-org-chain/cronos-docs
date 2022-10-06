# Get Tokens or Transactions

Tokens and Transactions can be queried by Blockscout api or Cronoscan api. Please find the Blockscout api address or apply the Cronoscan API key before using them:&#x20;

{% content-ref url="../../../block-explorers/block-explorer-and-api-keys.md" %}
[block-explorer-and-api-keys.md](../../../block-explorers/block-explorer-and-api-keys.md)
{% endcontent-ref %}

## GetTokensBlocking

given the BlockScout REST API base url and the account address (hexadecimal), it will return the list of all owned tokens (ref: https://cronos.org/explorer/testnet3/api-docs)

<figure><img src="../../../.gitbook/assets/image (19) (2).png" alt=""><figcaption></figcaption></figure>

* `Blockscout Base Url`: the base url of the BlockScout API (e.g. [https://cronos.org/explorer/api](https://cronos.org/explorer/api))
* `Account Address`: the account address to query
* `Output`: the output of the query
* `Success`: success of the query
* `Output Message`: error message of the query

## GetTokenTransfersBlocking

given the BlockScout REST API base url and the account address (hexadecimal; required) and optional contract address (hexadecimal; optional -- it can be empty if the option is ByAddress), it will return all the token transfers (ERC20, ERC721... in the newer BlockScout releases, also ERC1155) (ref: https://cronos.org/explorer/testnet3/api-docs)

NOTE: QueryOption::ByContract is not supported by BlockScout

<figure><img src="../../../.gitbook/assets/image (26).png" alt=""><figcaption></figcaption></figure>

* `Blockscout Base Url`: the base url of the BlockScout API (e.g. [https://cronos.org/explorer/api](https://cronos.org/explorer/api))
* `Address`: the account address to query
* `Contract Address`: the contract address to query
* `Option`: the query option
* `Output`: the output of the query
* `Success`: success of the query
* `Output Message`: error message of the query \*/

## GetTransactionHistoryBlocking

crono-scan api, get transaction history

<figure><img src="../../../.gitbook/assets/image (15) (2).png" alt=""><figcaption></figcaption></figure>

* `Address`: the address to query
* `Apikey`: the api key
* `Output`: the output of the query
* `Success`: success of the query
* `Output Message`: error message of the query

## GetErc20TransferHistoryBlocking

crono-scan api, get erc20 transaction history

<figure><img src="../../../.gitbook/assets/image (25) (1).png" alt=""><figcaption></figcaption></figure>

* `Address`: the address to query
* `Contract Address`: the contract address to query
* `Option`: the query option
* `Api Key`: the api key
* `Output`: the output of the query
* `Success`: success of the query
* `Output Message`: error message of the query

## GetErc721TransferHistoryBlocking

crono-scan api, get erc721 transaction history

returns the ERC721 transfers of a given address of a given contract.

(address can be empty if option is ByContract)

default option is by address

The API key can be obtained from https://cronoscan.com

<figure><img src="../../../.gitbook/assets/image (14) (2).png" alt=""><figcaption></figcaption></figure>

* `Address`: the address to query
* `Contract Address`: the contract address to query
* `Option`: the query option
* `Api Key`: the api key
* `Output`: the output of the query
* `Success`: success of the query
* `Output Message`: error message of the query

