# Cronos Gravity Bridge Testnet

This is a detailed documentation for setting up a full node on Cronos gravity bridge testnet - Pioneer 11 `pioneereleventestnet_340-1`.

{% hint style="info" %}
Remarks:

Cronos gravity bridge testnet - Pioneer 11 (`pioneereleventestnet_340-1`) is **distinct from** the official "Cronos testnet" (`cronostestnet_338-3`) which is used by app developers to test their Dapps. The Pioneer 11 testnet is a dedicated testnet created specifically for the purpose of testing the Cronos Gravity Bridge.&#x20;
{% endhint %}

## Pre-requisites

### Supported OS

We officially support macOS, Windows and Linux only. Other platforms may work but there is no guarantee. We will extend our support to other platforms after we have stabilized our current architecture.

### Prepare your machine

* To run Cronos gravity bridge testnet nodes, you will need a machine with the following minimum requirements:
  * 4-core, x86\_64/ARM architecture processor;
  * 16 GB RAM;
  * 1 TB of storage space.

## Step 1. Get the Cronos gravity bridge testnet binary

To simplify the following step, we will be using **Linux** (Intel x86) for illustration. Binary for

**Mac** Intel x86 as `Darwin_x86_64`, **Mac** M1 as `arm64` and **Windows** as `Windows_x86_64` are also available [here](https://github.com/crypto-org-chain/cronos/releases/tag/v0.8.0-gravity-alpha0).

*   To install released **Cronos Cronos Pioneer 11 testnet binaries** from github:

    ```bash
    $ curl -LOJ https://github.com/crypto-org-chain/cronos/releases/download/v0.8.0-gravity-alpha0/cronos_0.8.0-gravity-alpha0-testnet_Linux_x86_64.tar.gz
    $ tar -zxvf cronos_0.8.0-gravity-alpha0-testnet_Linux_x86_64.tar.gz
    ```

    Afterward, you can check the version of `cronosd` by

    ```bash
    $ ./cronosd version
    v0.8.0
    ```

## Step 2. Configure `cronosd`

### Step 2-0 (Optional) Clean up the old blockchain data

*   If you have joined other Cronos gravity bridge testnet before, you would have to clean up the old blockchain data and start over again, it can be done by running:

    ```bash
    $ ./cronosd unsafe-reset-all
    ```

    and remove the old genesis file by

    ```bash
    $ rm ~/.cronos/config/genesis.json
    ```

Before kick-starting your node, we will have to configure your node so that it connects to the Cronos gravity bridge testnet:

### Step 2-1 Initialize `cronosd`

*   First of all, you can initialize cronosd by:

    ```bash
      $ ./cronosd init [moniker] --chain-id pioneereleventestnet_340-1
    ```

    This `moniker` will be the displayed id of your node when connected to the Cronos network. When providing the moniker value, make sure you drop the square brackets since they are not needed. The example below shows how to initialize a node named `pegasus-node` :

    ```bash
      $ ./cronosd init pegasus-node --chain-id pioneereleventestnet_340-1
    ```



{% hint style="info" %}
NOTE

* Depending on your cronosd home setting, the cronosd configuration will be initialized to that home directory. To simply the following steps, we will use the default cronosd home directory `~/.cronos/` for illustration.
* You can also put the `cronosd` to your binary path and run it by `cronosd`
{% endhint %}

### Step 2-2 Configure cronosd

*   Download and replace the Cronos Testnet `genesis.json` by:

    ```bash
    $ curl https://raw.githubusercontent.com/crypto-org-chain/cronos-testnets/main/pioneereleventestnet_340-1/genesis.json > ~/.cronos/config/genesis.json
    ```
*   Verify sha256sum checksum of the downloaded `genesis.json`. You should see `OK!` if the sha256sum checksum matches.

    ```bash
    $ if [[ $(sha256sum ~/.cronos/config/genesis.json | awk '{print $1}') = "350b4d14d38d37b1f60b340bcb6c05cc1e0980811e2153fdef29a6530bd3d952" ]]; then echo "OK"; else echo "MISMATCHED"; fi;

    OK!
    ```

{% hint style="info" %}
NOTE:\


For Mac environment, `sha256sum` was not installed by default. In this case, you may setup `sha256sum` with this command:

```bash
function sha256sum() { shasum -a 256 "$@" ; } && export -f sha256sum
```
{% endhint %}

*   For network configuration, in `~/.cronos/config/config.toml`, validator nodes need to modify the configurations of `persistent_peers`, `create_empty_blocks_interval` and `timeout_commit`. For non-validator full nodes, only `persistent_peers` modification is required:

    ```bash
    $ sed -i.bak -E 's#^(persistent_peers[[:space:]]+=[[:space:]]+).*$#\1"0d5cf1394a1cfde28dc8f023567222abc0f47534@52.74.82.209:26656,04f43116b4c6c70054d9c2b7485383df5b1ed1da@52.76.110.186:26656"#' ~/.cronos/config/config.toml
    $ sed -i.bak -E 's#^(create_empty_blocks_interval[[:space:]]+=[[:space:]]+).*$#\1"5s"#' ~/.cronos/config/config.toml
    $ sed -i.bak -E 's#^(timeout_commit[[:space:]]+=[[:space:]]+).*$#\1"5s"#' ~/.cronos/config/config.toml
    ```

{% hint style="info" %}
For Mac environment, if `jq` is missing, you may install it by: `brew install jq`
{% endhint %}

## Step 3. Run everything

Once the `cronosd` has been configured, we are ready to start the node and sync the blockchain data:

* Start cronosd, e.g.:

```bash
  $ ./cronosd start --unsafe-experimental
```

{% hint style="info" %}
Remarks: If you see errors saying `too many files opened...`, then you need to set a higher number for maximum open file descriptors in your OS.

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
  $ sudo systemctl start cronosd --unsafe-experimental
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
ExecStart=/usr/local/bin/cronosd start  --unsafe-experimental --home /home/ubuntu/.cronos
Restart=on-failure
RestartSec=10
LimitNOFILE=50000

[Install]
WantedBy=multi-user.target
```
{% endhint %}

It should begin fetching blocks from the other peers. Please wait until it is fully synced before moving onto the next step.

*   You can query the node syncing status by

    ```bash
    $ ./cronosd status 2>&1 | jq '.SyncInfo.catching_up'
    ```

    If the above command returns `false`, It means that your node **is fully synced**; otherwise, it returns `true` and implies your node is still catching up.
*   One can check the current block height by querying the public full node by:

    ```bash
    curl -s https://rpc-p11.cronos.org/commit | jq "{height: .result.signed_header.header.height}"
    ```

    and you can check your node's progress (in terms of block height) by

    ```bash
    $ ./cronosd status 2>&1 | jq '.SyncInfo.latest_block_height'
    ```

## Cronos Gravity Bridge Testnet faucet and explorer

* You can lookup data within the `pioneereleventestnet_340-1` network by the [explorer](https://cronos.org/explorer/pioneer11);
* To interact with the blockchain, simply use the [test-token faucet](https://cronos.org/pioneer11-faucet) to obtain test CRO tokens for performing transactions on the **Cronos** gravity bridge testnet.
  * Users can use the [faucet](https://cronos.org/pioneer11-faucet) to obtain test tokens, please note that you would need a Ethereum type address `0x...` that can be obtained by Using [metamask](../for-users/metamask.md).
