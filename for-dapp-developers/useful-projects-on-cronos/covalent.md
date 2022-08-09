---
layout: editorial
---

# Covalent

## Introduction

[Covalent](https://www.covalenthq.com/?utm\_source=cronos\&utm\_medium=partner-docs) provides a unified API to bring full transparency and visibility to assets across all blockchain networks including Cronos.

To get started, sign up for an [**API Key**](https://www.covalenthq.com/platform/?utm\_source=cronos\&utm\_medium=partner-docs).

| _Developer Mode (JSON)_                                                                      | _Analyst Mode (CSV)_                                                                     |
| -------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------- |
| ![Developer Mode](https://www.covalenthq.com/static/images/partner-docs/developer\_mode.png) | ![Analyst Mode](https://www.covalenthq.com/static/images/partner-docs/analyst\_mode.png) |

The Covalent API is RESTful and offers the following out-of-the-box for _**Cronos**_:

| **Covalent API**          |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| ------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Response formats**      | JSON and CSV                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| **Real time response**    | 2 blocks                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| **Batch response**        | 30 minutes                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| **Request volume limit**  | None                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| **Request rate limit**    | 5 requests per second                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| **Base URL**              | [https://api.covalenthq.com/v1/](https://api.covalenthq.com/v1/)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| **Networks & `chain_id`** | Mainnet - `25`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| **Supported Endpoints**   | <p><strong>Class A</strong><br>- <a href="https://www.covalenthq.com/docs/api/#/0/Get%20token%20balances%20for%20address/USD/25/?utm_source=cronos&#x26;utm_medium=partner-docs">Balances</a><br>- <a href="https://www.covalenthq.com/docs/api/#/0/Get%20transactions%20for%20address/USD/25/?utm_source=cronos&#x26;utm_medium=partner-docs">Transactions</a><br>- <a href="https://www.covalenthq.com/docs/api/#/0/Get%20ERC20%20token%20transfers%20for%20address/USD/25/?utm_source=cronos&#x26;utm_medium=partner-docs">Transfers</a><br>- <a href="https://www.covalenthq.com/docs/api/#/0/Get%20token%20holders%20as%20of%20any%20block%20height/USD/25/?utm_source=cronos&#x26;utm_medium=partner-docs">Token Holders</a><br>- <a href="https://www.covalenthq.com/docs/api/#/0/Get%20log%20events%20by%20contract%20address/USD/25/?utm_source=cronos&#x26;utm_medium=partner-docs">Log Events (Contract Address)</a><br>- <a href="https://www.covalenthq.com/docs/api/#/0/Get%20log%20events%20by%20topic%20hash(es)/USD/25/?utm_source=cronos&#x26;utm_medium=partner-docs">Log Events (Topic Hash)</a></p> |

Try the supported endpoints directly in your browser from our [API Reference](https://covalenthq.com/docs/api/?utm\_source=cronos\&utm\_medium=partner-docs) or use the following code examples. **The JSON response format is the same for all endpoints:**

```
❴
    "data": ..., 
    "error": false,
    "error_message": null,
    "error_code": null
❵
```

&#x20;

{% tabs %}
{% tab title="Curl" %}
```
curl -X GET "https://api.covalenthq.com/v1/25/address/0xFEC4f9D5B322Aa834056E85946A32c35A3f5aDD8/balances_v2/?key={YOUR API KEY}" -H "Accept: application/json"
```
{% endtab %}

{% tab title="JavaScript" %}
```
const APIKEY = 'YOUR API KEY';
const baseURL = 'https://api.covalenthq.com/v1'
const blockchainId = 25
const demoAddress = '0xFEC4f9D5B322Aa834056E85946A32c35A3f5aDD8'

async function getWalletBalance(chainId, address) {
    const url = new URL(`${baseURL}/${chainId}/address/${address}/balances_v2/?key=${APIKEY}`);
    const response = await fetch(url);
    const result = await response.json();
    const data = result.data;
    console.log(data)
    return data;
}

// Example address request
getWalletBalance(blockchainId, demoAddress);
```
{% endtab %}

{% tab title="Python" %}
```
import requests
API_KEY = 'YOUR API KEY'
base_url = 'https://api.covalenthq.com/v1'
blockchain_id = 25
demo_address = '0xFEC4f9D5B322Aa834056E85946A32c35A3f5aDD8'

def get_wallet_balance(chain_id, address):
    endpoint = f'/{chain_id}/address/{address}/balances_v2/?key={API_KEY}'
    url = base_url + endpoint
    result = requests.get(url).json()
    data = result["data"]
    print(data)
    return(data)


# Example address request
get_wallet_balance(blockchain_id, demo_address)
```
{% endtab %}
{% endtabs %}

####

## Use Cases

The Covalent API supports a broad range of Web3 data use cases including:

|                                                                               |                                                                                       |                                                                                            |                                                                               |
| ----------------------------------------------------------------------------- | ------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------- |
| ![Gaming](https://www.covalenthq.com/static/images/partner-docs/gaming.png)   | ![DeFi](https://www.covalenthq.com/static/images/partner-docs/defi.png)               | ![KYC](https://www.covalenthq.com/static/images/partner-docs/kyc.png)                      | ![NFT](https://www.covalenthq.com/static/images/partner-docs/nft\_icon.png)   |
| Gaming                                                                        | DeFi Taxes                                                                            | KYC                                                                                        | NFTs                                                                          |
| ![Wallets](https://www.covalenthq.com/static/images/partner-docs/wallets.png) | ![Dashboards](https://www.covalenthq.com/static/images/partner-docs/dashboards.png)   | ![On-Chain Forensics](https://www.covalenthq.com/static/images/partner-docs/forensics.png) | ![DAO](https://www.covalenthq.com/static/images/partner-docs/dao.png)         |
| Wallets                                                                       | Dashboards                                                                            | On-Chain Forensics                                                                         | DAO Data                                                                      |
| ![Trading](https://www.covalenthq.com/static/images/partner-docs/trading.png) | ![Predictions](https://www.covalenthq.com/static/images/partner-docs/predictions.png) | ![Governance](https://www.covalenthq.com/static/images/partner-docs/governance.png)        | ![Pricing](https://www.covalenthq.com/static/images/partner-docs/pricing.png) |
| DEXs & Trading                                                                | Predictive Analytics                                                                  | Governance                                                                                 | Pricing                                                                       |

Check out our collection of ready-to-ship [**Code Templates**](https://github.com/covalenthq/web3-resources?utm\_source=cronos\&utm\_medium=partner-docs) that you can use to build your Web3 data-powered DApps.

&#x20;

## Resources

Here are some additional resources to help you get started with the Covalent API:

* [Cronos Network Details](https://www.covalenthq.com/docs/networks/cronos/?utm\_source=cronos\&utm\_medium=partner-docs)
* [Project Showcase](https://www.covalenthq.com/docs/project-showcase/?utm\_source=cronos\&utm\_medium=partner-docs)
* [Covalent API Reference](https://covalenthq.com/docs/api/?utm\_source=cronos\&utm\_medium=partner-docs)
* [API FAQs](https://www.covalenthq.com/docs/developer/faq/?utm\_source=cronos\&utm\_medium=partner-docs)
* [Discord Support](https://www.covalenthq.com/discord/?utm\_source=cronos\&utm\_medium=partner-docs)

&#x20;

