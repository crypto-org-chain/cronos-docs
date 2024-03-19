# The "Titan" upgrade guide (v1.0.\* to v1.1.0)

{% hint style="warning" %}
The Cronos v1.1.0 - "Titan" upgrade is proposed to be scheduled at the block height of 13,184,000. Referencing estimated time can be found at \
[https://explorer.cronos.org/block/countdown/13184000](https://explorer.cronos.org/block/countdown/13184000)

**DO NOT UPGRADE to the binary v1.1.0 before that suggested upgrade schedule.**

You might check the current block height by the [Cronos Explorer](https://explorer.cronos.org/)
{% endhint %}

## Step 0 - Don't panic

At the point of the proposed upgrade, user will see the error message on the `cronosd` similar to the below:

```bash
ERR UPGRADE "v1.1.0" NEEDED at height: 13184000: {\"binaries\":{...."}}
```

**Don't panic** - The Chain will be paused to allow the majority of validators to upgrade. Validators and full node hosts will have to upgrade your Cronos nodes to the latest release binary.

### Backups

Before the upgrade, node hosts are encouraged to take a complete data backup. backup depends heavily on infrastructure, but generally, we can do this by backing up the `.cronos` directory.

It is critically important for validator operators to back-up the `.cronos/data/priv_validator_state.json` file after stopping the `cronosd` process. This file is updated every block as your validator participates in consensus rounds. It is a critical file needed to prevent double-signing if the upgrade fails and the previous chain needs to be restarted.

## Step 1 - Get the `v1.1.0` binary

To simplify the following step, we will be using **Linux-x86** for illustration. Binary for Mac Windows with different DB and architecture are also available [here](https://github.com/crypto-org-chain/cronos/releases/tag/v1.1.0).

*   Terminate the `cronosd`; afterwards, download the `1.1.0` released binaries from github:

    ```bash
    $ curl -LOJ https://github.com/crypto-org-chain/cronos/releases/download/v1.1.0/cronos_1.1.0_Linux_x86_64.tar.gz
    $ tar -zxvf cronos_1.1.0_Linux_x86_64.tar.gz
    ```

{% hint style="info" %}
Remarks: If you have stated `cronosd` with _systemd_ service, kindly stop it by

```bash
$ sudo systemctl stop cronosd
```

And replace the binary in the location where the `ExecStart` states in Systemd Unit file.
{% endhint %}

### Step 1.1 - Verify the version

You can verify the installation by checking the version of `cronosd`, the latest version is `1.1.0`.

```bash
# check the version of cronosd
$ ./cronosd version
1.1.0
```

## Step 2. - Run everything

We are ready to start the node join the network again with the new binary:

* Start `cronosd`, e.g.:

```bash
  $ ./cronosd start
```

{% hint style="info" %}
Remark: Once the `cronosd` is started we will see the message

```bash
applying upgrade "v1.1.0" at height: 13184000"
```

and there will be an iteration over the previous blockchain data. This process will take a while, which is depending on the size of the database and the hardware specs.
{% endhint %}

Afterwards, sit back and wait for the syncing process. You can query the node syncing status by

```bash
$ ./cronosd status 2>&1 | jq '.SyncInfo.catching_up'
```

If the above command returns `false`, it means that your node **is synced**; otherwise, it returns `true` and implies your node is still catching up.

At this step, you've successfully performed the Titan upgrade!
