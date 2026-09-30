# Cosmovisor Setup

### Introduction

[Cosmovisor](https://github.com/cosmos/cosmos-sdk/tree/main/tools/cosmovisor) is a process manager from the Cosmos SDK that wraps `cronosd` and switches to the correct upgrade binary automatically when the chain reaches an upgrade height. With Cosmovisor you do not need to manually swap binaries every time Cronos reaches an upgrade point, it holds all the upgrade binaries and picks the right one for you.

This page covers the generic Cosmovisor setup. It is used by the [KSYNC](https://docs.cronos.com/for-node-hosts/running-nodes/cronos-evm-snapshots/ksync#cosmovisor) sync flow.

### Step 1: Install Cosmovisor

Install Cosmovisor with Go (go1.21 or newer):

```go
go install cosmossdk.io/tools/cosmovisor/cmd/cosmovisor@latest
```

To verify the installation, run `cosmovisor version`.

### Step 2: Set the Cosmovisor environment variables

Cosmovisor needs to know which daemon to run and where its home directory is:

```bash
export DAEMON_NAME=cronosd
export DAEMON_HOME=$HOME/.cronos
```

The full set of variables (including the ones below) is also set in the systemd service file examples:

* `DAEMON_NAME=cronosd`
* `DAEMON_HOME=$HOME/.cronos`
* `DAEMON_ALLOW_DOWNLOAD_BINARIES=false`
* `DAEMON_RESTART_AFTER_UPGRADE=false`
* `DAEMON_LOG_BUFFER_SIZE=512`
* `UNSAFE_SKIP_BACKUP=true`

### Step 3: Create the folder structure and add the binaries

Cosmovisor expects the binaries under `$DAEMON_HOME/cosmovisor`, with the genesis binary in `genesis/bin` and one folder per upgrade under `upgrades/`:

```
$DAEMON_HOME/cosmovisor/
├── genesis/
│   └── bin/
│       └── cronosd        # binary used from genesis
└── upgrades/
    └── <upgrade-name>/
        └── bin/
            └── cronosd    # binary for each network upgrade
```

Initialize the layout with the genesis binary:

```bash
cosmovisor init /path/to/cronosd
```

Then add the binary for each upgrade. The must match the on-chain upgrade name exactly:

```bash
cosmovisor add-upgrade <upgrade-name> /path/to/upgraded/cronosd
```

{% hint style="info" %}
You can find all upgrades with their names and the relevant upgrade heights [here](https://docs.cronos.com/for-node-hosts/running-nodes/cronos-mainnet#step-0--notes-on-huygen-network-upgrade). Because `DAEMON_ALLOW_DOWNLOAD_BINARIES` is set to false, you must place every upgrade binary yourself, Cosmovisor will not download them.
{% endhint %}

### Run cronosd through Cosmovisor

Once the layout is in place, run `cosmovisor` in place of `cronosd`. Cosmovisor forwards the arguments to the active binary and switches to the next upgrade binary automatically at the upgrade height, for example:

```bash
cosmovisor run start
```

For syncing through Cosmovisor with KSYNC, see [KSYNC](https://docs.cronos.com/for-node-hosts/running-nodes/cronos-evm-snapshots/ksync).
