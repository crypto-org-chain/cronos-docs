# Patching unlucky tx

In the first version of Cronos (`v0.6`), there was a known issue where transactions were being included in a block even when the block gas limit at the EVM level had already been reached. \
This led to:

* Some "unlucky" transactions (before block height`2693800`) are not reflected at the EVM level
* One would observe a few blocks that have >100% of the block gas limit at the EVM level.

A node host has two ways to obtain a complete database with patched transactions:

1. Start from genesis and perform the necessary steps at each block height
2. Perform a one-off sync from`v0.8.0.`

## Method 1: Start from Genesis



**Step 1.** Follow the [Cronos Mainnet docs](./) from step 1 to start syncing a node with binary`v0.6.11.`

**Step 2.** When you reach blockheight `2693800` the binary should automatically halt, now run the command `fix-unlucky-tx`to patch the transactions.

```bash
./cronosd fix-unlucky-tx
```

\
**Step 3.** After the unlucky has been patched, follow the [Upgrade notes](https://docs.cronos.org/for-node-hosts/running-nodes/cronos-mainnet#step-0-notes-on-huygen-network-upgrade) on performing upgrades until the node is synced to the current block height.



## Method 2: Start from v0.8.0

Alternatively, you can do a one-off sync, if you start with a snapshot from `v0.8.0` (after blockheight `3982500`) , and execute `reindex-duplicated-tx`

**Step 1.** Get a snapshot from [Quicksync](quicksync.md)&#x20;

**Step 2. R**un the command `reindex-duplicated-tx` to patch the transactions.

```bash
./cronosd reindex-duplicated-tx
```



You should now have succesfully patched the unlucky tx.\
