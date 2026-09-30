---
description: Fast, reliable blockchain snapshots for Cronos networks
---

# Cronos Native Snapshots

### Introduction

These snapshots are available for both Cronos EVM Mainnet and Testnet networks, supporting multiple database backends including LevelDB, RocksDB, and VersionDB. Additionally, snapshots are provided for different node types to match your specific use case:

* _**Archive nodes**_: store complete blockchain history and state
* _**Default nodes**_: standard configuration with recent state data
* _**Pruned nodes**_**:** optimized storage with minimal historical data

All Cronos EVM snapshots can be accessed at: [https://snapshot.cronos.com/](https://snapshot.cronos.com/)

Using these snapshots significantly reduces the time required to get your Cronos node operational, allowing you to quickly join the network without waiting for a full synchronization from the genesis block.

### Step 1: Installation Guide <a href="#step-1-quicksync-download" id="step-1-quicksync-download"></a>

Before using snapshots, you'll need to install the Cronos binary. Follow these steps to get started:

1. Create a new directory and navigate to it:

```
mkdir cronos-node
cd cronos-node
```

2. Download the latest Cronos Binary [release](https://github.com/crypto-org-chain/cronos/releases):

<pre><code><strong>curl -LOJ https://github.com/crypto-org-chain/cronos/releases/download/v1.7.8/cronos_1.7.8_Darwin_arm64.tar.gz
</strong></code></pre>

3. Unpack & Install the binary files:

```
tar -zxvf cronos_1.7.8_Darwin_arm64.tar.gz
```

4. Verify the installation:

```
cd bin
./cronosd version
Expected output:
1.7.8
```

Once the Cronos binary is installed and verified, you can proceed with downloading and applying the appropriate snapshot for your node configuration.

### Step 2: Download Cronos EVM Snapshot

Download the snapshot you need. To avoid using outdated links, users is recommended to visit the [Cronos EVM Snapshots site](https://snapshot.cronos.com/) to obtain the latest available snapshot URL that matches your desired snapshot type.

{% hint style="warning" %}
**Please note**:\
The snapshot link shown below is **only an example**.\
Snapshot files are **retained for 14 days only** and automatically removed after that.

If the link provided in this guide has expired at the time of downloading, replace it manually by retrieving the latest link from the snapshot site above.
{% endhint %}

```
wget https://snapshot-download.cronos.com/cronos/mainnet-snapshot/leveldb/pruned/cronosmainnet_25-1_leveldb-pruned-20260707.tar.lz4
```

### Step 3: Unpack Cronos EVM Snapshot

First copy or move the snapshot to the hidden `.cronos/` directory in the root. Then unpack the file:

```
tar -zxvf cronosmainnet_25-1_leveldb-pruned-20260707.tar.lz4
```

{% hint style="info" %}
**Note:** Pre-requisite: gnu-tar and lz4\
`brew install gnu-tar lz4`
{% endhint %}

### Step 4: Initialize `cronosd` <a href="#step-1-quicksync-download" id="step-1-quicksync-download"></a>

Initialize your Cronos node with a unique identifier (moniker):

```
./cronosd init [moniker] --chain-id cronosmainnet_25-1
```

The `moniker` will be the displayed name of your node when connected to the Cronos network. Make sure to replace `[moniker]` with your desired node name without the square brackets.

### Step 4: Configure `cronosd` <a href="#step-1-quicksync-download" id="step-1-quicksync-download"></a>

Now you'll need to download the genesis file and configure your node settings:

1. Download and replace the Cronos Mainnet genesis file:

```
curl https://raw.githubusercontent.com/crypto-org-chain/cronos-mainnet/master/cronosmainnet_25-1/genesis.json > ~/.cronos/config/genesis.json
```

2. Verify the genesis file checksum:

```
if [[ $(sha256sum ~/.cronos/config/genesis.json | awk '{print $1}') = "58f17545056267f57a2d95f4c9c00ac1d689a580e220c5d4de96570fbbc832e1" ]]; then echo "OK"; else echo "MISMATCHED"; fi;
```

Expected output:

```
OK
```

3. Configure network settings:

Update the configuration file with the required seed nodes and timing parameters:

```
sed -i.bak -E 's#^(seeds[[:space:]]+=[[:space:]]+).*$#\1"0d5cf1394a1cfde28dc8f023567222abc0f47534@seed-0.cronos.com:26656,3032073adc06d710dd512240281637c1bd0c8a7b@seed-1.cronos.com:26656,04f43116b4c6c70054d9c2b7485383df5b1ed1da@seed-2.cronos.com:26656,337377dcda43d79c537d2c4d93ad3b698ce9452e@bd-cronos-mainnet-seed-node-01.bdnodes.net:26656"#' ~/.cronos/config/config.toml

sed -i.bak -E 's#^(create_empty_blocks_interval[[:space:]]+=[[:space:]]+).*$#\1"5s"#' ~/.cronos/config/config.toml

sed -i.bak -E 's#^(timeout_commit[[:space:]]+=[[:space:]]+).*$#\1"5s"#' ~/.cronos/config/config.toml
```

4. Update the `minimum-gas-prices` in the app.toml file:

```
minimum-gas-prices = "46000000000000basecro"
```

### Step 5: Start the Node

```
  $ ./cronosd start
```
