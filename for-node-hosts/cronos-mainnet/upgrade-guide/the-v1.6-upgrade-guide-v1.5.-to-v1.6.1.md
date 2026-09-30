# The "v1.6" upgrade guide (v1.5.\* to v1.6.1)

{% hint style="warning" %}
Action required:

* \[Regular user]
  * No Action needed, Cronos team will handle the upgrade for the mainnet.&#x20;
* \[DApp Host]
  * Please test your DApps, nodes, product on the Cronos EVM testnet to confirm compatibility with `v1.6.1`
* \[Node hosts]
  * Upgrade the `cronosd` binary at the upgrade height (`45062800`) to [v1.6.1](https://github.com/crypto-org-chain/cronos/releases/tag/v1.6.1)&#x20;
  * Update the "_mempool_" and "_cronos_" config in `app.toml` (see "_New configurations_" [here](https://github.com/crypto-org-chain/cronos/releases/tag/v1.6.1))

&#x20;**DO NOT UPGRADE to the binary v1.6.1 before that suggested upgrade schedule.**
{% endhint %}

## Step 0 - Don't panic

At the point of the proposed upgrade, the user will see the error message on the `cronosd` similar to the below:

```bash
ERR UPGRADE "v1.6" NEEDED at height: 38432212: {\"binaries\":{...."}}
```

**Don't panic** - The Chain will be paused to allow the majority of validators to upgrade. Validators and full node hosts will have to upgrade your Cronos nodes to the latest release binary.

### Backups

Before the upgrade, node hosts are encouraged to take a complete data backup. backup depends heavily on infrastructure, but generally, we can do this by backing up the `.cronos` directory.

## Step 1 - Get the `v1.6.1` binary

To simplify the following step, we will be using **Linux-x86** for illustration. Binary for Mac Windows with different DB and architecture are also available [here](https://github.com/crypto-org-chain/cronos/releases/tag/v1.5.1).

*   Terminate the `cronosd`; afterwards, download the `1.6.1` released binaries from GitHub:

    ```bash
    $ curl -LOJ https://github.com/crypto-org-chain/cronos/releases/download/v1.6.1/cronos_1.6.1_Darwin_x86_64.tar.gz
    $ tar -zxvf cronos_1.6.1_Darwin_x86_64.tar.gz
    ```

{% hint style="info" %}
Remarks: If you have stated `cronosd` with _systemd_ service, kindly stop it by

```bash
$ sudo systemctl stop cronosd
```

And replace the binary in the location where the `ExecStart` states in Systemd Unit file.
{% endhint %}

### Step 1.1 - Verify the version

You can verify the installation by checking the version of `cronosd`, the latest version is `1.6.1`.

```bash
# check the version of cronosd
$ ./cronosd version
1.6.1
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
applying upgrade "v1.6" at height: xxxxx"
```

and there will be an iteration over the previous blockchain data. This process will take a while, which is depending on the size of the database and the hardware specs.
{% endhint %}

Afterwards, sit back and wait for the syncing process. You can query the node syncing status by

```bash
$ ./cronosd status 2>&1 | jq '.SyncInfo.catching_up'
```

If the above command returns `false`, it means that your node **is synced**; otherwise, it returns `true` and implies your node is still catching up.

At this step, you've successfully performed the v1.6.1 upgrade!
