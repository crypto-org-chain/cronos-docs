---
meta:
  - name: "title"
    content: Cronos | Crypto.org EVM Chain | Running Nodes On Mainnet
  - name: "description"
    content: Learn how to setup a Validator or a full node on Crypto.org Cronos Mainnet cronostestnet_338-3 in this technical documentation.
  - name: "og:title"
    content: Cronos | Crypto.org EVM Chain | Running Nodes On Mainnet
  - name: "og:type"
    content: Website
  - name: "og:description"
    content: Learn how to setup a Validator or a full node on Crypto.org Cronos Mainnet cronostestnet_338-3 in this technical documentation.
  - name: "og:image"
    content: https://cronos.crypto.org/og-image.png
  - name: "twitter:title"
    content: Cronos | Crypto.org EVM Chain | Running Nodes On Mainnet
  - name: "twitter:site"
    content: "@cryptocom"
  - name: "twitter:card"
    content: summary_large_image
  - name: "twitter:description"
    content: Learn how to setup a Validator or a full node on Crypto.org Cronos Mainnet cronostestnet_338-3 in this technical documentation.
  - name: "twitter:image"
    content: https://cronos.crypto.org/og-image.png
canonicalUrl: https://cronos.crypto.org/docs/getting-started/cronos-mainnet.html
---

# Cronos Mainnet: Running Nodes

The latest Crypto.org Chain mainnet has been named as **Cronos**.

This is a detailed documentation for setting up a Validator or a full node on Crypto.org Cronos mainnet `cronostestnet_338-3`.

## Pre-requisites

### Supported OS

We officially support macOS, Windows and Linux only. Other platforms may work but there is no guarantee. We will extend our support to other platforms after we have stabilized our current architecture.

### Prepare your machine

- To run Cronos mainnet nodes, you will need a machine with the following minimum requirements:

  - 4-core, x86_64 architecture processor;
  - 16 GB RAM;
  - 1 TB of storage space.

## Step 1. Get the Cronos mainnet binary

::: tip Remarks:
The following is the minimal setup for a **validator node** / **full node**.
:::

To simplify the following step, we will be using **Linux** (Intel x86) for illustration. Binary for
**Mac** ([Intel x86](https://github.com/crypto-org-chain/cronos/releases/download/v0.5.5-testnet/cronos_0.5.5-testnet_Darwin_x86_64.tar.gz) / [M1](https://github.com/crypto-org-chain/cronos/releases/download/v0.5.5-testnet/cronos_0.5.5-testnet_Darwin_arm64.tar.gz))and [Windows](https://github.com/crypto-org-chain/cronos/releases/download/v0.5.5-testnet/cronos_0.5.5-testnet_Windows_x86_64.zip) are also available.

- To install released **Cronos mainnet binaries** from github:

  ```bash
  $ curl -LOJ https://github.com/crypto-org-chain/cronos/releases/download/v0.6.1/cronos_0.6.1_Linux_x86_64.tar.gz
  $ tar -zxvf cronos_0.6.1_Linux_x86_64.tar.gz
  ```

  Afterward, you can check the version of `cronosd` by

  ```bash
  $ ./cronosd version
  0.6.1-mainnet
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

Before kick-starting your node, we will have to configure your node so that it connects to the Cronos mainnet:

### Step 2-1 Initialize `cronosd`

- First of all, you can initialize cronosd by:


  ```bash
    $ ./cronosd init [moniker] --chain-id cronostestnet_338-3
  ```



  This `moniker` will be the displayed id of your node when connected to Crypto.org Chain network.
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



- Download and replace the Cronos Mainnet `genesis.json` by:

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

- In `~/.cronos/config/app.toml`, update minimum gas price to avoid [transaction spamming](https://github.com/cosmos/cosmos-sdk/issues/4527)

  ```bash
  $ sed -i.bak -E 's#^(minimum-gas-prices[[:space:]]+=[[:space:]]+).*$#\1"5000000000000basetcro"#' ~/.cronos/config/app.toml
  ```

- For network configuration, in `~/.cronos/config/config.toml`, please modify the configurations of `persistent_peers`, `create_empty_blocks_interval` and `timeout_commit` by:
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

### Step 3-1. Create a new key and address

Run the followings to create a new key. For example, you can create a key with the name `Default` by:

```bash
  $ ./cronosd keys add Default
```

You should obtain an address with `tcrc` prefix, e.g. `tcrc10u5mgfflasrfj9s94mt8l9yucrt2gzhcyt5tsg`. This will be the address for performing transactions.

### Step 3-2. Obtain test token

Users can the [faucet](https://cronos.crypto.org/faucet) to obtain test tokens, please note that you would need a Ethereum type address `0x...` that can be obtained by

- [Using metamask](./metamask.md#using-metamask); or
- Using the [address convention tool](./metamask.md#address-conventions).

In case you have reached the daily limit on faucet , you can simply send a message on [Discord](https://discord.gg/pahqHz26q4) #request-tcro channel ,
stating who you are and your `0x...` address.

### Step 3-3. Run everything

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
  curl -s https://cronos-testnet-3.crypto.org:26657/commit | jq "{height: .result.signed_header.header.height}"
  ```

  and you can check your node's progress (in terms of block height) by

  ```bash
  $ ./cronosd status 2>&1 | jq '.SyncInfo.latest_block_height'
  ```

---


## Step 4. Perform Transactions

### Step 4-1. `query bank balances` - Check your transferable balance

You can check your _transferable_ balance with the `balances` command under the bank module.
:::details Example: Check your address balance

```bash
$ ./cronosd query bank balances tcrc1qsklxwt77qrxur494uvw07zjynu03dq9alwh37

balances:
- amount: "10005471622381693"
  denom: basetcro
pagination:
  next_key: null
  total: "0"

```

:::



### Slashing related transaction

### `tx slashing unjail` - Unjail a validator

Validator could be punished and jailed due to network misbehaviour, we can check the jailing status of a validator, for example:

```bash
$ ./cronosd query staking validators -o json | jq
................................
      "operator_address": "tcrcvaloper1hhskvvt87ngxjgl4fkcrn3ts09u63pnh47t06u",
      "consensus_pubkey": {
        "@type": "/cosmos.crypto.ed25519.PubKey",
        "key": "rXphE0lECaU4MfBL70l6tGrfaply4dp79g7ql4ijfco="
      },
      "jailed": false,
................................
```

Where `"jailed": true` implies that the validator has been jailed. After the jailing period has passed, one can broadcast a `unjail` transaction to unjail the validator and resume its normal operations by

```bash
$ ./cronosd tx slashing unjail --from [key_name] --chain-id "cronostestnet_338-3" --fees=1000000000000000000basetcro

  {"body":{"messages":[{"@type":"/cosmos.slashing.v1beta1.MsgUnjail"...}]}
  confirm transaction before signing and broadcasting [y/N]: y
```

:::

Congratulations! You've successfully set up a Cronos mainnet node and performed some basic transactions! You may refer to [Wallet Management](https://cronos.crypto.org/docs/wallets/cli.html#cronosd) for more advanced operations and transactions.

## Cronos mainnet explorer


- You can lookup data within the `cronostestnet_338-3` network by the [explorer](https://cronos-explorer.crypto.org/);


