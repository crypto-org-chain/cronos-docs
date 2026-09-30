---
description: Cronos Public Dataset - AWS S3 Access Guide
hidden: true
---

# AWS S3 - Cronos EVM Public Dataset

The Cronos public blockchain dataset is hosted on Amazon S3 and is freely queryable via Athena, ClickHouse, Presto/Trino, DuckDB, or any engine that supports S3-backed Parquet or CSV data.

### Dataset Overview

**Base S3 path:**

```
s3://aws-public-blockchain/v1.1/cronos/evm/
```

**Public index page:** [https://aws-public-blockchain.s3.us-east-2.amazonaws.com/index.html#v1.1/cronos/evm/](https://aws-public-blockchain.s3.us-east-2.amazonaws.com/index.html#v1.1/cronos/evm/)

**Region:** `us-east-2` **Update frequency:** Nightly sync at **+2 UTC**

### Available Tables

| Table            | Description                                                                  |
| ---------------- | ---------------------------------------------------------------------------- |
| `blocks`         | One row per block — includes block metadata like hash, miner, and gas usage. |
| `transactions`   | One row per transaction — includes sender, recipient, gas, and value.        |
| `receipts`       | One row per transaction receipt — includes status, gas used, and logs count. |
| `logs`           | One row per emitted EVM log — includes address, topics, and data.            |
| `decoded_events` | Human-readable decoded events (topics and data mapped to ABI definitions).   |

### Common Prerequisites (Step 0)

Before you start, make sure you:

* Have internet access (dataset is **public**, no credentials needed).
* Use **region `us-east-2`** for AWS-based tools.
* Have a basic understanding of SQL (optional).

### Option 1: Amazon Athena (Console Method)

#### Step 0 — Create or Log In to AWS Account

Sign in at [https://aws.amazon.com/](https://aws.amazon.com/).

#### Step 1 — Open Athena in the `us-east-2` Region

Go to [https://console.aws.amazon.com/athena/](https://console.aws.amazon.com/athena/).

#### Step 2 — Create a Database

```sql
CREATE DATABASE IF NOT EXISTS cronos;
USE cronos;
```

#### Step 3 — Create Tables

**blocks**

```sql
CREATE EXTERNAL TABLE IF NOT EXISTS blocks (
  block_hash          string,
  block_number        bigint,
  block_timestamp     bigint,
  parent_hash         string,
  gas_limit           bigint,
  gas_used            bigint,
  miner               string,
  size                bigint,
  extra_data          string,
  base_fee_per_gas    bigint,
  logs_bloom          string,
  state_root          string,
  transactions_root   string,
  receipts_root       string
)
PARTITIONED BY (date string)
STORED AS PARQUET
LOCATION 's3://aws-public-blockchain/v1.1/cronos/evm/'
TBLPROPERTIES (
  'parquet.compression'='SNAPPY',
  'projection.enabled'='true',
  'projection.date.type'='date',
  'projection.date.format'='yyyy-MM-dd',
  'projection.date.range'='2021-11-01,NOW',
  'storage.location.template'='s3://aws-public-blockchain/v1.1/cronos/evm/blocks/date=${date}/'
);
```

**transactions**

```sql
CREATE EXTERNAL TABLE IF NOT EXISTS transactions (
  block_hash                 string,
  block_number               bigint,
  block_timestamp            bigint,
  transaction_hash           string,
  transaction_index          int,
  nonce                      string,
  from_address               string,
  to_address                 string,
  value                      string,
  input                      string,
  gas                        string,
  gas_price                  string,
  transaction_type           tinyint
)
PARTITIONED BY (date string)
STORED AS PARQUET
LOCATION 's3://aws-public-blockchain/v1.1/cronos/evm/'
TBLPROPERTIES (
  'parquet.compression'='SNAPPY',
  'projection.enabled'='true',
  'projection.date.type'='date',
  'projection.date.format'='yyyy-MM-dd',
  'projection.date.range'='2021-11-08,NOW',
  'storage.location.template'='s3://aws-public-blockchain/v1.1/cronos/evm/transactions/date=${date}/'
);
```

**receipts**

```sql
CREATE EXTERNAL TABLE IF NOT EXISTS receipts (
  block_hash            string,
  block_number          bigint,
  block_timestamp       bigint,
  transaction_hash      string,
  transaction_index     int,
  from_address          string,
  to_address            string,
  contract_address      string,
  cumulative_gas_used   string,
  gas_used              string,
  effective_gas_price   string,
  status                tinyint
)
PARTITIONED BY (date string)
STORED AS PARQUET
LOCATION 's3://aws-public-blockchain/v1.1/cronos/evm/'
TBLPROPERTIES (
  'parquet.compression'='SNAPPY',
  'projection.enabled'='true',
  'projection.date.type'='date',
  'projection.date.format'='yyyy-MM-dd',
  'projection.date.range'='2021-11-08,NOW',
  'storage.location.template'='s3://aws-public-blockchain/v1.1/cronos/evm/receipts/date=${date}/'
);
```

**logs**

```sql
CREATE EXTERNAL TABLE IF NOT EXISTS logs (
  block_hash            string,
  block_number          bigint,
  block_timestamp       bigint,
  transaction_hash      string,
  transaction_index     int,
  log_index             int,
  address               string,
  data                  string,
  topics                array<string>,
  removed               boolean
)
PARTITIONED BY (date string)
STORED AS PARQUET
LOCATION 's3://aws-public-blockchain/v1.1/cronos/evm/'
TBLPROPERTIES (
  'parquet.compression'='SNAPPY',
  'projection.enabled'='true',
  'projection.date.type'='date',
  'projection.date.format'='yyyy-MM-dd',
  'projection.date.range'='2021-11-08,NOW',
  'storage.location.template'='s3://aws-public-blockchain/v1.1/cronos/evm/logs/date=${date}/'
);
```

**decoded\_events**

```sql
CREATE EXTERNAL TABLE IF NOT EXISTS decoded_events (
  block_hash            string,
  block_number          bigint,
  block_timestamp       bigint,
  transaction_hash      string,
  transaction_index     int,
  log_index             int,
  address               string,
  event_hash            string,
  event_signature       string,
  topics                array<string>,
  args                  array<struct<key:string,value:string>>,
  removed               boolean
)
PARTITIONED BY (date string)
STORED AS PARQUET
LOCATION 's3://aws-public-blockchain/v1.1/cronos/evm/'
TBLPROPERTIES (
  'parquet.compression'='SNAPPY',
  'projection.enabled'='true',
  'projection.date.type'='date',
  'projection.date.format'='yyyy-MM-dd',
  'projection.date.range'='2021-11-08,NOW',
  'storage.location.template'='s3://aws-public-blockchain/v1.1/cronos/evm/decoded-events/date=${date}/'
);
```

#### Step 4 — Query Examples

```sql
SELECT COUNT(*) FROM blocks;
SELECT * FROM transactions WHERE to_address IS NOT NULL LIMIT 10;
SELECT event_name, COUNT(*) FROM decoded_events GROUP BY 1 ORDER BY 2 DESC;
```

### Option 2: ClickHouse

#### Step 0 — Install ClickHouse

```sql
docker run -d \
  --name clickhouse-server \
  -p 8123:8123 -p 9000:9000 \
  -e CLICKHOUSE_PASSWORD='YOUR_PASSWORD' \
  clickhouse/clickhouse-server
```

or

```bash
brew install clickhouse
```

#### Step 1 — Connect

```bash
clickhouse-client
```

#### Step 2 — Query Public Parquet Data

```sql
SELECT block_number, miner
FROM s3(
  'https://aws-public-blockchain.s3.us-east-2.amazonaws.com/v1.1/cronos/evm/blocks/date=*/*.parquet',
  'Parquet'
)
WHERE block_number = 20000000
ORDER BY block_number DESC;
```

```sql
SELECT block_number, miner
FROM s3(
  'https://aws-public-blockchain.s3.us-east-2.amazonaws.com/v1.1/cronos/evm/blocks/date=2025-01-01/*.parquet',
  'Parquet'
)
ORDER BY block_number DESC
LIMIT 5;
```

Repeat similarly for other tables by adjusting the path:

* `/transactions/date=*/*.parquet`
* `/receipts/date=*/*.parquet`
* `/logs/date=*/*.parquet`
* `/decoded_events/date=*/*.parquet`

No credentials or setup required.

### Option 3: Presto / Trino

#### Step 0 — Install

Follow: [https://trino.io/docs/current/installation.html](https://trino.io/docs/current/installation.html)

#### Step 1 — Configure Hive Connector

Edit `etc/catalog/hive.properties`:

```bash
connector.name=hive
hive.s3.path-style-access=true
hive.s3.region=us-east-2
```

#### Step 2 — Start Trino

```bash
bin/launcher start
```

#### Step 3 — Create Schema & Tables

**blocks**

```sql
CREATE SCHEMA IF NOT EXISTS cronos;
USE cronos;

CREATE TABLE blocks (
  block_hash VARCHAR,
  block_number BIGINT,
  block_timestamp BIGINT,
  parent_hash VARCHAR,
  gas_limit BIGINT,
  gas_used BIGINT,
  miner VARCHAR,
  size BIGINT,
  extra_data VARCHAR,
  base_fee_per_gas BIGINT,
  logs_bloom VARCHAR,
  state_root VARCHAR,
  transactions_root VARCHAR,
  receipts_root VARCHAR,
  date VARCHAR
)
WITH (
  external_location = 's3a://aws-public-blockchain/v1.1/cronos/evm/blocks/',
  format = 'PARQUET',
  partitioned_by = ARRAY['date']
);
```

**transactions**

```sql
CREATE TABLE transactions (
  block_hash VARCHAR,
  block_number BIGINT,
  block_timestamp BIGINT,
  transaction_hash VARCHAR,
  transaction_index INTEGER,
  nonce VARCHAR,
  from_address VARCHAR,
  to_address VARCHAR,
  value VARCHAR,
  input VARCHAR,
  gas VARCHAR,
  gas_price VARCHAR,
  transaction_type TINYINT,
  date VARCHAR
)
WITH (
  external_location = 's3a://aws-public-blockchain/v1.1/cronos/evm/transactions/',
  format = 'PARQUET',
  partitioned_by = ARRAY['date']
);
```

**receipts**

```sql
CREATE TABLE receipts (
  block_hash VARCHAR,
  block_number BIGINT,
  block_timestamp BIGINT,
  transaction_hash VARCHAR,
  transaction_index INTEGER,
  from_address VARCHAR,
  to_address VARCHAR,
  contract_address VARCHAR,
  cumulative_gas_used VARCHAR,
  gas_used VARCHAR,
  effective_gas_price VARCHAR,
  status TINYINT,
  date VARCHAR
)
WITH (
  external_location = 's3a://aws-public-blockchain/v1.1/cronos/evm/receipts/',
  format = 'PARQUET',
  partitioned_by = ARRAY['date']
);
```

**logs**

```sql
CREATE TABLE logs (
  block_hash VARCHAR,
  block_number BIGINT,
  block_timestamp BIGINT,
  transaction_hash VARCHAR,
  transaction_index INTEGER,
  log_index INTEGER,
  address VARCHAR,
  data VARCHAR,
  topics ARRAY<VARCHAR>,
  removed BOOLEAN,
  date VARCHAR
)
WITH (
  external_location = 's3a://aws-public-blockchain/v1.1/cronos/evm/logs/',
  format = 'PARQUET',
  partitioned_by = ARRAY['date']
);
```

**decoded events**

```sql
CREATE TABLE decoded_events (
  block_hash VARCHAR,
  block_number BIGINT,
  block_timestamp BIGINT,
  transaction_hash VARCHAR,
  transaction_index INTEGER,
  log_index INTEGER,
  address VARCHAR,
  event_hash VARCHAR,
  event_signature VARCHAR,
  topics ARRAY<VARCHAR>,
  args ARRAY<ROW(key VARCHAR, value VARCHAR)>,
  removed BOOLEAN,
  date VARCHAR
)
WITH (
  external_location = 's3a://aws-public-blockchain/v1.1/cronos/evm/decoded-events/',
  format = 'PARQUET',
  partitioned_by = ARRAY['date']
);
```

#### Step 4 — Query

```sql
SELECT COUNT(*) FROM blocks;
SELECT * FROM transactions WHERE date = '2025-10-08' LIMIT 5;
SELECT block_number, COUNT(*) FROM receipts GROUP BY block_number ORDER BY block_number DESC LIMIT 10;
```

### Option 4: DuckDB (Local)

#### Step 0 — Install

```python
pip install duckdb
```

#### Step 1 — Run Query (CLI)

```bash
duckdb -c "
SELECT block_number, miner
FROM read_parquet('https://aws-public-blockchain.s3.us-east-2.amazonaws.com/v1.1/cronos/evm/blocks/date=2025-01-01/*.parquet')
ORDER BY block_number DESC
LIMIT 5;
"
```

#### Step 2 — Python Example

```python
import duckdb
con = duckdb.connect()
con.sql("""
  SELECT block_number, miner
  FROM read_parquet('https://aws-public-blockchain.s3.us-east-2.amazonaws.com/v1.1/cronos/evm/blocks/date=2025-01-01/*.parquet')
  ORDER BY block_number DESC
  LIMIT 5;
""").show()
```

Works out-of-the-box — no AWS setup needed.

### Option 5: Other Tools

| Tool                  | Connection Example                                                                       |
| --------------------- | ---------------------------------------------------------------------------------------- |
| **Spark**             | `spark.read.parquet("s3a://aws-public-blockchain/v1.1/cronos/evm/transactions/date=*/")` |
| **Dask / Polars**     | `dd.read_parquet("https://.../*.parquet")` or `pl.scan_parquet()`                        |
| **AWS Glue**          | Create crawler with `s3://aws-public-blockchain/v1.1/cronos/evm/`                        |
| **Redshift Spectrum** | Create external schema and map Parquet tables to S3 paths                                |

### Summary

| Engine             | Auth Needed | Works With     | Notes                     |
| ------------------ | ----------- | -------------- | ------------------------- |
| **Athena**         | No          | AWS Console    | Easiest for browser users |
| **ClickHouse**     | No          | Local or Cloud | Fast columnar queries     |
| **Presto / Trino** | No          | Cluster setup  | Integrates with Hive      |
| **DuckDB**         | No          | Local, Python  | Lightweight and portable  |

## Data Model — Cronos Public Dataset

The Cronos dataset consists of five interrelated tables:

```
blocks
│
├── transactions
│     └── receipts
│          └── logs
│               └── decoded_events
```

Each layer represents a deeper level of blockchain execution — from the block level down to decoded smart contract events.

### Relationship Diagram (Text-Based)

```
+----------------------+
|       blocks         |
|----------------------|
| block_number (PK)    |
| block_hash           |
| block_timestamp      |
+----------------------+
           │
           │ 1 : N
           ▼
+----------------------+
|    transactions      |
|----------------------|
| transaction_hash (PK)|
| block_number (FK)    |
| from_address         |
| to_address           |
+----------------------+
           │
           │ 1 : 1
           ▼
+----------------------+
|      receipts        |
|----------------------|
| transaction_hash (PK)|
| block_number (FK)    |
| status               |
| gas_used             |
+----------------------+
           │
           │ 1 : N
           ▼
+----------------------+
|        logs          |
|----------------------|
| transaction_hash (FK)|
| log_index (PK)       |
| address              |
| topics               |
| data                 |
+----------------------+
           │
           │ 1 : 1
           ▼
+----------------------+
|   decoded_events     |
|----------------------|
| transaction_hash (FK)|
| log_index (FK)       |
| event_signature      |
| args (key/value)     |
+----------------------+

```

### Key Relationships

| Parent         | Child                                  | Join Columns                    | Relationship                      |
| -------------- | -------------------------------------- | ------------------------------- | --------------------------------- |
| `blocks`       | `transactions`                         | `block_number`                  | One block has many transactions   |
| `transactions` | `receipts`                             | `transaction_hash`              | One-to-one                        |
| `transactions` | `logs`                                 | `transaction_hash`              | One-to-many                       |
| `logs`         | `decoded_events`                       | `transaction_hash`, `log_index` | One-to-one                        |
| `blocks`       | `receipts` / `logs` / `decoded_events` | `block_number`                  | Cross-layer link for time context |
