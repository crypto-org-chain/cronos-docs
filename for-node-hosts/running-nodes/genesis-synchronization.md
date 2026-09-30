---
hidden: true
---

# Genesis Synchronization

This page describes how to sync a full node on Cronos mainnet `cronosmainnet_25-1` from the genesis block. Alternatively, you can set up a node using snapshots (see the end of this page).

### Notes on Network Upgrade

Before we start, please note that there was "_Huygen_" network upgrade at the block height `2,693,800`, which requires the node operator to update their Cronos Mainnet binary `cronosd` from `v0.6.*` to `v0.7.0`.

For the host who would like to build a Full Node with complete blockchain data from scratch, one would need to:

<table><thead><tr><th width="270">Block Height</th><th width="196">Binary Version</th><th>Instruction</th></tr></thead><tbody><tr><td><code>1 ~ 2693800</code></td><td><a href="https://github.com/crypto-org-chain/cronos/releases?page=3"><code>cronos_v0.6.*</code></a></td><td>Start the node with the older binary version <a href="https://github.com/crypto-org-chain/cronos/releases?page=3"><code>cronos_v0.6.*</code></a>.<br>Sync-up with the blockchain until it reaches the target upgrade block height <code>2,693,800</code></td></tr><tr><td><code>2693800 ~ 3982500</code></td><td><a href="https://github.com/crypto-org-chain/cronos/releases/tag/v0.7.0"><code>cronos_v0.7.0</code></a></td><td>After it reaches the block height <code>2,693,800</code>, update <code>app.toml</code> with <a href="https://github.com/crypto-org-chain/cronos/releases/tag/v0.7.0">new config items</a>.<br><br>Update the binary to <a href="https://github.com/crypto-org-chain/cronos/releases/tag/v0.7.0"><code>cronos_v0.7.0</code></a>.<br><br>Restart the node.</td></tr><tr><td><code>3982500</code></td><td><a href="https://github.com/crypto-org-chain/cronos/releases/tag/v0.8.3"><code>cronos_v0.8.3</code></a></td><td>After reaching block height, update <a href="https://github.com/crypto-org-chain/cronos/releases/tag/v0.8.2"><code>iavl-disable-fastnode</code></a><code>in app.toml</code><br><br>Update the binary to <a href="https://github.com/crypto-org-chain/cronos/releases/tag/v0.8.3"><code>cronos_v0.8.3</code></a> and restart the node</td></tr><tr><td><code>6542800</code></td><td><a href="https://github.com/crypto-org-chain/cronos/releases/tag/v1.0.2"><code>cronos_v1.0.2</code></a></td><td><p>After reaching block height, update <a href="https://github.com/crypto-org-chain/cronos/releases/tag/v1.0.2"><code>app-db-backend</code></a> in <code>app.toml</code>. For<code>[evm]max-tx-gas-wanted</code>, it's recommended for validators to make the value as <code>500000</code>.<br><br>Update the binary to <code>cronos_v1.0.2</code>.<br></p><p>Restart the node.</p></td></tr><tr><td><code>11608760</code></td><td><a href="https://github.com/crypto-org-chain/cronos/releases/tag/v1.0.15"><code>cronos v1.0.15</code></a></td><td><p>After reaching block height, update the binary to <code>v1.0.15</code>.</p><p>Note: auto-pause the node before the upgrade height, we can restart cronosd with the flag <code>--halt-height 11608759</code>.</p><p><br>Restart the node.</p></td></tr><tr><td><code>13184000</code></td><td><a href="https://github.com/crypto-org-chain/cronos/releases/tag/v1.1.0"><code>cronos v1.1.0</code></a></td><td>After reaching block height, update the binary to <code>v1.1.0</code><br><br>Please refer to the <a href="https://github.com/crypto-org-chain/cronos/releases/tag/v1.1.0">release note</a> for config changes.<br><br>Restart the node.</td></tr><tr><td><code>13520000</code></td><td><a href="https://github.com/crypto-org-chain/cronos/releases/tag/v1.2.0"><code>cronos v1.2.0</code></a></td><td><p>After reaching block height, update the binary to <code>v1.2.0</code>.</p><p>Restart the node.</p></td></tr><tr><td><code>14920000</code></td><td><a href="https://github.com/crypto-org-chain/cronos/releases/tag/v1.3.0"><code>cronos v1.3.0</code></a></td><td><p>After reaching block height, update the binary to <code>v1.3.0</code>.</p><p>Restart the node.</p></td></tr><tr><td><code>17155000</code></td><td><a href="https://github.com/crypto-org-chain/cronos/releases/tag/v1.4.0"><code>cronos v1.4.0</code></a></td><td><p>After reaching block height, update the binary to <code>v1.4.0</code><br></p><p>For config changes, please refer to the <a href="https://github.com/crypto-org-chain/cronos/releases/tag/v1.4.0">release note</a> for config changes.</p><p>Restart the node.</p></td></tr><tr><td><code>38432212</code></td><td><a href="https://github.com/crypto-org-chain/cronos/releases/tag/v1.5.1"><code>cronos v1.5.1</code></a></td><td><p>After reaching block height, update the binary to <code>cronos v1.5.1</code><br></p><p>Update <code>query-gas-limit = "100000000</code> in <code>app.toml</code>.<br></p><p>Restart the node.</p></td></tr><tr><td><code>45062800</code></td><td><a href="https://github.com/crypto-org-chain/cronos/releases/tag/v1.6.1"><code>cronos v1.6.1</code></a></td><td><p>After reaching block height, update the binary to <code>cronos v1.6.1</code><br></p><p>For config changes, please refer to the <a href="https://github.com/crypto-org-chain/cronos/releases/tag/v1.6.1">release note</a> for config changes.</p><p>Restart the node.</p></td></tr><tr><td><code>58825800</code></td><td><a href="https://github.com/crypto-org-chain/cronos/releases/tag/v1.7.0">cronos v1.7.0</a></td><td><p>After reaching block height, update the binary to <code>cronos v1.7.0</code>.</p><p>Restart the node.</p></td></tr></tbody></table>

Users can refer to the upgrade guide of "Huygen" for the detailed upgrade steps.

{% hint style="info" %}
To patch "unlucky" transactions, follow this guide on patching unlucky tx
{% endhint %}

### Initialize `cronosd`

* First of all, you can initialize cronosd by:

```bash
$ ./cronosd init [moniker] --chain-id cronosmainnet_25-1
```

This `moniker` will be the displayed id of your node when connected to Cronos Chain network.

When providing the moniker value, make sure you drop the square brackets since they are not needed. The example below shows how to initialize a node named `pegasus-node`:

```bash
$ ./cronosd init pegasus-node --chain-id cronosmainnet_25-1
```

{% hint style="info" %}
Note:

* Depending on your cronosd home setting, the cronosd configuration will be initialized to that home directory. To simply the following steps, we will use the default cronosd home directory `~/.cronos/` for illustration.
* You can also put the `cronosd` to your binary path and run it by `cronosd`
{% endhint %}

### Download and verify the genesis file

* Download and replace the Cronos Mainnet `genesis.json` by:

```bash
$ curl https://raw.githubusercontent.com/crypto-org-chain/cronos-mainnet/master/cronosmainnet_25-1/genesis.json > ~/.cronos/config/genesis.json
```

* Verify sha256sum checksum of the downloaded `genesis.json`. You should see `OK!` if the sha256sum checksum matches.

```bash
$ if [[ $(sha256sum ~/.cronos/config/genesis.json | awk '{print $1}') = "58f17545056267f57a2d95f4c9c00ac1d689a580e220c5d4de96570fbbc832e1" ]]; then echo "OK"; else echo "MISMATCHED"; fi;
OK!
```

{% hint style="info" %}
NOTE

For Mac environment, `sha256sum` was not installed by default. In this case, you may setup `sha256sum` with this command:

```bash
function sha256sum() { shasum -a 256 "$@" ; } && export -f sha256sum
```
{% endhint %}

### Network configuration

* For network configuration, in `~/.cronos/config/config.toml`, validator nodes need to modify the configurations of `seed`, `create_empty_blocks_interval` and `timeout_commit`

```bash
$ sed -i.bak -E 's#^(seeds[[:space:]]+=[[:space:]]+).*$#\1"0d5cf1394a1cfde28dc8f023567222abc0f47534@seed-0.cronos.com:26656,3032073adc06d710dd512240281637c1bd0c8a7b@seed-1.cronos.com:26656,04f43116b4c6c70054d9c2b7485383df5b1ed1da@seed-2.cronos.com:26656,337377dcda43d79c537d2c4d93ad3b698ce9452e@bd-cronos-mainnet-seed-node-01.bdnodes.net:26656"#' ~/.cronos/config/config.toml
$ sed -i.bak -E 's#^(create_empty_blocks_interval[[:space:]]+=[[:space:]]+).*$#\1"5s"#' ~/.cronos/config/config.toml
$ sed -i.bak -E 's#^(timeout_commit[[:space:]]+=[[:space:]]+).*$#\1"5s"#' ~/.cronos/config/config.toml
```

* If you would like to build an **archive node** that allows you to query all the historical block data, kindly update the pruning setting to `"nothing"` by

```bash
$ sed -i.bak -E 's#^(pruning[[:space:]]+=[[:space:]]+).*$#\1"nothing"#' ~/.cronos/config/app.toml
```

{% hint style="info" %}
NOTE

For Mac environment, if `jq` is missing, you may install it by: `brew install jq`
{% endhint %}

### Start syncing and check status

Once `cronosd` has been configured, we are ready to start the node and sync the blockchain data:

* Start cronosd, e.g.:

```bash
$ ./cronosd start
```

It should begin fetching blocks from the other peers.

* You can query the node syncing status by

```bash
$ ./cronosd status 2>&1 | jq '.SyncInfo.catching_up'
```

If the above command returns `false`, It means that your node **is fully synced**; otherwise, it returns `true` and implies your node is still catching up.

* One can check the current block height by querying the public full node by:

```bash
curl -s https://rpc.cronos.com/commit | jq "{height: .result.signed_header.header.height}"
```

and you can check your node's progress (in terms of block height) by

```bash
$ ./cronosd status 2>&1 | jq '.SyncInfo.latest_block_height'
```

### Different ways to sync Cronos with snapshots

The above outlines how to set up a node from scratch. Alternatively, you can set up a node using snapshots:

{% content-ref url="../cronos-evm-snapshots/" %}
[cronos-evm-snapshots](../cronos-evm-snapshots/)
{% endcontent-ref %}
