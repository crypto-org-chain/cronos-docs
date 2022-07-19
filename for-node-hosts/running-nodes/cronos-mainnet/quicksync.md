# Quicksync

## Introduction

{% hint style="info" %}
IMPORTANT

In order to use Quicksync you need to first complete [Step 3-2](./#step-3-2.-run-everything) and run \
`/cronosd start`
{% endhint %}

Syncing Cronos could be a time-consuming process, that's why the Crypto.org Chain team has partnered with Chainlayer to provide the “**Quicksync**” service and make the process more efficient for our users.

Users can visit [Chainlayer QuickSync Cronos page](https://quicksync.io/networks/cronos.html) and download the snapshots for Cronos Chain with different pruning settings

### Step 1: Quicksync Download

After executing the command `./cronosd` start at [Step 3-2](./#step-3-2.-run-everything) Run everything, it starts the node and syncs the blockchain data. When you see it starts to sync from 0, you can terminate the terminal.

Users can visit [Chainlayer QuickSync Cronos page](https://quicksync.io/networks/cronos.html) and download the snapshots for Cronos Chain with different pruning settings.

{% hint style="info" %}
NOTE \
Currently only leveldb downloads are available.
{% endhint %}

### Step 2: Quicksync Extract

To start with Quicksync, you need to run `brew install lz4` to install lz4 in a new terminal. \
Then download the file with preferred pruning settings directly from [Quicksync](https://quicksync.io/networks/cronos.html).

* Pruned snapshot is the quickest way to get a node running. If you just would like to give a shot, use it for a validator or sentry node, the pruned snapshot will be a good choice. Pruned snapshots have tx index disabled to save disk/download size, which also will make API queries not work backward in time. If you still want to use a pruned snapshot to start an API node, then you can enable tx index on your end to start indexing blocks from when you startup your node. But you will not be able to query anything earlier than that.

**Cronosmainnet\_25-1-default**

* Default is a good middle choice between everything. It will work in most use cases, validator, sentry node, API nodes. It has tx index enabled, so you can query block back in time. The only thing that default nodes do not have is the full history from the start of the chain or chain upgrade.

**Cronosmainnet\_25-1-archive**

* For the users who would like to query the old block, you may pick the archive one for complete blockchain data. The archive node will have all the blocks from the chain start or chain upgrade with full indexing. So this is a good option for API nodes if you need to have access to the whole chain history. Archives grow fast in size and might be more sluggish to run, so if you need something simpler default or a pruned kickstarted API node might solve most of the needs out there.

### Step 3: Quicksync Setup

In the following steps, we will take as an example the version\
&#x20;`cronosmainnet_25-1-pruned.20220309.2010.tar.lz4`.

* (Optional) you can [download an addressbook](https://quicksync.io/addrbook.cronos.json) to get connected to peers faster. After downloading it, place the new `addrbook.json` under `.cronos/config` folder and restart your node to take effect.
* Now add the `cronosmainnet_25-1-pruned.20220309.2010.tar.lz4` inside `.cronos`

Then perform the following steps:

* Change the path under `.cronos` with `cd .cronos`
* Decompress with `lz4` and `tar` by `lz4 -d /Users/<username>/.cronos/cronosmainnet_25-1-pruned.20220308.2010.tar.lz4 | tar -xv`, as below:

{% hint style="info" %}
Example: Decompress the QuickSync pack with `lz4`

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
{% endhint %}

The original data folder under `.cronos` is overwritten with this step (it takes around 5-7 mins to decompress the pruned version \~50GB).

### Step 4: Sync with Quicksync

{% hint style="info" %}
Example: Restart `cronosd start` with QuickSync

```bash
  $ ./cronosd start
  6:59PM INF Unlocking keyring
  6:59PM INF starting ABCI with Tendermint
  6:59PM INF Starting multiAppConn service impl=multiAppConn module=proxy server=node
  6:59PM INF Starting localClient service connection=query impl=localClient module=abci-client server=node
  ...
  6:59PM INF ABCI Replay Blocks appHeight=1813707 module=consensus server=node stateHeight=1813707 storeHeight=1813707
```
{% endhint %}
