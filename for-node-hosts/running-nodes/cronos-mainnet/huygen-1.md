# The "v0.7.0-hotfix" upgrade guide (v0.7.\* to v0.8.\*)

## Step 0 - Don't panic

At the point of the proposed upgrade of block `3982500`, user will see the error message on the `cronosd` similar to the below:

```bash
ERR UPGRADE "v0.7.0-hotfix" NEEDED at height: 3982500: {\"binaries\":{...."}}
```

**Don't panic** - The Chain will be paused to allow the majority of validators to upgrade. Validators and full node hosts will have to upgrade your Cronos nodes to the latest release binary.

### Backups

Before the upgrade, node hosts are encouraged to take a complete data backup. backup depends heavily on infrastructure, but generally, we can do this by backing up the `.cronos` directory.

It is critically important for validator operators to back-up the `.cronos/data/priv_validator_state.json` file after stopping the `cronosd` process. This file is updated every block as your validator participates in consensus rounds. It is a critical file needed to prevent double-signing if the upgrade fails and the previous chain needs to be restarted.

## Step 1 - Get the v0.8.3 binary

To simplify the following step, we will be using **Linux-x86** for illustration. Binary for Mac Windows with different DB and architecture are also available [here](https://github.com/crypto-org-chain/cronos/releases/tag/v0.8.3).

*   Terminate the `cronosd`; afterwards, download the `v0.8.3` released binaries from github:

    ```bash
    $ curl -LOJ https://github.com/crypto-org-chain/cronos/releases/download/v0.8.3/cronos_0.8.3_Linux_x86_64.tar.gz
    $ tar -zxvf cronos_0.8.3_Linux_x86_64.tar.gz
    ```
*

{% hint style="info" %}
Remarks: If you have stated `cronosd` with _systemd_ service, kindly stop it by

```bash
$ sudo systemctl stop cronosd
```

And replace the binary in the location where the `ExecStart` states in Systemd Unit file.
{% endhint %}

### Step 1.1 - Verify the version

You can verify the installation by checking the version of `cronosd`, the version should be `v0.8.3`.

```bash
# check the version of cronosd
$ ./cronosd version
0.8.3
```

### Step 1.2 - Update `app.toml`

In this v0.8.3 upgrade, there are a few extra parameters that we would have to add to `.cronos/config/app.toml` under

* Base Configuration :

```diff
...
...
###############################################################################
###                            Base Configuration                       ###
###############################################################################

+index_events = []
+ iavl-cache-size = 781250
+ iavl-disable-fastnode = true
...
...
###############################################################################

```

kindly insert the above parameters, save it and move on!

## Step 2. - Run everything

We are ready to start the node join the network again with the new binary:

* Start `cronosd`, e.g.:

```bash
  $ ./cronosd start
```

{% hint style="info" %}
Remark: Once the `cronosd` is started we will see the message

```bash
applying upgrade "v0.8.3" at height: 3982500"
```

and there will be an iteration over the previous blockchain data. This process will take a while, which is depending on the size of the database and the hardware specs.
{% endhint %}

Afterwards, sit back and wait for the syncing process. You can query the node syncing status by

```bash
$ ./cronosd status 2>&1 | jq '.SyncInfo.catching_up'
```

If the above command returns `false`, it means that your node **is synced**; otherwise, it returns `true` and implies your node is still catching up.

At this step, you've successfully performed the \` upgrade!
