# Pyth

## Overview

[Pyth Network](https://pyth.network/) is one of the largest first-party Oracle networks, delivering real-time data across [a vast number of chains](https://docs.pyth.network/price-feeds/contract-addresses). The network comprises some of the world's [largest exchanges, market makers, and financial services providers](https://pyth.network/publishers). These publish proprietary data on-chain for aggregation and distribution to smart contract applications.

Pyth offers two oracle products: [Pyth Core](https://docs.pyth.network/price-feeds/core) for standard price feeds, and [Pyth Pro](https://docs.pyth.network/price-feeds/pro) for more advanced data needs.

## Using Pyth as a PULL Oracle

Both [Pyth Core](https://docs.pyth.network/price-feeds/core) and [Pyth Pro](https://docs.pyth.network/price-feeds/pro) follow a [pull oracle model](https://docs.pyth.network/price-feeds/core/pull-updates): rather than an oracle operator periodically updating prices on-chain, anyone can fetch the latest signed price data from an off-chain service and submit it on-chain as part of their transaction. The smart contract then verifies and reads the price within that same transaction.

### Pyth Core Quick Guide

The Pyth core introduces an innovative low-latency [pull oracle design](https://docs.pyth.network/documentation/pythnet-price-feeds/on-demand), where users can pull price updates onchain when needed, enabling everyone in the onchain environment to access that data point most efficiently. Pyth network updates the prices every **400ms.**

Developers on Cronos EVM have access to any of [Pyth's price feeds](https://pyth.network/developers/price-feed-ids) for equities, ETFs, commodities, foreign exchange pairs, and cryptocurrencies.

#### Example

**Backend: Fetch Price Updates**

Use the [`HermesClient` SDK](https://docs.pyth.network/price-feeds/core/fetch-price-updates#sdk) to fetch the latest signed price update from [Hermes](https://docs.pyth.network/price-feeds/core/how-pyth-works/hermes) and pass it to your smart contract.

*   **Config API key:**

    Sign up at [Pyth Terminal](https://pythdata.app/signup) to get a Pyth API key. Once obtained, set it as an environment variable:

    ```bash
    export PYTH_API_KEY=your_api_key_here
    ```
*   **Install the SDK:**

    ```shellscript
    npm install @pythnetwork/hermes-client
    ```
*   **Fetch price updates:**

    ```javascript
    import { HermesClient } from "@pythnetwork/hermes-client";

    const connection = new HermesClient("https://pyth.dourolabs.app/hermes", {
      accessToken: process.env.PYTH_API_KEY,
    });

    // ETH/USD price feed ID, full list at https://pyth.network/developers/price-feed-ids
    const priceIds = [
      "0xff61491a931112ddf1bd8147cd1b641375f79f5825126d665480874634fd0ace",
    ];

    // Fetch the latest price update
    const priceUpdates = await connection.getLatestPriceUpdates(priceIds);
    // updateData will be passed to your smart contract's fetchPrice() function
    const updateData = priceUpdates.binary.data.map((d) => "0x" + d);
    ```

Check [How to Fetch Price Updates](https://docs.pyth.network/price-feeds/core/fetch-price-updates) for more details, including streaming updates, and [Price Feed IDs](https://pyth.network/developers/price-feed-ids) page for supported feeds.

**Smart Contract: Use Price Data**

Here is a working example of a contract that fetches the latest price of ETH/USD on the Cronos network. You have to pass [Pyth's contract address](https://docs.pyth.network/price-feeds/contract-addresses/evm) for Cronos EVM mainnet/testnet.

```solidity
// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "@pythnetwork/pyth-sdk-solidity/IPyth.sol";
import "@pythnetwork/pyth-sdk-solidity/PythStructs.sol";

contract MyFirstPythContract {
    IPyth pyth;

    constructor(address _pyth) {
        pyth = IPyth(_pyth);
    }

    function fetchPrice(
        bytes[] calldata updateData,
        bytes32 priceFeed
    ) public payable returns (int64) {
        // Submit a priceUpdate to the Pyth contract to update the on-chain price.
        // Updating the price requires paying the fee returned by getUpdateFee.
        uint updateFee = pyth.getUpdateFee(updateData);
        pyth.updatePriceFeeds{value: updateFee}(updateData);

        // Read the current price if it is less than 60 seconds old.
        PythStructs.Price memory price = pyth.getPriceNoOlderThan(priceFeed, 60);
        return price.price;
    }
}
```

This [package](https://github.com/pyth-network/pyth-crosschain/tree/main/target_chains/ethereum/sdk/solidity) provides utilities for consuming prices from the Pyth network oracle using Solidity. Also, it contains the [Pyth Interface ABI](https://github.com/pyth-network/pyth-crosschain/blob/main/target_chains/ethereum/sdk/solidity/abis/IPyth.json) that you can use in your libraries to communicate with the Pyth contract.

It is generally recommended to follow the [consumer best practices](https://docs.pyth.network/documentation/pythnet-price-feeds/best-practices) when consuming Pyth data.

For more information, check out the official [Pyth documentation](https://docs.pyth.network/price-feeds). There are details on the various functions available for interacting with the Pyth smart contract in the [API Reference section](https://api-reference.pyth.network/price-feeds/evm/getPriceNoOlderThan).

### Pyth Pro Quick Guide

[Pyth Pro](https://docs.pyth.network/price-feeds/pro) (formerly Pyth Lazer) is a high-performance, enterprise-grade, low-latency service that delivers customizable real-time price data from first-party publishers, with configurable update schedules.

#### Example

**Backend: Fetch Price Updates**

The following example shows how to subscribe to Pyth Pro price updates using the [`@pythnetwork/pyth-lazer-sdk`](https://www.npmjs.com/package/@pythnetwork/pyth-lazer-sdk). The returned payload includes a verified binary that can be submitted on-chain.

*   **Config API Key**

    Request a Pyth Pro API key by following the steps on the [Acquire an API key](https://docs.pyth.network/price-feeds/pro/acquire-api-key) page. Once obtained, set it as an environment variable:

    ```shellscript
    export PYTH_PRO_API_KEY=your_api_key_here
    ```
*   **Install the SDK**

    ```shellscript
    npm install --save @pythnetwork/pyth-lazer-sdk
    ```
*   **Subscribe to price updates**

    ```javascript
    import { PythLazerClient } from "@pythnetwork/pyth-lazer-sdk";

    // Create a client connected to all three endpoints for redundancy, a single endpoint may go down briefly during deployments.
    const client = await PythLazerClient.create({
      urls: [
        "wss://pyth-lazer-0.dourolabs.app/v1/stream",
        "wss://pyth-lazer-1.dourolabs.app/v1/stream",
        "wss://pyth-lazer-2.dourolabs.app/v1/stream",
      ],
      token: process.env.PYTH_PRO_API_KEY,
    });

    // The message listener is called every time a new message is received.
    client.addMessageListener((message) => {
      // Add your logic to consume messages here
      console.log("got message:", message);
    });

    // Subscribe to price feeds (price feed IDs from Pyth Pro price feed list)
    client.subscribe({
      type: "subscribe",
      subscriptionId: 1,
      priceFeedIds: [1, 2],
      properties: ["price", "feedUpdateTimestamp"],
      formats: ["evm"],
      channel: "fixed_rate@200ms",
      ignoreInvalidFeeds: true,
    });
    ```

Refer to the [Pyth Pro documentation](https://docs.pyth.network/price-feeds/pro/subscribe-to-prices) for the full list of subscription parameters, channels. See the [Payload Reference](https://docs.pyth.network/price-feeds/pro/payload-reference) for details on the payload structure, and the [Price Feed IDs](https://docs.pyth.network/price-feeds/pro/price-feed-ids) page for supported feeds.

**Smart Contract: Verify and Parse Price Data**

Here is a working example of a contract that verifies and parses a Pyth Pro price update. You have to pass [Pyth's contract address](https://docs.pyth.network/price-feeds/pro/contract-addresses) for Cronos EVM mainnet/testnet.

```solidity
// SPDX-License-Identifier: Apache-2.0
pragma solidity ^0.8.13;

import {console} from "forge-std/console.sol";
import {PythLazer} from "pyth-lazer/PythLazer.sol";
import {PythLazerLib} from "pyth-lazer/PythLazerLib.sol";
import {PythLazerStructs} from "pyth-lazer/PythLazerStructs.sol";

/// @title ExampleReceiver
/// @notice Example contract demonstrating how to parse and log Pyth Lazer price updates
/// @dev This contract shows how to use PythLazerLib helper methods (hasX/getX pattern)
///      to safely extract price feed properties from Pyth Lazer updates.
contract ExampleReceiver {
    PythLazer public pythLazer;

    constructor(address pythLazerAddress) {
        pythLazer = PythLazer(pythLazerAddress);
    }

    /// @notice Parse and log price data from a Pyth Lazer update
    /// @dev Demonstrates the use of PythLazerLib helper methods to safely extract feed properties
    /// @param update The raw update bytes from Pyth Lazer (includes signature and payload)
    function updatePrice(bytes calldata update) public payable {
        // Step 1: Pay the verification fee and verify the update signature
        uint256 verificationFee = pythLazer.verification_fee();
        require(msg.value >= verificationFee, "Insufficient fee provided");

        (bytes memory payload,) = pythLazer.verifyUpdate{value: verificationFee}(update);

        // Refund excess payment
        if (msg.value > verificationFee) {
            (bool success,) = payable(msg.sender).call{value: msg.value - verificationFee}("");
            require(success, "Refund failed");
        }

        // Step 2: Parse the payload using the helper function (converts memory to calldata)
        PythLazerStructs.Update memory parsedUpdate = this.parsePayload(payload);

        console.log("Timestamp: %d", parsedUpdate.timestamp);
        console.log("Channel: %d", uint8(parsedUpdate.channel));
        console.log("Number of feeds: %d", parsedUpdate.feeds.length);

        // Step 3: Iterate through all feeds and log their properties
        for (uint256 i = 0; i < parsedUpdate.feeds.length; i++) {
            PythLazerStructs.Feed memory feed = parsedUpdate.feeds[i];

            // Get the feed ID
            uint32 feedId = PythLazerLib.getFeedId(feed);
            console.log("--- Feed ID: %d ---", feedId);

            // Use hasPrice/getPrice pattern to safely extract price
            if (PythLazerLib.hasPrice(feed)) {
                int64 price = PythLazerLib.getPrice(feed);
                console.log("Price:", int256(price));
            }

            // Use hasExponent/getExponent pattern to get decimal places
            if (PythLazerLib.hasExponent(feed)) {
                int16 exponent = PythLazerLib.getExponent(feed);
                console.log("Exponent:", int256(exponent));
            }

            // Use hasPublisherCount/getPublisherCount pattern for data quality
            if (PythLazerLib.hasPublisherCount(feed)) {
                uint16 publisherCount = PythLazerLib.getPublisherCount(feed);
                console.log("Publisher count: %d", publisherCount);
            }

            // Use hasConfidence/getConfidence pattern for confidence interval
            if (PythLazerLib.hasConfidence(feed)) {
                uint64 confidence = PythLazerLib.getConfidence(feed);
                console.log("Confidence: %d", confidence);
            }

            // Use hasBestBidPrice/getBestBidPrice pattern for bid price
            if (PythLazerLib.hasBestBidPrice(feed)) {
                int64 bestBidPrice = PythLazerLib.getBestBidPrice(feed);
                console.log("Best bid price:", int256(bestBidPrice));
            }

            // Use hasBestAskPrice/getBestAskPrice pattern for ask price
            if (PythLazerLib.hasBestAskPrice(feed)) {
                int64 bestAskPrice = PythLazerLib.getBestAskPrice(feed);
                console.log("Best ask price:", int256(bestAskPrice));
            }
        }
    }

    /// @notice Helper to convert memory bytes to calldata for the library
    function parsePayload(bytes calldata payload) external pure returns (PythLazerStructs.Update memory) {
        return PythLazerLib.parseUpdateFromPayload(payload);
    }
}
```

This [package](https://github.com/pyth-network/pyth-examples/tree/main/lazer/evm) provides a working example contract that parses and consumes price updates from Pyth Pro on EVM, along with the Solidity SDK used to verify and parse payloads.

### Pyth on Cronos EVM

#### Pyth Core Contract Addresses

* Mainnet: [0x6E7D74FA7d5c90FEF9F0512987605a6d546181Bb](https://explorer.cronos.com/address/0x6E7D74FA7d5c90FEF9F0512987605a6d546181Bb)
* Testnet: [0xf77705A55aA859A80f60b8d8C4A03D7f69D2D7Ba](https://explorer.cronos.com/testnet/address/0xf77705A55aA859A80f60b8d8C4A03D7f69D2D7Ba)

#### Pyth Pro Contract Addresses

* Mainnet: [0xACeA761c27A909d4D3895128EBe6370FDE2dF481](https://explorer.cronos.com/address/0xACeA761c27A909d4D3895128EBe6370FDE2dF481)
* Testnet: [0xACeA761c27A909d4D3895128EBe6370FDE2dF481](https://explorer.cronos.com/testnet/address/0xACeA761c27A909d4D3895128EBe6370FDE2dF481)

## Using Pyth as a PUSH Oracle

Pyth Core Oracle can be used as a Push oracle by running a scheduler which can update the prices in the backend. Checkout the open source [price pusher](https://github.com/pyth-network/pyth-crosschain/tree/main/apps/price_pusher) app to get started with the scheduler.

### Developers and community

The Pyth network provides additional tools to developers, such as

* [TradingView Integration](https://docs.pyth.network/guides/how-to-create-tradingview-charts), or
* [Gelato web3 functions](https://docs.pyth.network/guides/how-to-schedule-price-updates-with-gelato).

Check out the following links to get started with Pyth.

* [Pyth EVM Integration Guide](https://docs.pyth.network/price-feeds/use-real-time-data/evm)
* [Pyth Docs](https://docs.pyth.network/home)
* [Pyth API Reference](https://api-reference.pyth.network/price-feeds/evm/getPrice)
* [Pyth Examples](https://github.com/pyth-network/pyth-examples)
* [Website](https://pyth.network/)
* [Twitter](https://x.com/PythNetwork)
