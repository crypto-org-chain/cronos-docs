---
description: >-
  Download the latest Cronos Chain snapshots to accelerate node setup and
  maintain sync with current network data
hidden: true
---

# Quicksync

### Introduction

The Cronos team has partnered with Chainlayer to provide the Quicksync service and make the process more efficient for our users.

Users can visit [Chainlayer QuickSync Cronos page](https://quicksync.io/cronos) and download the snapshots for Cronos Chain with different pruning settings.

{% hint style="info" %}
IMPORTANT

In order to use Quicksync you need to first complete [Step 3-2](../cronos-mainnet/#step-3-2.-run-everything) with the latest binary.

\
**Note** that as of `v0.9.0`, we have merged the binary to support both levelDB and rocksDB. Therefore, make sure to select the right [`app-db-backend`](https://github.com/crypto-org-chain/cronos/releases/tag/v1.0.2)in your `app.toml`.
{% endhint %}

### Step 1: Quicksync Download

After executing the command `./cronosd` start at [Step 3-2](../cronos-mainnet/#step-3-2.-run-everything) Run everything, it starts the node and syncs the blockchain data. When you see it starts to sync from 0, you can terminate the terminal.\
\
Both RocksDB and LevelDB snapshots are now available for Cronos Chain.

### Step 2: Quicksync Extract

To start with Quicksync, you need to run `brew install lz4` to install lz4 in a new terminal.\
Then download the file with preferred pruning settings directly from [Quicksync](https://quicksync.io/cronos).

### Step 3: Quicksync Setup

In the following steps, we will take as an example the version\
`cronosmainnet_25-1-pruned.20220309.2010.tar.lz4`.

* (Optional) you can download an addressbook from [Quicksync](https://quicksync.io/cronos) to get connected to peers faster. After downloading it, place the new `addrbook.json` under `.cronos/config` folder and restart your node to take effect.
* Now add the `cronosmainnet_25-1-pruned.20220309.2010.tar.lz4` inside `.cronos`

Then perform the following steps:

* Change the path under `.cronos` with `cd .cronos`
* Decompress with `lz4` and `tar` by `lz4 -d /Users/<username>/.cronos/cronosmainnet_25-1-pruned.20220308.2010.tar.lz4 | tar -xv`, as below:

{% hint style="info" %}
Example: Decompress the QuickSync pack with `lz4`

```bash
  x data/
  x data/application.db/
  x data/application.db/84856034.ldb
  x data/application.db/83264153.ldb
  ...
  x data/snapshots/metadata.db/CURRENT.bak
  x data/snapshots/metadata.db/MANIFEST-000107
  x data/snapshots/metadata.db/LOG
```
{% endhint %}

The original data folder under `.cronos` is overwritten with this step (it takes around 5-7 mins to decompress the pruned version \~50GB).

### Step 4: Sync with Quicksync

{% hint style="info" %}
Example: Restart `cronosd start` with QuickSync

```bash
  $ ./cronosd start
  6:59PM INF Unlocking keyring
  6:59PM INF starting ABCI with Tendermint
  6:59PM INF Starting multiAppConn service impl=multiAppConn module=proxy server=node
  6:59PM INF Starting localClient service connection=query impl=localClient module=abci-client server=node
  ...
  6:59PM INF ABCI Replay Blocks appHeight=1813707 module=consensus server=node stateHeight=1813707 storeHeight=1813707
```
{% endhint %}
