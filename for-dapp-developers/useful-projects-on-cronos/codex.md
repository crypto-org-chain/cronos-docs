# Codex

## Introduction

[Codex](https://www.codex.io/) is a blockchain data API that indexes Cronos and 80+ other networks. It provides real-time and historical data — token prices, OHLCV chart data, transactions, holders, wallet balances, and aggregated metrics such as volume and liquidity — through a single GraphQL API.

Codex offers three ways to consume data:

* Queries - one-time fetches over HTTPS
* Subscriptions - live-streamed data over WebSockets
* Webhooks - push notifications sent to your own HTTP endpoints

## Getting Started

In order to use the Codex API, you need to [sign up](https://dashboard.codex.io/signup) for a Codex account and copy your API key from the [API Keys](https://dashboard.codex.io/dashboard/api-keys) page.

All requests are sent to a single GraphQL endpoint, with the API key passed in the `Authorization` header:

| **Details**             |                                       |
| ----------------------- | ------------------------------------- |
| **API Type**            | GraphQL                               |
| **HTTP Endpoint**       | `https://graph.codex.io/graphql`      |
| **WebSocket Endpoint**  | `wss://graph.codex.io/graphql`        |
| **Cronos `networkId`**  | `25`                                  |
| **Pricing**             | [Plans](https://www.codex.io/pricing) |

You can test any query against live data in the [Codex Explorer](https://explorer.codex.io/) before writing code.

## Queries

Queries cover token prices, charts, pairs, holders, wallet balances, and DEX events on Cronos. Some commonly used queries:

* [getTokenPrices](https://docs.codex.io/api-reference/queries/gettokenprices) - real-time or historical prices for a list of tokens
* [getBars](https://docs.codex.io/api-reference/queries/getbars) - OHLCV bar data for charting
* [filterTokens](https://docs.codex.io/api-reference/queries/filtertokens) - rank and filter tokens by price change, volume, liquidity and other metrics
* [getTokenEvents](https://docs.codex.io/api-reference/queries/gettokenevents) - swaps, mints and burns for a pair
* [holders](https://docs.codex.io/api-reference/queries/holders) - holders of a token
* [balances](https://docs.codex.io/api-reference/queries/balances) - token balances for a wallet

#### Example call

Below is an example that fetches the current price of WCRO on Cronos (`networkId: 25`):

```bash
curl https://graph.codex.io/graphql \
  -H "Authorization: $CODEX_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"query":"{ getTokenPrices(inputs: [{ address: \"0x5C7F8A570d578ED84E63fdFA7b1eE72dEae1AE23\", networkId: 25 }]) { address networkId priceUsd timestamp } }"}'
```

```json
{
  "data": {
    "getTokenPrices": [
      {
        "address": "0x5C7F8A570d578ED84E63fdFA7b1eE72dEae1AE23",
        "networkId": 25,
        "priceUsd": 0.0858,
        "timestamp": 1749556800
      }
    ]
  }
}
```

## SDK

Codex provides an official [TypeScript SDK](https://github.com/Codex-data/sdk):

```bash
npm install @codex-data/sdk
```

```js
import { Codex } from "@codex-data/sdk";

const sdk = new Codex(process.env.CODEX_API_KEY);

const response = await sdk.queries.token({
  input: {
    address: "0x5C7F8A570d578ED84E63fdFA7b1eE72dEae1AE23",
    networkId: 25,
  },
});
```

From other languages, you can call the GraphQL endpoint with any HTTP client.

## Real-time data

For real-time use cases, Codex supports [GraphQL subscriptions](https://docs.codex.io/concepts/subscriptions) over WebSockets (e.g. live price feeds, trade notifications, streaming chart updates) and [webhooks](https://docs.codex.io/concepts/webhooks) that POST events such as price thresholds or new trades to an endpoint you control.

## Resources

Here are some additional resources to help you get started with Codex:

* [Codex Documentation](https://docs.codex.io/)
* [Get Started Guide](https://docs.codex.io/get-started)
* [API Reference](https://docs.codex.io/api-reference/introduction)
* [Supported Networks](https://docs.codex.io/networks)
* [Codex Explorer](https://explorer.codex.io/)
* [Discord Support](https://discord.gg/9ZB7zcWuBY)
