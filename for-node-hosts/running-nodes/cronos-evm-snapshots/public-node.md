---
description: Public Node Blockchain Snapshots for Cronos Mainnet
---

# Public Node

## Introduction

[Public Node](https://www.publicnode.com/snapshots#cronos) Snapshots, provided by blockchain infrastructure company [Allnodes](https://www.allnodes.com/), offer a streamlined solution for Cronos node operators looking to quickly sync with the Cronos EVM network.

Available as one-time bulk downloads, the snapshots significantly reduce initial setup time and bandwidth requirements for new nodes. It provides pruned snapshots for both Cronos EVM and Cronos POS mainnet blockchains.

This guide walks you through the step-by-step process of performing a `Cronosd`s synchronization using [Public Node](https://www.publicnode.com/snapshots#cronos) Snapshots. The snapshots provided are pruned for optimize file size and download speed.

If a complete blockchain history to operate a full archive node is needed, [Native Snapshots](cronos-native-snapshots.md) archive snapshot are the recommended alternatives.

{% hint style="info" %}
Note

As of `v0.9.0`, we have merged the binary to support both levelDB and rocksDB. Therefore, make sure to select the right[`app-db-backend`](https://github.com/crypto-org-chain/cronos/releases/tag/v1.0.2)in your`app.toml`.
{% endhint %}

### Step 1: Download Public Node Snapshot

Download the latest Cronos EVM snapshot from [Public Node Page](https://www.publicnode.com/snapshots#cronos).

### Step 2: Cronosd Setup

Download the latest version of Cronosd Binary files from [Cronos Chain Github](https://github.com/crypto-org-chain/cronos/releases/latest) based on your preferred operating system.

Extract the downloaded file (`cronos_1.4.5_Darwin_arm64.tar.gz` is used as an example). After you download and unzip the `cronosd` to the location you desire. In terminal, change directory to the `bin` folder, where `cronosd` is located.

Follow the step from [Step 2-1 Initialize and Step 2-2 Configure cronosd](https://docs.cronos.com/for-node-hosts/running-nodes/cronos-mainnet#step-2-1-initialize-cronosd) to initialize and setup `cronosd`.

Example CLI sequence:

```shell
mkdir cronos-node
cd cronos-node
tar -zxvf cronos_1.4.9_Darwin_arm64.tar.gz
cd bin
./cronosd version
Expected output:
1.4.9
```

Make sure you also implement the changes from [Step 0 : Notes on Network Upgrade](https://docs.cronos.com/for-node-hosts/running-nodes/cronos-mainnet#step-0-notes-on-network-upgrade), and add these config items from [`v0.7.0`](https://github.com/crypto-org-chain/cronos/releases/tag/v0.7.0) into `app.toml` before upgrade:

<pre class="language-bash"><code class="lang-bash">### JSON RPC Configuration ###
<strong>[json-rpc]
</strong>feehistory-cap = 100
logs-cap = 10000
block-range-cap = 10000
http-timeout="30s"
http-idle-timeout="120s"

### EVM Configuration ###
[evm]
max-tx-gas-wanted=500000
</code></pre>

[Run Everything](https://docs.cronos.com/for-node-hosts/running-nodes/cronos-mainnet#step-3.-run-everything), `Cronosd` should be able to sync.

### Step 3: Extract Data from the Public Node Sync Snapshot

After you successfully initialized `cronosd`, you should find a new folder named `.cronos` under `/Users/<username>.` Move the `.lz4` snapshot file (e.g., `cronos-pruned-18949418-18949428.tar.lz4`) into the `.cronos` directory.\
Decompress with `tar` by:

```bash
tar -zxvf Users/<username>/.cronos/cronos-pruned-18949418-18949428.tar.lz4
```

{% hint style="info" %}
Note

All of the above files should be extracted to `/Users/<username>/.cronos/data`
{% endhint %}

### Step 4: Run Cronosd

Now your `cronosd` is updated to the latest height as the Public Node Sync file, you can run the node now with `cronosd start`.

That's it! You are now running a synced node on Cronos mainnet.
