# Patching Unlucky & Duplicate Tx

In the first version of Cronos (`v0.6`), there was a known issue where transactions were being included in a block even when the block gas limit at the EVM level had already been reached. \
This led to:

* Some "unlucky" transactions (before block height`2693800`) are not reflected at the EVM level
* One would observe a few blocks that have >100% of the block gas limit at the EVM level.
* Duplicate transactions

A node host has two ways to obtain a complete database with patched transactions:

1. Start from genesis and perform the necessary steps at each block height
2. Perform a one-off sync from a snapshot

## Method 1: Start from Genesis



**Step 1.** Follow the [Cronos Mainnet docs](./) from step 1 to start syncing a node with binary`v0.6.11`

**Step 2.** When you reach blockheight `2693800,` the binary should automatically halt. \
Now run the command `fix-unlucky-tx`to patch unlucky transactions. This patch only works for blocks until blockheight `2693800.`

```bash
./cronosd fix-unlucky-tx --start-block 1 --end-block 2693800
```

{% hint style="info" %}
More information on this command can be found in the release notes of `0.7.1-rc0`\
[https://github.com/crypto-org-chain/cronos/releases/tag/v0.7.1-rc0](https://github.com/crypto-org-chain/cronos/releases/tag/v0.7.1-rc0)\
\
And in the patch unlucky tx wiki\
[https://github.com/crypto-org-chain/cronos/wiki/Patch-Unlucky-Tx](https://github.com/crypto-org-chain/cronos/wiki/Patch-Unlucky-Tx)
{% endhint %}

**Step 3.** Verify that the unlucky tx have been patched by checking the following example tx hash\
`0x435ef379b9ddf226d9fe098ae39d36aed2d03f3c46febd84c48919f1adf1b7fe`

```bash
curl -X POST 'https://evm.cronos.org' \
-H 'Content-Type: application/json' \
-d '{
    "jsonrpc": "2.0",
    "method": "eth_getTransactionByHash",
    "params": [
        "0x435ef379b9ddf226d9fe098ae39d36aed2d03f3c46febd84c48919f1adf1b7fe"
    ],
    "id": 44
}'

{"jsonrpc":"2.0","id":44,"result":{"blockHash":"0xf0843bf4f40edb41537ef08fe70e192da77fba26eaae31871c63b15a2b9bda81","blockNumber":"0x2925bc","from":"0x1bfcb6b1ee66fe339a9dc452359c4c111cc5ffc0","gas":"0x5d9b18","gasPrice":"0x48c27395000","maxFeePerGas":"0x48c27395000","maxPriorityFeePerGas":"0x48c27395000","hash":"0x435ef379b9ddf226d9fe098ae39d36aed2d03f3c46febd84c48919f1adf1b7fe","input":"0xd931ccbc000000000000000000000000000000000000000000000000000000000000000700000000000000000000000000000000000000000000000000000000000000050000000000000000000000000000000000000000000000000000000000000bf50000000000000000000000000000000000000000000000000000000002faf0800000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000012c00000000000000000000000000000000000000000000000000000000000026de00000000000000000000000000000000000000000000000000000000000005dc","nonce":"0x8b","to":"0xb212ce53ff067ce6e07e3adcd39a362e54c9e534","transactionIndex":"0x1e","value":"0x0","type":"0x2","accessList":[],"chainId":"0x19","v":"0x0","r":"0xf5268b439f80c5294465d70804fe2f731ef87bf54d726ead72772a0162081767","s":"0x292d753ad7e52839c974df0325bd41cb2766d4f1c0ecd5d561d14da05b257d8"}}
```

**Step 4.** Run the command `reindex-duplicated-tx` to patch duplicated transactions. \
This command works for all blockheights.&#x20;

```bash
./cronosd reindex-duplicated-tx --start-block 1 --end-block 2693800
```

**Step 5.** Verify that the duplicate tx have been patched by checking the following example tx hash\
`0x3941c8a1625163165fb185e934d463743258ee4b0924c5deb690fc836dab839d`

```bash
curl -X POST 'https://evm.cronos.org' \
--header 'Content-Type: application/json' \
--data-raw '{
    "jsonrpc": "2.0",
    "method": "eth_getTransactionByHash",
    "params": [
        "0x3941c8a1625163165fb185e934d463743258ee4b0924c5deb690fc836dab839d"
    ],
    "id": 44
}'

{"jsonrpc":"2.0","id":44,"result":{"blockHash":"0x6eca0e692f6cce612a5c52294db0f5c75127dc6feb310b2693bc697fe3797793","blockNumber":"0x28c3ed","from":"0xdb8befa2f810662316e298f387c943e57b377260","gas":"0x7a120","gasPrice":"0x4a36fb03800","hash":"0x3941c8a1625163165fb185e934d463743258ee4b0924c5deb690fc836dab839d","input":"0x54d2f242","nonce":"0x30","to":"0xc6494099716abe3d95db5a97e5a7fc5ae7e7caba","transactionIndex":"0x0","value":"0x0","type":"0x0","v":"0x55","r":"0xea07319d8a7666afd8ad4970d7f11e2135c9b71719fc34b69995c110beeb84f4","s":"0x2f4f5aa3a822121ee65aa879ff50a2a4504d2f7575d404f1d22685e06d86e07b"}}
```

**Step 6.** After the unlucky has been patched, follow the [Upgrade notes](https://docs.cronos.org/for-node-hosts/running-nodes/cronos-mainnet#step-0-notes-on-huygen-network-upgrade) on performing upgrades until the node is synced to the current block height.

{% hint style="info" %}
You can print out which blocks will need re-indexing by adding the `--print-txs` argument. Bear in mind that this won't actually reindex the block, but rather just print.
{% endhint %}



## Method 2: Start from a latest patched snapshot

Alternatively, you can do a one-off sync, if you start with the most recent snapshot, that already includes patched transactions (after November).&#x20;

Get the latest snapshot with patched data on S3 [here](https://github.com/crypto-org-chain/cronos/wiki/Patch-Unlucky-Tx#patched-archived-snapshots)
