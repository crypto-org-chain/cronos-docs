# Google Bigquery

### Introduction

Blockchain Analytics offers indexed blockchain data made available through [BigQuery](https://cloud.google.com/bigquery/docs) for easy analysis through SQL.

Blockchain Analytics offers you access to reliable data without the overhead of operating nodes or developing and maintaining an indexer. You can now query the full history of blocks, transactions, logs and receipts for Cronos.

By leveraging datasets in BigQuery, you can access blockchain data as easily as your internal data. By joining chain data with application data, you can get a complete picture of your users and your business.

### How are these datasets different from the existing public dataset? <a href="#how_are_these_datasets_different_from_the_existing_public_dataset" id="how_are_these_datasets_different_from_the_existing_public_dataset"></a>

Like the existing public blockchain datasets, customers are not charged for storage of the data, only for querying the data based on [BigQuery pricing](https://cloud.google.com/bigquery/pricing).



### Quickstart

1. [Go to Cronos dataset](https://console.cloud.google.com/marketplace/product/bigquery-public-data/blockchain-analytics-cronos-mainnet-us?\_ga=2.57494312.344001667.1705466080-1066618470.1698651784&\_gac=1.157920072.1705465933.CjwKCAiA75itBhA6EiwAkho9e8myknN2EhHAyk2F9H-eciNzXDhip1AUtZ6GiBaCllmrfHni5MMy3BoCKroQAvD\_BwE) and click on one of the [samples](https://console.cloud.google.com/bigquery?sq=650023896125:07dd7c4b273c45639c8f38983b9b7de0).&#x20;
2. You will get to the console and see the Cronos dataset on the left in the explorer

<figure><img src="../../.gitbook/assets/Screenshot 2024-01-17 at 12.42.47 PM.png" alt=""><figcaption></figcaption></figure>

3. If you clicked on the sample you should get the BigQuery SQL code to query [Which wallets had the most number of interactions with the Wrapped Cronos contract in the last 30 days? ](https://console.cloud.google.com/bigquery?sq=650023896125:07dd7c4b273c45639c8f38983b9b7de0). Let's click the big `RUN` button. \
   \
   To start developing your own BigQuery SQL code, we refer to the following [syntax](https://cloud.google.com/bigquery/docs/reference/standard-sql/query-syntax).\
   For the Cronos data schema we refer to the [Google Cloud Cronos schema](https://cloud.google.com/blockchain-analytics/docs/schema#cronos\_mainnet).

```sql
SELECT 
  t.from_address AS address, 
  CONCAT("https://cronoscan.com/address/", t.from_address) AS cronoscan_link,
  COUNT(t.from_address) AS num_transactions
FROM 
  `bigquery-public-data.goog_blockchain_cronos_mainnet_us.transactions` AS t
INNER JOIN
  bigquery-public-data.goog_blockchain_cronos_mainnet_us.blocks AS b
ON
  b.block_hash = t.block_hash
WHERE 
  t.to_address = LOWER("0x5C7F8A570d578ED84E63fdFA7b1eE72dEae1AE23") -- Wrapped CRO
AND
  b.block_timestamp > (CURRENT_TIMESTAMP() - INTERVAL 30 DAY)
GROUP BY 
  t.from_address
ORDER BY 
  COUNT(t.from_address) DESC
;
```

4. We can now query the results in the results tab below, further explore by exporting the results or visualizing in another tool such as Google sheets or Looker.\


| Row | address                                    | cronoscan\_link                                                          | num\_transactions |
| --- | ------------------------------------------ | ------------------------------------------------------------------------ | ----------------- |
| 1   | 0xb3c506d60d45abb917ee10a947749a098b497d3d | https://cronoscan.com/address/0xb3c506d60d45abb917ee10a947749a098b497d3d | 370               |
| 2   | 0x693fb96fdda3c382fde7f43a622209c3dd028b98 | https://cronoscan.com/address/0x693fb96fdda3c382fde7f43a622209c3dd028b98 | 347               |
| 3   | 0x6614d26064d762922c7bc7a00337713d5169ae7c | https://cronoscan.com/address/0x6614d26064d762922c7bc7a00337713d5169ae7c | 137               |
| 4   | 0xce6aeeb31f00a5783c115a669e516f34d56512e4 | https://cronoscan.com/address/0xce6aeeb31f00a5783c115a669e516f34d56512e4 | 120               |





### Example queries

1. Latest indexed block

```sql
SELECT
  MIN(block_number) AS `First block`,
  MAX(block_number) AS `Newest block`,
  COUNT(1) AS `Total number of blocks`
FROM
  `bigquery-public-data.goog_blockchain_cronos_mainnet_us.blocks` AS t
```

| Row | First block | Newest block | Total number of blocks |   |
| --- | ----------- | ------------ | ---------------------- | - |
| 1   | 1           | 12134627     | 12134627               |   |



2. Daily transactions in the last 10 days

```sql

SELECT
  DATE(block_timestamp) AS date,
  COUNT(*) AS num_transactions
FROM
  `bigquery-public-data.goog_blockchain_cronos_mainnet_us.transactions`
WHERE
  block_timestamp >= TIMESTAMP_SUB(CURRENT_TIMESTAMP(), INTERVAL 10 DAY)
GROUP BY
  1
ORDER BY
  1 DESC;
```

| Row | date       | num\_transactions |
| --- | ---------- | ----------------- |
| 1   | 2024-01-18 | 10250             |
| 2   | 2024-01-17 | 47747             |
| 3   | 2024-01-16 | 49717             |
| 4   | 2024-01-15 | 47099             |
| 5   | 2024-01-14 | 47051             |
| 6   | 2024-01-13 | 43926             |
| 7   | 2024-01-12 | 50448             |
| 8   | 2024-01-11 | 60904             |
| 9   | 2024-01-10 | 61774             |
| 10  | 2024-01-09 | 54521             |
| 11  | 2024-01-08 | 44194             |



3. View the blocks with largest CRO value transfer

```sql
SELECT block_hash, SUM(value.bignumeric_value / 1000000000000000000) value_total
FROM `bigquery-public-data.goog_blockchain_cronos_mainnet_us.transactions`
  JOIN `bigquery-public-data.goog_blockchain_cronos_mainnet_us.receipts` USING (block_hash, transaction_hash)
WHERE status = 1
GROUP BY block_hash
ORDER BY value_total DESC
LIMIT 5
```

<table data-header-hidden><thead><tr><th width="120.33333333333331"></th><th></th><th></th></tr></thead><tbody><tr><td>Row</td><td>block_hash</td><td>value_total</td></tr><tr><td>1</td><td>0xd2fb7e0178b41b8a4226845b5f2e252eaded16018195bd8d9b0a19696205dbd3</td><td>200002596.616738410135301463</td></tr><tr><td>2</td><td>0xce79ec24ed1f3080b50980aacb9200a1e7bf25e9b382df13be2070d1d8d03142</td><td>173167791.450760254782540311</td></tr><tr><td>3</td><td>0x58d5a125a6950acac5664c8eeb285b2457563c47f858aed85c4c6d28609c10eb</td><td>150004978.49285843</td></tr><tr><td>4</td><td>0x402d0047c5e001a220b200c2ebeb8adfeddf4c5276972b586c3489b8e61d7d20</td><td>150000000</td></tr><tr><td>5</td><td>0xa1158b002a13cecc0a6a2061e71c395e0f1310812da26cc77c598d283571e485</td><td>129150494</td></tr></tbody></table>



4. Top 10 wallets by number of transactions

```sql

SELECT 
  from_address, 
  COUNT(*) AS num_transactions 
FROM `bigquery-public-data.goog_blockchain_cronos_mainnet_us.transactions`
GROUP BY from_address
ORDER BY num_transactions DESC
LIMIT 10;

```

<table><thead><tr><th width="109.33333333333331">Row</th><th width="429">from_address</th><th>num_transactions</th></tr></thead><tbody><tr><td>1</td><td>0xc9219731adfa70645be14cd5d30507266f2092c5</td><td>3435654</td></tr><tr><td>2</td><td>0xae45a8240147e6179ec7c9f92c5a18f9a97b3fca</td><td>610937</td></tr><tr><td>3</td><td>0xd166bcf1d581bb25ab597672ae8a4a02441d2b39</td><td>579612</td></tr><tr><td>4</td><td>0x95d49a8a2d69b2a2de4a00655d05ee39f9c41108</td><td>520301</td></tr><tr><td>5</td><td>0x71f0cdb17454ad7eeb7e26242292fe0e0189645a</td><td>355649</td></tr><tr><td>6</td><td>0xb3c506d60d45abb917ee10a947749a098b497d3d</td><td>321307</td></tr><tr><td>7</td><td>0x9b6e6035998a84bf2d42781752707087fe8229ed</td><td>309942</td></tr><tr><td>8</td><td>0x227f6757289a86c13eee2e91c2e6eb03f2ed11a6</td><td>294599</td></tr><tr><td>9</td><td>0x6614d26064d762922c7bc7a00337713d5169ae7c</td><td>267727</td></tr><tr><td>10</td><td>0x3936530e2f41df21889067ae35aa81ffbd68aeef</td><td>253452</td></tr></tbody></table>



5. All USDT activity

```sql
-- UDF for easier string manipulation.
CREATE TEMP FUNCTION ParseSubStr(hexStr STRING, startIndex INT64, endIndex INT64)
RETURNS STRING
LANGUAGE js
AS r"""
  if (hexStr.length < 1) {
    return hexStr;
  }
  return hexStr.substring(startIndex, endIndex);
""";

-- UDF to convert hex to decimal.
CREATE TEMP FUNCTION HexToDecimal(hexStr STRING)
RETURNS INT64
LANGUAGE js
AS r"""
  return parseInt(hexStr, 16);
""";

SELECT
  t.transaction_hash,
  t.from_address AS from_address,
  CONCAT("0x", ParseSubStr(l.topics[OFFSET(2)], 26, LENGTH(l.topics[OFFSET(2)]))) AS to_address,
  (HexToDecimal(l.data) / 1000000) AS usdt_transfer_amount
FROM
  `bigquery-public-data.goog_blockchain_cronos_mainnet_us.transactions` AS t
INNER JOIN
  `bigquery-public-data.goog_blockchain_cronos_mainnet_us.logs` AS l
ON
  l.transaction_hash = t.transaction_hash
WHERE
  t.to_address = LOWER("0x66e428c3f67a68878562e79a0234c1f83c208770") -- USDT
AND
  ARRAY_LENGTH(l.topics) > 0
AND
  -- Transfer(address indexed src, address indexed dst, uint wad)
  l.topics[OFFSET(0)] = LOWER("0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef")
;
```

<table data-header-hidden><thead><tr><th width="82"></th><th width="340"></th><th width="222"></th><th width="225"></th><th></th></tr></thead><tbody><tr><td>Row</td><td>transaction_hash</td><td>from_address</td><td>to_address</td><td>usdt_transfer_amount</td></tr><tr><td>1</td><td>0x27f0439e4c557cfa4c5ffeb77bd53d39bd4380da0e70b0808731c6c6c570eb85</td><td>0x4ccb4f2bcb1f2808a3d326af1cc01a99c8c9c15d</td><td>0x6ab8a9861717631d7300d6ad88e77b4010acce11</td><td>36.26307</td></tr><tr><td>2</td><td>0x4128109503cd6b8e69a7ae8655dad22fd7a9a33d7ec526f5cc14351da55b1458</td><td>0xe330472d0398619c447bd5943e38fc24dc42d0b1</td><td>0x8995909dc0960fc9c75b6031d683124a4016825b</td><td>250.0</td></tr><tr><td>3</td><td>0x87ab0dad4c0e87bcb547ab448ea321d9606722e67702fc86b20b9e86876c81ad</td><td>0xcd1332b5cabdda8425a33a615399e1a0a17a2938</td><td>0x480468c2d8487429a096ef2bc0b58666b19ed291</td><td>10.0</td></tr><tr><td>4</td><td>0x91dd6b1b478c60d3f6aea8c88f0aa23d327bce3f22a796084f698e768513332a</td><td>0xe2ee00deb8d9e83e575e844610d8d864bc370066</td><td>0x56578a2c83b5bbac303c702e4c536b8a3e623ecf</td><td>1000.0</td></tr><tr><td>5</td><td>0x0406ad79cfb31ae5d1427a4d649d6eb78687dd4fff6d141d62e9d1d7b673b056</td><td>0xc6cf10c2379ec80aef796b6469230104aadd89c0</td><td>0x8995909dc0960fc9c75b6031d683124a4016825b</td><td>4803.813327</td></tr></tbody></table>
