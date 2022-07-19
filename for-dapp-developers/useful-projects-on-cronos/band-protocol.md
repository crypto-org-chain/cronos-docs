# Band Protocol

## Band Protocol's Data Feed

### Introduction

Band Protocol is a secure, blockchain-agnostic decentralised oracle solution ([more detail here](https://docs.bandchain.org/)). It features a blockchain of its own (BandChain) that does the heavy lifting of pulling data from external sources, aggregating all the results, and creating a verifiable proof of data integrity to be used in other blockchain applications — all with a secure crypto-economic which guarantees data availability and correctness.

Developers building applications on Cronos can now utilise Band’s decentralised oracle services. With Band’s oracle, they now have access to various cryptocurrency price data points to integrate into their applications.

### Currency Pair and Supported Currencies

A currency pair is the quotation of two different currencies, with the value of one currency being quoted against the other. The first listed currency of a currency pair is the _base currency_, and the second currency is called the _quote currency_. A currency pair compares the value of one currency to another — the _base currency_ versus the _quote currency_. It indicates how much one unit of the _base currency_ worths in the unit of the _quote currency_, or, in other words, how much of the _quote currency_ is needed to purchase one unit of the _base currency_. For instance, in a currency pair `CRO/USD`, `CRO` is the cryptocurrency **Cronos** as the _base currency_, and `USD` is the fiat currency **U.S. Dollar** as the _quote currency_. The value of currency pair `CRO/USD` will indicate how much one `CRO` worths in **U.S. Dollar**.

Currently, one fiat currency - the **U.S. Dollar** - and the following list of cryptocurrencies are supported. Going forward, this token list will continue to expand based on developers' needs and community feedback.

| Token Name      | Symbol |
| --------------- | ------ |
| Cronos          | CRO    |
| Ethereum        | ETH    |
| Wrapped Bitcoin | WBTC   |
| Tether          | USDT   |
| USD Coin        | USDC   |
| Dai             | DAI    |

### Price Queries

Developers are able to query token prices from **Band**’s oracle through **Band**’s `StdReferenceProxy` contract on **Cronos Chain**. This contract exposes `getReferenceData` and `getReferenceDataBulk` functions, to query one currency pair and multiple currency pairs, respectively.

`getReferenceData` takes two strings as the inputs — the _base_ and _quote_ symbols respectively. It then queries the `StdReference` contract for the latest rate of the specified currency pair, _base_ against _quote_. The query returns a `ReferenceData` struct, shown below:

```solidity
struct ReferenceData {
    uint256 rate; // base/quote exchange rate, multiplied by 1e18.
    uint256 lastUpdatedBase; // UNIX epoch of the last time when base price gets updated.
    uint256 lastUpdatedQuote; // UNIX epoch of the last time when quote price gets updated.
}
```

`getReferenceDataBulk` instead takes two lists as inputs: one for the _base currencies_, and one for the _quote currencies_. It then proceeds to query the rate for each _base_/_quote_ pair at each index, and returns an array of `ReferenceData` structs.

For example, if we call `getReferenceDataBulk(['CRO','WBTC','ETH'], ['USD','ETH','DAI'])`, the returned `ReferenceData` array will contain information regarding the following currency pairs:

* `CRO/USD`
* `WBTC/ETH`
* `ETH/DAI`

### Example Usage

The contract code below demonstrates a simple example usage of **Band**'s `StdReferenceProxy` contract and its `getReferenceData` and `getReferenceDataBulk` functions.

```solidity
pragma solidity ^0.8.13;

interface IStdReference {
    /// A structure returned whenever someone requests for standard reference data.
    struct ReferenceData {
        uint256 rate; // base/quote exchange rate, multiplied by 1e18.
        uint256 lastUpdatedBase; // UNIX epoch of the last time when base price gets updated.
        uint256 lastUpdatedQuote; // UNIX epoch of the last time when quote price gets updated.
    }

    /// Returns the price data for the given base/quote pair. Revert if not available.
    function getReferenceData(string memory _base, string memory _quote)
        external
        view
        returns (ReferenceData memory);

    /// Similar to getReferenceData, but with multiple base/quote pairs at once.
    function getReferenceDataBulk(string[] memory _bases, string[] memory _quotes)
        external
        view
        returns (ReferenceData[] memory);
}

contract DemoOracleUSD {
    IStdReference ref;

    string[] public tokenList = ["CRO", "ETH", "WBTC", "USDT", "USDC", "DAI"];
    mapping(string => uint256) public lastPricesInUSD;

    modifier onlySupportedToken(string memory _token) {
        bool supported = false;
        for (uint i=0; i<tokenList.length; i++) {
            if ( keccak256(abi.encodePacked(_token)) == keccak256(abi.encodePacked(tokenList[i])) ) {
                supported = true;
            }
        }
        require(supported, "Token not supported.");
        _;
    }

    constructor(IStdReference _ref) {
        ref = _ref;
    }

    function getUSDPrice(string memory _token) public view onlySupportedToken(_token) returns (uint256 rate) {
        IStdReference.ReferenceData memory data = ref.getReferenceData(_token, "USD");
        rate = data.rate;
    }

    function getMultiUSDPrices(string[] memory _tokens) external view returns (uint256[] memory rates) {
        rates = new uint256[](_tokens.length);

        for (uint i=0; i<_tokens.length; i++) {
            rates[i] = getUSDPrice(_tokens[i]);
        }
    }

    function savePrice(string memory _token) external {
        lastPricesInUSD[_token] = getUSDPrice(_token);
    }
}
```

### Deploy above DemoOracleUSD to Cronos Testnet

1. Copy and paste the above contract into [Remix](https://remix.ethereum.org/), an online Ethereum IDE;
2. Specify `//SPDX-License-Identifier`, or put `// SPDX-License-Identifier: UNLICENSED` if unlicensed, at the first line of the above code;
3. Compile the contract with compiler version 0.8.13;
4. Switch to the **DEPLOY & RUN TRANSACTIONS** tab of [Remix](https://remix.ethereum.org/);
5. Select `Injected Web3` in the **ENVIRONMENT** dropdown in the top left to connect with MetaMask;
   * Make sure that MetaMask is connected to the Cronos testnet, you can refer to our [official documentation](../../for-users/metamask.md);
6. Deploy the contract with the below Cronos testnet Band reference data proxy address;
   * `0xD0b2234eB9431e850a814bCdcBCB18C1093F986B`;
7. Hooray, you can now fetch the latest supported token prices from Band Protocol!

### Contract Addresses

| Network             | StdReference Contract Address                                                                                                    |
| ------------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| Cronos Mainnet Beta | [`0xDA7a001b254CD22e46d3eAB04d937489c93174C3`](https://cronoscan.com/address/0xDA7a001b254CD22e46d3eAB04d937489c93174C3)         |
| Cronos Testnet      | [`0xD0b2234eB9431e850a814bCdcBCB18C1093F986B`](https://testnet.cronoscan.com/address/0xD0b2234eB9431e850a814bCdcBCB18C1093F986B) |
