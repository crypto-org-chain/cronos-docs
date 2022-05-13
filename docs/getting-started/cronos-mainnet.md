---
meta:
  - name: "title"

    content: Cronos | Crypto.org EVM Chain | Running Nodes On Mainnet

  - name: "description"

    content: Learn how to setup a Validator or a full node on Crypto.org Cronos Mainnet Beta cronosmainnet_25-1 in this technical documentation.

  - name: "og:title"

    content: Cronos | Crypto.org EVM Chain | Running Nodes On Mainnet

  - name: "og:type"

    content: Website

  - name: "og:description"

    content: Learn how to setup a Validator or a full node on Crypto.org Cronos Mainnet Beta cronosmainnet_25-1 in this technical documentation.

  - name: "og:image"

    content: https://cronos.org/og-image.png

  - name: "twitter:title"

    content: Cronos | Crypto.org EVM Chain | Running Nodes On Mainnet

  - name: "twitter:site"

    content: "@cryptocom"

  - name: "twitter:card"

    content: summary_large_image

  - name: "twitter:description"

    content: Learn how to setup a Validator or a full node on Crypto.org Cronos Mainnet Beta cronosmainnet_25-1 in this technical documentation.

  - name: "twitter:image"

    content: https://cronos.org/og-image.png

canonicalUrl: https://cronos.org/docs/getting-started/cronos-mainnet.html
---

# Cronos Mainnet: Running Nodes

This is a detailed documentation for setting up a Validator or a full node on Crypto.org Cronos mainnet Beta `cronosmainnet_25-1`.

## Step 0 : Notes on "Huygen" Network upgrade

Before we start, please note that there was "*Huygen*" network upgrade at the block height `2,693,800`, which requires the node operator to update their Cronos Mainnet binary `cronosd` from `v0.6.*` to `v0.7.0`. 

For the host who would like to build a Full Node with complete blockchain data from scratch, one would need to:
1. Start the node with the older binary version `v0.6.*`; 
1. Sync-up with the blockchain until it reaches the target upgrade block height `2,693,800`;
1. Update `app.toml` with [new config items](https://github.com/crypto-org-chain/cronos/releases/tag/v0.7.0);
1. Update the binary to `v0.7.0`;
1. Restart the node;

Users can refer to the [upgrade guide of "Huygen"](https://github.com/crypto-org-chain/cronos-docs/blob/master/docs/getting-started/huygen.md) for the detailed upgrade steps.


## Pre-requisites

### Supported OS

We officially support macOS, Windows and Linux only. Other platforms may work but there is no guarantee. We will extend our support to other platforms after we have stabilized our current architecture.

### Prepare your machine

- To run Cronos mainnet Beta nodes, you will need a machine with the following minimum requirements:

  - 4-core, x86_64/ARM architecture processor;

  - 16 GB RAM;

  - 1 TB of storage space.

## Step 1. Get the Cronos mainnet Beta binary

::: tip Remarks:

The following is the minimal setup for a **validator node** / **full node**.

:::

To simplify the following step, we will be using **Linux** (Intel x86) for illustration. Binary for

**Mac** ([Intel x86](https://github.com/crypto-org-chain/cronos/releases/download/v0.6.5/cronos_0.6.5_Darwin_x86_64.tar.gz) / [M1](https://github.com/crypto-org-chain/cronos/releases/download/v0.6.5/cronos_0.6.5_Darwin_arm64.tar.gz)) and [Windows](https://github.com/crypto-org-chain/cronos/releases/download/v0.6.5/cronos_0.6.5_Windows_x86_64.zip) are also available.

- To install released **Cronos mainnet Beta binaries** from github:

  ```bash

  $ curl -LOJ https://github.com/crypto-org-chain/cronos/releases/download/v0.6.5/cronos_0.6.5_Linux_x86_64.tar.gz

  $ tar -zxvf cronos_0.6.5_Linux_x86_64.tar.gz

  ```

  Afterward, you can check the version of `cronosd` by

  ```bash

  $ ./cronosd version

  0.6.5

  ```

## Step 2. Configure `cronosd`

### Step 2-0 (Optional) Clean up the old blockchain data

- If you have joined `cronostestnet_338-3` before, you would have to clean up the old blockchain data and start over again, it can be done by running:

  ```bash

  $ ./cronosd unsafe-reset-all

  ```

  and remove the old genesis file by

  ```bash

  $ rm ~/.cronos/config/genesis.json

  ```

Before kick-starting your node, we will have to configure your node so that it connects to the Cronos mainnet Beta:

### Step 2-1 Initialize `cronosd`

- First of all, you can initialize cronosd by:

  ```bash

    $ ./cronosd init [moniker] --chain-id cronosmainnet_25-1

  ```

  This `moniker` will be the displayed id of your node when connected to Cronos Chain network.

  When providing the moniker value, make sure you drop the square brackets since they are not needed.

  The example below shows how to initialize a node named `pegasus-node` :

  ```bash

    $ ./cronosd init pegasus-node --chain-id cronosmainnet_25-1

  ```

  ::: tip NOTE

  - Depending on your cronosd home setting, the cronosd configuration will be initialized to that home directory. To simply the following steps, we will use the default cronosd home directory `~/.cronos/` for illustration.

  - You can also put the `cronosd` to your binary path and run it by `cronosd`

    :::

### Step 2-2 Configure cronosd

- Download and replace the Cronos Mainnet Beta `genesis.json` by:

  ```bash

  $ curl https://raw.githubusercontent.com/crypto-org-chain/cronos-mainnet/master/cronosmainnet_25-1/genesis.json > ~/.cronos/config/genesis.json

  ```

- Verify sha256sum checksum of the downloaded `genesis.json`. You should see `OK!` if the sha256sum checksum matches.

  ```bash

  $ if [[ $(sha256sum ~/.cronos/config/genesis.json | awk '{print $1}') = "58f17545056267f57a2d95f4c9c00ac1d689a580e220c5d4de96570fbbc832e1" ]]; then echo "OK"; else echo "MISMATCHED"; fi;



  OK!

  ```

  ::: tip NOTE

  - For Mac environment, `sha256sum` was not installed by default. In this case, you may setup `sha256sum` with this command:

    ```bash

    function sha256sum() { shasum -a 256 "$@" ; } && export -f sha256sum

    ```

    :::

- (Validator node only) In `~/.cronos/config/app.toml`, update minimum gas price to avoid [transaction spamming](https://github.com/cosmos/cosmos-sdk/issues/4527)

  ```bash

  $ sed -i.bak -E 's#^(minimum-gas-prices[[:space:]]+=[[:space:]]+).*$#\1"5000000000000basecro"#' ~/.cronos/config/app.toml

  ```

-  For network configuration, in `~/.cronos/config/config.toml`, validator nodes need to modify the configurations of `seed`, `create_empty_blocks_interval` and `timeout_commit`. For non-validator full nodes, only `seed` modification is required:

    ```bash

    $ sed -i.bak -E 's#^(seeds[[:space:]]+=[[:space:]]+).*$#\1"0d5cf1394a1cfde28dc8f023567222abc0f47534@cronos-seed-0.crypto.org:26656,3032073adc06d710dd512240281637c1bd0c8a7b@cronos-seed-1.crypto.org:26656,04f43116b4c6c70054d9c2b7485383df5b1ed1da@cronos-seed-2.crypto.org:26656"#' ~/.cronos/config/config.toml

    $ sed -i.bak -E 's#^(create_empty_blocks_interval[[:space:]]+=[[:space:]]+).*$#\1"5s"#' ~/.cronos/config/config.toml

    $ sed -i.bak -E 's#^(timeout_commit[[:space:]]+=[[:space:]]+).*$#\1"5s"#' ~/.cronos/config/config.toml

    ```

-  If you would like to build an archive node that allows you to query all the historical block data - kindly update the pruning setting to `"nothing"`  by

    ```bash

    $ sed -i.bak -E 's#^(pruning[[:space:]]+=[[:space:]]+).*$#\1"nothing"#' ~/.cronos/config/app.toml

    ```

::: tip NOTE

- For Mac environment, if `jq` is missing, you may install it by: `brew install jq`

  :::

## Step 3. Run everything

::: warning CAUTION

This page only shows the minimal setup for validator / full node.

Furthermore, you may want to run full nodes

as sentries (see [Tendermint](https://docs.tendermint.com/master/tendermint-core/running-in-production.html)), restrict your validator connections to only connect to your full nodes, test secure storage of validator keys etc.

:::

### Step 3-1. Create a new key and address (Validator node only)

Run the followings to create a new key. For example, you can create a key with the name `Default` by:

```bash

  $ ./cronosd keys add Default

```

You should obtain an address with `crc` prefix, e.g. `crc10u5mgfflasrfj9s94mt8l9yucrt2gzhcyt5tsg`. This will be the address for performing transactions.

### Step 3-2. Run everything

Once the `cronosd` has been configured, we are ready to start the node and sync the blockchain data:

- Start cronosd, e.g.:

```bash

  $ ./cronosd start

```

::: tip Remarks:

If you see errors saying `too many files opened...`, then you need to set a higher number for maximum open file descriptors in your OS.

If you are on OSX or Linux, then the following could be useful:

```bash

# Check current max fd

$ ulimit -n

# Set a new max fd

$ ulimit -Sn [NEW_MAX_FILE_DESCRIPTOR]

# Example

$ ulimit -Sn 4096

```

:::

- _(Optional for Linux)_ Start cronosd with systemd service, e.g.:

```bash

  $ curl -s https://raw.githubusercontent.com/crypto-org-chain/cronos-docs/master/systemd/create-service.sh -o create-service.sh && curl -s https://raw.githubusercontent.com/crypto-org-chain/cronos-docs/master/systemd/cronosd.service.template -o cronosd.service.template

  $ chmod +x ./create-service.sh && ./create-service.sh

  $ sudo systemctl start cronosd

  # view log

  $ journalctl -u cronosd -f

```

:::details Example: /etc/systemd/system/cronosd.service created by script

```bash

# /etc/systemd/system/cronosd.service

[Unit]

Description=cronosd

ConditionPathExists=/usr/local/bin/cronosd

After=network.target



[Service]

Type=simple

User=ubuntu

WorkingDirectory=/usr/local/bin

ExecStart=/usr/local/bin/cronosd start --home /home/ubuntu/.cronos

Restart=on-failure

RestartSec=10

LimitNOFILE=4096



[Install]

WantedBy=multi-user.target

```

:::

It should begin fetching blocks from the other peers.

- You can query the node syncing status by

  ```bash

  $ ./cronosd status 2>&1 | jq '.SyncInfo.catching_up'

  ```

  If the above command returns `false`, It means that your node **is fully synced**; otherwise, it returns `true` and implies your node is still catching up.

- One can check the current block height by querying the public full node by:

  ```bash

  curl -s https://rpc.cronos.org/commit | jq "{height: .result.signed_header.header.height}"

  ```

  and you can check your node's progress (in terms of block height) by

  ```bash

  $ ./cronosd status 2>&1 | jq '.SyncInfo.latest_block_height'

  ```


## *(Optional)* Step 4. QuickSync

Syncing Cronos could be a time-consuming process, Crypto.org Chain team has partnered with Chainlayer to provide the “Quicksync” service to make the process more efficient for our users. 

Users can visit [Chainlayer QuickSync Crypto.org page](https://quicksync.io/networks/crypto.html) and download the snapshots for Cronos Chain and Crypto.org Chain with different pruning settings (*currently only leveldb downloads are available*). You may refer to the following guide to implement Quicksync.


### Step 4-1 Quicksync Download 
After executing the command `./cronosd` start at Step 3-2 Run everything, it starts the node and syncs the blockchain data. When you see it starts to sync from 0, you can terminate the terminal. 

:::details Example: `chain-maind start` with 0 height originally

```bash

  $ ./cronosd start
  7:13PM INF Unlocking keyring
  7:13PM INF starting ABCI with Tendermint
  7:13PM INF Starting multiAppConn service impl=multiAppConn module=proxy server=node
  7:13PM INF Starting localClient service connection=query impl=localClient module=abci-client server=node
  ...
  7:13PM INF ABCI Handshake App Info hash= height=0 module=consensus protocol-version=0 server=node software-version=0.6.5
  7:13PM INF ABCI Replay Blocks appHeight=0 module=consensus server=node stateHeight=0 storeHeight=0

```

:::

To start with Quicksync, you need to run `brew install lz4`  to install lz4 in a new terminal. Then download the file with preferred pruning settings directly from https://quicksync.io/networks/crypto.html. 


#### There are three versions for Cronos Network:

**Cronosmainnet_25-1-pruned**
- Pruned snapshot is the quickest way to get a node running. If you just would like to give a shot, use it for a validator or sentry node, the pruned snapshot will be a good choice. Pruned snapshots have tx index disabled to save disk/download size, which also will make API queries not work backward in time. If you still want to use a pruned snapshot to start an API node, then you can enable tx index on your end to start indexing blocks from when your startup your node. But you will not be able to query anything earlier than that.

**Cronosmainnet_25-1-default**
- Default is a good middle choice between everything. It will work in most use cases, validator, sentry node, API nodes. It has tx index enabled, so you can query block back in time. The only thing that default nodes do not have is the full history from the start of the chain or chain upgrade.

**Cronosmainnet_25-1-archive**
- For the users who would like to query the old block, you may pick the archive one for complete blockchain data. The archive node will have all the blocks from the chain start or chain upgrade with full indexing. So this is a good option for API nodes if you need to have access to the whole chain history. Archives grow fast in size and might be more sluggish to run, so if you need something simpler default or a pruned kickstarted API node might solve most of the needs out there.

### Step 4-2 Quicksync Setup 

In the following steps, we will take the version `cronosmainnet_25-1-pruned.20220309.2010.tar.lz4` as an example. 

(Optional) you can [download an addressbook](https://quicksync.io/addrbook.cronos.json) to get connected to peers faster. After downloading it, place the new `addrbook.json` under `.cronos/config` folder and restart your node to take effect.

Now add the `cronosmainnet_25-1-pruned.20220309.2010.tar.lz4` inside `.cronos`

Then perform the following steps:
- Change the path under  `.cronos` with `cd .cronos`
- Decompress with `lz4` and `tar` by `lz4 -d /Users/<username>/.cronos/cronosmainnet_25-1-pruned.20220308.2010.tar.lz4 | tar -xv`, as below:

:::details Example: Decompress the QuickSync pack with `lz4`

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

:::

The original data folder under `.cronos` is overwritten with this step (it takes around 5-7 mins to decompress the pruned version ~50GB).

### Step 4-3 Sync with Quicksync
Direct back to the parent directory of current directory(`/Users/<username>/` in this case) by `cd..`. Then run Cronos again with `./cronosd start` and now it suppose to start the node and sync the blockchain data from the height of `1813707`. 

:::details Example: Restart `chain-maind start` with QuickSync

```bash

  $ ./cronosd start
  6:59PM INF Unlocking keyring
  6:59PM INF starting ABCI with Tendermint
  6:59PM INF Starting multiAppConn service impl=multiAppConn module=proxy server=node
  6:59PM INF Starting localClient service connection=query impl=localClient module=abci-client server=node
  ...
  6:59PM INF ABCI Replay Blocks appHeight=1813707 module=consensus server=node stateHeight=1813707 storeHeight=1813707

```

:::

---
## Cronos mainnet explorer: CronoScan

- You can lookup data within the `cronosmainnet_25-1` network by the [explorer](https://cronoscan.com/);
