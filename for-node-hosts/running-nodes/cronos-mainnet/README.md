---
meta:
  - name: title
    content: Cronos | Crypto.org EVM Chain | Running Nodes On Mainnet
  - name: description
    content: >-
      Learn how to setup a Validator or a full node on Crypto.org Cronos Mainnet
      Beta cronosmainnet_25-1 in this technical documentation.
  - name: og:title
    content: Cronos | Crypto.org EVM Chain | Running Nodes On Mainnet
  - name: og:type
    content: Website
  - name: og:description
    content: >-
      Learn how to setup a Validator or a full node on Crypto.org Cronos Mainnet
      Beta cronosmainnet_25-1 in this technical documentation.
  - name: og:image
    content: https://cronos.org/og-image.png
  - name: twitter:title
    content: Cronos | Crypto.org EVM Chain | Running Nodes On Mainnet
  - name: twitter:site
    content: '@cryptocom'
  - name: twitter:card
    content: summary_large_image
  - name: twitter:description
    content: >-
      Learn how to setup a Validator or a full node on Crypto.org Cronos Mainnet
      Beta cronosmainnet_25-1 in this technical documentation.
  - name: twitter:image
    content: https://cronos.org/og-image.png
canonicalUrl: https://docs.cronos.org/getting-started/cronos-mainnet.html
---

# Cronos Mainnet Beta

This is a detailed documentation for setting up a Validator or a full node on Crypto.org Cronos mainnet Beta `cronosmainnet_25-1`.

## Pre-requisites

### Supported OS

We officially support macOS, Windows, and Linux only. Other platforms may work but there is no guarantee. We will extend our support to other operating systems after we have stabilised our current architecture.

### Prepare your machine

* To run Cronos Mainnet Beta nodes, you will need a machine with the following minimum requirements:
  * 4-core, x86\_64/ARM architecture processor
  * 16 GB RAM
  * 1 TB of storage space

{% tabs %}
{% tab title="Mainnet Beta" %}
* [Seeds for Fullnode](https://github.com/crypto-org-chain/cronos-mainnet#seed-nodes)
* [Genesis files](https://raw.githubusercontent.com/crypto-org-chain/cronos-mainnet/master/cronosmainnet\_25-1/genesis.json)
* Binaries for [Linux](https://github.com/crypto-org-chain/cronos/releases/download/v0.6.5/cronos\_0.6.5\_Linux\_x86\_64.tar.gz), Mac ([Intel x86](https://github.com/crypto-org-chain/cronos/releases/download/v0.6.5/cronos\_0.6.5\_Darwin\_x86\_64.tar.gz) / [M1](https://github.com/crypto-org-chain/cronos/releases/download/v0.6.5/cronos\_0.6.5\_Darwin\_arm64.tar.gz)) and [Windows](https://github.com/crypto-org-chain/cronos/releases/download/v0.6.5/cronos\_0.6.5\_Windows\_x86\_64.zip)
{% endtab %}
{% endtabs %}

## Step 0 : Notes on "Huygen" Network upgrade

Before we start, please note that there was "_Huygen_" network upgrade at the block height `2,693,800`, which requires the node operator to update their Cronos Mainnet binary `cronosd` from `v0.6.*` to `v0.7.0`.

For the host who would like to build a Full Node with complete blockchain data from scratch, one would need to:

| Block Height          | Binary Version                                                                        | Instruction                                                                                                                                                                                                                                                                                                 |
| --------------------- | ------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `1 ~ 2,693,800`       | ``[`cronos_v0.6.*`](https://github.com/crypto-org-chain/cronos/releases?page=3)``     | <p>Start the node with the older binary version <a href="https://github.com/crypto-org-chain/cronos/releases?page=3"><code>cronos_v0.6.*</code></a><code>;</code><br><code></code><br><code></code>Sync-up with the blockchain until it reaches the target upgrade block height <code>2,693,800</code>;</p> |
| `2,693,800`           | ``[`cronos_v0.6.*`](https://github.com/crypto-org-chain/cronos/releases?page=3)``     | <p>After it reaches the block height <code>2,693,800</code>, update <code>app.toml</code> with <a href="https://github.com/crypto-org-chain/cronos/releases/tag/v0.7.0">new config items</a>;<br></p>                                                                                                       |
| `2,693,800 ~ 3982500` | ``[`cronos_v0.7.0`](https://github.com/crypto-org-chain/cronos/releases/tag/v0.7.0)`` | <p>Update the binary to <a href="https://github.com/crypto-org-chain/cronos/releases/tag/v0.7.0"><code>cronos_v0.7.0</code></a><code>;</code><br><code></code>Restart the node</p>                                                                                                                          |
| `3982500`             | ``[`cronos_v0.8.0`](https://github.com/crypto-org-chain/cronos/releases/tag/v0.8.0)`` | <p>Update the binary to <a href="https://github.com/crypto-org-chain/cronos/releases/tag/v0.8.0"><code>cronos_v0.8.0</code></a><code>;</code><br><code></code>Restart the node</p>                                                                                                                          |



Users can refer to the [upgrade guide of "Huygen"](huygen.md) for the detailed upgrade steps.

## Step 1. Get the Cronos Mainnet Beta binary

{% hint style="info" %}
Remarks:

The following is the minimal setup for a **validator node** / **full node**.
{% endhint %}

To simplify the following step, we will be using **Linux** (Intel x86) for illustration.\
Binaries for **Mac** ([Intel x86](https://github.com/crypto-org-chain/cronos/releases/download/v0.6.5/cronos\_0.6.5\_Darwin\_x86\_64.tar.gz) / [M1](https://github.com/crypto-org-chain/cronos/releases/download/v0.6.5/cronos\_0.6.5\_Darwin\_arm64.tar.gz)) and [Windows](https://github.com/crypto-org-chain/cronos/releases/download/v0.6.5/cronos\_0.6.5\_Windows\_x86\_64.zip) are also available.

*   To install released **Cronos Mainnet Beta binaries** from github:

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

*   If you have joined `cronostestnet_338-3` before, you would have to clean up the old blockchain data and start over again, it can be done by running:

    ```bash
    $ ./cronosd unsafe-reset-all
    ```

    and remove the old genesis file by

    ```bash
    $ rm ~/.cronos/config/genesis.json
    ```

Before kick-starting your node, we will have to configure your node so that it connects to the Cronos mainnet Beta:

### Step 2-1 Initialize `cronosd`

*   First of all, you can initialize cronosd by:

    ```bash
      $ ./cronosd init [moniker] --chain-id cronosmainnet_25-1
    ```

    This `moniker` will be the displayed id of your node when connected to Cronos Chain network.

    When providing the moniker value, make sure you drop the square brackets since they are not needed.\\

    The example below shows how to initialize a node named `pegasus-node` :

    ```bash
      $ ./cronosd init pegasus-node --chain-id cronosmainnet_25-1
    ```

{% hint style="info" %}
Note:

* Depending on your cronosd home setting, the cronosd configuration will be initialized to that home directory. To simply the following steps, we will use the default cronosd home directory `~/.cronos/` for illustration.
* You can also put the `cronosd` to your binary path and run it by `cronosd`
{% endhint %}

### Step 2-2 Configure cronosd

*   Download and replace the Cronos Mainnet Beta `genesis.json` by:

    ```bash
    $ curl https://raw.githubusercontent.com/crypto-org-chain/cronos-mainnet/master/cronosmainnet_25-1/genesis.json > ~/.cronos/config/genesis.json
    ```
*   Verify sha256sum checksum of the downloaded `genesis.json`. You should see `OK!` if the sha256sum checksum matches.

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

*   (Validator node only) In `~/.cronos/config/app.toml`, update minimum gas price to avoid [transaction spamming](https://github.com/cosmos/cosmos-sdk/issues/4527)

    ```bash
    $ sed -i.bak -E 's#^(minimum-gas-prices[[:space:]]+=[[:space:]]+).*$#\1"5000000000000basecro"#' ~/.cronos/config/app.toml
    ```
*   For network configuration, in `~/.cronos/config/config.toml`, validator nodes need to modify the configurations of `seed`, `create_empty_blocks_interval` and `timeout_commit`. For non-validator full nodes, only `seed` modification is required:

    ```bash
    $ sed -i.bak -E 's#^(seeds[[:space:]]+=[[:space:]]+).*$#\1"0d5cf1394a1cfde28dc8f023567222abc0f47534@cronos-seed-0.crypto.org:26656,3032073adc06d710dd512240281637c1bd0c8a7b@cronos-seed-1.crypto.org:26656,04f43116b4c6c70054d9c2b7485383df5b1ed1da@cronos-seed-2.crypto.org:26656,337377dcda43d79c537d2c4d93ad3b698ce9452e@bd-cronos-mainnet-seed-node-01.bdnodes.net:26656"#' ~/.cronos/config/config.toml
    $ sed -i.bak -E 's#^(create_empty_blocks_interval[[:space:]]+=[[:space:]]+).*$#\1"5s"#' ~/.cronos/config/config.toml
    $ sed -i.bak -E 's#^(timeout_commit[[:space:]]+=[[:space:]]+).*$#\1"5s"#' ~/.cronos/config/config.toml
    ```
*   If you would like to build an archive node that allows you to query all the historical block data - kindly update the pruning setting to `"nothing"` by

    ```bash
    $ sed -i.bak -E 's#^(pruning[[:space:]]+=[[:space:]]+).*$#\1"nothing"#' ~/.cronos/config/app.toml
    ```

{% hint style="info" %}
NOTE

For Mac environment, if `jq` is missing, you may install it by: `brew install jq`
{% endhint %}

## Step 3. Run everything

{% hint style="warning" %}
CAUTION

This page only shows the minimal setup for validator / full node.

Furthermore, you may want to run full nodes as sentries (see [Tendermint](https://docs.tendermint.com/master/tendermint-core/running-in-production.html)), restrict your validator connections to only connect to your full nodes, test secure storage of validator keys etc.
{% endhint %}

### Step 3-1. Create a new key and address (Validator node only)

Run the followings to create a new key. For example, you can create a key with the name `Default` by:

```bash
  $ ./cronosd keys add Default
```

You should obtain an address with `crc` prefix, e.g. `crc10u5mgfflasrfj9s94mt8l9yucrt2gzhcyt5tsg`. This will be the address for performing transactions.

### Step 3-2. Run everything

Once `cronosd` has been configured, we are ready to start the node and sync the blockchain data:

* Start cronosd, e.g.:

```bash
  $ ./cronosd start
```

{% hint style="info" %}
Remarks:

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
{% endhint %}

* _(Optional for Linux)_ Start cronosd with systemd service, e.g.:

```bash
  $ curl -s https://raw.githubusercontent.com/crypto-org-chain/cronos-docs/master/systemd/create-service.sh -o create-service.sh && curl -s https://raw.githubusercontent.com/crypto-org-chain/cronos-docs/master/systemd/cronosd.service.template -o cronosd.service.template

  $ chmod +x ./create-service.sh && ./create-service.sh

  $ sudo systemctl start cronosd

  # view log

  $ journalctl -u cronosd -f
```

{% hint style="info" %}
Example: /etc/systemd/system/cronosd.service created by script

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
LimitNOFILE=50000


[Install]
WantedBy=multi-user.target
```
{% endhint %}

It should begin fetching blocks from the other peers.

*   You can query the node syncing status by

    ```bash
    $ ./cronosd status 2>&1 | jq '.SyncInfo.catching_up'
    ```

    If the above command returns `false`, It means that your node **is fully synced**; otherwise, it returns `true` and implies your node is still catching up.
*   One can check the current block height by querying the public full node by:

    ```bash
    curl -s https://rpc.cronos.org/commit | jq "{height: .result.signed_header.header.height}"
    ```

    and you can check your node's progress (in terms of block height) by

    ```bash
    $ ./cronosd status 2>&1 | jq '.SyncInfo.latest_block_height'
    ```
