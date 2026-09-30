# KSYNC

### Introduction

This sections covers how to perform a genesis-sync up to live height and how to state-sync to historical heights for Cronos Mainnet with KSYNC. In summary KSYNC is a tool developed by [KYVE](https://www.kyve.network/) which is capable of syncing blocks and state-sync snapshots from the decentralized KYVE data lake directly into Cosmos blockchain nodes. \
For Cronos, KYVE has validated all historical blocks and state-sync snapshots (in a 10,000 interval) in a decentralized way and permanently archived them to [Arweave](https://arweave.org/), a decentralized storage solution. KSYNC can then pull down this verified data and apply them against the Cronos app, you can find full documentation on the tool [here](https://docs.kyve.network/validators/ksync).

{% hint style="info" %}
**Note**

Set environmental variables:

`PATH="$PATH: <tools folder>"`

e.g. `PATH="$PATH: /Users/localuser/Cronos/bin"`
{% endhint %}

### Pre-requisites

Please check the environment requirements for KSYNC from [here](https://docs.kyve.network/run-a-node/protocol-nodes/requirements#supported-os).

### Installation

You can install KSYNC with the following command, ensure that you have [go1.21](https://go.dev/blog/go1.21) installed:

```bash
go install github.com/KYVENetwork/ksync/cmd/ksync@latest
```

To verify the installation simply run `ksync version`. To build from source visit the repository on [GitHub](https://github.com/KYVENetwork/ksync).

### Sync Cronos from genesis

### Step 1: Get the cronosd binary for genesis

To sync Cronos from genesis up to live height install the binary used for genesis from [here](https://github.com/crypto-org-chain/cronos/releases/tag/v0.6.11).

* Install the **Cronos Mainnet** binaries from GitHub:

```bash
https://github.com/crypto-org-chain/cronos/releases/download/v0.6.11/cronos_0.6.11_Darwin_arm64.tar.gz
tar -zxvf cronos_0.6.11_Darwin_arm64.tar.gz
```

* Check that **`cronosd`** is effectively installed:

```bash
./bin/cronosd version
0.6.11
```

### Step 2: Configure cronosd

After the installation, init the config:

```bash
./cronosd init <your-moniker> --chain-id cronosmainnet_25-1
```

Download the genesis:

```bash
wget -O ~/.cronos/config/genesis.json https://raw.githubusercontent.com/crypto-org-chain/cronos-mainnet/master/cronosmainnet_25-1/genesis.json
```

### Step 3: Run everything

Now that Cronos is properly set up you can start the genesis sync:

```bash
ksync block-sync --binary="/path/to/cronosd" --source="cronos"
```

This will run until live height has been reached, you can check the latest height which KYVE has validated and archived [here](https://app.kyve.network/#/pools/5).&#x20;

### Cosmovisor

Note that you can also configure Cosmovisor which contains all the upgrade binaries. With Cosmosvisor, you do not need to manually switch to a different version every time Cronos reaches an upgrade point. It is recommended to pair this with a systemd service file, refer to the template below:

```
[Unit]
Description=KSYNC deamon supervising the ksync sync process
After=network-online.target

[Service]
User=$USER
WorkingDirectory=$HOME
ExecStart=$HOME/ksync block-sync --binary="/path/to/cosmovisor" --source=cronos -y
Restart=always
RestartSec=10s
LimitNOFILE=infinity
Environment="DAEMON_NAME=cronosd"
Environment="DAEMON_HOME=$HOME/.cronos"
Environment="DAEMON_ALLOW_DOWNLOAD_BINARIES=false"
Environment="DAEMON_RESTART_AFTER_UPGRADE=false"
Environment="DAEMON_LOG_BUFFER_SIZE=512"
Environment="UNSAFE_SKIP_BACKUP=true"

[Install]
WantedBy=multi-user.target
```

Remember to replace $USER with your actual username.

### Apply historical state-sync snapshots

The "normal" state-sync only supports syncing to live height, however KYVE has validated and archived all state-sync snapshots from genesis with a 10,000 block interval therefore historical state-sync is possible with KSYNC. Note that the archival process is still ongoing and live height has not been reached yet, check the progress [here](https://app.kyve.network/#/pools/6).&#x20;

### Step 1: Install & configure cronosd for specific upgrade height

To install and configure Cronos, follow the same process as in the genesis sync part before. However, you will need to use a different binary version. You can find all upgrades with the relevant upgrade heights [here](https://docs.cronos.com/for-node-hosts/running-nodes/cronos-mainnet#step-0--notes-on-huygen-network-upgrade).

### Step 2: Run everything

To perform the state-sync execute the following command:

```bash
ksync state-sync --binary="/path/to/cronosd" --source="cronos" --target-height=$HEIGHT
```

If there is no state-sync snapshot available for your requested $HEIGHT, KSYNC will automatically propose the nearest snapshot the chosen height.

### Sync to any historical height with height-sync

The features of historical state-sync and block-sync can now be combined to sync to any historical block height by using the combination of the two. KSYNC will state-sync to the nearest snapshot before your specified target height and sync the remaining blocks using block-sync. \
With this process, checking the state at a certain height is greatly improved because now you don't need to sync all the way from genesis to inspect the state of an historical block height.

### Step 1: Install & configure cronosd for specific upgrade height

To install and configure Cronos, follow the same process as in the historical state-sync before. You can find all upgrades with the relevant upgrade heights [here](https://docs.cronos.com/for-node-hosts/running-nodes/cronos-mainnet#step-0--notes-on-huygen-network-upgrade).

### Step 2: Run everything

To perform the height-sync execute the following command:

```bash
ksync height-sync --binary="/path/to/cronosd" --source="cronos" --target-height=$HEIGHT
```
