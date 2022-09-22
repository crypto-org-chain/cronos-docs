# State-sync

## Pre-requisites

### Supported OS

Linux x86\_64 is confirmed to work. Other platforms may work but there is no guarantee. We will extend our support to other operating systems after we have stabilised our current architecture.

### Prepare your machine

To run Cronos Mainnet nodes, you will need a machine with the following minimum requirements:

* 4-core, x86\_64 / ARM architecture processor
* 16 GB RAM
* 1 TB of storage space.

## Introduction

The fastest way to get a node synced to the latest block-height, is by using [State-sync](https://docs.tendermint.com/master/tendermint-core/state-sync.html). With state-sync your node downloads a data snapshot near the head of the chain and verifies this data. This leads to drastically shorter times to join the network.

Keep in mind that the blocks before state-sync trust height will not be queryable. \
So, in order to run a full node, it is better not to use state-sync, but use [Quicksync](quicksync.md)'s archive snapshot instead.&#x20;

{% hint style="info" %}
IMPORTANT

State-sync depends on the ability to pull a snapshot from its persistent-peers, so there is some amount of timing and luck involved with this method. Although it is the fastest way, it is not always going to work, in case state-sync is not syncing, we recommend to use [quicksync](quicksync.md), although it takes longer time to download the snapshot, this method is more guaranteed to work.
{% endhint %}

## Step 1. Get the latest cronosd binary

{% hint style="info" %}
The latest Cronosd [version](https://github.com/crypto-org-chain/cronos/releases) release is `cronosd v0.8.0`
{% endhint %}

* Install the **Cronos Mainnet** binaries from github:

<pre class="language-bash"><code class="lang-bash"><strong>curl -LOJ https://github.com/crypto-org-chain/cronos/releases/download/v0.8.0/cronos_0.8.0_Linux_x86_64.tar.gz
</strong>tar -zxvf cronos_0.8.0_Linux_x86_64.tar.gz</code></pre>

* Check that **`cronosd`** is effectively installed:

```bash
./bin/cronosd version
0.8.0
```



## Step 2. Configure cronosd

* Initialize **cronosd.** Replace the **\[moniker]** with an ID for your node. ****&#x20;

```bash
./bin/cronosd init [moniker] --chain-id cronosmainnet_25-1
```

* Download and replace the Cronos Mainnet `genesis.json` by:

```bash
curl https://raw.githubusercontent.com/crypto-org-chain/cronos-mainnet/master/cronosmainnet_25-1/genesis.json > ~/.cronos/config/genesis.json
```

* Verify the sha256sum checksum of the`genesis.json`. You should see `OK!` if the sha256sum checksum matches.

```bash
if [[ $(sha256sum ~/.cronos/config/genesis.json | awk '{print $1}') = "58f17545056267f57a2d95f4c9c00ac1d689a580e220c5d4de96570fbbc832e1" ]]; then echo "OK"; else echo "MISMATCHED"; fi;
OK!
```

* Replace the following parameters in the `~/.cronos/config/config.toml` file, by executing:

```bash
LATEST_HEIGHT=$(curl -s https://rpc.cronos.org:443/block | jq -r .result.block.header.height); \
BLOCK_HEIGHT=$((LATEST_HEIGHT - 1000)); \
TRUST_HASH=$(curl -s "https://rpc.cronos.org:443/block?height=$BLOCK_HEIGHT" | jq -r .result.block_id.hash)

sed -i.bak -E "s|^(enable[[:space:]]+=[[:space:]]+).*$|\1true| ; \
s|^(rpc_servers[[:space:]]+=[[:space:]]+).*$|\1\"https://rpc.cronos.org:443,https://rpc.cronos.org:443\"| ; \
s|^(trust_height[[:space:]]+=[[:space:]]+).*$|\1$BLOCK_HEIGHT| ; \
s|^(trust_hash[[:space:]]+=[[:space:]]+).*$|\1\"$TRUST_HASH\"| ; \
s|^(persistent_peers[[:space:]]+=[[:space:]]+).*$|\1\"0d5cf1394a1cfde28dc8f023567222abc0f47534@cronos-seed-0.crypto.org:26656,3032073adc06d710dd512240281637c1bd0c8a7b@cronos-seed-1.crypto.org:26656,04f43116b4c6c70054d9c2b7485383df5b1ed1da@cronos-seed-2.crypto.org:26656,337377dcda43d79c537d2c4d93ad3b698ce9452e@bd-cronos-mainnet-seed-node-01.bdnodes.net:26656\"| ; \
s|^(seeds[[:space:]]+=[[:space:]]+).*$|\1\"\"|" ~/.cronos/config/config.toml
```

## Step 3. Run everything

* Now that `cronosd` has been configured, we are ready to start the node:

```bash
./bin/cronosd start

1:40AM INF Unlocking keyring
1:40AM INF starting ABCI with Tendermint
1:40AM INF service start impl=multiAppConn module=proxy msg={} server=node
1:40AM INF service start connection=query impl=localClient module=abci-client msg={} server=node
1:40AM INF service start connection=snapshot impl=localClient module=abci-client msg={} server=node
1:40AM INF service start connection=mempool impl=localClient module=abci-client msg={} server=node
1:40AM INF service start connection=consensus impl=localClient module=abci-client msg={} server=node
1:40AM INF service start impl=EventBus module=events msg={} server=node
1:40AM INF service start impl=PubSub module=pubsub msg={} server=node
1:40AM INF service start impl=IndexerService module=txindex msg={} server=node
1:40AM INF Version info block=11 p2p=8 server=node tendermint_version=0.34.20
1:40AM INF This node is not a validator addr=DB03363D854BA491F280177BE33DE527F7542094 module=consensus pubKey=/L3Qe1oaNfrDael3QAmILSz5bLre9NAmKd48wd4eW8w= server=node
1:40AM INF P2P Node ID ID=d799c596250f27b5435775fdabb86d469dc5a784 file=/home/ubuntu/.cronos/config/node_key.json module=p2p server=node
1:40AM INF Adding persistent peers
```

This will take a couple of minutes, if your node manages to state-sync, you should see that  snapshot chunks are being downloaded, and your node starts signing blocks.

To check the current node syncing status:

```bash
./bin/cronosd status 2>&1 | jq '.SyncInfo.catching_up'
```



That's it! You are now running a synced node on **Cronos Mainnet**!
