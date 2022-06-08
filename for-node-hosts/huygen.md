# The "Huygen" upgrade guide (`v0.6.*` to `v0.7.*`) :

:::warning

The Cronos v0.7.0 - Huygen upgrade is proposed to be scheduled at the block height of 2,693,800. Referencing estimated time can be found on [https://cronoscan.com/block/countdown/2693800](https://cronoscan.com/block/countdown/2693800)




**DO NOT UPGRADE to the binary v0.7.0 before that suggested upgrade schedule.**


You might check the current block height by the [Cronoscan explorer](https://cronoscan.com/) or using 
```
curl -s https://rpc-cronos.crypto.org:443/commit | jq "{height: .result.signed_header.header.height}"
```
:::

## Step 0 - Don't panic

At the point of the proposed upgrade, user will see the error message on the `cronosd` similar to the below:

```
ERR UPGRADE "v0.7.0" NEEDED at height: 2693800: {\"binaries\":{...."}}
```

**Don't panic** - The Chain will be paused to allow the majority of validators to upgrade. Validators and full node hosts will have to upgrade your Cronos nodes to the latest release binary.

### Backups

Before the upgrade, node hosts are encouraged to take a complete data backup. backup depends heavily on infrastructure, but generally, we can do this by backing up the `.cronos` directory.

It is critically important for validator operators to back-up the `.cronos/data/priv_validator_state.json` file after stopping the `cronosd` process. This file is updated every block as your validator participates in consensus rounds. It is a critical file needed to prevent double-signing if the upgrade fails and the previous chain needs to be restarted.

## Step 1 - Get the `v0.7.0` binary

To simplify the following step, we will be using **Linux-x86** for illustration. Binary for Mac Windows with different DB and architecture are also available [here](https://github.com/crypto-org-chain/cronos/releases/tag/v0.7.0).

- Terminate the `cronosd`; afterwards, download the `0.7.0` released binaries from github:

  ```bash
  $ curl -LOJ https://github.com/crypto-org-chain/cronos/releases/download/v0.7.0/cronos_0.7.0_Linux_x86_64.tar.gz
  $ tar -zxvf cronos_0.7.0_Linux_x86_64.tar.gz
  ```

  ::: tip Remarks:
  If you have stated `cronosd` with _systemd_ service, kindly stop it by

  ```bash
  $ sudo systemctl stop cronosd
  ```

  And replace the binary in the location where the `ExecStart` states in Systemd Unit file.

  :::

### Step 1.1 - Verify the version

You can verify the installation by checking the version of `cronosd`, the latest version is `0.7.0`.

```bash
# check the version of cronosd
$ ./cronosd version
0.7.0
```

### Step 1.2 - Update `app.toml`

In this v0.7.0 upgrade, there are a few extra parameters that we would have to add to `.cronos/config/app.toml` under

- EVM Configuration - `[evm]` and;
- JSON RPC Configuration - `[json-rpc]`.
they are:

``` diff
...
...
###############################################################################
###                             EVM Configuration                           ###
###############################################################################

[evm]

+ max-tx-gas-wanted=500000
...
...
###############################################################################
###                           JSON RPC Configuration                        ###
###############################################################################

[json-rpc]

+ feehistory-cap = 100
+ logs-cap = 10000
+ block-range-cap = 10000
+ http-timeout="30s"
+ http-idle-timeout="120s"
...
...

```

kindly insert the above parameters, save it and move on!

## Step 2. - Run everything

We are ready to start the node join the network again with the new binary:

- Start `cronosd`, e.g.:

```bash
  $ ./cronosd start
```

:::tip Remark:
Once the `cronosd` is started we would see the message

```
applying upgrade "v0.7.0" at height: 2693800"
```

and there will be an iteration over the previous blockchain data. This process will take a while, which is depending on the size of the database and the hardware specs.
:::

Afterwards, sit back and wait for the syncing process. You can query the node syncing status by

```bash
$ ./cronosd status 2>&1 | jq '.SyncInfo.catching_up'
```

If the above command returns `false`, it means that your node **is synced**; otherwise, it returns `true` and implies your node is still catching up.

At this step, you've successfully performed the Huygen upgrade!
