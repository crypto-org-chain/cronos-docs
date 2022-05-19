---
meta:
  - name: "title"
    content: Cronos | Crypto.org EVM Chain | Running Nodes On Testnet
  - name: "description"
    content: Learn how to setup a Validator or a full node on Crypto.org Cronos testnet cronostestnet_338-3 in this technical documentation.
  - name: "og:title"
    content: Cronos | Crypto.org EVM Chain | Running Nodes On Testnet
  - name: "og:type"
    content: Website
  - name: "og:description"
    content: Learn how to setup a Validator or a full node on Crypto.org Cronos testnet cronostestnet_338-3 in this technical documentation.
  - name: "og:image"
    content: https://cronos.org/og-image.png
  - name: "twitter:title"
    content: Cronos | Crypto.org EVM Chain | Running Nodes On Testnet
  - name: "twitter:site"
    content: "@cryptocom"
  - name: "twitter:card"
    content: summary_large_image
  - name: "twitter:description"
    content: Learn how to setup a Validator or a full node on Crypto.org Cronos testnet cronostestnet_338-3 in this technical documentation.
  - name: "twitter:image"
    content: https://cronos.org/og-image.png
canonicalUrl: https://cronos.org/docs/getting-started/cronos-testnet.html
---

# Cronos Testnet: Running Nodes

The latest Crypto.org EVM Chain Testnet has been named as **Cronos**.

This is a detailed documentation for setting up a Validator or a full node on Crypto.org Cronos testnet `cronostestnet_338-3`.

Before we start, please note that there are 3 binary upgrade along with the testnet:

1. Follow [Step 1](#step-1-get-the-cronos-testnet-binary) to [Step 3](#step-3-run-everything) and start the node with the older binary version `v0.6.0`;
   - Sync-up with the blockchain until it reaches the target upgrade block height `1553700`;
   - _Please note that `panic: UPGRADE "v0.7.0" NEEDED at height: 1553700` is the expected error message when we hit that block._
2. `cronos_0.7.0-rc1` upgrade:
   - After it reaches the block height `1553700`, update the binary to [cronos_0.7.0-rc1-testnet](https://github.com/crypto-org-chain/cronos/releases/tag/v0.7.0-rc1);
   - Then update the default `~/.cronos/config/app.toml`(given there are some new parameter introduced in the upgrade), either by manually replace the local `app.toml` with [this new app.toml](https://raw.githubusercontent.com/crypto-org-chain/cronos-testnets/main/cronostestnet_338-3/app.toml), or by:
   ```bash
   $ curl https://raw.githubusercontent.com/crypto-org-chain/cronos-testnets/main/cronostestnet_338-3/app.toml > ~/.cronos/config/app.toml
   ```
   - Continue to sync from block `1553700`;
3. `cronos_0.7.0-rc2` upgrade:
   - After it reaches the block height `1869000`, update the binary to [cronos_0.7.0-rc2-testnet](https://github.com/crypto-org-chain/cronos/releases/tag/v0.7.0-rc2);
   - Start the node again
   - Continue to sync from block `1869000`;
4. `cronos_0.7.0-rc3` upgrade:
   - After it reaches the block height `2483600`, update the binary to [cronos_0.7.0-rc3-testnet](https://github.com/crypto-org-chain/cronos/releases/tag/v0.7.0-rc3);
   - Start the node again

#

## Pre-requisites

### Supported OS

We officially support macOS, Windows and Linux only. Other platforms may work but there is no guarantee. We will extend our support to other platforms after we have stabilized our current architecture.

### Prepare your machine

- To run Cronos testnet nodes, you will need a machine with the following minimum requirements:

  - 4-core, x86_64/ARM architecture processor;
  - 16 GB RAM;
  - 1 TB of storage space.

## Step 1. Get the Cronos testnet binary

::: tip Remarks:
The following is the minimal setup for a **full node**.
:::

To simplify the following step, we will be using **Linux** (Intel x86) for illustration. Binary for

**Mac** Intel x86 as `Darwin_x86_64`, **Mac** M1 as `arm64` and **Windows** as `Windows_x86_64` are also available [here](https://github.com/crypto-org-chain/cronos/releases). Please check the required node version [here](https://github.com/crypto-org-chain/cronos-testnets/blob/main/testnet.json).

- To install released **Cronos testnet binaries** from github:

  ```bash
  $ curl -LOJ https://github.com/crypto-org-chain/cronos/releases/download/v0.6.0-testnet/cronos_0.6.0-testnet_Linux_x86_64.tar.gz
  $ tar -zxvf cronos_0.6.0-testnet_Linux_x86_64.tar.gz
  ```

  Afterward, you can check the version of `cronosd` by

  ```bash
  $ ./cronosd version
  v0.6.0-testnet
  ```

## Step 2. Configure `cronosd`

### Step 2-0 (Optional) Clean up the old blockchain data

- If you have joined `cronostestnet_338-2` before, you would have to clean up the old blockchain data and start over again, it can be done by running:

  ```bash
  $ ./cronosd unsafe-reset-all
  ```

  and remove the old genesis file by

  ```bash
  $ rm ~/.cronos/config/genesis.json
  ```

Before kick-starting your node, we will have to configure your node so that it connects to the Cronos testnet:

### Step 2-1 Initialize `cronosd`

- First of all, you can initialize cronosd by:

  ```bash
    $ ./cronosd init [moniker] --chain-id cronostestnet_338-3
  ```

  This `moniker` will be the displayed id of your node when connected to the Cronos network.
  When providing the moniker value, make sure you drop the square brackets since they are not needed.
  The example below shows how to initialize a node named `pegasus-node` :

  ```bash
    $ ./cronosd init pegasus-node --chain-id cronostestnet_338-3
  ```

  ::: tip NOTE

  - Depending on your cronosd home setting, the cronosd configuration will be initialized to that home directory. To simply the following steps, we will use the default cronosd home directory `~/.cronos/` for illustration.
  - You can also put the `cronosd` to your binary path and run it by `cronosd`
    :::

### Step 2-2 Configure cronosd

- Download and replace the Cronos Testnet `genesis.json` by:

  ```bash
  $ curl https://raw.githubusercontent.com/crypto-org-chain/cronos-testnets/main/cronostestnet_338-3/genesis.json > ~/.cronos/config/genesis.json
  ```

- Verify sha256sum checksum of the downloaded `genesis.json`. You should see `OK!` if the sha256sum checksum matches.

  ```bash
  $ if [[ $(sha256sum ~/.cronos/config/genesis.json | awk '{print $1}') = "7d898ad75b3e2e1fa182d928ca10a284c1dd252e12d17ad6dab76551b29d1a59" ]]; then echo "OK"; else echo "MISMATCHED"; fi;

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
  $ sed -i.bak -E 's#^(minimum-gas-prices[[:space:]]+=[[:space:]]+).*$#\1"5000000000000basetcro"#' ~/.cronos/config/app.toml
  ```

- For network configuration, in `~/.cronos/config/config.toml`, validator nodes need to modify the configurations of `persistent_peers`, `create_empty_blocks_interval` and `timeout_commit`. For non-validator full nodes, only `persistent_peers` modification is required:
  ```bash
  $ sed -i.bak -E 's#^(persistent_peers[[:space:]]+=[[:space:]]+).*$#\1"8fcba3485c67a2a00a383b6f45660a4ac529c6ca@52.77.30.18:26656,e65199bc579ffd89d7c021c5611f9f1c97f7ff13@54.251.209.254:26656"#' ~/.cronos/config/config.toml
  $ sed -i.bak -E 's#^(create_empty_blocks_interval[[:space:]]+=[[:space:]]+).*$#\1"5s"#' ~/.cronos/config/config.toml
  $ sed -i.bak -E 's#^(timeout_commit[[:space:]]+=[[:space:]]+).*$#\1"5s"#' ~/.cronos/config/config.toml
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

It should begin fetching blocks from the other peers. Please wait until it is fully synced before moving onto the next step.

- You can query the node syncing status by

  ```bash
  $ ./cronosd status 2>&1 | jq '.SyncInfo.catching_up'
  ```

  If the above command returns `false`, It means that your node **is fully synced**; otherwise, it returns `true` and implies your node is still catching up.

- One can check the current block height by querying the public full node by:

  ```bash
  curl -s https://evm-t3.cronos.org/:26657/commit | jq "{height: .result.signed_header.header.height}"
  ```

  and you can check your node's progress (in terms of block height) by

  ```bash
  $ ./cronosd status 2>&1 | jq '.SyncInfo.latest_block_height'
  ```

## Cronos testnet faucet and explorer

- You can lookup data within the `cronostestnet_338-3` network by the [explorer](https://testnet.cronoscan.com);

- To interact with the blockchain, simply use the [test-token faucet](https://cronos.org/faucet) to obtain test CRO tokens for performing transactions on the **Cronos** testnet.

  - Users can use the [faucet](https://cronos.org/faucet) to obtain test tokens, please note that you would need a Ethereum type address `0x...` that can be obtained by [Using metamask](./metamask.md#using-metamask-on-cronos-testnet).

In case you have reached the daily limit on faucet , you can simply send a message on [Discord](https://discord.gg/pahqHz26q4) #request-tcro channel ,
stating who you are and your `0x...` address.
